import OverviewMetrics from "./_components/OverviewMetrics";
import ManualAttendanceBanner from "./_components/ManualAttendanceBanner";
import QuickActions from "./_components/QuickActions";
import ManagementShortcuts from "./_components/ManagementShortcuts";
import OperationsMetrics from "./_components/OperationsMetrics";
import AnnouncementsCard from "./_components/AnnouncementsCard";
import AlertsRemindersCard from "./_components/AlertsRemindersCard";
import FinancesCard from "./_components/FinancesCard";
import EnquiriesCard from "./_components/EnquiriesCard";
import RevenueTrendChart from "./_components/RevenueTrendChart";

export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 pb-12 gap-7 w-full max-w-[1024px] mx-auto 2xl:max-w-[1200px]">
      <OverviewMetrics />
      <ManualAttendanceBanner />

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="flex flex-col gap-6 xl:col-span-7">
          <QuickActions />
          <ManagementShortcuts />
          <OperationsMetrics />
        </div>

        <div className="flex flex-col gap-6 xl:col-span-5">
          <AnnouncementsCard />
          <AlertsRemindersCard />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FinancesCard />
            <EnquiriesCard />
          </div>
        </div>
      </div>

      <RevenueTrendChart />
    </div>
  );
}
