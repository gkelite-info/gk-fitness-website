import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { calculatePlanExpiryDate } from "@/lib/planCalculations";
import { processIndividualPlanPayment } from "@/lib/helpers/individual/membership/individualPlanPaymentProcessor";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("[Razorpay Webhook] Invalid signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);
    const eventType = event?.event;

    const handledEvents = [
      "subscription.charged",
      "subscription.activated",
      "subscription.authenticated",
      "payment.captured",
      "order.paid",
    ];

    if (!handledEvents.includes(eventType)) {
      return NextResponse.json({ status: "ignored" });
    }

    const subEntity = event?.payload?.subscription?.entity;
    const paymentEntity = event?.payload?.payment?.entity;
    const orderEntity = event?.payload?.order?.entity;

    const subscriptionId = subEntity?.id || paymentEntity?.subscription_id;
    const paymentId = paymentEntity?.id || (subscriptionId ? `pay_sub_${subscriptionId}` : `pay_${Date.now()}`);
    const notes = subEntity?.notes || paymentEntity?.notes || orderEntity?.notes || {};

    const planId = notes?.planId;
    const customerId = notes?.customerId || notes?.userId;
    const isTrainerFee = notes?.paymentType === "trainerfee" || Boolean(notes?.trainerId);
    const trainerId = notes?.trainerId;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceKey && customerId) {
      const supabase = createAdminClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });

      if (isTrainerFee && trainerId) {
        const { data: trainerAssignment } = await supabase
          .from("individual_customer_trainers")
          .select("individualCustomerTrainerId, expiryOn, renewalOn")
          .eq("userId", customerId)
          .eq("globalTrainerId", trainerId)
          .eq("is_deleted", false)
          .order("createdAt", { ascending: false })
          .limit(1)
          .maybeSingle();

        const now = new Date();
        const baseDate = trainerAssignment?.expiryOn
          ? new Date(trainerAssignment.expiryOn)
          : now;
        const nextExpiry = new Date(baseDate.getTime() > now.getTime() ? baseDate : now);
        nextExpiry.setMonth(nextExpiry.getMonth() + 1);
        const nextExpiryIso = nextExpiry.toISOString();
        const nowIso = now.toISOString();

        if (trainerAssignment?.individualCustomerTrainerId) {
          await supabase
            .from("individual_customer_trainers")
            .update({
              expiryOn: nextExpiryIso,
              renewalOn: nextExpiryIso,
              isActive: true,
              status: "approved",
              updatedAt: nowIso,
            })
            .eq("individualCustomerTrainerId", trainerAssignment.individualCustomerTrainerId);
        }

        const amountPaid = paymentEntity?.amount
          ? paymentEntity.amount / 100
          : Number(notes?.price || 0);

        const { error: webhookPayErr } = await supabase
          .from("individual_customer_trainer_payments")
          .insert([{
            individualCustomerPaymentId: crypto.randomUUID(),
            userId: customerId,
            globalTrainerId: trainerId,
            paymentMode: "upi",
            amountPaid: amountPaid,
            transactionId: paymentId || subscriptionId,
            status: "successful",
            deletedAt: null,
            createdAt: nowIso,
            updatedAt: nowIso,
          }]);

        if (webhookPayErr) {
          console.error("[Razorpay Webhook] Trainer payment record note:", webhookPayErr.message);
        }

        return NextResponse.json({ status: "ok", type: "trainer_fee_processed" });
      }

      if (planId) {
        const { data: subPlan } = await supabase
          .from("subscriptions")
          .select("subscriptionPlanId, planName, price")
          .eq("subscriptionPlanId", planId)
          .maybeSingle();

        const { data: userRec } = await supabase
          .from("users")
          .select("userId, role")
          .eq("userId", customerId)
          .maybeSingle();

        const isIndividual = userRec?.role === "individual" || Boolean(subPlan) || !notes?.gymId;

        if (isIndividual && subPlan) {
          await processIndividualPlanPayment({
            dbClient: supabase,
            userId: customerId,
            planId: subPlan.subscriptionPlanId,
            paymentId,
            rzpPaymentAmount: paymentEntity?.amount,
            normalizedMode: normalizeIndividualPaymentMode(paymentEntity?.method || "upi"),
            subscriptionId: subscriptionId || undefined,
            isAutoPay: Boolean(subscriptionId),
          });
          return NextResponse.json({ status: "ok", type: "individual_plan_processed" });
        }

        if (notes?.gymId) {
          await executeMembershipPaymentSuccess({
            supabase,
            customerId,
            gymId: notes.gymId,
            planId,
            customerUserId: userRec?.userId || customerId,
            gatewayPaymentId: paymentId,
            gatewayOrderId: subscriptionId || paymentEntity?.order_id || orderEntity?.id,
            paymentMethod: "AutoPay",
            upiId: paymentEntity?.vpa || null,
            amountPaidOverride: paymentEntity?.amount ? paymentEntity.amount / 100 : undefined,
          });
          return NextResponse.json({ status: "ok", type: "gym_plan_processed" });
        }
      }

      const { data: indivPlan } = await supabase
        .from("individual_customer_plans")
        .select("*")
        .eq("userId", customerId)
        .is("deletedAt", null)
        .order("createdAt", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (indivPlan) {
        const currentEnd = indivPlan.endDate || new Date().toISOString();
        const newEndDate = calculatePlanExpiryDate(currentEnd, 1);

        await supabase
          .from("individual_customer_plans")
          .update({
            endDate: new Date(newEndDate).toISOString(),
            isActive: true,
            status: "successful",
            transactionId: paymentId || subscriptionId,
            updatedAt: new Date().toISOString(),
          })
          .eq("individualCustomerPlanId", indivPlan.individualCustomerPlanId);
      } else {
        const { data: gymCustPlan } = await supabase
          .from("gym_customer_membership_plans")
          .select("*")
          .eq("customerId", customerId)
          .eq("is_deleted", false)
          .order("createdAt", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (gymCustPlan) {
          const currentEnd = gymCustPlan.endDate || new Date().toISOString();
          const newEndDate = calculatePlanExpiryDate(currentEnd, 1);

          await supabase
            .from("gym_customer_membership_plans")
            .update({
              endDate: new Date(newEndDate).toISOString(),
              is_Active: true,
              isActive: true,
              updatedAt: new Date().toISOString(),
            })
            .eq("GymCustomerMembershipPlanId", gymCustPlan.GymCustomerMembershipPlanId);
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("[Razorpay Webhook Error]:", error);
    return NextResponse.json({ error: error.message || "Webhook error" }, { status: 500 });
  }
}
