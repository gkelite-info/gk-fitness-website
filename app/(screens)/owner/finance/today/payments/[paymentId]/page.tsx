"use client";

import { useParams } from "next/navigation";
import TransactionDetailsView from "@/app/(screens)/components/reusable/TransactionDetailsView";

import { useUser } from "@/app/context/UserContext";
import { useFinanceDashboard } from "@/lib/hooks/finance/useFinanceDashboard";
import { useRouter } from "next/navigation";
import { CircleNotch, Wallet, CalendarBlank, User, CreditCard } from "@phosphor-icons/react";

export default function PaymentDetailsPage() {
  const params = useParams();
  const paymentId = params.paymentId as string;
  const router = useRouter();
  
  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || null;
  const selectedYear = new Date().getFullYear();

  const { allTransactions, isLoading } = useFinanceDashboard(userId, gymId, selectedYear);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11]">
        <CircleNotch size={32} className="text-[#CCFF00] animate-spin mb-4" />
        <span className="font-['Sora'] text-[#8590A2]">Loading payment details...</span>
      </div>
    );
  }

  const payment = allTransactions?.find(tx => tx.id === paymentId || tx.gymPaymentId === paymentId);

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11]">
        <span className="font-['Sora'] text-[#8590A2]">Payment not found.</span>
        <button onClick={() => router.back()} className="mt-4 text-[#CCFF00] underline">Go Back</button>
      </div>
    );
  }

  const name = payment.gym_customers?.users?.name || payment.gym_customers?.fullName || 'Unknown User';
  const plan = payment.gym_membership_plans?.name || payment.gym_membership_plans?.planName || payment.plan?.planName || 'Unknown Plan';
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
    const timePart = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
    return `${datePart} • ${timePart}`;
  };

  const amountFormatted = `₹${formatCurrency(payment.amountPaid || 0)}`;

  // Use createdAt for exact timestamp if available, fallback to paymentDate
  const exactTimestamp = payment.createdAt || payment.paymentDate;
  
  const paymentDateObj = new Date(exactTimestamp);
  const formattedDateOnly = paymentDateObj.toLocaleDateString('en-GB', { 
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' 
  });

  const summaryData = [
    { icon: <Wallet size={18} weight="regular" />, label: "Amount Paid", value: amountFormatted },
    { icon: <CalendarBlank size={18} weight="regular" />, label: "Date & Time", value: formatDate(exactTimestamp) },
    { icon: <User size={18} weight="regular" />, label: "Customer Name", value: name },
    { icon: <CreditCard size={18} weight="regular" />, label: "Payment Method", value: payment.paymentMethod || "N/A" }
  ];

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] overflow-y-auto">
      <TransactionDetailsView 
        onBack={() => router.back()}
        title="Transaction Detail"
        subtitle="Payment Details"
        amountTitle={`${name} - ${plan}`}
        amount={amountFormatted}
        amountStatus="Successful"
        amountStatusColor="success"
        amountDateText={`Paid on ${formattedDateOnly}`}
        summaryData={summaryData}
      />
    </div>
  );
}
