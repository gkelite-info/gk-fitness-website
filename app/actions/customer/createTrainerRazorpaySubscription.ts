"use server";

import { createClient } from "@/app/api/supabase/server";
import {
  createRazorpaySubscriptionInstance,
  getRazorpayCredentials,
} from "@/lib/helpers/razorpay/razorpayServer";

export interface CreateTrainerRazorpaySubscriptionParams {
  trainerId: string;
  amount?: number;
  trainerName?: string;
}

export async function createTrainerRazorpaySubscription({
  trainerId,
  amount,
  trainerName,
}: CreateTrainerRazorpaySubscriptionParams) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  const { data: userRec } = await supabase
    .from("users")
    .select("userId, role, name, phone, email")
    .eq("userId", user.id)
    .maybeSingle();

  const { data: trainer } = await supabase
    .from("global_trainers")
    .select("globalTrainerId, fullName, price, specialization, email, mobile")
    .eq("globalTrainerId", trainerId)
    .maybeSingle();

  const finalTrainerName = trainer?.fullName || trainerName || "Personal Trainer";
  const finalPrice = Number(amount) > 0 ? Number(amount) : Number(trainer?.price) || 0;

  if (finalPrice <= 0) {
    return { success: false, error: "Invalid trainer fee amount" };
  }

  try {
    const { key_id: keyId } = getRazorpayCredentials();
    if (!keyId) {
      return { success: false, error: "Razorpay Key ID is not configured" };
    }

    const { subscription } = await createRazorpaySubscriptionInstance({
      planName: `Personal Trainer - ${finalTrainerName}`,
      amount: finalPrice,
      period: "monthly",
      interval: 1,
      totalCount: 12,
      notes: {
        trainerId,
        trainerName: finalTrainerName,
        userId: user.id,
        customerId: user.id,
        paymentType: "trainerfee",
        isAutoPay: "true",
      },
    });

    const customerName = userRec?.name || user.user_metadata?.fullName || user.email?.split("@")[0] || "Customer";
    const customerPhone = userRec?.phone || user.phone || "";

    return {
      success: true,
      subscriptionId: subscription.id,
      amount: Math.round(finalPrice * 100),
      currency: "INR",
      keyId,
      trainerId,
      trainerName: finalTrainerName,
      price: finalPrice,
      customerName,
      customerEmail: user.email || userRec?.email || "",
      customerPhone,
      isAutoPay: true,
    };
  } catch (err: any) {
    console.error("[createTrainerRazorpaySubscription] Error:", err);
    const msg =
      err?.error?.description ||
      err?.description ||
      err?.message ||
      "Failed to initiate AutoPay subscription for personal trainer";
    return {
      success: false,
      error: msg,
    };
  }
}

