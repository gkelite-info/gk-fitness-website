"use client";

import TopUserMetricsSection from "./TopUserMetricsSection";
import DashboardGreetingHeader from "./DashboardGreetingHeader";
import PlatformOverviewSection from "./PlatformOverviewSection";
import ActionsAndLeadsSection from "./ActionsAndLeadsSection";
import RecentlyRegisteredGymsTable from "./RecentlyRegisteredGymsTable";
import RecentSupportRequestsTable from "./RecentSupportRequestsTable";

export default function SuperAdminDashboardView() {
  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <TopUserMetricsSection />
      <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
        <DashboardGreetingHeader />
        <PlatformOverviewSection />
      </div>
      <ActionsAndLeadsSection />
      <RecentlyRegisteredGymsTable />
      <RecentSupportRequestsTable />
    </div>
  );
}
