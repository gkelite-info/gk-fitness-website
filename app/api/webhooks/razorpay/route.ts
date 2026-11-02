import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { calculatePlanExpiryDate } from "@/lib/planCalculations";
import { getRazorpayCredentials } from "@/lib/helpers/razorpay/razorpayServer";

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
      const customerId = notes?.customerId;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (serviceKey && (customerId || planId)) {
        const supabase = createAdminClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false },
        });

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

