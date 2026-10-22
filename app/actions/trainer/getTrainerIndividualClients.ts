"use server";

import { createClient } from "@/app/api/supabase/server";

export interface TrainerClientMembership {
  individualCustomerTrainerId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  profilePhoto?: string | null;
  assignedOn?: string | null;
  expiryOn?: string | null;
  renewalOn?: string | null;
  weekDays: string[];
  timings: string;
  status: "active" | "expired" | "pending";
  daysLeft: number;
  isExpiringSoon: boolean;
  trainerPrice: number;
  lastPayment?: {
    amountPaid: number;
    paymentMode: string;
    transactionId?: string | null;
    status: string;
    createdAt?: string;
  } | null;
}

export interface TrainerClientsResponse {
  clients: TrainerClientMembership[];
  stats: {
    totalClients: number;
    activeCount: number;
    expiringSoonCount: number;
    totalEarnings: number;
  };
}

export async function getTrainerIndividualClients(
  statusFilter: "all" | "active" | "expiring" | "pending" | "expired" = "all",
  searchQuery?: string
): Promise<TrainerClientsResponse> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      clients: [],
      stats: { totalClients: 0, activeCount: 0, expiringSoonCount: 0, totalEarnings: 0 },
    };
  }

  const { data: userRec } = await supabase
    .from("users")
    .select("userId, role, email")
    .eq("userId", user.id)
    .maybeSingle();

  const isSuperadmin = userRec?.role === "superadmin";

  let globalTrainerId: string | null = null;
  const { data: gtRecord } = await supabase
    .from("global_trainers")
    .select("globalTrainerId, price, fullName")
    .or(`userId.eq.${user.id},email.eq.${user.email}`)
    .maybeSingle();

  if (gtRecord) {
    globalTrainerId = gtRecord.globalTrainerId;
  }

  let query = supabase
    .from("individual_customer_trainers")
    .select(`
      *,
      user:users!individual_customer_trainers_userId_fkey (
        userId,
        name,
        email,
        phone,
        profilePhoto
      ),
      trainer:global_trainers!individual_customer_trainers_globalTrainerId_fkey (
        globalTrainerId,
        fullName,
        price
      )
    `)
    .eq("is_deleted", false)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false });

  if (!isSuperadmin && globalTrainerId) {
    query = query.eq("globalTrainerId", globalTrainerId);
  }

  const { data: records, error } = await query;

  if (error || !records) {
    console.error("[getTrainerIndividualClients] Query error:", error);
    return {
      clients: [],
      stats: { totalClients: 0, activeCount: 0, expiringSoonCount: 0, totalEarnings: 0 },
    };
  }

  const userIds = records.map((r: any) => r.userId);
  let paymentsMap: Record<string, any> = {};

  if (userIds.length > 0) {
    const { data: payments } = await supabase
      .from("individual_customer_trainer_payments")
      .select("userId, amountPaid, paymentMode, transactionId, status, createdAt")
      .in("userId", userIds)
      .is("deletedAt", null)
      .order("createdAt", { ascending: false });

    if (payments) {
      payments.forEach((p: any) => {
        if (!paymentsMap[p.userId]) {
          paymentsMap[p.userId] = p;
        }
      });
    }
  }

  const now = new Date();
  let totalEarnings = 0;
  let activeCount = 0;
  let expiringSoonCount = 0;

  const mapped: TrainerClientMembership[] = records.map((rec: any) => {
    const expiryDate = rec.expiryOn ? new Date(rec.expiryOn) : null;
    const isExpired = expiryDate ? expiryDate.getTime() <= now.getTime() : false;

    let daysLeft = 0;
    if (expiryDate) {
      const diffTime = expiryDate.getTime() - now.getTime();
      daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;
    let computedStatus: "active" | "expired" | "pending" = "active";

    if (rec.status === "pending") {
      computedStatus = "pending";
    } else if (isExpired || rec.isActive === false) {
      computedStatus = "expired";
    } else if (rec.status === "approved" || rec.isActive) {
      computedStatus = "active";
    }

    if (computedStatus === "active") activeCount++;
    if (isExpiringSoon && computedStatus === "active") expiringSoonCount++;

    const lastPayment = paymentsMap[rec.userId] || null;
    const trainerFee = Number(rec.trainer?.price) || Number(lastPayment?.amountPaid) || 0;
    if (lastPayment?.amountPaid) {
      totalEarnings += Number(lastPayment.amountPaid);
    }

    return {
      individualCustomerTrainerId: rec.individualCustomerTrainerId,
      userId: rec.userId,
      customerName: rec.user?.name || "Customer",
      customerEmail: rec.user?.email || "",
      customerPhone: rec.user?.phone || "",
      profilePhoto: rec.user?.profilePhoto || null,
      assignedOn: rec.assignedOn,
      expiryOn: rec.expiryOn,
      renewalOn: rec.renewalOn,
      weekDays: rec.weekDays || [],
      timings: rec.timings || "Flexible",
      status: computedStatus,
      daysLeft,
      isExpiringSoon,
      trainerPrice: trainerFee,
      lastPayment,
    };
  });

  let filtered = mapped;

  if (statusFilter === "active") {
    filtered = filtered.filter((c) => c.status === "active");
  } else if (statusFilter === "expiring") {
    filtered = filtered.filter((c) => c.isExpiringSoon && c.status === "active");
  } else if (statusFilter === "pending") {
    filtered = filtered.filter((c) => c.status === "pending");
  } else if (statusFilter === "expired") {
    filtered = filtered.filter((c) => c.status === "expired");
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (c) =>
        c.customerName.toLowerCase().includes(q) ||
        c.customerEmail.toLowerCase().includes(q) ||
        c.customerPhone.includes(q)
    );
  }

  return {
    clients: filtered,
    stats: {
      totalClients: records.length,
      activeCount,
      expiringSoonCount,
      totalEarnings,
    },
  };
}
