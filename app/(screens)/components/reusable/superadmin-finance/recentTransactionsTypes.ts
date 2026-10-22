export type RecentTransactionSourceType =
  | "pass"
  | "global"
  | "plan"
  | "gym"
  | "payout"
  | "trainer";

export interface RecentTransactionItem {
  id: string;
  date: string;
  dateTime: string;
  source: string;
  sourceType: RecentTransactionSourceType;
  type: "Payment Received" | "Paid";
  amount: string;
  numericAmount: number;
  status: "Paid" | "Pending";
  customerName: string;
  paymentMethod: string;
  referenceId: string;
}

export interface RecentTransactionsKpis {
  totalTransactions: number;
  paymentsReceived: string;
  paid: number;
  pending: number;
}
