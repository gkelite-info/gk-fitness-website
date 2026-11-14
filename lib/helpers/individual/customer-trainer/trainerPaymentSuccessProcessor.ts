import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeIndividualPaymentMode } from "@/lib/helpers/individual/individualCustomerPayments";

export interface ProcessTrainerPaymentParams {
  db: SupabaseClient;
  userId: string;
  trainerId: string;
  amount?: number;
  paymentId?: string;
  subscriptionId?: string | null;
  paymentMode?: string;
}

export async function processTrainerPaymentSuccess({
  db,
  userId,
  trainerId,
  amount,
  paymentId,
  subscriptionId,
  paymentMode = "upi",
}: ProcessTrainerPaymentParams) {
  const { data: trainer } = await db
    .from("global_trainers")
    .select("globalTrainerId, fullName, price")
    .eq("globalTrainerId", trainerId)
    .maybeSingle();

  const finalAmount = Number(amount) > 0 ? Number(amount) : Number(trainer?.price) || 0;
  const now = new Date();
  const nowIso = now.toISOString();

  const oneMonthLater = new Date(now);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  const expiryIso = oneMonthLater.toISOString();

  const normalizedMode = normalizeIndividualPaymentMode(paymentMode);
  const resolvedPaymentId = paymentId || (subscriptionId ? `pay_sub_${subscriptionId}` : `pay_${Date.now()}`);

  const paymentRecord: Record<string, any> = {
    individualCustomerPaymentId: crypto.randomUUID(),
    userId,
    globalTrainerId: trainerId,
    paymentMode: normalizedMode,
    amountPaid: finalAmount,
    transactionId: subscriptionId || resolvedPaymentId,
    status: "successful",
    deletedAt: null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const { error: insertPayErr } = await db
    .from("individual_customer_trainer_payments")
    .insert([paymentRecord]);

  if (insertPayErr && (insertPayErr.message?.includes("enum") || insertPayErr.message?.includes("check"))) {
    paymentRecord.paymentMode = "upi";
    await db.from("individual_customer_trainer_payments").insert([paymentRecord]);
  }

  const { data: existingAssignment } = await db
    .from("individual_customer_trainers")
    .select("individualCustomerTrainerId")
    .eq("userId", userId)
    .eq("globalTrainerId", trainerId)
    .eq("is_deleted", false)
    .maybeSingle();

  if (existingAssignment?.individualCustomerTrainerId) {
    await db
      .from("individual_customer_trainers")
      .update({
        assignedOn: nowIso,
        renewalOn: expiryIso,
        expiryOn: expiryIso,
        status: "approved",
        isActive: true,
        is_deleted: false,
        deletedAt: null,
        updatedAt: nowIso,
      })
      .eq("individualCustomerTrainerId", existingAssignment.individualCustomerTrainerId);
  } else {
    await db
      .from("individual_customer_trainers")
      .insert([{
        individualCustomerTrainerId: crypto.randomUUID(),
        userId,
        globalTrainerId: trainerId,
        assignedOn: nowIso,
        renewalOn: expiryIso,
        expiryOn: expiryIso,
        status: "approved",
        isActive: true,
        weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        timings: "06:00 AM - 07:00 AM",
        is_deleted: false,
        deletedAt: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);
  }

  await db
    .from("individual_customer_trainers")
    .update({ isActive: false, updatedAt: nowIso })
    .eq("userId", userId)
    .neq("globalTrainerId", trainerId)
    .eq("is_deleted", false);

  return {
    success: true,
    trainerName: trainer?.fullName || "Personal Trainer",
    paymentId: resolvedPaymentId,
  };
}
