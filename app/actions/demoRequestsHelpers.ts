import { DemoBookingStatus } from "@/lib/helpers/demoBookings/demoBookingsHelper";

export interface DemoBookingHistoryItem {
  id: string;
  rescheduleDate: string | null;
  rescheduleTime: string | null;
  previousDate: string | null;
  previousTime: string | null;
  status: string | null;
  notes: string | null;
  reason: string | null;
  createdAt: string;
}

export interface DemoRequestItem {
  id: string;
  ownerName: string;
  initials: string;
  gymName: string;
  city: string;
  mobile: string;
  email: string;
  plan: string;
  planPrice?: number | null;
  subscriptionPlanId?: string | null;
  members: number;
  requestedOn: string;
  createdAtRaw: string;
  status: "Pending" | "New" | "Contacted" | "Demo Scheduled" | "Converted" | "Not Interested";
  requirement?: string | null;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  rawScheduledDate?: string | null;
  rawScheduledTime?: string | null;
  history?: DemoBookingHistoryItem[];
}

export interface DemoRequestsStats {
  total: number;
  pendingRequests: number;
  newRequests: number;
  demoScheduled: number;
  contacted: number;
  converted: number;
  notInterested: number;
}

export interface GetDemoRequestsFilters {
  search?: string;
  plan?: string;
  status?: string;
  dateRange?: string;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function parseEmailFromRequirement(req?: string | null): string {
  if (!req) return "";
  const match = req.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1].trim() : "";
}

export function parsePlanFromRequirement(req?: string | null): string {
  if (!req) return "Basic";
  const lower = req.toLowerCase();
  if (lower.includes("platinum")) return "Platinum";
  if (lower.includes("gold")) return "Gold";
  if (lower.includes("silver")) return "Silver";
  return "Basic";
}

export function mapDbStatusToUi(dbStatus?: string | null): DemoRequestItem["status"] {
  switch (dbStatus?.toLowerCase()) {
    case "demoscheduled":
    case "demo scheduled":
    case "scheduled":
      return "Demo Scheduled";
    case "contacted":
      return "Contacted";
    case "converted":
      return "Converted";
    case "notinterested":
    case "not interested":
      return "Not Interested";
    case "pending":
    default:
      return "Pending";
  }
}

export function mapUiStatusToDb(uiStatus: DemoRequestItem["status"]): DemoBookingStatus {
  switch (uiStatus) {
    case "Demo Scheduled":
      return "demoscheduled";
    case "Contacted":
      return "contacted";
    case "Converted":
      return "converted";
    case "Not Interested":
      return "notinterested";
    case "Pending":
    case "New":
    default:
      return "pending";
  }
}

export function formatDbDateToUi(dateStr?: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDbTimeToUi(timeStr?: string | null): string {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    let hours = parseInt(parts[0], 10);
    const mins = parts[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return `${String(hours).padStart(2, "0")}:${mins} ${ampm}`;
  }
  return timeStr;
}

export function parseDateToIso(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return null;
}

export function parseTimeToIso(timeStr?: string | null): string | null {
  if (!timeStr) return null;
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const mins = match[2];
    const meridiem = match[3]?.toUpperCase();
    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    if (!meridiem && hours >= 1 && hours <= 6) {
      hours += 12;
    }
    return `${String(hours).padStart(2, "0")}:${mins}:00`;
  }
  return null;
}

export function mapDbRowToDemoRequestItem(row: any, dbUsers?: any[]): DemoRequestItem {
  let email = parseEmailFromRequirement(row.requirement);

  if (!email && dbUsers && dbUsers.length > 0) {
    const rowPhoneDigits = (row.mobile || "").replace(/[^0-9]/g, "");
    const userByPhone = dbUsers.find((u: any) => {
      const uPhoneDigits = (u.phone || "").replace(/[^0-9]/g, "");
      return (
        rowPhoneDigits.length >= 8 &&
        uPhoneDigits.length >= 8 &&
        (uPhoneDigits.endsWith(rowPhoneDigits) || rowPhoneDigits.endsWith(uPhoneDigits))
      );
    });

    if (userByPhone?.email) {
      email = userByPhone.email;
    } else {
      const userByName = dbUsers.find(
        (u: any) => u.name && u.name.trim().toLowerCase() === (row.name || "").trim().toLowerCase()
      );
      if (userByName?.email) email = userByName.email;
    }
  }

  if (!email) email = "client@email.com";

  let planName = "Basic";
  let planPrice: number | null = null;
  if (row.subscriptions) {
    planName = row.subscriptions.label || row.subscriptions.planName || "Silver";
    planPrice = row.subscriptions.price ?? null;
  } else {
    planName = parsePlanFromRequirement(row.requirement);
  }

  const members = row.memberCount && !isNaN(Number(row.memberCount)) ? Number(row.memberCount) : 100;
  const date = new Date(row.createdAt);
  const formattedDate =
    date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
    ", " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const status = mapDbStatusToUi(row.status);

  const sortedHistory = (row.demo_bookings_history || [])
    .filter((h: any) => !h.deletedAt)
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const latestHistory = sortedHistory[0];

  const historyItems: DemoBookingHistoryItem[] = sortedHistory.map((h: any) => ({
    id: h.demoBookingHistoryId,
    rescheduleDate: formatDbDateToUi(h.rescheduleDate),
    rescheduleTime: formatDbTimeToUi(h.rescheduleTime),
    previousDate: formatDbDateToUi(h.previousDate),
    previousTime: formatDbTimeToUi(h.previousTime),
    status: h.status,
    notes: h.notes,
    reason: h.reason,
    createdAt: h.createdAt,
  }));

  return {
    id: row.demoBookingId,
    ownerName: row.name,
    initials: getInitials(row.name),
    gymName: row.gymName,
    city: row.gymCity,
    mobile: row.mobile.startsWith("+") ? row.mobile : `+91 ${row.mobile}`,
    email,
    plan: planName,
    planPrice,
    subscriptionPlanId: row.subscriptionPlanId,
    members,
    requestedOn: formattedDate,
    createdAtRaw: row.createdAt,
    status,
    requirement: row.requirement,
    scheduledDate: formatDbDateToUi(latestHistory?.rescheduleDate) || null,
    scheduledTime: formatDbTimeToUi(latestHistory?.rescheduleTime) || null,
    rawScheduledDate: latestHistory?.rescheduleDate || null,
    rawScheduledTime: latestHistory?.rescheduleTime || null,
    history: historyItems,
  };
}
