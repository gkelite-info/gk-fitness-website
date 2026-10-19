import FinanceHeaderTabs from "./FinanceHeaderTabs";
import FinanceKpiGrid from "./FinanceKpiGrid";
import FinanceBreakdownSection from "./FinanceBreakdownSection";
import FinanceRevenueVsPayoutsChart from "./FinanceRevenueVsPayoutsChart";
import FinanceRecentTransactions from "./FinanceRecentTransactions";

export default function SuperAdminOverviewView() {
  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Finance
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Track all platform revenue, payouts and transactions in one place.
        </p>
      </div>
      <FinanceHeaderTabs />
      <FinanceKpiGrid />
      <FinanceBreakdownSection />
      <FinanceRevenueVsPayoutsChart />
      <FinanceRecentTransactions />
    </div>
  );
}
