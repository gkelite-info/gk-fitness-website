export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  transactionId: string;
  status: "Success" | "Failed" | "Pending";
}

export interface MembershipPaymentsData {
  memberCode: string;
  plan: {
    name: string;
    tier: string;
    status: "ACTIVE" | "INACTIVE";
    startDate: string;
    expiryDate: string;
    planStatus: "Active" | "Expired" | "Cancelled";
    renewalDate: string;
  };
  payments: PaymentRecord[];
}
