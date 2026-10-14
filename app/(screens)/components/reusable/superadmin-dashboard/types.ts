export interface PlatformKpiItem {
  id: string;
  label: string;
  value: string;
  change: string;
  changePeriod: string;
  iconType: "active-gyms" | "total-gyms" | "new-gyms" | "total-users";
}

export interface DashboardActionCardItem {
  id: string;
  title: string;
  iconType:
    | "register-gym"
    | "global-trainers"
    | "support-requests"
    | "gym-owners"
    | "payment-request"
    | "leads-global-trainers";
  href: string;
  bgStyle: string;
  borderStyle: string;
  iconBg: string;
  iconColor: string;
}

export interface RecentlyRegisteredGym {
  id: string;
  serial: number;
  gymName: string;
  logoUrl?: string;
  ownerName: string;
  location: string;
  registeredOn: string;
  status: "Active" | "Pending";
}

export interface RecentSupportRequest {
  id: string;
  serial: number;
  gymName: string;
  subject: string;
  requestedBy: string;
  category: "Login Issue" | "Subscription" | "Technical" | "Feature Request" | "Payment";
  date: string;
  status: "Open" | "In Progress" | "Resolved";
}

export const GYM_FILTER_OPTIONS = [
  { label: "All Gyms", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
];

export const REQUEST_FILTER_OPTIONS = [
  { label: "All Requests", value: "All" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

export const CATEGORY_STYLES: Record<string, string> = {
  "Login Issue": "bg-[rgba(23,37,84,0.8)] border-[rgba(30,64,175,0.4)] text-[#60A5FA]",
  "Subscription": "bg-[rgba(59,7,100,0.8)] border-[rgba(107,33,168,0.4)] text-[#C084FC]",
  "Technical": "bg-[rgba(2,44,34,0.8)] border-[rgba(6,95,70,0.4)] text-[#34D399]",
  "Feature Request": "bg-[rgba(69,26,3,0.8)] border-[rgba(146,64,14,0.4)] text-[#FBBF24]",
  "Payment": "bg-[rgba(8,47,73,0.8)] border-[rgba(7,89,133,0.4)] text-[#38BDF8]",
};

export const STATUS_STYLES: Record<string, { wrapper: string; dot: string }> = {
  "Open": { wrapper: "bg-[rgba(76,5,25,0.7)] border-[rgba(159,18,57,0.4)] text-[#FB7185]", dot: "bg-[#FB7185]" },
  "In Progress": { wrapper: "bg-[rgba(69,26,3,0.7)] border-[rgba(146,64,14,0.4)] text-[#FBBF24]", dot: "bg-[#FBBF24]" },
  "Resolved": { wrapper: "bg-[rgba(2,44,34,0.7)] border-[rgba(6,95,70,0.4)] text-[#34D399]", dot: "bg-[#34D399]" },
};

export * from "./mockData";
