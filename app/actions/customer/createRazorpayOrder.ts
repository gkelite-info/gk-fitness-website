"use server";

import { createClient } from "@/app/api/supabase/server";
import { createRazorpayOrderInstance } from "@/lib/helpers/razorpay/razorpayServer";

export interface CreateRazorpayOrderActionParams {
  planId: string;
  customerId?: string;
  gymId?: string;
}

export async function createRazorpayOrder({
  planId,
  customerId,
  gymId,
}: CreateRazorpayOrderActionParams) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;
  let customerName = user.user_metadata?.fullName || "";
  let customerPhone = user.phone || "";

  const { data: customer } = await supabase
    .from("gym_customers")
    .select("customerId, gymId, fullName, phone, email")
    .or(`userId.eq.${user.id},email.eq.${user.email}`)
    .maybeSingle();

  if (customer) {
    resolvedCustomerId = resolvedCustomerId || customer.customerId;
    resolvedGymId = resolvedGymId || customer.gymId;
    customerName = customer.fullName || customerName;
    customerPhone = customer.phone || customerPhone;
  }

  if (!resolvedCustomerId || !resolvedGymId) {
    return { success: false, error: "Customer profile not found" };
  }

  const { data: planInfo, error: planError } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, price, durationMonths")
    .eq("planId", planId)
    .single();

  if (planError || !planInfo) {
    return { success: false, error: "Membership plan not found" };
  }

  const price = Number(planInfo.price) || 0;
  if (price <= 0) {
    return { success: false, error: "Invalid plan pricing" };
  }

  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    if (!keyId) {
      return { success: false, error: "Razorpay Key ID is not configured" };
    }

    const order = await createRazorpayOrderInstance({
      amount: price,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        planId: planInfo.planId,
        planName: planInfo.planName,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      planName: planInfo.planName,
      planId: planInfo.planId,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      customerName,
      customerEmail: user.email || customer?.email || "",
      customerPhone,
    };
  } catch (err: any) {
    console.error("Error creating Razorpay order:", err);
    return {
      success: false,
      error: err.message || "Failed to initiate payment gateway",
    };
  }
}
