"use client";

import { useState } from "react";
import FinanceHeader from "./_components/FinanceHeader";
import FinanceKPICards from "./_components/FinanceKPICards";
import RevenueByPlan from "./_components/RevenueByPlan";
import RecentTransactions from "./_components/RecentTransactions";
import MonthlyRevenueChart from "./_components/MonthlyRevenueChart";
import { useFinanceDashboard } from "@/lib/hooks/finance/useFinanceDashboard";
import { useUser } from "@/app/context/UserContext";

export default function FinanceDashboardPage() {
  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || null;

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const {
    todaysRevenue,
    todaysGrowth,
    monthlyGrowth,
    revenueByPlan,
    monthlyRevenueChart,
    maxRevenue,
    totalCustomers,
    customerGrowth,
    recentTransactions,
    isLoading
  } = useFinanceDashboard(userId, gymId, selectedYear);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#CCFF00]"></div>
        <p className="text-[#94A3B8] mt-4 text-sm">Loading finance dashboard...</p>
      </div>
    );
  }

  const formattedTransactions = recentTransactions.map((tx: any) => {
    return {
      gymPaymentId: tx.gymPaymentId,
      name: tx.gym_customers?.users?.name || tx.gym_customers?.fullName || 'Unknown Customer',
      plan: tx.gym_membership_plans?.name || 'Unknown Plan',
      amount: tx.amountPaid,
      paymentDate: tx.paymentDate,
      gender: (tx.gym_customers?.users?.gender || "male").toLowerCase() as "male" | "female"
    };
  });

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      <FinanceHeader />

      <FinanceKPICards
        todaysRevenue={todaysRevenue}
        todaysGrowth={todaysGrowth}
        totalCustomers={totalCustomers}
        customerGrowth={customerGrowth}
        monthlyGrowth={monthlyGrowth}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <RevenueByPlan revenueByPlan={revenueByPlan} />
        <RecentTransactions transactions={formattedTransactions} />
      </div>

      <MonthlyRevenueChart data={monthlyRevenueChart} />
    </div>
  );
}
