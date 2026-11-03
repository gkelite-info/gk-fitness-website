import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { calculatePlanExpiryDate } from "@/lib/planCalculations";

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

    if (eventType === "subscription.charged") {
      const subEntity = event?.payload?.subscription?.entity;
      const paymentEntity = event?.payload?.payment?.entity;

      const subscriptionId = subEntity?.id;
      const paymentId = paymentEntity?.id;
      const notes = subEntity?.notes || paymentEntity?.notes || {};
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

          await supabase
            .from("individual_customer_trainer_payments")
            .insert([{
              individualCustomerPaymentId: crypto.randomUUID(),
              userId: customerId,
              globalTrainerId: trainerId,
              paymentMode: "AutoPay",
              amountPaid: amountPaid,
              transactionId: paymentId || subscriptionId,
              status: "successful",
              createdAt: nowIso,
              updatedAt: nowIso,
            }]);

          return NextResponse.json({ status: "ok", type: "trainer_subscription_renewed" });
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
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("[Razorpay Webhook Error]:", error);
    return NextResponse.json({ error: error.message || "Webhook error" }, { status: 500 });
  }
}
