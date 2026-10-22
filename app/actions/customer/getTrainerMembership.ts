"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export interface TrainerMembershipData {
  hasTrainer: boolean;
  status: "active" | "expired" | "pending" | "none";
  trainerName: string;
  specialization: string;
  trainerPrice: number;
  trainerId?: string;
  individualCustomerTrainerId?: string;
  daysLeft: number;
  progressPercentage: number;
  assignedOn?: string | null;
  expiryOn?: string | null;
  renewalOn?: string | null;
  weekDays?: string[];
  timings?: string;
  trainerPhone?: string | null;
  trainerEmail?: string | null;
  profilePic?: string | null;
  latestPayment?: {
    amountPaid: number;
    paymentMode: string;
    transactionId?: string | null;
    status: string;
    createdAt?: string;
  } | null;
}

export async function getTrainerMembership(): Promise<TrainerMembershipData> {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serverClient = await createClient();
  const db = serviceRoleKey
    ? createAdminClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    : serverClient;

  const {
    data: { user },
  } = await serverClient.auth.getUser();

  if (!user) {
    return {
      hasTrainer: false,
      status: "none",
      trainerName: "No Trainer",
      specialization: "",
      trainerPrice: 0,
      daysLeft: 0,
      progressPercentage: 0,
    };
  }

  const { data: assignments, error: assignError } = await db
    .from("individual_customer_trainers")
    .select(`
      *,
      globalTrainer:global_trainers (
        globalTrainerId,
        fullName,
        price,
        specialization,
        experience,
        mobile,
        email
      )
    `)
    .eq("userId", user.id)
    .eq("is_deleted", false)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false });

  if (assignError) {
    console.error("[getTrainerMembership] Error fetching assignments:", assignError);
  }

  if (!assignments || assignments.length === 0) {
    return {
      hasTrainer: false,
      status: "none",
      trainerName: "No Trainer Assigned",
      specialization: "",
      trainerPrice: 0,
      daysLeft: 0,
      progressPercentage: 0,
    };
  }

  const activeAssignment = assignments.find((a: any) => {
    const isAct = a.isActive !== false;
    const isNotExp = a.expiryOn ? new Date(a.expiryOn).getTime() > Date.now() : true;
    return isAct && isNotExp && a.status === "approved";
  });

  const latest = activeAssignment || assignments[0];
  const trainer = latest.globalTrainer;

  const { data: paymentRecords } = await db
    .from("individual_customer_trainer_payments")
    .select("amountPaid, paymentMode, transactionId, status, createdAt")
    .eq("userId", user.id)
    .eq("globalTrainerId", latest.globalTrainerId)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false })
    .limit(1);

  const latestPayment = paymentRecords?.[0] || null;

  const now = new Date();
  const expiryDate = latest.expiryOn ? new Date(latest.expiryOn) : null;
  const isExpired = expiryDate ? expiryDate.getTime() <= now.getTime() : false;

  let daysLeft = 0;
  let progressPercentage = 0;

  if (expiryDate) {
    const diffTime = expiryDate.getTime() - now.getTime();
    daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    if (latest.assignedOn) {
      const startDate = new Date(latest.assignedOn);
      const totalSpan = expiryDate.getTime() - startDate.getTime();
      const totalDays = Math.max(1, Math.ceil(totalSpan / (1000 * 60 * 60 * 24)));
      progressPercentage = Math.min(100, Math.max(0, (daysLeft / totalDays) * 100));
    }
  }

  let finalStatus: "active" | "expired" | "pending" | "none" = "none";
  if (latest.status === "pending") {
    finalStatus = "pending";
  } else if (isExpired || latest.isActive === false) {
    finalStatus = "expired";
  } else if (latest.status === "approved") {
    finalStatus = "active";
  }

  const photo = null;

  return {
    hasTrainer: true,
    status: finalStatus,
    trainerName: trainer?.fullName || "Personal Trainer",
    specialization: trainer?.specialization || "Fitness Coach",
    trainerPrice: Number(trainer?.price) || 0,
    trainerId: latest.globalTrainerId,
    individualCustomerTrainerId: latest.individualCustomerTrainerId,
    daysLeft,
    progressPercentage,
    assignedOn: latest.assignedOn,
    expiryOn: latest.expiryOn,
    renewalOn: latest.renewalOn,
    weekDays: latest.weekDays || [],
    timings: latest.timings || "",
    trainerPhone: trainer?.mobile || null,
    trainerEmail: trainer?.email || null,
    profilePic: photo,
    latestPayment,
  };
}
