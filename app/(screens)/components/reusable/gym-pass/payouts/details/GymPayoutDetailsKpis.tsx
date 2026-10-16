"use client";

import { CreditCard, CalendarCheck, TrendUp } from "@phosphor-icons/react";
import { GymPayoutDetailsData } from "./payoutDetailsData";

interface GymPayoutDetailsKpisProps {
  data: GymPayoutDetailsData;
}

export default function GymPayoutDetailsKpis({
  data,
}: GymPayoutDetailsKpisProps) {
  const kpis = [
    {
      label: "Pending Amount",
      value: `₹${data.pendingAmount.toLocaleString("en-IN")}`,
      subText: null,
      icon: CreditCard,
    },
    {
      label: "Last Paid",
      value: `₹${data.lastPaidAmount.toLocaleString("en-IN")}`,
      subText: data.lastPaidDate,
      icon: CalendarCheck,
    },
    {
      label: "Total Payouts",
      value: `₹${data.totalPayouts.toLocaleString("en-IN")}`,
      subText: "This Month",
      icon: TrendUp,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className="bg-[#13151B] border border-[#232631] rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-[#14291F] border border-[#165330] flex items-center justify-center shrink-0 shadow-inner">
              <Icon size={20} weight="fill" className="text-[#22C55E]" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-medium text-[#94A3B8]">
                {kpi.label}
              </span>

              <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
                <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                  {kpi.value}
                </span>

                {kpi.subText && (
                  <span className="text-[11px] text-[#94A3B8] font-medium whitespace-nowrap">
                    {kpi.subText}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
