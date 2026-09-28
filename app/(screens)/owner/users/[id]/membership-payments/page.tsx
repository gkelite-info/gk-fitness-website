import React from "react";
import MembershipPaymentsView, { MembershipPaymentsData } from "../../../../components/reusable/MembershipPaymentsView";

export default function MembershipPaymentsPage({ params }: { params: { id: string } }) {
  // Mock data matching the design
  const mockData: MembershipPaymentsData = {
    memberCode: "MEM-000124",
    plan: {
      name: "Gold Membership",
      tier: "Tier 03",
      status: "ACTIVE",
      startDate: "02 Jul 2026",
      expiryDate: "02 Oct 2026",
      planStatus: "Active",
      renewalDate: "02 Oct 2026",
    },
    payments: [
      { id: "1", date: "02 Jul 2026", amount: 3999, method: "UPI", transactionId: "TXN384920", status: "Success" },
      { id: "2", date: "15 Apr 2026", amount: 3999, method: "Card", transactionId: "TXN382111", status: "Success" },
      { id: "3", date: "02 Jan 2026", amount: 3999, method: "UPI", transactionId: "TXN379045", status: "Success" },
      { id: "4", date: "02 Oct 2025", amount: 3999, method: "Card", transactionId: "TXN375680", status: "Success" },
      { id: "5", date: "02 Jul 2025", amount: 3999, method: "UPI", transactionId: "TXN372210", status: "Success" },
      { id: "6", date: "02 Apr 2025", amount: 3999, method: "Card", transactionId: "TXN368945", status: "Success" },
      { id: "7", date: "02 Jan 2025", amount: 3999, method: "UPI", transactionId: "TXN365432", status: "Success" },
    ]
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#111319]">
      <MembershipPaymentsView data={mockData} />
    </div>
  );
}
