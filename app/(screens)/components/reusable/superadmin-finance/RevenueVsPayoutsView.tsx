"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RevenueVsPayoutsHeader from "./RevenueVsPayoutsHeader";
import RevenueVsPayoutsKpiCards from "./RevenueVsPayoutsKpiCards";
import RevenueVsPayoutsMainChart from "./RevenueVsPayoutsMainChart";
import MonthlyHighlightsSection from "./MonthlyHighlightsSection";
import {
  REVENUE_VS_PAYOUTS_KPIS,
  REVENUE_VS_PAYOUTS_MONTHLY,
  MONTHLY_HIGHLIGHTS,
} from "./revenueVsPayoutsMockData";

export default function RevenueVsPayoutsView() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleBack = () => {
    router.push("/superadmin/finance");
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <RevenueVsPayoutsHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onBack={handleBack}
      />

      <RevenueVsPayoutsKpiCards kpis={REVENUE_VS_PAYOUTS_KPIS} />

      <RevenueVsPayoutsMainChart data={REVENUE_VS_PAYOUTS_MONTHLY} />

      <MonthlyHighlightsSection highlights={MONTHLY_HIGHLIGHTS} />
    </div>
  );
}
