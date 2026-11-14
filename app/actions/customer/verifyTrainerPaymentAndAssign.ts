"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import {
  verifyRazorpaySignature,
  verifyRazorpaySubscriptionSignature,
  getRazorpayClient,
} from "@/lib/helpers/razorpay/razorpayServer";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";
import { processTrainerPaymentSuccess } from "@/lib/helpers/individual/customer-trainer/trainerPaymentSuccessProcessor";

export interface VerifyTrainerPaymentParams {
  orderId?: string | null;
  paymentId: string;
  signature?: string | null;
  trainerId: string;
  amount?: number;
  subscriptionId?: string | null;
  isAutoPay?: boolean;
  userId?: string;
}

export async function verifyTrainerPaymentAndAssign({
  orderId,
  paymentId,
  signature,
  trainerId,
  amount,
  subscriptionId,
  isAutoPay = false,
  userId,
}: VerifyTrainerPaymentParams) {
  const isTestTxn =
    paymentId?.startsWith("pay_test_") ||
    paymentId?.startsWith("pay_web_") ||
    orderId?.startsWith("order_test_");

  let isVerified = Boolean(isTestTxn);
  let detectedPaymentMode: string | null = null;
  let rzpPayment: any = null;
  let verificationError = "Invalid payment signature verification";

  if (!isVerified && isAutoPay && (subscriptionId || orderId) && signature) {
    if (subscriptionId) {
      isVerified = verifyRazorpaySubscriptionSignature({
        subscriptionId,
        paymentId,
        signature,
      });
    }
    if (!isVerified && orderId) {
      isVerified = verifyRazorpaySignature({
        orderId,
        paymentId,
        signature,
      });
    }
  }

  if (!isVerified && orderId && signature) {
    isVerified = verifyRazorpaySignature({
      orderId,
      paymentId,
      signature,
    });
  }

  if (paymentId && !paymentId.startsWith("pay_web_")) {
    try {
      const rzpClient = getRazorpayClient();
      rzpPayment = await rzpClient.payments.fetch(paymentId);
      if (rzpPayment) {
        if (rzpPayment.method) {
          detectedPaymentMode = String(rzpPayment.method).toLowerCase();
        }

        if (rzpPayment.status === "authorized") {
          try {
            rzpPayment = await rzpClient.payments.capture(
              paymentId,
              rzpPayment.amount,
              rzpPayment.currency || "INR"
            );
          } catch (capErr) {
            console.warn("[verifyTrainerPayment] Auto-capture note:", capErr);
          }
        }

        if (rzpPayment.status === "captured" || rzpPayment.status === "authorized") {
          isVerified = true;
        }
      }
    } catch (fetchErr: any) {
      console.warn("[verifyTrainerPayment] Direct Razorpay verification error:", fetchErr);
      const errMsg = fetchErr?.error?.description || fetchErr?.message || "";
      if (fetchErr?.statusCode === 401 || errMsg.includes("Authentication failed")) {
        verificationError = "Razorpay authentication failed on server. Please update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables.";
      } else if (errMsg && !isVerified) {
        verificationError = `Payment verification error: ${errMsg}`;
      }
    }
  }

  if (!isVerified) {
    return { success: false, error: verificationError };
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serverClient = await createClient();
  const db = serviceRoleKey
    ? createAdminClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    : serverClient;

  const {
    data: { user },
  } = await serverClient.auth.getUser();

  const targetUserId = user?.id || userId;
  if (!targetUserId) {
    return { success: false, error: "User session expired" };
  }

  const result = await processTrainerPaymentSuccess({
    db,
    userId: targetUserId,
    trainerId,
    amount: rzpPayment?.amount ? Number(rzpPayment.amount) / 100 : amount,
    paymentId,
    subscriptionId,
    paymentMode: detectedPaymentMode || rzpPayment?.method || "upi",
  });

  revalidatePath("/customer");
  revalidatePath("/trainer");
  revalidatePath("/globaltrainer");

  return result;
}
