"use server";

import { createClient } from "@/app/api/supabase/server";

export async function getAvailablePlans(gymId: string) {
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, durationMonths, price")
    .eq("gymId", gymId)
    .eq("is_Active", true)
    .eq("is_deleted", false)
    .order("price", { ascending: true });

  return plans || [];
}
