export interface GymPassItem {
  id: string;
  name: string;
  type: "day" | "monthly" | "weekly" | "custom";
  price: number;
  soldCount: number;
  activeCount?: number;
  revenueText?: string;
  status: "active" | "inactive";
  color: "emerald" | "purple";
  description?: string;
  durationDays: number;
  maxVisits?: string;
  access?: string;
  activationRule?: string;
}

export interface PurchaseItem {
  id: string;
  userName: string;
  userAvatar?: string;
  userGender?: "male" | "female" | "other";
  passName: string;
  passType: "Day Pass" | "Monthly Pass";
  price: number;
  timeAgo: string;
  date: string;
}

export interface ChartPoint {
  date: string;
  label: string;
  value: number;
  formattedValue: string;
  isPeak?: boolean;
}
