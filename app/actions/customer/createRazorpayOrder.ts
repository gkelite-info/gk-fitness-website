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

  const { data: userRec } = await supabase
    .from("users")
    .select("userId, role, name, phone, email")
    .eq("userId", user.id)
    .maybeSingle();

  const isIndividual = userRec?.role === "individual";

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;
  let customerName = userRec?.name || user.user_metadata?.fullName || user.email?.split("@")[0] || "Customer";
  let customerPhone = userRec?.phone || user.phone || "";

  if (isIndividual) {
    resolvedCustomerId = user.id;
    resolvedGymId = "";
  } else {
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
    } else {
      resolvedCustomerId = resolvedCustomerId || user.id;
    }
  }

  if (!resolvedCustomerId) {
    return { success: false, error: "Customer profile not found" };
  }

  let planInfo: { planId: string; planName: string; price: number } | null = null;
  const { data: gymPlan } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, price")
    .eq("planId", planId)
    .maybeSingle();

  if (gymPlan) {
    planInfo = {
      planId: gymPlan.planId,
      planName: gymPlan.planName,
      price: Number(gymPlan.price) || 0,
    };
  } else {
    const { data: subPlan } = await supabase
      .from("subscriptions")
      .select("subscriptionPlanId, planName, price")
      .eq("subscriptionPlanId", planId)
      .maybeSingle();

    if (subPlan) {
      planInfo = {
        planId: subPlan.subscriptionPlanId,
        planName: subPlan.planName,
        price: Number(subPlan.price) || 0,
      };
    }
  }

  if (!planInfo) {
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

    let order: any = null;
    try {
      order = await createRazorpayOrderInstance({
        amount: price,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          planId: planInfo.planId,
          planName: planInfo.planName,
          customerId: resolvedCustomerId,
          gymId: resolvedGymId || "",
        },
      });
    } catch (orderErr) {
      console.warn("Direct Razorpay gateway fallback:", orderErr);
    }

    return {
      success: true,
      orderId: order?.id,
      amount: order ? order.amount : Math.round(price * 100),
      currency: order ? order.currency : "INR",
      keyId,
      planName: planInfo.planName,
      planId: planInfo.planId,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      customerName,
      customerEmail: user.email || userRec?.email || "",
      customerPhone,
    };
  } catch (err: any) {
    console.error("Error creating Razorpay order:", err);
    const msg =
      err?.error?.description ||
      err?.description ||
      err?.message ||
      "Failed to initiate payment gateway";
    return {
      success: false,
      error: msg,
    };
  }
}
