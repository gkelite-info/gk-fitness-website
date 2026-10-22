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
  dateTime: string;
  gymName: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  ownerName: string;
  plan: GymPlanType;
  amount: string;
  numericAmount: number;
  status: PaymentStatusType;
  invoiceId: string;
  transactionId: string;
  referenceId: string;
  paymentMethod: string;
  source: string;
  startDate: string;
  nextRenewal: string;
  planAmountText: string;
}

export interface GymPlanRevenueKpis {
  totalRevenue: string;
  totalPaymentsCount: number;
  paidAmount: string;
  paidPaymentsCount: number;
  pendingAmount: string;
  pendingPaymentsCount: number;
}
