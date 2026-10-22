export interface RevenueVsPayoutsKpi {
  id: string;
  title: string;
  amount: string;
  comparisonText: string;
  trend: "up" | "down" | "neutral";
  variant: "revenue" | "payouts" | "net" | "pending";
}

export interface MonthlyComparisonPoint {
  month: string;
  revenue: number;
  payouts: number;
}

export interface HighlightCardData {
  title: string;
  month: string;
  amount: string;
  type: "revenue" | "payout" | "net";
}
