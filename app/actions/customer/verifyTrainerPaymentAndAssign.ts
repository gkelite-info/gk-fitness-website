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

  const { data: trainer } = await db
    .from("global_trainers")
    .select("globalTrainerId, fullName, price")
    .eq("globalTrainerId", trainerId)
    .maybeSingle();

  const finalAmount = rzpPayment?.amount
    ? Number(rzpPayment.amount) / 100
    : Number(amount) > 0
    ? Number(amount)
    : Number(trainer?.price) || 0;

  const now = new Date();
  const nowIso = now.toISOString();

  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const expiryIso = oneMonthLater.toISOString();

  const normalizedPaymentMode = normalizeIndividualPaymentMode(
    detectedPaymentMode || rzpPayment?.method,
    {
      method: rzpPayment?.method,
      bank: rzpPayment?.bank || rzpPayment?.acquirer_data?.bank_transaction_id,
      vpa: rzpPayment?.vpa,
      card_id: rzpPayment?.card_id,
      wallet: rzpPayment?.wallet,
    }
  );

  const paymentRecord: Record<string, any> = {
    individualCustomerPaymentId: crypto.randomUUID(),
    userId: targetUserId,
    globalTrainerId: trainerId,
    paymentMode: normalizedPaymentMode,
    amountPaid: finalAmount,
    transactionId: subscriptionId || paymentId,
    status: "successful",
    deletedAt: null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const { error: insertPayErr } = await db
    .from("individual_customer_trainer_payments")
    .insert([paymentRecord]);

  if (insertPayErr) {
    console.error("[verifyTrainerPayment] Error inserting individual_customer_trainer_payments:", insertPayErr.message);
    if (insertPayErr.message?.includes("enum") || insertPayErr.message?.includes("check")) {
      paymentRecord.paymentMode = "upi";
      const { error: fallbackPayErr } = await db
        .from("individual_customer_trainer_payments")
        .insert([paymentRecord]);
      if (fallbackPayErr) {
        console.error("[verifyTrainerPayment] Fallback insert with upi failed:", fallbackPayErr.message);
      }
    }
  }

  const { data: existingAssignment } = await db
    .from("individual_customer_trainers")
    .select("individualCustomerTrainerId, weekDays, timings")
    .eq("userId", targetUserId)
    .eq("globalTrainerId", trainerId)
    .eq("is_deleted", false)
    .maybeSingle();

  if (existingAssignment?.individualCustomerTrainerId) {
    const { error: updateErr } = await db
      .from("individual_customer_trainers")
      .update({
        assignedOn: nowIso,
        renewalOn: expiryIso,
        expiryOn: expiryIso,
        status: "approved",
        isActive: true,
        updatedAt: nowIso,
      })
      .eq("individualCustomerTrainerId", existingAssignment.individualCustomerTrainerId);

    if (updateErr) {
      console.error("[verifyTrainerPayment] Error updating assignment:", updateErr);
      return { success: false, error: updateErr.message };
    }
  } else {
    const { error: insertErr } = await db
      .from("individual_customer_trainers")
      .insert([{
        individualCustomerTrainerId: crypto.randomUUID(),
        userId: targetUserId,
        globalTrainerId: trainerId,
        assignedOn: nowIso,
        renewalOn: expiryIso,
        expiryOn: expiryIso,
        status: "approved",
        isActive: true,
        is_deleted: false,
        weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timings: "Flexible Schedule",
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);

    if (insertErr) {
      console.error("[verifyTrainerPayment] Error creating assignment:", insertErr);
      return { success: false, error: insertErr.message };
    }
  }

  revalidatePath("/customer");
  revalidatePath("/trainer");
  revalidatePath("/globaltrainer");

  return {
    success: true,
    trainerName: trainer?.fullName || "Trainer",
    paymentId,
  };
}
