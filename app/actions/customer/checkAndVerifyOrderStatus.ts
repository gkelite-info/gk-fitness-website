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
import { processTrainerPaymentSuccess } from "@/lib/helpers/individual/customer-trainer/trainerPaymentSuccessProcessor";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";

export interface CheckOrderStatusParams {
  orderId?: string;
  planId?: string;
  trainerId?: string;
  paymentType?: "membership" | "trainerfee";
  customerId?: string;
  gymId?: string;
}

export async function checkAndVerifyOrderStatus({
  orderId = "",
  planId,
  trainerId,
  paymentType,
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
    const adminClient = serviceKey ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } }) : null;
    const dbClient = adminClient || supabase;

    let isPaid = false;
    let paymentId = "";
    let paymentMethod = "upi";
    let paymentAmount: number | undefined = undefined;
    let detectedTrainerId = trainerId;
    let isTrainer = paymentType === "trainerfee" || Boolean(trainerId);

    const rzpClient = getRazorpayClient();

    if (orderId && orderId.startsWith("sub_")) {
      const sub = (await fetchRazorpaySubscription(orderId)) as any;
      const activeStatuses = ["active", "authenticated", "charged", "completed"];
      isPaid = sub && (activeStatuses.includes(sub.status) || (typeof sub.paid_count === "number" && sub.paid_count > 0));
      if (sub?.notes?.trainerId) {
        detectedTrainerId = String(sub.notes.trainerId);
        isTrainer = true;
      }
      if (sub) {
        paymentId = `pay_sub_${sub.id}`;
        try {
          const invoices = (await rzpClient.invoices.all({ subscription_id: orderId })) as any;
          const successfulInvoice = invoices?.items?.find((inv: any) => inv.status === "paid" || Boolean(inv.payment_id));
          if (successfulInvoice?.payment_id) {
            paymentId = successfulInvoice.payment_id;
            const pay = (await rzpClient.payments.fetch(paymentId)) as any;
            if (pay?.status === "captured" || pay?.status === "authorized") {
              isPaid = true;
              if (pay?.method) paymentMethod = pay.method;
              if (pay?.amount) paymentAmount = pay.amount;
            }
          }
        } catch (subPayErr) {
          console.warn("[checkAndVerifyOrderStatus] Invoice lookup note:", subPayErr);
        }
      }
    } else if (orderId && orderId.startsWith("order_")) {
      const order = await fetchRazorpayOrder(orderId);
      if (order?.notes?.trainerId) {
        detectedTrainerId = String(order.notes.trainerId);
        isTrainer = true;
      }
      const paymentsData = await fetchRazorpayOrderPayments(orderId);
      const items = (paymentsData?.items || []) as any[];
      const successfulPayment = items.find((p) => p.status === "captured" || p.status === "authorized");
      isPaid = order?.status === "paid" || !!successfulPayment;
      if (successfulPayment) {
        paymentId = successfulPayment.id;
        paymentMethod = successfulPayment.method || "upi";
        paymentAmount = successfulPayment.amount;
      }
    } else if (orderId && orderId.startsWith("pay_")) {
      const pay = (await fetchRazorpayPayment(orderId)) as any;
      isPaid = pay?.status === "captured" || pay?.status === "authorized";
      if (isPaid) {
        paymentId = pay.id;
        paymentMethod = pay.method || "upi";
        paymentAmount = pay.amount;
        if (pay?.notes?.trainerId) {
          detectedTrainerId = String(pay.notes.trainerId);
          isTrainer = true;
        }
      }
    }

    if (!isPaid) {
      try {
        const recentPayments = (await rzpClient.payments.all({ count: 15 })) as any;
        const matchingPayment = (recentPayments?.items || []).find((p: any) => {
          const isStatusOk = p.status === "captured" || p.status === "authorized";
          if (!isStatusOk) return false;
          const notesUserId = p.notes?.userId || p.notes?.customerId;
          const matchesUser = notesUserId === user.id;
          const matchesEmail = Boolean(p.email && user.email && p.email.toLowerCase() === user.email.toLowerCase());
          const matchesPhone = Boolean(p.contact && user.phone && p.contact.replace(/\D/g, "") === user.phone.replace(/\D/g, ""));
          const isRecent = p.created_at * 1000 > Date.now() - 3 * 60 * 60 * 1000;
          return isRecent && (matchesUser || matchesEmail || matchesPhone);
        });

        if (matchingPayment) {
          isPaid = true;
          paymentId = matchingPayment.id;
          paymentMethod = matchingPayment.method || "upi";
          paymentAmount = matchingPayment.amount;
          if (matchingPayment.notes?.trainerId || matchingPayment.notes?.paymentType === "trainerfee" || matchingPayment.description?.toLowerCase().includes("trainer")) {
            isTrainer = true;
            if (matchingPayment.notes?.trainerId) detectedTrainerId = String(matchingPayment.notes.trainerId);
          }
          if (matchingPayment.status === "authorized" && typeof matchingPayment.amount === "number") {
            try {
              await rzpClient.payments.capture(matchingPayment.id, matchingPayment.amount, matchingPayment.currency || "INR");
            } catch {}
          }
        }
      } catch (recentErr) {
        console.warn("[checkAndVerifyOrderStatus] Recent payments lookup note:", recentErr);
      }
    }

    if (!isPaid) {
      return {
        success: true,
        status: "pending",
        orderId,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      };
    }

    if (isTrainer) {
      let resolvedTrainerId = detectedTrainerId;
      if (!resolvedTrainerId) {
        const { data: trainerAssignment } = await dbClient
          .from("individual_customer_trainers")
          .select("globalTrainerId")
          .eq("userId", user.id)
          .eq("is_deleted", false)
          .order("createdAt", { ascending: false })
          .limit(1)
          .maybeSingle();

        resolvedTrainerId = trainerAssignment?.globalTrainerId;
      }

      if (!resolvedTrainerId) {
        const { data: anyTrainer } = await dbClient
          .from("global_trainers")
          .select("globalTrainerId")
          .eq("isActive", true)
          .eq("is_deleted", false)
          .limit(1)
          .maybeSingle();
        resolvedTrainerId = anyTrainer?.globalTrainerId;
      }

      if (resolvedTrainerId) {
        const trainerResult = await processTrainerPaymentSuccess({
          db: dbClient,
          userId: user.id,
          trainerId: resolvedTrainerId,
          amount: paymentAmount ? Number(paymentAmount) / 100 : undefined,
          paymentId,
          subscriptionId: orderId.startsWith("sub_") ? orderId : undefined,
          paymentMode: paymentMethod,
        });

        revalidatePath("/customer");
        return {
          success: true,
          status: "paid",
          type: "trainer",
          trainerName: trainerResult.trainerName,
          paymentId,
        };
      }
    }

    const { data: userRec } = await dbClient
      .from("users")
      .select("userId, role")
      .eq("userId", user.id)
      .maybeSingle();

    const resolvedPlanId = planId || "";
    const { data: subPlan } = await dbClient
      .from("subscriptions")
      .select("subscriptionPlanId")
      .eq("subscriptionPlanId", resolvedPlanId)
      .maybeSingle();

    const isIndividual = userRec?.role === "individual" || Boolean(subPlan) || !gymId;

    if (isIndividual && (resolvedPlanId || subPlan)) {
      const normalizedMode = normalizeIndividualPaymentMode(paymentMethod);
      const result = await processIndividualPlanPayment({
        dbClient,
        userId: user.id,
        planId: resolvedPlanId,
        paymentId,
        rzpPaymentAmount: paymentAmount,
        normalizedMode,
        subscriptionId: orderId.startsWith("sub_") ? orderId : undefined,
        isAutoPay: true,
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

    if (resolvedCustomerId && resolvedGymId && resolvedPlanId) {
      const result = await executeMembershipPaymentSuccess({
        supabase: dbClient,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        planId: resolvedPlanId,
        customerUserId: user.id,
        gatewayPaymentId: paymentId,
        gatewayOrderId: orderId,
        paymentMethod,
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
    }

    return {
      success: true,
      status: "paid",
      paymentId,
    };
  } catch (err: unknown) {
    console.error("Error in checkAndVerifyOrderStatus:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to check order status";
    return { success: false, status: "error", error: errorMsg };
  }
}
