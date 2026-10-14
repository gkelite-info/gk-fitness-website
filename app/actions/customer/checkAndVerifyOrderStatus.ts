"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import {
  fetchRazorpayOrder,
  fetchRazorpayOrderPayments,
} from "@/lib/helpers/razorpay/razorpayServer";

export interface CheckOrderStatusParams {
  orderId: string;
  planId: string;
  customerId?: string;
  gymId?: string;
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
    const successfulPayment = paymentsData?.items?.find(
      (p: any) => p.status === "captured" || p.status === "authorized"
    );

    const isPaid = order.status === "paid" || !!successfulPayment;

    if (!isPaid) {
      const isFailed = paymentsData?.items?.some((p: any) => p.status === "failed");
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

    const { data: planInfo, error: planError } = await supabase
      .from("gym_membership_plans")
      .select("planId, planName, durationMonths, price")
      .eq("planId", planId)
      .single();

    if (planError || !planInfo) {
      return { success: false, status: "error", error: "Plan details not found" };
    }

    let durationMonths = 1;
    if (planInfo.durationMonths) {
      const rawStr = String(planInfo.durationMonths).toLowerCase().trim();
      if (rawStr.includes("year")) {
        const yearMatch = rawStr.match(/\d+/);
        durationMonths = yearMatch ? parseInt(yearMatch[0], 10) * 12 : 12;
      } else {
        const numMatch = rawStr.match(/\d+/);
        durationMonths = numMatch ? parseInt(numMatch[0], 10) : 1;
      }
    }

    const { data: existingPlans } = await supabase
      .from("gym_customer_membership_plans")
      .select("*")
      .eq("customerId", resolvedCustomerId)
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false });

    const latestExisting = existingPlans?.[0];
    const now = new Date();
    let startDate = now;

    if (latestExisting?.endDate) {
      const existingEndDate = new Date(latestExisting.endDate);
      if (existingEndDate > now && (latestExisting.is_Active ?? latestExisting.isActive)) {
        startDate = existingEndDate;
      }
    }

    const calculatedEnd = new Date(startDate);
    const targetDay = startDate.getDate();
    calculatedEnd.setMonth(calculatedEnd.getMonth() + durationMonths);
    if (calculatedEnd.getDate() !== targetDay) {
      calculatedEnd.setDate(0);
    }

    const finalStartDate = startDate.toISOString();
    const finalEndDate = calculatedEnd.toISOString();
    const nowIso = now.toISOString();

    if (latestExisting?.GymCustomerMembershipPlanId) {
      await supabase
        .from("gym_customer_membership_plans")
        .update({
          planId: planInfo.planId,
          gymId: resolvedGymId,
          customAmount: planInfo.price || 0,
          startDate: finalStartDate,
          endDate: finalEndDate,
          is_Active: true,
          updatedAt: nowIso,
        })
        .eq("GymCustomerMembershipPlanId", latestExisting.GymCustomerMembershipPlanId);
    } else {
      await supabase.from("gym_customer_membership_plans").insert([
        {
          GymCustomerMembershipPlanId: crypto.randomUUID(),
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          planId: planInfo.planId,
          customAmount: planInfo.price || 0,
          startDate: finalStartDate,
          endDate: finalEndDate,
          createdBy: user.id,
          is_Active: true,
          is_deleted: false,
          createdAt: nowIso,
          updatedAt: nowIso,
        },
      ]);
    }

    try {
      await supabase.from("customer_gym_payments").insert([
        {
          customerPaymentId: crypto.randomUUID(),
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          planId: planInfo.planId,
          amountPaid: Number(planInfo.price) || 0,
          paymentMethod: "CARD",
          status: "SUCCESSFUL",
          transactionId: paymentId,
          notes: `Razorpay Order: ${orderId} | Verified on recovery`,
          is_deleted: false,
          createdAt: nowIso,
          updatedAt: nowIso,
        },
      ]);

      const { data: ownerRecord } = await supabase
        .from("gym_owners")
        .select("gymOwnerId")
        .eq("gymId", resolvedGymId)
        .eq("is_deleted", false)
        .limit(1)
        .maybeSingle();

      if (ownerRecord?.gymOwnerId) {
        await supabase.from("gym_payments").insert([
          {
            gymPaymentId: crypto.randomUUID(),
            customerId: resolvedCustomerId,
            gymId: resolvedGymId,
            planId: planInfo.planId,
            paymentMethod: "qrscan",
            amountPaid: Number(planInfo.price) || 0,
            paymentDate: now.toISOString().split("T")[0],
            paymentTime: now.toTimeString().substring(0, 5),
            transactionId: paymentId,
            notes: `Razorpay Online Payment (Order: ${orderId})`,
            paymentTakenBy: ownerRecord.gymOwnerId,
            is_deleted: false,
            createdAt: nowIso,
            updatedAt: nowIso,
          },
        ]);
      }
    } catch (paymentErr) {
      console.error("Failed to insert recovery payment logs:", paymentErr);
    }

    revalidatePath("/customer");
    revalidatePath("/owner");
    revalidatePath("/owner/payments");
    revalidatePath("/owner/finance");

    return {
      success: true,
      status: "paid",
      planName: planInfo.planName,
      paymentId,
    };
  } catch (err: any) {
    console.error("Error in checkAndVerifyOrderStatus:", err);
    return { success: false, status: "error", error: err.message || "Failed to check order status" };
  }
}
