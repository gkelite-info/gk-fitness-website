import { Suspense } from "react";
import GlobalSessionsRevenueView from "@/app/(screens)/components/reusable/superadmin-finance/GlobalSessionsRevenueView";

export const metadata = {
  title: "Global Sessions Revenue | SuperAdmin Finance | GK-Gym Life",
  description: "View revenue generated from global trainer sessions booked by customers.",
};

export default function GlobalSessionsRevenuePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <GlobalSessionsRevenueView />
    </Suspense>
  );
}
