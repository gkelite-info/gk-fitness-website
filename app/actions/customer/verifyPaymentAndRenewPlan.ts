"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import { verifyRazorpaySignature } from "@/lib/helpers/razorpay/razorpayServer";

export interface VerifyPaymentAndRenewParams {
  orderId: string;
  paymentId: string;
  signature: string;
  planId: string;
  customerId?: string;
  gymId?: string;
}

export async function verifyPaymentAndRenewPlan({
  orderId,
  paymentId,
  signature,
  planId,
  customerId,
  gymId,
}: VerifyPaymentAndRenewParams) {
  const isSignatureValid = verifyRazorpaySignature({
    orderId,
    paymentId,
    signature,
  });

  if (!isSignatureValid) {
    return { success: false, error: "Invalid payment signature verification" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User session expired" };
  }

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;

  const { data: userRec } = await supabase
    .from("users")
    .select("userId, role")
    .eq("userId", user.id)
    .maybeSingle();

  const { data: subPlan } = await supabase
    .from("subscriptions")
    .select("subscriptionPlanId, planName, price")
    .eq("subscriptionPlanId", planId)
    .maybeSingle();

  const isIndividual = userRec?.role === "individual" || Boolean(subPlan) || !resolvedGymId;

  if (isIndividual) {
    if (!subPlan) {
      return { success: false, error: "Subscription plan not found" };
    }

    const { data: existingIndivPlans } = await supabase
      .from("individual_customer_plans")
      .select("*")
      .eq("userId", user.id)
      .is("deletedAt", null)
      .order("createdAt", { ascending: false })
      .limit(1)
      .maybeSingle();

    const now = new Date();
    let startDate = now;
    if (existingIndivPlans?.endDate) {
      const existingEndDate = new Date(existingIndivPlans.endDate);
      if (existingEndDate > now && existingIndivPlans.isActive) {
        startDate = existingEndDate;
      }
    }

    const calculatedEnd = new Date(startDate);
    calculatedEnd.setMonth(calculatedEnd.getMonth() + 1);
    const finalStartDate = startDate.toISOString();
    const finalEndDate = calculatedEnd.toISOString();
    const nowIso = now.toISOString();

    if (existingIndivPlans?.individualCustomerPlanId) {
      await supabase
        .from("individual_customer_plans")
        .update({
          subscriptionPlanId: subPlan.subscriptionPlanId,
          customAmount: subPlan.price || 0,
          startDate: finalStartDate,
          endDate: finalEndDate,
          isActive: true,
          updatedAt: nowIso,
        })
        .eq("individualCustomerPlanId", existingIndivPlans.individualCustomerPlanId);
    } else {
      await supabase
        .from("individual_customer_plans")
        .insert([{
          individualCustomerPlanId: crypto.randomUUID(),
          subscriptionPlanId: subPlan.subscriptionPlanId,
          userId: user.id,
          customAmount: subPlan.price || 0,
          startDate: finalStartDate,
          endDate: finalEndDate,
          isActive: true,
          createdAt: nowIso,
          updatedAt: nowIso,
        }]);
    }

    revalidatePath("/customer");
    return { success: true, planName: subPlan.planName, paymentId };
  }

  const { data: customer } = await supabase
    .from("gym_customers")
    .select("customerId, gymId")
    .or(`userId.eq.${user.id},email.eq.${user.email}`)
    .maybeSingle();

  if (customer) {
    resolvedCustomerId = resolvedCustomerId || customer.customerId;
    resolvedGymId = resolvedGymId || customer.gymId;
  }

  if (!resolvedCustomerId || !resolvedGymId) {
    return { success: false, error: "Customer record not found" };
  }

  const { data: planInfo, error: planError } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, durationMonths, price")
    .eq("planId", planId)
    .single();

  if (planError || !planInfo) {
    return { success: false, error: "Plan details not found" };
  }

  let durationMonths = 1;
  if (planInfo.durationMonths) {
    const rawStr = String(planInfo.durationMonths).toLowerCase().trim();
    if (rawStr.includes("year")) {
      const yearMatch = rawStr.match(/\d+/);
      durationMonths = yearMatch ? parseInt(yearMatch[0], 10) * 12 : 12;
    } else {
      const numMatch = rawStr.match(/\d+/);
      durationMonths = numMatch ? parseInt(numMatch[0], 10) : 1;
    }
  }

  const { data: existingPlans } = await supabase
    .from("gym_customer_membership_plans")
    .select("*")
    .eq("customerId", resolvedCustomerId)
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  const latestExisting = existingPlans?.[0];
  const now = new Date();
  let startDate = now;

  if (latestExisting?.endDate) {
    const existingEndDate = new Date(latestExisting.endDate);
    if (existingEndDate > now && (latestExisting.is_Active ?? latestExisting.isActive)) {
      startDate = existingEndDate;
    }
  }

  const calculatedEnd = new Date(startDate);
  const targetDay = startDate.getDate();
  calculatedEnd.setMonth(calculatedEnd.getMonth() + durationMonths);
  if (calculatedEnd.getDate() !== targetDay) {
    calculatedEnd.setDate(0);
  }

  const finalStartDate = startDate.toISOString();
  const finalEndDate = calculatedEnd.toISOString();
  const nowIso = now.toISOString();

  if (latestExisting?.GymCustomerMembershipPlanId) {
    const { error: updateError } = await supabase
      .from("gym_customer_membership_plans")
      .update({
        planId: planInfo.planId,
        gymId: resolvedGymId,
        customAmount: planInfo.price || 0,
        startDate: finalStartDate,
        endDate: finalEndDate,
        is_Active: true,
        updatedAt: nowIso,
      })
      .eq("GymCustomerMembershipPlanId", latestExisting.GymCustomerMembershipPlanId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }
  } else {
    const newPlanId = crypto.randomUUID();
    const { error: insertError } = await supabase
      .from("gym_customer_membership_plans")
      .insert([{
        GymCustomerMembershipPlanId: newPlanId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        planId: planInfo.planId,
        customAmount: planInfo.price || 0,
        startDate: finalStartDate,
        endDate: finalEndDate,
        createdBy: user.id,
        is_Active: true,
        is_deleted: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  try {
    await supabase.from("customer_gym_payments").insert([{
      customerPaymentId: crypto.randomUUID(),
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId: planInfo.planId,
      amountPaid: Number(planInfo.price) || 0,
      paymentMethod: "CARD",
      status: "SUCCESSFUL",
      transactionId: paymentId,
      notes: `Razorpay Order: ${orderId} | Payment: ${paymentId}`,
      is_deleted: false,
      createdAt: nowIso,
      updatedAt: nowIso,
    }]);

    const { data: ownerRecord } = await supabase
      .from("gym_owners")
      .select("gymOwnerId")
      .eq("gymId", resolvedGymId)
      .eq("is_deleted", false)
      .limit(1)
      .maybeSingle();

    if (ownerRecord?.gymOwnerId) {
      await supabase.from("gym_payments").insert([{
        gymPaymentId: crypto.randomUUID(),
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        planId: planInfo.planId,
        paymentMethod: "qrscan",
        amountPaid: Number(planInfo.price) || 0,
        paymentDate: now.toISOString().split("T")[0],
        paymentTime: now.toTimeString().substring(0, 5),
        transactionId: paymentId,
        notes: `Razorpay Online Payment (Order: ${orderId})`,
        paymentTakenBy: ownerRecord.gymOwnerId,
        is_deleted: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);
    }
  } catch (paymentErr) {
    console.error("Failed to insert payment logs:", paymentErr);
  }

  revalidatePath("/customer");
  revalidatePath("/owner");
  revalidatePath("/owner/payments");
  revalidatePath("/owner/finance");
  return { success: true, planName: planInfo.planName, paymentId };
}

