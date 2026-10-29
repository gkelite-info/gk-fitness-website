import type { SupabaseClient } from "@supabase/supabase-js";
import { determinePlanActionAndProration } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import type { IndividualCustomerPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";

export interface ProcessIndividualPlanPaymentParams {
  dbClient: SupabaseClient;
  userId: string;
  planId: string;
  paymentId: string;
  rzpPaymentAmount?: number;
  normalizedMode: IndividualCustomerPaymentMode;
}

export async function processIndividualPlanPayment({
  dbClient,
  userId,
  planId,
  paymentId,
  rzpPaymentAmount,
  normalizedMode,
}: ProcessIndividualPlanPaymentParams) {
  const { data: subPlan } = await dbClient
    .from("subscriptions")
    .select("subscriptionPlanId, planName, price")
    .eq("subscriptionPlanId", planId)
    .maybeSingle();

  if (!subPlan) return { success: false, error: "Subscription plan not found" };

  const { data: existingIndivPlans } = await dbClient
    .from("individual_customer_plans")
    .select("*, subscription:subscriptions!subscriptionPlanId(subscriptionPlanId, planName, price)")
    .eq("userId", userId)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isExistingActive =
    Boolean(existingIndivPlans?.isActive) &&
    existingIndivPlans?.status !== "pending" &&
    Boolean(existingIndivPlans?.transactionId) &&
    Boolean(existingIndivPlans?.endDate);

  const isUpgrade = isExistingActive && existingIndivPlans?.subscriptionPlanId !== subPlan.subscriptionPlanId;

  let prorationResult: any = null;
  if (isExistingActive && existingIndivPlans) {
    try {
      const curPrice = Number(existingIndivPlans.subscription?.price ?? existingIndivPlans.customAmount ?? 0);
      prorationResult = determinePlanActionAndProration({
        newPlan: {
          planId: subPlan.subscriptionPlanId,
          planName: subPlan.planName,
          price: Number(subPlan.price) || 0,
          durationMonths: 1,
        },
        existingCustomerPlan: {
          planId: existingIndivPlans.subscriptionPlanId,
          startDate: existingIndivPlans.startDate,
          endDate: existingIndivPlans.endDate,
          isActive: true,
          is_Active: true,
          customAmount: existingIndivPlans.customAmount,
          plan: {
            planId: existingIndivPlans.subscriptionPlanId,
            planName: subPlan.planName,
            price: curPrice,
            durationMonths: 1,
          },
        },
      });
    } catch (e) {
      console.warn("[processIndividualPlanPayment] Proration note:", e);
    }
  }

  const now = new Date();
  const nowIso = now.toISOString();

  let finalStartDate: string;
  let finalEndDate: string;

  if (isUpgrade && prorationResult?.finalStartDate) {
    finalStartDate = new Date(prorationResult.finalStartDate).toISOString();
    finalEndDate = new Date(prorationResult.finalEndDate).toISOString();
  } else if (existingIndivPlans?.endDate && !isUpgrade) {
    const existingEndDate = new Date(existingIndivPlans.endDate);
    const startObj = (existingEndDate > now && isExistingActive) ? existingEndDate : now;
    const endObj = new Date(startObj);
    endObj.setMonth(endObj.getMonth() + 1);
    finalStartDate = startObj.toISOString();
    finalEndDate = endObj.toISOString();
  } else {
    const endObj = new Date(now);
    endObj.setMonth(endObj.getMonth() + 1);
    finalStartDate = now.toISOString();
    finalEndDate = endObj.toISOString();
  }

  const actualPaidAmount = rzpPaymentAmount !== undefined
    ? Number(rzpPaymentAmount) / 100
    : (prorationResult?.payableAmount ?? Number(subPlan.price));

  let planRecordId = existingIndivPlans?.individualCustomerPlanId;

  if (planRecordId) {
    await dbClient
      .from("individual_customer_plans")
      .update({
        subscriptionPlanId: subPlan.subscriptionPlanId,
        customAmount: Number(subPlan.price) || actualPaidAmount,
        startDate: finalStartDate,
        endDate: finalEndDate,
        isActive: true,
        status: "successful",
        transactionId: paymentId,
        updatedAt: nowIso,
      })
      .eq("individualCustomerPlanId", planRecordId);
  } else {
    planRecordId = crypto.randomUUID();
    await dbClient
      .from("individual_customer_plans")
      .insert([{
        individualCustomerPlanId: planRecordId,
        subscriptionPlanId: subPlan.subscriptionPlanId,
        userId,
        customAmount: Number(subPlan.price) || actualPaidAmount,
        startDate: finalStartDate,
        endDate: finalEndDate,
        isActive: true,
        status: "successful",
        transactionId: paymentId,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);
  }

  const { error: payErr } = await dbClient
    .from("individual_customer_payments")
    .insert([{
      individualCustomerPaymentId: crypto.randomUUID(),
      userId,
      subscriptionPlanId: subPlan.subscriptionPlanId,
      paymentType: "membership",
      paymentMode: normalizedMode,
      amountPaid: actualPaidAmount,
      createdAt: nowIso,
      updatedAt: nowIso,
      deletedAt: null,
    }]);

  if (payErr) {
    console.error("[processIndividualPlanPayment] individual_customer_payments error:", payErr.message);
  }

  const historyPayload: Record<string, any> = {
    individualCustomerPlanHistoryId: crypto.randomUUID(),
    individualCustomerPlanId: planRecordId,
    subscriptionPlanId: subPlan.subscriptionPlanId,
    previousSubscriptionPlanId: existingIndivPlans?.subscriptionPlanId || null,
    userId,
    actionType: isUpgrade ? "UPGRADED" : (isExistingActive ? "RENEWED" : "ASSIGNED"),
    customAmount: actualPaidAmount,
    unusedCredit: prorationResult?.unusedCredit ?? 0,
    daysCarriedOver: prorationResult?.daysCarriedOver ?? 0,
    startDate: finalStartDate,
    endDate: finalEndDate,
    paymentStatus: "paid",
    transactionId: paymentId,
    paymentMethod: normalizedMode,
    notes: isUpgrade ? "Plan upgraded with credit applied" : "Payment verified and plan activated",
    createdBy: userId,
    isActive: true,
    is_deleted: false,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const { error: histErr } = await dbClient.from("individual_customer_plan_histories").insert([historyPayload]);
  if (histErr && histErr.message?.includes("invalid input value for enum")) {
    historyPayload.actionType = "UPGRADED";
    await dbClient.from("individual_customer_plan_histories").insert([historyPayload]);
  }

  return { success: true, planName: subPlan.planName, paymentId };
}

