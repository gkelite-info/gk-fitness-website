export type PassType = "All Passes" | "Monthly Pass" | "1 Day Pass" | "Weekly Pass" | "3 Month Pass";

export type PaymentMethod = "UPI" | "Card" | "Net Banking";

export type PaymentStatus = "All Status" | "Paid" | "Pending";

export interface GymPassPayment {
  id: string;
  date: string;
  dateTime: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  customerId?: string;
  joinedDate?: string;
  customerAvatar?: string | null;
  gender?: "male" | "female" | "other";
  passType: "Monthly Pass" | "1 Day Pass" | "Weekly Pass" | "3 Month Pass";
  amount: string;
  numericAmount: number;
  paymentMethod: PaymentMethod;
  status: "Paid" | "Pending";
  invoiceId: string;
  transactionId: string;
  referenceId: string;
  source: string;
  validTill: string;
  planDurationText?: string;
  startDate?: string;
  endDate?: string;
  validityRange?: string;
  passDays?: string;
  autoRenew?: string;
}

export interface GymPassRevenueKpis {
  totalRevenue: string;
  totalPurchasesCount: number;
  paidAmount: string;
  paidPurchasesCount: number;
  pendingAmount: string;
  pendingPurchasesCount: number;
}
