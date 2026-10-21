export type SessionPaymentStatus = "Paid" | "Pending";

export type SessionPaymentMethod = "UPI" | "Card" | "Net Banking";

export interface GlobalSessionPayment {
  id: string;
  date: string;
  customerName: string;
  customerAvatar?: string | null;
  trainerName: string;
  trainerAvatar?: string | null;
  amount: string;
  numericAmount: number;
  paymentMethod: SessionPaymentMethod;
  status: SessionPaymentStatus;
  sessionId: string;
  sessionType?: string;
  duration?: string;
}

export interface GlobalSessionsRevenueKpis {
  totalRevenue: string;
  totalSessionsCount: number;
  paidAmount: string;
  paidSessionsCount: number;
  pendingAmount: string;
  pendingSessionsCount: number;
}
