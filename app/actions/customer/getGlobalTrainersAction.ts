"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function getGlobalTrainersAction(searchQuery?: string) {
  try {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";

    const client = serviceRoleKey
      ? createAdminClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
      : await createClient();

    let query = client
      .from("global_trainers")
      .select("*")
      .eq("is_deleted", false)
      .eq("isActive", true)
      .order("createdAt", { ascending: false });

    if (searchQuery?.trim()) {
      const q = searchQuery.trim();
      query = query.or(`fullName.ilike.%${q}%,email.ilike.%${q}%,mobile.ilike.%${q}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("[getGlobalTrainersAction] Error:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("[getGlobalTrainersAction] Unexpected error:", err);
    return [];
  }
}
