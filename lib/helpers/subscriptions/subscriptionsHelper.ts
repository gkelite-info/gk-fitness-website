import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";

export interface SubscriptionFeatureRow {
  subscriptionFeatureId: string;
  subscriptionPlanId: string;
  featureName: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SubscriptionRow {
  subscriptionPlanId: string;
  planName: string;
  label: string | null;
  price: number | null;
  planFor: "gyms" | "customer" | string;
  createdBy: string;
  isActive: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  subscription_features?: SubscriptionFeatureRow[];
}

export interface DynamicSubscriptionPlan {
  id: string;
  name: string;
  label: string | null;
  price: number | null;
  planFor: "gyms" | "customer";
  features: string[];
  createdAt: string;
}

export function getSubscriptionsClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return anonSupabase;
}

export async function fetchSubscriptionPlans(planFor?: "gyms" | "customer"): Promise<{
  success: boolean;
  data: DynamicSubscriptionPlan[];
  error?: string;
}> {
  try {
    const client = getSubscriptionsClient();
    let query = client
      .from("subscriptions")
      .select("*, subscription_features(*)")
      .eq("isActive", true)
      .eq("is_deleted", false)
      .is("deletedAt", null)
      .order("price", { ascending: true, nullsFirst: false });

    if (planFor) {
      query = query.eq("planFor", planFor);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[subscriptionsHelper] fetchSubscriptionPlans error:", error);
      return { success: false, data: [], error: error.message };
    }

    const mapped: DynamicSubscriptionPlan[] = (data || []).map((row: SubscriptionRow) => {
      const activeFeatures = (row.subscription_features || [])
        .filter((f) => !f.is_deleted && !f.deletedAt)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((f) => f.featureName);

      const normalizedPlanFor =
        row.planFor === "customer" || row.planFor === "customers"
          ? "customer"
          : "gyms";

      return {
        id: row.subscriptionPlanId,
        name: row.planName,
        label: row.label,
        price: row.price,
        planFor: normalizedPlanFor,
        features: activeFeatures,
        createdAt: row.createdAt,
      };
    });

    return { success: true, data: mapped };
  } catch (err: any) {
    console.error("[subscriptionsHelper] Unexpected error:", err);
    return {
      success: false,
      data: [],
      error: err?.message || "Failed to fetch subscription plans",
    };
  }
}
