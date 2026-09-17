"use client";

import { Users, UserCheck, CurrencyDollar, TrendUp, CaretDown } from "@phosphor-icons/react";

export default function MetricsOverview() {
  const metrics = [
    {
      title: "Active Customers",
      value: "1,248",
      change: "+12.5%",
      subtext: "vs. yesterday",
      icon: <Users size={24} weight="fill" className="text-[#D4FF32]" />,
    },
    {
      title: "Check-ins",
      value: "432",
      change: "+8.2%",
      subtext: "vs. yesterday",
      icon: <UserCheck size={24} weight="fill" className="text-[#D4FF32]" />,
    },
    {
      title: "Revenue Today",
      value: "$4,280",
      change: "+15.3%",
      subtext: "vs. yesterday",
      icon: <CurrencyDollar size={24} weight="fill" className="text-[#D4FF32]" />,
    },
    {
      title: "Monthly Growth",
      value: "24.5%",
      change: "+4.1%",
      subtext: "vs. last month",
      icon: <TrendUp size={24} weight="fill" className="text-[#D4FF32]" />,
    },
  ];

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold text-xl text-white tracking-tight">Today's Overview</h2>
        <button className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-[#16171E] border border-[#262936] rounded-lg text-xs font-semibold text-[#E2E8F0] hover:bg-[#1f212a] transition-colors">
          Today <CaretDown size={12} className="text-[#94A3B8]" weight="bold" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="cursor-pointer flex items-center justify-between p-5 bg-[#14151A] border border-white/5 rounded-2xl relative overflow-hidden group hover:border-[#D4FF32]/30 transition-colors"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#1D2218] border border-[#D4FF32]/30 rounded-xl">
                {metric.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">
                  {metric.title}
                </span>
                <span className="font-black text-2xl text-white">
                  {metric.value}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-[#D4FF32] font-bold text-xs">
                <TrendUp size={12} weight="bold" />
                {metric.change}
              </div>
              <span className="text-[10px] text-[#94A3B8]">{metric.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
