export type SessionPaymentStatus = "Paid" | "Pending";

export type SessionPaymentMethod = "UPI" | "Card" | "Net Banking";

export interface GlobalSessionPayment {
  id: string;
  date: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAvatar?: string | null;
  customerGender?: "male" | "female" | "other";
  trainerName: string;
  trainerEmail?: string;
  trainerPhone?: string;
  trainerAvatar?: string | null;
  trainerGender?: "male" | "female" | "other";
  amount: string;
  numericAmount: number;
  paymentMethod: SessionPaymentMethod;
  status: SessionPaymentStatus;
  sessionId: string;
  sessionType?: string;
  sessionDate?: string;
  sessionTime?: string;
  duration?: string;
  mode?: string;
  topic?: string;
  transactionId?: string;
  paymentDate?: string;
  referenceId?: string;
}

export interface GlobalSessionsRevenueKpis {
  totalRevenue: string;
  totalSessionsCount: number;
  paidAmount: string;
  paidSessionsCount: number;
  pendingAmount: string;
  pendingSessionsCount: number;
}
