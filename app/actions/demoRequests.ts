"use server";

import {
  getDemoBookingsClient,
  cancelDemoBookingSchedule,
} from "@/lib/helpers/demoBookings/demoBookingsHelper";
import {
  DemoBookingHistoryItem,
  DemoRequestItem,
  DemoRequestsStats,
  GetDemoRequestsFilters,
  mapUiStatusToDb,
  parseDateToIso,
  parseTimeToIso,
  mapDbRowToDemoRequestItem,
} from "./demoRequestsHelpers";

export type {
  DemoBookingHistoryItem,
  DemoRequestItem,
  DemoRequestsStats,
  GetDemoRequestsFilters,
};

export async function getDemoRequestsAction(filters?: GetDemoRequestsFilters): Promise<{
  success: boolean;
  data: DemoRequestItem[];
  stats: DemoRequestsStats;
  error?: string;
}> {
  try {
    const client = getDemoBookingsClient();

    let query = client
      .from("demo_bookings")
      .select("*, subscriptions(*), demo_bookings_history(*)");

    if (filters?.status && filters.status !== "all") {
      const dbStatus = mapUiStatusToDb(filters.status as any);
      query = query.eq("status", dbStatus);
    }

    if (filters?.dateRange && filters.dateRange !== "all_time") {
      const now = new Date();
      let days = 0;
      if (filters.dateRange === "last_7_days") days = 7;
      else if (filters.dateRange === "last_30_days") days = 30;
      else if (filters.dateRange === "last_90_days") days = 90;

      if (days > 0) {
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte("createdAt", cutoff);
      }
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.trim();
      query = query.or(
        `name.ilike.%${q}%,gymName.ilike.%${q}%,gymCity.ilike.%${q}%,mobile.ilike.%${q}%,requirement.ilike.%${q}%`
      );
    }

    query = query.order("createdAt", { ascending: false });

    const { data: dbBookings, error: bookingsError } = await query;

    if (bookingsError) {
      return {
        success: false,
        data: [],
        stats: { total: 0, pendingRequests: 0, newRequests: 0, demoScheduled: 0, contacted: 0, converted: 0, notInterested: 0 },
        error: bookingsError.message,
      };
    }

    const { data: dbUsers } = await client
      .from("users")
      .select("userId, name, email, phone, role");

    let liveItems: DemoRequestItem[] = (dbBookings || []).map((row: any) =>
      mapDbRowToDemoRequestItem(row, dbUsers || undefined)
    );

    if (filters?.plan && filters.plan !== "all") {
      liveItems = liveItems.filter(
        (i) => i.plan.toLowerCase() === filters.plan!.toLowerCase()
      );
    }

    const { data: allStatuses } = await client.from("demo_bookings").select("status");
    let stats: DemoRequestsStats = {
      total: 0,
      pendingRequests: 0,
      newRequests: 0,
      demoScheduled: 0,
      contacted: 0,
      converted: 0,
      notInterested: 0,
    };

    if (allStatuses && allStatuses.length > 0) {
      const total = allStatuses.length;
      const pending = allStatuses.filter(
        (s: any) => !s.status || s.status.toLowerCase() === "pending"
      ).length;
      const scheduled = allStatuses.filter(
        (s: any) =>
          s.status &&
          (s.status.toLowerCase() === "demoscheduled" || s.status.toLowerCase() === "scheduled")
      ).length;
      const contacted = allStatuses.filter(
        (s: any) => s.status && s.status.toLowerCase() === "contacted"
      ).length;
      const converted = allStatuses.filter(
        (s: any) => s.status && s.status.toLowerCase() === "converted"
      ).length;
      const notInterested = allStatuses.filter(
        (s: any) =>
          s.status &&
          (s.status.toLowerCase() === "notinterested" || s.status.toLowerCase() === "not interested")
      ).length;

      stats = {
        total,
        pendingRequests: pending,
        newRequests: pending,
        demoScheduled: scheduled,
        contacted,
        converted,
        notInterested,
      };
    }

    return { success: true, data: liveItems, stats };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      stats: { total: 0, pendingRequests: 0, newRequests: 0, demoScheduled: 0, contacted: 0, converted: 0, notInterested: 0 },
      error: err?.message || "Failed to fetch demo requests.",
    };
  }
}

export async function updateDemoRequestStatusAction(
  id: string,
  newStatus: DemoRequestItem["status"]
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getDemoBookingsClient();
    const dbStatus = mapUiStatusToDb(newStatus);

    const { error } = await client
      .from("demo_bookings")
      .update({ status: dbStatus, updatedAt: new Date().toISOString() })
      .eq("demoBookingId", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update status." };
  }
}

export async function getDemoRequestByIdAction(id: string): Promise<{
  success: boolean;
  data?: DemoRequestItem;
  error?: string;
}> {
  try {
    const res = await getDemoRequestsAction();
    if (!res.success || !res.data) return { success: false, error: "Not found" };
    const found = res.data.find((item) => item.id === id);
    if (!found) return { success: false, error: "Demo request not found." };
    return { success: true, data: found };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to fetch request." };
  }
}

export async function scheduleDemoAction(
  id: string,
  demoDate: string,
  demoTime: string,
  userId?: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getDemoBookingsClient();

    const isoDate = parseDateToIso(demoDate);
    if (!isoDate) {
      return { success: false, error: "Please enter a valid demo date." };
    }

    const isoTime = parseTimeToIso(demoTime) || "11:00:00";

    const { data: existingRows } = await client
      .from("demo_bookings_history")
      .select("demoBookingHistoryId, rescheduleDate, rescheduleTime")
      .eq("demoBookingId", id)
      .is("deletedAt", null)
      .order("createdAt", { ascending: false })
      .limit(1);

    const existing = existingRows?.[0];

    let finalUserId = userId || null;
    if (!finalUserId) {
      const { data: superadmin } = await client
        .from("users")
        .select("userId")
        .eq("role", "superadmin")
        .limit(1)
        .maybeSingle();
      finalUserId = superadmin?.userId || null;
    }

    const now = new Date().toISOString();

    if (existing) {
      const prevDate = existing.rescheduleDate || null;
      const prevTime = existing.rescheduleTime || null;

      const { error: updateError } = await client
        .from("demo_bookings_history")
        .update({
          rescheduleDate: isoDate,
          rescheduleTime: isoTime,
          previousDate: prevDate,
          previousTime: prevTime,
          status: null,
          notes: null,
          reason: null,
          createdBy: finalUserId,
          updatedAt: now,
        })
        .eq("demoBookingHistoryId", existing.demoBookingHistoryId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const demoBookingHistoryId = crypto.randomUUID();
      const payload = {
        demoBookingHistoryId,
        demoBookingId: id,
        rescheduleDate: isoDate,
        rescheduleTime: isoTime,
        previousDate: null,
        previousTime: null,
        status: null,
        notes: null,
        reason: null,
        createdBy: finalUserId,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };

      const { error: insertError } = await client
        .from("demo_bookings_history")
        .insert(payload);

      if (insertError) {
        return { success: false, error: insertError.message };
      }
    }

    await client
      .from("demo_bookings")
      .update({ updatedAt: now })
      .eq("demoBookingId", id);

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to schedule demo." };
  }
}

export async function cancelDemoScheduleAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    return await cancelDemoBookingSchedule(id);
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to cancel schedule." };
  }
}
