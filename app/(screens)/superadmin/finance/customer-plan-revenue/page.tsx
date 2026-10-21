import { Suspense } from "react";
import CustomerPlanRevenueView from "@/app/(screens)/components/reusable/superadmin-finance/CustomerPlanRevenueView";

export const metadata = {
  title: "Individual Customer Plan Revenue | SuperAdmin Finance | GK-Gym Life",
  description: "View revenue generated from individual customer plan subscriptions.",
};

export default function CustomerPlanRevenuePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CustomerPlanRevenueView />
    </Suspense>
  );
}
