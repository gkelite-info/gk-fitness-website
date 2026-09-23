"use client";

import { useState } from "react";
import TodayHeroBanner from "./_components/TodayHeroBanner";
import TodayRevenueByPlan from "./_components/TodayRevenueByPlan";
import TodayPaymentMethods from "./_components/TodayPaymentMethods";
import TodayRecentPayments from "./_components/TodayRecentPayments";
import { CaretDown, CalendarBlank, ArrowLeft, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useFinanceDashboard } from "@/lib/hooks/finance/useFinanceDashboard";
import { useUser } from "@/app/context/UserContext";

export default function TodayRevenuePage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || null;
  const selectedYear = new Date().getFullYear();

  const {
    totalRevenue,
    revenueByPlan,
    allTransactions,
    isLoading
  } = useFinanceDashboard(userId, gymId, selectedYear, selectedDate);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11]">
        <CircleNotch size={32} className="text-[#CCFF00] animate-spin mb-4" />
        <span className="font-['Sora'] text-[#8590A2]">Loading dashboard...</span>
      </div>
    );
  }

  const formattedAllPayments = allTransactions.map((tx: any) => {
    return {
      gymPaymentId: tx.gymPaymentId,
      name: tx.gym_customers?.users?.name || tx.gym_customers?.fullName || 'Unknown User',
      plan: tx.gym_membership_plans?.name || 'Unknown Plan',
      amount: tx.amountPaid || 0,
      paymentDate: tx.paymentDate,
      createdAt: tx.createdAt,
      method: tx.paymentMethod || 'Unknown',
      gender: tx.gym_customers?.users?.gender || 'male'
    };
  });

  const paymentMethodsBreakdown = {
    UPI: 0,
    Card: 0,
    Cash: 0,
    Bank: 0
  };

  formattedAllPayments.forEach((tx: any) => {
    const m = tx.method.toLowerCase();
    if (m.includes('upi')) paymentMethodsBreakdown.UPI += tx.amount;
    else if (m.includes('card')) paymentMethodsBreakdown.Card += tx.amount;
    else if (m.includes('cash')) paymentMethodsBreakdown.Cash += tx.amount;
    else paymentMethodsBreakdown.Bank += tx.amount;
  });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
        <div className="flex flex-row items-center gap-3">
          <Link href="/owner/finance" className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col items-start gap-0.5">
            <h1 className="font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
              Total Revenue
            </h1>
            <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
              Track overall payments and revenue collection
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2">
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate("")}
              className="font-[500] text-[12px] text-[#CCFF00] hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
          <div className="flex flex-row items-center justify-center px-3.5 py-1.5 gap-2 bg-[#171B21] border border-[#262C36] rounded-[6px] hover:bg-[#1A1F26] transition-colors shrink-0">
            <CalendarBlank size={14} className="text-[#94A3B8]" />
            <input 
              type={selectedDate ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              placeholder="All Time"
              value={selectedDate}
              max={todayStr}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-[#E2E8F0] font-[500] text-[12px] leading-[16px] outline-none cursor-pointer placeholder:text-[#E2E8F0] w-[110px]"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-5">
        <TodayHeroBanner todaysRevenue={totalRevenue} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <TodayRevenueByPlan todaysRevenueByPlan={revenueByPlan} />
          <TodayPaymentMethods paymentMethodsBreakdown={paymentMethodsBreakdown} />
        </div>

        <TodayRecentPayments payments={formattedAllPayments} />
      </div>
    </div>
  );
}
