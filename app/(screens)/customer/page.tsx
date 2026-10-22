import { Suspense } from "react";
import { getMembership } from "@/app/actions/customer/getMembership";
import { getTrainerMembership } from "@/app/actions/customer/getTrainerMembership";
import MembershipCard from "./components/MembershipCard";
import TrainerPlanCard from "./components/TrainerPlanCard";
import TodayWorkoutCard from "./components/TodayWorkoutCard";
import StatsGrid from "./components/StatsGrid";
import WeeklyProgressCard from "./components/WeeklyProgressCard";
import MealPlanCard from "./components/MealPlanCard";

export default async function CustomerDashboard() {
  const [membership, trainerMembership] = await Promise.all([
    getMembership(),
    getTrainerMembership(),
  ]);

  return (
    <div className="flex flex-col pb-24">
      <div className="mb-5">
        <h1 className="text-white text-lg font-semibold mt-1">
          Every rep. Every step. <span className="text-[#D7FF00]">Better than yesterday.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<div className="h-44 bg-[#141414] border border-[#222222] rounded-3xl animate-pulse mb-4" />}>
          <MembershipCard 
            planName={membership?.planName || "NO PLAN"} 
            daysLeft={membership?.daysLeft || 0}
            progressPercentage={membership?.progressPercentage || 0}
            status={(membership?.status as "active" | "expired" | "none") || "none"}
            gymId={membership?.gymId || ""}
            customerId={membership?.customerId || ""}
          />
        </Suspense>

        <Suspense fallback={<div className="h-44 bg-[#141414] border border-[#222222] rounded-3xl animate-pulse mb-4" />}>
          <TrainerPlanCard initialData={trainerMembership} />
        </Suspense>
      </div>

      <TodayWorkoutCard />
      
      <StatsGrid />
      
      <WeeklyProgressCard />
      
      <MealPlanCard />
    </div>
  );
}
