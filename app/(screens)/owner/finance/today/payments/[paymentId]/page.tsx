"use client";

import { useParams } from "next/navigation";
import TransactionDetailsView from "@/app/(screens)/components/reusable/TransactionDetailsView";

// Mock data to simulate fetching a payment by ID
const MOCK_PAYMENTS: Record<string, any> = {
  "0": { name: "Rahul Sharma", plan: "Gold Membership", amount: "₹2,500" },
  "1": { name: "Sneha Patel", plan: "Premium Membership", amount: "₹2,999" },
  "2": { name: "Amit Kumar", plan: "Gold Membership", amount: "₹2,500" },
  "3": { name: "Neha Kapoor", plan: "Silver Membership", amount: "₹650" },
};

export default function PaymentDetailsPage() {
  const params = useParams();
  const paymentId = params.paymentId as string;
  
  const payment = MOCK_PAYMENTS[paymentId];

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] overflow-y-auto">
      <TransactionDetailsView 
        amount={payment?.amount}
        amountTitle={payment ? `${payment.name} - ${payment.plan}` : undefined}
      />
    </div>
  );
}
