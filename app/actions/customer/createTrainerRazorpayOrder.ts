"use server";

import { createClient } from "@/app/api/supabase/server";
import { createRazorpayOrderInstance, getRazorpayCredentials } from "@/lib/helpers/razorpay/razorpayServer";

export interface CreateTrainerRazorpayOrderParams {
  trainerId: string;
  amount?: number;
  trainerName?: string;
}

export async function createTrainerRazorpayOrder({
  trainerId,
  amount,
  trainerName,
}: CreateTrainerRazorpayOrderParams) {
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

    let order: any = null;
    try {
      order = await createRazorpayOrderInstance({
        amount: finalPrice,
        currency: "INR",
        receipt: `pt_rcpt_${Date.now()}`,
        notes: {
          trainerId,
          trainerName: finalTrainerName,
          userId: user.id,
          paymentType: "trainerfee",
        },
      });
    } catch (orderErr: any) {
      console.error("[createTrainerRazorpayOrder] Failed to create order instance:", orderErr);
      const errMsg =
        orderErr?.error?.description ||
        orderErr?.description ||
        orderErr?.message ||
        "Failed to create payment order on gateway";
      return {
        success: false,
        error: `Payment initialization error: ${errMsg}. Please check Razorpay keys in server configuration.`,
      };
    }

    const customerName = userRec?.name || user.user_metadata?.fullName || user.email?.split("@")[0] || "Customer";
    const customerPhone = userRec?.phone || user.phone || "";

    return {
      success: true,
      orderId: order?.id,
      amount: order ? order.amount : Math.round(finalPrice * 100),
      currency: order ? order.currency : "INR",
      keyId,
      trainerId,
      trainerName: finalTrainerName,
      price: finalPrice,
      customerName,
      customerEmail: user.email || userRec?.email || "",
      customerPhone,
    };
  } catch (err: any) {
    console.error("[createTrainerRazorpayOrder] Error:", err);
    return {
      success: false,
      error: err?.message || "Failed to initiate trainer payment gateway",
    };
  }
}
