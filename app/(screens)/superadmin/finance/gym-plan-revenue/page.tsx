import { Suspense } from "react";
import GymPlanRevenueView from "@/app/(screens)/components/reusable/superadmin-finance/GymPlanRevenueView";

export const metadata = {
  title: "Gym Plan Revenue | SuperAdmin Finance | GK-Gym Life",
  description: "View revenue generated from gym owners' plan subscriptions.",
};

export default function GymPlanRevenuePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <GymPlanRevenueView />
    </Suspense>
  );
}
