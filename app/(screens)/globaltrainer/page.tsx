import { Suspense } from "react";
import { getTrainerIndividualClients } from "@/app/actions/trainer/getTrainerIndividualClients";
import { getGlobalTrainerDashboardData } from "@/app/actions/globaltrainer/getGlobalTrainerDashboard";
import TrainerIndividualMembershipsView from "../components/reusable/trainers/TrainerIndividualMembershipsView";
import GlobalTrainerGreeting from "./components/GlobalTrainerGreeting";
import GlobalTrainerSessionsCard from "./components/GlobalTrainerSessionsCard";
import GlobalTrainerScheduleSection from "./components/GlobalTrainerScheduleSection";
import GlobalTrainerQuickActions from "./components/GlobalTrainerQuickActions";
import GlobalTrainerSessionRequestsCard from "./components/GlobalTrainerSessionRequestsCard";

export default async function GlobalTrainerDashboard() {
  const [data, initialData] = await Promise.all([
    getGlobalTrainerDashboardData(),
    getTrainerIndividualClients("all"),
  ]);

  return (
    <div className="flex flex-col pb-12 gap-8">
      <div className="flex flex-col">
        <GlobalTrainerGreeting trainerName={data.trainerName} />
        <GlobalTrainerSessionsCard
          totalSessions={data.totalSessions}
          completedSessions={data.completedSessions}
          upcomingSessions={data.upcomingSessions}
          dateLabel={data.dateLabel}
        />
        <GlobalTrainerScheduleSection schedule={data.schedule} />
        <GlobalTrainerQuickActions />
        <GlobalTrainerSessionRequestsCard pendingRequestsCount={data.pendingRequestsCount} />
      </div>

      <div className="w-full">
        <div className="mb-6">
          <span className="text-[#D7FF00] text-xs uppercase font-semibold tracking-wider">
            Global Trainer Coaching Portal
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-white mt-1">
            Assigned Individual Customer Memberships
          </h1>
          <p className="text-[#8E8E93] text-xs md:text-sm mt-1">
            Review active coaching plans, days remaining, schedules, and fee records from individual_customer_trainers.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-28 bg-[#141414] border border-[#222222] rounded-2xl animate-pulse" />
              <div className="h-96 bg-[#141414] border border-[#222222] rounded-3xl animate-pulse" />
            </div>
          }
        >
          <TrainerIndividualMembershipsView initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}
