import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";

<<<<<<< Updated upstream
export type GymRole =
  | "owner"
  | "trainer"
  | "customer"
  | "globaltrainer"
  | "individual"
  | "superadmin";
=======
export type GymRole = "owner" | "trainer" | "customer" | "globaltrainer" | "globalcustomer" | "superadmin";
export type DemoBookingStatus = "pending" | "contacted" | "demoscheduled" | "converted" | "notinterested";
>>>>>>> Stashed changes

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
  status?: DemoBookingStatus;
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
  status: DemoBookingStatus;
  createdAt: string;
  updatedAt: string;
  demo_bookings_history?: DemoBookingHistoryRecord[];
}

export interface DemoBookingHistoryRecord {
  demoBookingHistoryId: string;
  demoBookingId: string;
  rescheduleDate: string | null;
  rescheduleTime: string | null;
  previousDate: string | null;
  previousTime: string | null;
  status: string | null;
  notes: string | null;
  reason: string | null;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateDemoBookingHistoryParams {
  demoBookingId: string;
  rescheduleDate?: string | null;
  rescheduleTime?: string | null;
  previousDate?: string | null;
  previousTime?: string | null;
  status?: string | null;
  notes?: string | null;
  reason?: string | null;
  createdBy?: string | null;
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
      status: params.status || "pending",
      createdAt: now,
      updatedAt: now,
    };

    const cleanMobile = params.mobile.replace(/\D/g, "");
    const cleanEmail = params.email?.trim().toLowerCase() || `${cleanMobile}@gkgymlife.com`;
    const cleanName = params.name.trim();

    try {
      const { data: existingUser } = await client
        .from("users")
        .select("userId, email, phone")
        .or(`email.eq.${cleanEmail},phone.eq.${cleanMobile}`)
        .maybeSingle();

      if (!existingUser) {
        const newUserId = crypto.randomUUID();
        const userRole = params.gymRole === "owner" ? "owner" : "customer";
        await client.from("users").insert({
          userId: newUserId,
          name: cleanName,
          email: cleanEmail,
          phone: cleanMobile,
          city: params.gymCity.trim(),
          role: userRole,
          status: "active",
          isEmailVerified: false,
          isPhoneVerified: false,
          createdAt: now,
          updatedAt: now,
          gender: "male",
        });
      }
    } catch (uErr) {
      console.warn("[createDemoBooking] Users table sync warning:", uErr);
    }

    const { data, error } = await client
      .from("demo_bookings")
      .insert(payload)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data as DemoBookingRecord };
  } catch (err: any) {
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
      .select("*, subscriptions(*), demo_bookings_history(*)")
      .order("createdAt", { ascending: false })
      .limit(limit);

    if (error) {
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: (data || []) as DemoBookingRecord[] };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      error: err?.message || "Failed to fetch demo bookings",
    };
  }
}

export async function updateDemoBookingStatus(
  demoBookingId: string,
  status: DemoBookingStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getDemoBookingsClient();
    const { error } = await client
      .from("demo_bookings")
      .update({
        status,
        updatedAt: new Date().toISOString(),
      })
      .eq("demoBookingId", demoBookingId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to update demo booking status",
    };
  }
}

export async function createDemoBookingHistory(
  params: CreateDemoBookingHistoryParams
): Promise<{ success: boolean; data?: DemoBookingHistoryRecord; error?: string }> {
  try {
    const client = getDemoBookingsClient();
    const demoBookingHistoryId = crypto.randomUUID();
    const now = new Date().toISOString();

    const payload = {
      demoBookingHistoryId,
      demoBookingId: params.demoBookingId,
      rescheduleDate: params.rescheduleDate || null,
      rescheduleTime: params.rescheduleTime || null,
      previousDate: params.previousDate || null,
      previousTime: params.previousTime || null,
      status: params.status || "rescheduled",
      notes: params.notes || null,
      reason: params.reason || null,
      createdBy: params.createdBy || null,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    const { data, error } = await client
      .from("demo_bookings_history")
      .insert(payload)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data: data as DemoBookingHistoryRecord };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to create demo booking history" };
  }
}

export async function cancelDemoBookingSchedule(
  demoBookingId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getDemoBookingsClient();
    const now = new Date().toISOString();

    await client
      .from("demo_bookings_history")
      .update({ status: "cancelled", updatedAt: now, deletedAt: now })
      .eq("demoBookingId", demoBookingId)
      .is("deletedAt", null);

    const { error } = await client
      .from("demo_bookings")
      .update({ status: "pending", updatedAt: now })
      .eq("demoBookingId", demoBookingId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to cancel schedule" };
  }
}

export async function fetchDemoBookingHistory(
  demoBookingId: string
): Promise<{ success: boolean; data: DemoBookingHistoryRecord[]; error?: string }> {
  try {
    const client = getDemoBookingsClient();
    const { data, error } = await client
      .from("demo_bookings_history")
      .select("*")
      .eq("demoBookingId", demoBookingId)
      .is("deletedAt", null)
      .order("createdAt", { ascending: false });

    if (error) return { success: false, data: [], error: error.message };
    return { success: true, data: (data || []) as DemoBookingHistoryRecord[] };
  } catch (err: any) {
    return { success: false, data: [], error: err?.message || "Failed to fetch demo booking history" };
  }
}
