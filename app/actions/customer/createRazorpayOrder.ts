"use server";

import { createClient } from "@/app/api/supabase/server";
import { createRazorpayOrderInstance, getRazorpayCredentials } from "@/lib/helpers/razorpay/razorpayServer";
import { determinePlanActionAndProration } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

export interface CreateRazorpayOrderActionParams {
  planId: string;
  customerId?: string;
  gymId?: string;
  amount?: number;
}

export async function createRazorpayOrder({
  planId,
  customerId,
  gymId,
  amount,
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

  const isIndividual = userRec?.role === "individual" || !gymId;

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
  let effectivePrice = 0;
  let actionType = "ASSIGNED";

  const { data: gymPlan } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, price, durationMonths")
    .eq("planId", planId)
    .maybeSingle();

  if (gymPlan) {
    planInfo = {
      planId: gymPlan.planId,
      planName: gymPlan.planName,
      price: Number(gymPlan.price) || 0,
    };

    const { data: existingPlans } = await supabase
      .from("gym_customer_membership_plans")
      .select("*, plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planId, planName, durationMonths, price), pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planId, planName, durationMonths, price)")
      .eq("customerId", resolvedCustomerId)
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false });

    const { data: latestPaidHistory } = await supabase
      .from("gym_customer_membership_histories")
      .select("*, plan:gym_membership_plans!planId(planId, planName, durationMonths, price)")
      .eq("customerId", resolvedCustomerId)
      .eq("paymentStatus", "paid")
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false })
      .limit(1)
      .maybeSingle();

    const targetCustomerPlan = existingPlans?.[0] || null;
    if (
      targetCustomerPlan &&
      targetCustomerPlan.pendingPlanId === planId &&
      targetCustomerPlan.pendingAmount !== undefined &&
      targetCustomerPlan.pendingAmount !== null &&
      Number(targetCustomerPlan.pendingAmount) >= 0
    ) {
      effectivePrice = Number(targetCustomerPlan.pendingAmount);
      actionType = "UPGRADED";
    } else {
      try {
        const proration = determinePlanActionAndProration({
          newPlan: {
            planId: gymPlan.planId,
            planName: gymPlan.planName,
            price: Number(gymPlan.price) || 0,
            durationMonths: gymPlan.durationMonths,
          },
          existingCustomerPlan: targetCustomerPlan,
          previousHistory: latestPaidHistory,
        });

        effectivePrice = proration.payableAmount;
        actionType = proration.actionType;
      } catch (prorationErr: any) {
        return { success: false, error: prorationErr.message || "Plan downgrade is not permitted" };
      }
    }
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
      effectivePrice = planInfo.price;

      const { data: existingIndivPlan } = await supabase
        .from("individual_customer_plans")
        .select("*, subscription:subscriptions!subscriptionPlanId(subscriptionPlanId, planName, price)")
        .eq("userId", user.id)
        .is("deletedAt", null)
        .order("createdAt", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingIndivPlan) {
        const isExistingActive =
          Boolean(existingIndivPlan.isActive) &&
          existingIndivPlan.status !== "pending" &&
          Boolean(existingIndivPlan.transactionId) &&
          Boolean(existingIndivPlan.endDate);

        if (isExistingActive && existingIndivPlan.subscriptionPlanId !== subPlan.subscriptionPlanId) {
          try {
            const currentPrice = Number(existingIndivPlan.subscription?.price ?? existingIndivPlan.customAmount ?? 0);
            const proration = determinePlanActionAndProration({
              newPlan: {
                planId: subPlan.subscriptionPlanId,
                planName: subPlan.planName,
                price: planInfo.price,
                durationMonths: 1,
              },
              existingCustomerPlan: {
                planId: existingIndivPlan.subscriptionPlanId,
                startDate: existingIndivPlan.startDate,
                endDate: existingIndivPlan.endDate,
                isActive: true,
                is_Active: true,
                customAmount: existingIndivPlan.customAmount,
                plan: {
                  planId: existingIndivPlan.subscriptionPlanId,
                  planName: existingIndivPlan.subscription?.planName || "Subscription Plan",
                  price: currentPrice,
                  durationMonths: 1,
                },
              },
            });

            effectivePrice = proration.payableAmount;
            actionType = proration.actionType;
          } catch (prorationErr: any) {
            return { success: false, error: prorationErr.message || "Plan downgrade is not permitted" };
          }
        } else if (existingIndivPlan.subscriptionPlanId === planId && existingIndivPlan.customAmount && Number(existingIndivPlan.customAmount) > 0) {
          effectivePrice = Number(existingIndivPlan.customAmount);
        }
      }

      if (typeof amount === "number" && amount > 0 && amount <= effectivePrice) {
        effectivePrice = amount;
      }
    }
  }

  if (!planInfo) {
    return { success: false, error: "Membership plan not found" };
  }

  if (effectivePrice <= 0) {
    return { success: false, error: "Invalid plan pricing" };
  }

  try {
    const { key_id: keyId } = getRazorpayCredentials();
    if (!keyId) {
      return { success: false, error: "Razorpay Key ID is not configured" };
    }

    let order: any = null;
    try {
      order = await createRazorpayOrderInstance({
        amount: effectivePrice,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          planId: planInfo.planId,
          planName: planInfo.planName,
          customerId: resolvedCustomerId,
          gymId: resolvedGymId || "",
          actionType,
        },
      });
    } catch (orderErr: any) {
      console.error("[createRazorpayOrder] Failed to create order instance:", orderErr);
      const errMsg =
        orderErr?.error?.description ||
        orderErr?.description ||
        orderErr?.message ||
        "Failed to create order on gateway";
      return {
        success: false,
        error: `Payment initialization error: ${errMsg}. Please verify Razorpay credentials in server environment variables.`,
      };
    }

    return {
      success: true,
      orderId: order?.id,
      amount: order ? order.amount : Math.round(effectivePrice * 100),
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
