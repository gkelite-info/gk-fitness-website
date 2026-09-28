import PaymentDetailsView from "../../../../../components/reusable/payment-details/PaymentDetailsView";
import { PaymentDetailsData } from "../../../../../components/reusable/payment-details/types";

export default async function PaymentDetailsPage({ params }: { params: Promise<{ id: string; paymentId: string }> }) {
  const resolvedParams = await params;
  
  // Mock data matching the design
  const mockData: PaymentDetailsData = {
    paymentId: resolvedParams.paymentId,
    memberCode: "MEM1256",
    memberName: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    memberStatus: "Active Membership",
    membershipPlan: "Gold Membership",
    planDuration: "1 Month",
    planValidTill: "29 Aug 2026",
    amountPaid: 3999,
    paymentMethod: "UPI TRANSFER",
    transactionId: "AXF89HJY2K",
    paymentDate: "29 Jul 2026",
    paymentTime: "06:42 PM IST",
    paymentStatus: "Recorded & Verified",
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#111319]">
      <PaymentDetailsView data={mockData} />
    </div>
  );
}
