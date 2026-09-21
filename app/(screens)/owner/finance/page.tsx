"use client";

import FinanceHeader from "./_components/FinanceHeader";
import FinanceKPICards from "./_components/FinanceKPICards";
import RevenueByPlan from "./_components/RevenueByPlan";
import RecentTransactions from "./_components/RecentTransactions";
import MonthlyRevenueChart from "./_components/MonthlyRevenueChart";

export default function FinanceDashboardPage() {
  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      <FinanceHeader />
      <FinanceKPICards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        <RevenueByPlan />
        <RecentTransactions />
      </div>
      <MonthlyRevenueChart />
    </div>
  );
}
