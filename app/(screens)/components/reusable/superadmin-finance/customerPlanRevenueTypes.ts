export type CustomerPlanType = "Gold" | "Silver" | "Basic" | "Platinum";

export type CustomerPaymentStatus = "Paid" | "Pending";

export type CustomerPaymentMethod = "UPI" | "Card" | "Net Banking";

export interface CustomerPlanPayment {
  id: string;
  date: string;
  customerName: string;
  customerAvatar?: string | null;
  gender?: "male" | "female" | "other";
  plan: CustomerPlanType;
  amount: string;
  numericAmount: number;
  paymentMethod: CustomerPaymentMethod;
  status: CustomerPaymentStatus;
  transactionId: string;
  billingCycle?: string;
}

export interface CustomerPlanRevenueKpis {
  totalRevenue: string;
  totalPaymentsCount: number;
  paidAmount: string;
  paidPaymentsCount: number;
}
