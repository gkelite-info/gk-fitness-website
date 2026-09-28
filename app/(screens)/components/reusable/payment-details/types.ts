export interface PaymentDetailsData {
  paymentId: string;
  memberCode: string;
  memberName: string;
  phone: string;
  email: string;
  memberStatus: "Active Membership" | "Inactive Membership";
  membershipPlan: string;
  planDuration: string;
  planValidTill: string;
  amountPaid: number;
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
  paymentTime: string;
  paymentStatus: "Recorded & Verified" | "Failed";
}
