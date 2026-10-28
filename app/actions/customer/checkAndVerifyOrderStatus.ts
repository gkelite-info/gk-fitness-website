"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import {
  fetchRazorpayOrder,
  fetchRazorpayOrderPayments,
} from "@/lib/helpers/razorpay/razorpayServer";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

export interface CheckOrderStatusParams {
  orderId: string;
  planId: string;
  customerId?: string;
  gymId?: string;
}

interface RazorpayOrderItem {
  id?: string;
  status?: string;
  amount?: number;
  method?: string;
  vpa?: string | null;
}

export async function checkAndVerifyOrderStatus({
  orderId,
  planId,
  customerId,
  gymId,
}: CheckOrderStatusParams) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, status: "unauthenticated", error: "User session expired" };
    }

    const order = await fetchRazorpayOrder(orderId);
    if (!order) {
      return { success: false, status: "not_found", error: "Order not found" };
    }

    const paymentsData = await fetchRazorpayOrderPayments(orderId);
    const items = (paymentsData?.items || []) as RazorpayOrderItem[];
    const successfulPayment = items.find(
      (p) => p.status === "captured" || p.status === "authorized"
    );

    const isPaid = order.status === "paid" || !!successfulPayment;

    if (!isPaid) {
      const isFailed = items.some((p) => p.status === "failed");
      return {
        success: true,
        status: isFailed ? "failed" : "pending",
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      };
    }

    const paymentId = successfulPayment?.id || `pay_${order.id}`;

    let resolvedCustomerId = customerId;
    let resolvedGymId = gymId;

    if (!resolvedCustomerId || !resolvedGymId) {
      const { data: customer } = await supabase
        .from("gym_customers")
        .select("customerId, gymId")
        .or(`userId.eq.${user.id},email.eq.${user.email}`)
        .maybeSingle();

      if (customer) {
        resolvedCustomerId = resolvedCustomerId || customer.customerId;
        resolvedGymId = resolvedGymId || customer.gymId;
      }
    }

    if (!resolvedCustomerId || !resolvedGymId) {
      return { success: false, status: "error", error: "Customer record not found" };
    }

    const result = await executeMembershipPaymentSuccess({
      supabase,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId,
      customerUserId: user.id,
      gatewayPaymentId: paymentId,
      gatewayOrderId: orderId,
      paymentMethod: successfulPayment?.method || "other",
      upiId: successfulPayment?.vpa || null,
      amountPaidOverride: successfulPayment?.amount ? Number(successfulPayment.amount) / 100 : undefined,
    });

    revalidatePath("/customer");
    revalidatePath("/owner");
    revalidatePath("/owner/payments");
    revalidatePath("/owner/finance");

    return {
      success: true,
      status: "paid",
      planName: result.planName,
      paymentId,
    };
  } catch (err: unknown) {
    console.error("Error in checkAndVerifyOrderStatus:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to check order status";
    return { success: false, status: "error", error: errorMsg };
  }
}
