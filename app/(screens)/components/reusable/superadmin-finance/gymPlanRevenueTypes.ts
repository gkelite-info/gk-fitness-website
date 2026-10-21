export type GymPlanType =
  | "Gold - White Label"
  | "Silver"
  | "Platinum"
  | "Gold"
  | "Basic";

export type PaymentStatusType = "Paid" | "Pending";

export interface GymPlanPayment {
  id: string;
  date: string;
  gymName: string;
  gymLogo?: string | null;
  ownerName: string;
  plan: GymPlanType;
  amount: string;
  numericAmount: number;
  status: PaymentStatusType;
  invoiceId?: string;
  paymentMethod?: string;
  transactionRef?: string;
  billingCycle?: string;
}

export interface GymPlanRevenueKpis {
  totalRevenue: string;
  totalPaymentsCount: number;
  paidAmount: string;
  paidPaymentsCount: number;
  pendingAmount: string;
  pendingPaymentsCount: number;
}
