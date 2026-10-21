export type FinanceTab = "overview" | "revenue" | "payouts" | "transactions";

export interface FinanceKpi {
  id: string;
  title: string;
  amount: string;
  changePercentage: number;
  comparisonText: string;
  trend: "up" | "down";
  variant: "revenue" | "payouts" | "pending" | "net";
}

export interface BreakdownItem {
  id: string;
  title: string;
  amount: string;
  percentage: number;
  barColor: string;
  iconType: "gym" | "user" | "global" | "pass";
  href?: string;
}

export interface MonthlyChartPoint {
  month: string;
  revenue: number;
  payouts: number;
}

export type TransactionType = "Payment Received" | "Payout";
export type TransactionStatus = "Paid" | "Pending" | "Failed";

export interface RecentTransaction {
  id: string;
  date: string;
  source: string;
  sourceType: "pass" | "global" | "plan" | "gym" | "payout";
  type: TransactionType;
  amount: string;
  status: TransactionStatus;
}

export type RevenueCategory =
  | "all"
  | "gym-labels"
  | "customer-plans"
  | "global-sessions"
  | "gym-pass";

export interface RevenueTransaction {
  id: string;
  date: string;
  source: string;
  sourceCategory: RevenueCategory;
  paidBy: string;
  reference: string;
  amount: string;
  status: TransactionStatus;
  paymentDate: string;
  paymentMethod: string;
  gymName?: string;
  gymPlan?: string;
  customerName?: string;
  planName?: string;
}

export interface GymOwnerPayout {
  id: string;
  gymName: string;
  payoutMonth: string;
  entries: number;
  ratePerEntry: number;
  amount: string;
  status: "Paid" | "Pending";
  paidDate?: string;
  referenceId?: string;
}

export interface GlobalTrainerPayout {
  id: string;
  trainerName: string;
  avatarUrl?: string;
  payoutMonth: string;
  sessions: number;
  monthlyPayout?: string;
  ratePerSession?: number;
  amount: string;
  status: "Paid" | "Pending";
  paidDate?: string;
  referenceId?: string;
}

export type TransactionFilterType = "All" | "Payment Received" | "Paid";

export type TransactionFilterSource =
  | "All"
  | "Gym Labels"
  | "Customer Plans"
  | "Global Sessions"
  | "Gym Pass"
  | "Gym Payout"
  | "Trainer Payout";

export interface FinanceTransactionRecord {
  id: string;
  date: string;
  dateTime: string;
  fromToName: string;
  avatarUrl?: string;
  gender?: "male" | "female" | "other";
  source: string;
  sourceCategory:
    | "gym-label"
    | "trainer-payout"
    | "customer-plan"
    | "global-session"
    | "gym-pass"
    | "gym-payout";
  amount: string;
  type: "Payment Received" | "Paid";
  typeDisplay: string;
  status: "Paid" | "Pending" | "Failed";
  paymentMethod: string;
  referenceId: string;
  relatedNameLabel: string;
  relatedName: string;
  relatedPlanLabel: string;
  relatedPlan: string;
}

