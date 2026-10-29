"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { verifyRazorpaySignature, getRazorpayClient } from "@/lib/helpers/razorpay/razorpayServer";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";
import { processIndividualPlanPayment } from "@/lib/helpers/individual/membership/individualPlanPaymentProcessor";

export interface VerifyPaymentAndRenewParams {
  orderId?: string | null;
  paymentId: string;
  signature?: string | null;
  planId: string;
  customerId?: string;
  gymId?: string;
  paymentMethod?: string | null;
  paymentMode?: string | null;
}

interface RazorpayPaymentInfo {
  id?: string;
  status?: string;
  amount?: number;
  currency?: string;
  method?: string;
  bank?: string | null;
  wallet?: string | null;
  vpa?: string | null;
  card_id?: string | null;
  acquirer_data?: {
    bank_transaction_id?: string | null;
  };
}

export async function verifyPaymentAndRenewPlan({
  orderId,
  paymentId,
  signature,
  planId,
  customerId,
  gymId,
  paymentMethod,
  paymentMode,
}: VerifyPaymentAndRenewParams) {
  let isVerified = false;
  let verificationError = "Invalid payment signature verification";
  let detectedPaymentMethod: string | null = null;
  let rzpPayment: RazorpayPaymentInfo | null = null;

  if (orderId && signature) {
    isVerified = verifyRazorpaySignature({ orderId, paymentId, signature });
    if (!isVerified) {
      console.warn("[verifyPaymentAndRenewPlan] Signature mismatch, checking direct paymentId:", paymentId);
    }
  }

  if (paymentId && !paymentId.startsWith("pay_web_")) {
    try {
      const rzpClient = getRazorpayClient();
      rzpPayment = (await rzpClient.payments.fetch(paymentId)) as RazorpayPaymentInfo;
      if (rzpPayment) {
        if (rzpPayment.status === "authorized" && typeof rzpPayment.amount === "number") {
          try {
            rzpPayment = (await rzpClient.payments.capture(paymentId, rzpPayment.amount, rzpPayment.currency || "INR")) as RazorpayPaymentInfo;
          } catch (capErr) {
            console.warn("[verifyPaymentAndRenewPlan] Auto-capture note:", capErr);
          }
        }
        if (rzpPayment.status === "captured" || rzpPayment.status === "authorized") isVerified = true;
        if (rzpPayment.method) detectedPaymentMethod = rzpPayment.method;
      }
    } catch (fetchErr: unknown) {
      console.warn("[verifyPaymentAndRenewPlan] Direct Razorpay verification note:", fetchErr);
      const errObj = fetchErr as { statusCode?: number; error?: { description?: string }; message?: string };
      const errMsg = errObj?.error?.description || errObj?.message || "";
      if (errObj?.statusCode === 401 || errMsg.includes("Authentication failed")) {
        verificationError = "Razorpay authentication failed on server.";
      } else if (errMsg && !isVerified) {
        verificationError = `Payment verification error: ${errMsg}`;
      }
    }
  }

  if (!detectedPaymentMethod && orderId) {
    try {
      const rzpClient = getRazorpayClient();
      const orderPayments = await rzpClient.orders.fetchPayments(orderId);
      const successful = (orderPayments?.items || []).find(
        (p: any) => p.status === "captured" || p.status === "authorized"
      ) || orderPayments?.items?.[0];
      if (successful) {
        if (!rzpPayment) rzpPayment = successful as RazorpayPaymentInfo;
        if (successful.method) detectedPaymentMethod = successful.method;
      }
    } catch (orderErr) {
      console.warn("[verifyPaymentAndRenewPlan] Order payments fetch note:", orderErr);
    }
  }

  if (!isVerified) return { success: false, error: verificationError };

  const serverClient = await createClient();
  const { data: { user } } = await serverClient.auth.getUser();
  if (!user) return { success: false, error: "User session expired" };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient = serviceKey ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } }) : null;
  const dbClient = adminClient || serverClient;

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;

  const { data: userRec } = await dbClient.from("users").select("userId, role").eq("userId", user.id).maybeSingle();
  const { data: subPlan } = await dbClient.from("subscriptions").select("subscriptionPlanId, planName, price").eq("subscriptionPlanId", planId).maybeSingle();

  const isIndividual = userRec?.role === "individual" || Boolean(subPlan) || !resolvedGymId;

  if (isIndividual) {
    const normalizedMode = normalizeIndividualPaymentMode(
      paymentMode || paymentMethod || detectedPaymentMethod,
      {
        method: rzpPayment?.method,
        bank: rzpPayment?.bank || rzpPayment?.acquirer_data?.bank_transaction_id,
        vpa: rzpPayment?.vpa,
        card_id: rzpPayment?.card_id,
        wallet: rzpPayment?.wallet,
      }
    );

      const result = await processIndividualPlanPayment({
        dbClient,
        userId: user.id,
      planId,
      paymentId,
      rzpPaymentAmount: rzpPayment?.amount,
      normalizedMode,
    });

    if (!result.success) return result;

    revalidatePath("/customer");
    return result;
  }

  const { data: customer } = await dbClient
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
      supabase: dbClient,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId,
      customerUserId: user.id,
      gatewayPaymentId: paymentId,
      gatewayOrderId: orderId,
      paymentMethod: paymentMethod || detectedPaymentMethod || (rzpPayment?.bank ? "netbanking" : rzpPayment?.method) || "netbanking",
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
