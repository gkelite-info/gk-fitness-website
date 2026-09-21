"use server";

import { createClient } from "@/app/api/supabase/server";

export async function getOwnerGymId(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_owners")
    .select("gymId")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error("Error fetching owner gymId:", error);
    return null;
  }
  return data?.gymId;
}

export async function getGymCustomers(gymId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_customers")
    .select("*")
    .eq("gymId", gymId)
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching gym customers:", error);
    return [];
  }
  return data || [];
}

export async function getGymAttendanceToday(gymId: string, dateStr: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_attendance")
    .select("*")
    .eq("gymId", gymId)
    .eq("date", dateStr);

  if (error) {
    console.error("Error fetching gym attendance:", error);
    return [];
  }
  return data || [];
}

export async function getGymPayments(userId: string) {
  const gymId = await getOwnerGymId(userId);
  if (!gymId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_payments")
    .select("*")
    .eq("gymId", gymId)
    .order("paymentDate", { ascending: false });

  if (error) {
    console.error("Error fetching gym payments:", error);
    return [];
  }
  return data || [];
}

export async function getGymCustomerMembershipPlans(userId: string) {
  const gymId = await getOwnerGymId(userId);
  if (!gymId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_customer_membership_plans")
    .select("*, customer:gym_customers(*), plan:gym_membership_plans(*)")
    .eq("gymId", gymId)
    .eq("is_deleted", false);

  if (error) {
    console.error("Error fetching gym customer membership plans:", error);
    return [];
  }
  return data || [];
}

export async function getCustomerTrainersByGym(gymId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customer_trainers")
    .select("*")
    .eq("gymId", gymId)
    .eq("is_deleted", false);

  if (error) {
    console.error("Error fetching customer trainers:", error);
    return [];
  }
  return data || [];
}

export async function getGymTrainers(gymId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gym_trainers")
    .select("*")
    .eq("gymId", gymId)
    .eq("is_deleted", false);

  if (error) {
    console.error("Error fetching gym trainers:", error);
    return [];
  }
  return data || [];
}
