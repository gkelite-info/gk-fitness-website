"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import {
  fetchRazorpayOrder,
  fetchRazorpayOrderPayments,
  fetchRazorpaySubscription,
  fetchRazorpayPayment,
  getRazorpayClient,
} from "@/lib/helpers/razorpay/razorpayServer";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import { processIndividualPlanPayment } from "@/lib/helpers/individual/membership/individualPlanPaymentProcessor";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";

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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminClient = serviceKey
      ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
      : null;
    const dbClient = adminClient || supabase;

    let isPaid = false;
    let paymentId = "";
    let paymentMethod = "upi";
    let paymentAmount: number | undefined = undefined;
    let paymentVpa: string | null = null;

    if (orderId.startsWith("sub_")) {
      const sub = (await fetchRazorpaySubscription(orderId)) as any;
      if (!sub) {
        return { success: false, status: "not_found", error: "Subscription not found" };
      }

      const activeStatuses = ["active", "authenticated", "charged", "completed"];
      isPaid =
        activeStatuses.includes(sub.status) ||
        (typeof sub.paid_count === "number" && sub.paid_count > 0);

      if (!isPaid) {
        const failedStatuses = ["cancelled", "halted", "expired"];
        const isFailed = failedStatuses.includes(sub.status);
        return {
          success: true,
          status: isFailed ? "failed" : "pending",
          orderId: sub.id,
          keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        };
      }

      paymentId = `pay_sub_${sub.id}`;
      try {
        const rzpClient = getRazorpayClient();
        const invoices = (await rzpClient.invoices.all({ subscription_id: orderId })) as any;
        const latestInvoice = invoices?.items?.[0];
        if (latestInvoice?.payment_id) {
          paymentId = latestInvoice.payment_id;
          const pay = (await rzpClient.payments.fetch(paymentId)) as any;
          if (pay?.method) paymentMethod = pay.method;
          if (pay?.amount) paymentAmount = pay.amount;
          if (pay?.vpa) paymentVpa = pay.vpa;
        }
      } catch (subPayErr) {
        console.warn("[checkAndVerifyOrderStatus] Invoice lookup note:", subPayErr);
      }
    } else if (orderId.startsWith("pay_")) {
      const pay = (await fetchRazorpayPayment(orderId)) as any;
      if (!pay) {
        return { success: false, status: "not_found", error: "Payment not found" };
      }
      isPaid = pay.status === "captured" || pay.status === "authorized";
      if (!isPaid) {
        return {
          success: true,
          status: pay.status === "failed" ? "failed" : "pending",
          orderId,
          keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        };
      }
      paymentId = pay.id;
      paymentMethod = pay.method || "upi";
      paymentAmount = pay.amount;
      paymentVpa = pay.vpa || null;
    } else {
      const order = await fetchRazorpayOrder(orderId);
      if (!order) {
        return { success: false, status: "not_found", error: "Order not found" };
      }

      const paymentsData = await fetchRazorpayOrderPayments(orderId);
      const items = (paymentsData?.items || []) as RazorpayOrderItem[];
      const successfulPayment = items.find(
        (p) => p.status === "captured" || p.status === "authorized"
      );

      isPaid = order.status === "paid" || !!successfulPayment;

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

      paymentId = successfulPayment?.id || `pay_${order.id}`;
      paymentMethod = successfulPayment?.method || "other";
      paymentAmount = successfulPayment?.amount;
      paymentVpa = successfulPayment?.vpa || null;
    }

    const { data: userRec } = await dbClient
      .from("users")
      .select("userId, role")
      .eq("userId", user.id)
      .maybeSingle();

    const { data: subPlan } = await dbClient
      .from("subscriptions")
      .select("subscriptionPlanId")
      .eq("subscriptionPlanId", planId)
      .maybeSingle();

    const isIndividual = userRec?.role === "individual" || Boolean(subPlan) || !gymId;

    if (isIndividual) {
      const normalizedMode = normalizeIndividualPaymentMode(paymentMethod);
      const result = await processIndividualPlanPayment({
        dbClient,
        userId: user.id,
        planId,
        paymentId,
        rzpPaymentAmount: paymentAmount,
        normalizedMode,
        subscriptionId: orderId.startsWith("sub_") ? orderId : undefined,
        isAutoPay: orderId.startsWith("sub_"),
      });

      if (!result.success) {
        return { success: false, status: "error", error: result.error || "Failed to activate plan" };
      }

      revalidatePath("/customer");
      return {
        success: true,
        status: "paid",
        planName: result.planName,
        paymentId,
      };
    }

    let resolvedCustomerId = customerId;
    let resolvedGymId = gymId;

    if (!resolvedCustomerId || !resolvedGymId) {
      const { data: customer } = await dbClient
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
      supabase: dbClient,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId,
      customerUserId: user.id,
      gatewayPaymentId: paymentId,
      gatewayOrderId: orderId,
      paymentMethod,
      upiId: paymentVpa,
      amountPaidOverride: paymentAmount ? Number(paymentAmount) / 100 : undefined,
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
