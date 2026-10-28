"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import { verifyRazorpaySignature, getRazorpayClient } from "@/lib/helpers/razorpay/razorpayServer";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

export interface VerifyPaymentAndRenewParams {
  orderId?: string | null;
  paymentId: string;
  signature?: string | null;
  planId: string;
  customerId?: string;
  gymId?: string;
}

interface RazorpayPaymentInfo {
  id?: string;
  status?: string;
  amount?: number;
  currency?: string;
  method?: string;
  vpa?: string | null;
}

export async function verifyPaymentAndRenewPlan({
  orderId,
  paymentId,
  signature,
  planId,
  customerId,
  gymId,
}: VerifyPaymentAndRenewParams) {
  let isVerified = false;
  let verificationError = "Invalid payment signature verification";
  let detectedPaymentMethod: string | null = null;
  let rzpPayment: RazorpayPaymentInfo | null = null;

  if (orderId && signature) {
    isVerified = verifyRazorpaySignature({ orderId, paymentId, signature });
    if (!isVerified) {
      console.warn("[verifyPaymentAndRenewPlan] Signature mismatch, attempting direct API lookup for paymentId:", paymentId);
    }
  }

  if (paymentId && !paymentId.startsWith("pay_web_")) {
    try {
      const rzpClient = getRazorpayClient();
      rzpPayment = (await rzpClient.payments.fetch(paymentId)) as RazorpayPaymentInfo;
      if (rzpPayment) {
        if (rzpPayment.status === "authorized" && typeof rzpPayment.amount === "number") {
          try {
            rzpPayment = (await rzpClient.payments.capture(
              paymentId,
              rzpPayment.amount,
              rzpPayment.currency || "INR"
            )) as RazorpayPaymentInfo;
          } catch (capErr) {
            console.warn("[verifyPaymentAndRenewPlan] Auto-capture note:", capErr);
          }
        }

        if (rzpPayment.status === "captured" || rzpPayment.status === "authorized") {
          isVerified = true;
        }

        if (rzpPayment.method) {
          detectedPaymentMethod = rzpPayment.method;
        }
      }
    } catch (fetchErr: unknown) {
      console.warn("[verifyPaymentAndRenewPlan] Direct Razorpay verification note:", fetchErr);
      const errObj = fetchErr as { statusCode?: number; error?: { description?: string }; message?: string };
      const errMsg = errObj?.error?.description || errObj?.message || "";
      if (errObj?.statusCode === 401 || errMsg.includes("Authentication failed")) {
        verificationError = "Razorpay authentication failed on server. Please update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables.";
      } else if (errMsg && !isVerified) {
        verificationError = `Payment verification error: ${errMsg}`;
      }
    }
  }

  if (!isVerified) {
    return { success: false, error: verificationError };
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

  try {
    const result = await executeMembershipPaymentSuccess({
      supabase,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId,
      customerUserId: user.id,
      gatewayPaymentId: paymentId,
      gatewayOrderId: orderId,
      paymentMethod: detectedPaymentMethod || rzpPayment?.method || "other",
      upiId: rzpPayment?.vpa || null,
      amountPaidOverride: rzpPayment?.amount ? Number(rzpPayment.amount) / 100 : undefined,
    });

    revalidatePath("/customer");
    revalidatePath("/owner");
    revalidatePath("/owner/payments");
    revalidatePath("/owner/finance");
    return { success: true, planName: result.planName, paymentId };
  } catch (err: unknown) {
    console.error("[verifyPaymentAndRenewPlan] Execution error:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to process membership renewal";
    return { success: false, error: errorMsg };
  }
}
