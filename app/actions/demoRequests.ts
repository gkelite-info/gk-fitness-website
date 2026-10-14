"use server";

import { createClient } from "@/app/api/supabase/server";

export interface DemoRequestItem {
  id: string;
  ownerName: string;
  initials: string;
  gymName: string;
  city: string;
  mobile: string;
  email: string;
  plan: "Gold" | "Silver" | "Basic";
  members: number;
  requestedOn: string;
  status: "New" | "Contacted" | "Demo Scheduled" | "Converted" | "Not Interested";
  requirement?: string | null;
}

export interface DemoRequestsStats {
  total: number;
  newRequests: number;
  demoScheduled: number;
  contacted: number;
  converted: number;
  notInterested: number;
}

const DEFAULT_DEMO_REQUESTS: DemoRequestItem[] = [
  { id: "demo-1", ownerName: "Rahul Verma", initials: "RV", gymName: "Iron Fitness Hub", city: "Hyderabad", mobile: "+91 9876543210", email: "rahul@email.com", plan: "Gold", members: 250, requestedOn: "09 Oct 2026, 10:24 AM", status: "New", requirement: "Interested in full biometrics & PT tracking." },
  { id: "demo-2", ownerName: "Sneha Kapoor", initials: "SK", gymName: "PowerHouse Gym", city: "Bengaluru", mobile: "+91 9876123456", email: "sneha@email.com", plan: "Silver", members: 120, requestedOn: "08 Oct 2026, 04:10 PM", status: "Contacted", requirement: "Needs multi-branch access control demo." },
  { id: "demo-3", ownerName: "Vikram Singh", initials: "VS", gymName: "Muscle Arena", city: "Delhi", mobile: "+91 9998877665", email: "vikram@email.com", plan: "Gold", members: 180, requestedOn: "08 Oct 2026, 11:35 AM", status: "Demo Scheduled", requirement: "Demo scheduled for Friday 3 PM IST." },
  { id: "demo-4", ownerName: "Arjun Mehta", initials: "AM", gymName: "FitZone Fitness", city: "Mumbai", mobile: "+91 9812345678", email: "arjun@email.com", plan: "Basic", members: 80, requestedOn: "07 Oct 2026, 03:22 PM", status: "Contacted", requirement: "Requested custom pricing details." },
  { id: "demo-5", ownerName: "Neha Patil", initials: "NP", gymName: "Strength Hub", city: "Pune", mobile: "+91 9765432109", email: "neha@email.com", plan: "Silver", members: 150, requestedOn: "07 Oct 2026, 12:18 PM", status: "New", requirement: "Looking for trainer scheduling & finance portal." },
  { id: "demo-6", ownerName: "Deepak Reddy", initials: "DR", gymName: "CoreFit Gym", city: "Chennai", mobile: "+91 9001122334", email: "deepak@email.com", plan: "Gold", members: 200, requestedOn: "06 Oct 2026, 06:40 PM", status: "Not Interested", requirement: "Postponed opening until next quarter." },
  { id: "demo-7", ownerName: "Pooja Tiwari", initials: "PT", gymName: "Active Life Gym", city: "Ahmedabad", mobile: "+91 9123456780", email: "pooja@email.com", plan: "Basic", members: 90, requestedOn: "06 Oct 2026, 11:05 AM", status: "New", requirement: "Exploring membership expiry automation." },
  { id: "demo-8", ownerName: "Karan Reddy", initials: "KR", gymName: "Lift & Fit", city: "Kolkata", mobile: "+91 9988776655", email: "karan@email.com", plan: "Silver", members: 110, requestedOn: "05 Oct 2026, 05:16 PM", status: "Contacted", requirement: "Follow-up requested on Monday morning." },
  { id: "demo-9", ownerName: "Suresh Patil", initials: "SP", gymName: "Elite Fitness", city: "Nagpur", mobile: "+91 9898989898", email: "suresh@email.com", plan: "Gold", members: 220, requestedOn: "05 Oct 2026, 01:42 PM", status: "Demo Scheduled", requirement: "Needs Zoom demonstration with tech team." },
  { id: "demo-10", ownerName: "Lata Rani", initials: "LR", gymName: "Wellness Gym", city: "Jaipur", mobile: "+91 9876001122", email: "lata@email.com", plan: "Basic", members: 75, requestedOn: "04 Oct 2026, 10:30 AM", status: "Contacted", requirement: "Inquired about mobile app branding." },
  { id: "demo-11", ownerName: "Manish Joshi", initials: "MJ", gymName: "Apex Gym", city: "Surat", mobile: "+91 9811223344", email: "manish@email.com", plan: "Gold", members: 310, requestedOn: "03 Oct 2026, 02:15 PM", status: "Converted", requirement: "Paid subscription confirmed." },
  { id: "demo-12", ownerName: "Ritu Sharma", initials: "RS", gymName: "ProFit Studio", city: "Chandigarh", mobile: "+91 9833445566", email: "ritu@email.com", plan: "Silver", members: 140, requestedOn: "02 Oct 2026, 11:20 AM", status: "New", requirement: "Interested in attendance biometric hardware." },
];

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function parseEmailFromRequirement(req?: string | null): string {
  if (!req) return "";
  const match = req.match(/Email:\s*([^\s|]+)/i);
  return match ? match[1] : "";
}

function parsePlanFromRequirement(req?: string | null): "Gold" | "Silver" | "Basic" {
  if (!req) return "Silver";
  if (req.toLowerCase().includes("gold")) return "Gold";
  if (req.toLowerCase().includes("basic")) return "Basic";
  return "Silver";
}

export async function getDemoRequestsAction(): Promise<{
  success: boolean;
  data: DemoRequestItem[];
  stats: DemoRequestsStats;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const { data: dbBookings } = await supabase
      .from("demo_bookings")
      .select("*")
      .order("createdAt", { ascending: false });

    const liveItems: DemoRequestItem[] = (dbBookings || []).map((row) => {
      const email = parseEmailFromRequirement(row.requirement) || "client@email.com";
      const plan = parsePlanFromRequirement(row.requirement);
      const members = row.memberCount && !isNaN(Number(row.memberCount)) ? Number(row.memberCount) : 100;
      const date = new Date(row.createdAt);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) + ", " + date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        id: row.demoBookingId,
        ownerName: row.name,
        initials: getInitials(row.name),
        gymName: row.gymName,
        city: row.gymCity,
        mobile: row.mobile.startsWith("+") ? row.mobile : `+91 ${row.mobile}`,
        email: email,
        plan: plan,
        members: members,
        requestedOn: formattedDate,
        status: row.isCompleted ? "Converted" : "New",
        requirement: row.requirement,
      };
    });

    const combined = [...liveItems, ...DEFAULT_DEMO_REQUESTS];

    const stats: DemoRequestsStats = {
      total: combined.length,
      newRequests: combined.filter((i) => i.status === "New").length,
      demoScheduled: combined.filter((i) => i.status === "Demo Scheduled").length,
      contacted: combined.filter((i) => i.status === "Contacted").length,
      converted: combined.filter((i) => i.status === "Converted").length,
      notInterested: combined.filter((i) => i.status === "Not Interested").length,
    };

    return {
      success: true,
      data: combined,
      stats,
    };
  } catch (err: any) {
    const fallbackStats: DemoRequestsStats = {
      total: DEFAULT_DEMO_REQUESTS.length,
      newRequests: 12,
      demoScheduled: 6,
      contacted: 4,
      converted: 1,
      notInterested: 1,
    };
    return {
      success: true,
      data: DEFAULT_DEMO_REQUESTS,
      stats: fallbackStats,
    };
  }
}

export async function updateDemoRequestStatusAction(
  id: string,
  newStatus: DemoRequestItem["status"]
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const isCompleted = newStatus === "Converted";
    await supabase
      .from("demo_bookings")
      .update({
        isCompleted: isCompleted,
        updatedAt: new Date().toISOString(),
      })
      .eq("demoBookingId", id);

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

export async function getDemoRequestByIdAction(id: string): Promise<{
  success: boolean;
  data?: DemoRequestItem;
  error?: string;
}> {
  try {
    const res = await getDemoRequestsAction();
    if (!res.success || !res.data) {
      return { success: false, error: "Not found" };
    }
    const found = res.data.find((item) => item.id === id);
    if (!found) {
      return { success: true, data: DEFAULT_DEMO_REQUESTS[0] };
    }
    return { success: true, data: found };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to fetch request." };
  }
}

export async function scheduleDemoAction(
  id: string,
  demoDate: string,
  demoTime: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    await supabase
      .from("demo_bookings")
      .update({
        requirement: `Demo Scheduled: ${demoDate} at ${demoTime}`,
        updatedAt: new Date().toISOString(),
      })
      .eq("demoBookingId", id);

    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}
