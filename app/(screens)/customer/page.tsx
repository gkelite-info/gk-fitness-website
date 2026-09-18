import { getMembership } from "@/app/actions/customer/getMembership";
import MembershipCard from "./components/MembershipCard";
import TodayWorkoutCard from "./components/TodayWorkoutCard";
import StatsGrid from "./components/StatsGrid";
import WeeklyProgressCard from "./components/WeeklyProgressCard";
import MealPlanCard from "./components/MealPlanCard";

export default async function CustomerDashboard() {
  const membership = await getMembership();

  return (
    <div className="flex flex-col pb-24">
      <div className="mb-5">
        <h1 className="text-white text-lg font-semibold mt-1">
          Every rep. Every step. <span className="text-[#D7FF00]">Better than yesterday.</span>
        </h1>
      </div>

      <MembershipCard 
        planName={membership?.planName || "NO PLAN"} 
        daysLeft={membership?.daysLeft || 0}
        progressPercentage={membership?.progressPercentage || 0}
        status={(membership?.status as "active" | "expired" | "none") || "none"}
        gymId={membership?.gymId || ""}
      />

      <TodayWorkoutCard />
      
      <StatsGrid />
      
      <WeeklyProgressCard />
      
      <MealPlanCard />
    </div>
  );
}
