export type PassType = "Monthly Pass" | "1 Day Pass";
export type VisitorStatus = "Visited" | "Cancelled";

export interface GymPassVisitor {
  id: string;
  serial: number;
  name: string;
  avatarUrl?: string;
  gender: "male" | "female";
  phone: string;
  passType: PassType;
  visitDate: string;
  visitDateFormatted: string;
  checkInTime: string;
  checkOutTime: string;
  duration: string;
  status: VisitorStatus;
  passId: string;
  gymLocation: string;
  customerId: string;
  email: string;
  memberSince: string;
  timestamp: number;
}

export interface VisitorKpiStats {
  totalVisitors: number;
  visited: number;
  visitedPercentage: string;
  cancelled: number;
  cancelledLabel: string;
  todayVisitors: number;
  todayDate: string;
}

export const PASS_TYPE_OPTIONS = [
  { label: "All Pass Types", value: "All Pass Types" },
  { label: "Monthly Pass", value: "Monthly Pass" },
  { label: "1 Day Pass", value: "1 Day Pass" },
];

export const STATUS_OPTIONS = [
  { label: "All Status", value: "All Status" },
  { label: "Visited", value: "Visited" },
  { label: "Cancelled", value: "Cancelled" },
];
