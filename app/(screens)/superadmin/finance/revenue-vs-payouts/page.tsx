import { Suspense } from "react";
import RevenueVsPayoutsView from "@/app/(screens)/components/reusable/superadmin-finance/RevenueVsPayoutsView";

export const metadata = {
  title: "Revenue vs Payouts | SuperAdmin Finance | GK-Gym Life",
  description: "Compare platform revenue and payouts over time.",
};

export default function RevenueVsPayoutsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <RevenueVsPayoutsView />
    </Suspense>
  );
}
