import { Suspense } from "react";
import SuperAdminFinanceView from "@/app/(screens)/components/reusable/superadmin-finance/SuperAdminFinanceView";

export const metadata = {
  title: "Finance | SuperAdmin | GK-Gym Life",
  description: "SuperAdmin Finance overview, revenue, payouts, and recent transactions.",
};

export default function SuperAdminFinancePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] p-6 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <SuperAdminFinanceView />
    </Suspense>
  );
}
