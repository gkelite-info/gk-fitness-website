import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";

export type GymRole =
  | "owner"
  | "trainer"
  | "customer"
  | "globaltrainer"
  | "globalcustomer"
  | "superadmin";

export interface CreateDemoBookingParams {
  name: string;
  email?: string | null;
  gymName: string;
  gymCity: string;
  mobile: string;
  gymRole?: GymRole | string | null;
  memberCount?: string | null;
  requirement?: string | null;
  subscriptionPlanId?: string | null;
}

export interface DemoBookingRecord {
  demoBookingId: string;
  name: string;
  gymName: string;
  gymCity: string;
  mobile: string;
  memberCount: string | null;
  requirement: string | null;
  subscriptionPlanId: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export function getDemoBookingsClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return anonSupabase;
}

export async function createDemoBooking(params: CreateDemoBookingParams): Promise<{
  success: boolean;
  data?: DemoBookingRecord;
  error?: string;
}> {
  try {
    const client = getDemoBookingsClient();
    const demoBookingId = crypto.randomUUID();
    const now = new Date().toISOString();

    const requirementParts = [
      params.email ? `Email: ${params.email.trim()}` : null,
      params.requirement ? params.requirement.trim() : null,
    ].filter(Boolean);

    const requirementText = requirementParts.join(" | ");

    const payload = {
      demoBookingId,
      name: params.name.trim(),
      gymName: params.gymName.trim(),
      gymCity: params.gymCity.trim(),
      mobile: params.mobile.trim(),
      memberCount: params.memberCount ? params.memberCount.trim() : null,
      requirement: requirementText ? requirementText.slice(0, 255) : null,
      subscriptionPlanId: params.subscriptionPlanId || null,
      isCompleted: false,
      createdAt: now,
      updatedAt: now,
    };

    const { data, error } = await client
      .from("demo_bookings")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[demoBookingsHelper] createDemoBooking error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as DemoBookingRecord };
  } catch (err: any) {
    console.error("[demoBookingsHelper] Unexpected error:", err);
    return {
      success: false,
      error: err?.message || "Failed to create demo booking",
    };
  }
}

export async function fetchDemoBookings(limit: number = 50): Promise<{
  success: boolean;
  data: DemoBookingRecord[];
  error?: string;
}> {
  try {
    const client = getDemoBookingsClient();
    const { data, error } = await client
      .from("demo_bookings")
      .select("*")
      .order("createdAt", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[demoBookingsHelper] fetchDemoBookings error:", error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: (data || []) as DemoBookingRecord[] };
  } catch (err: any) {
    console.error("[demoBookingsHelper] Unexpected error:", err);
    return {
      success: false,
      data: [],
      error: err?.message || "Failed to fetch demo bookings",
    };
  }
}
