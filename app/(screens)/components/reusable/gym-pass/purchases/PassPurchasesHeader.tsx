"use client";

import { ArrowLeft, LockKey, CurrencyInr, UsersThree, CalendarBlank } from "@phosphor-icons/react";

interface PassPurchasesHeaderProps {
  onBack: () => void;
}

export default function PassPurchasesHeader({ onBack }: PassPurchasesHeaderProps) {
  const kpiStats = [
    {
      label: "Total Purchases",
      value: "2,315",
      icon: LockKey,
      iconColor: "text-[#D4FF32]",
      bgBox: "bg-[#14291F] border border-[#165330]",
    },
    {
      label: "Total Revenue",
      value: "₹80.1L",
      icon: CurrencyInr,
      iconColor: "text-[#22C55E]",
      bgBox: "bg-[#14291F] border border-[#165330]",
    },
    {
      label: "Active Passes",
      value: "1,248",
      icon: UsersThree,
      iconColor: "text-[#EAB308]",
      bgBox: "bg-[#252516] border border-[#484218]",
    },
    {
      label: "Gym Visits",
      value: "6,480",
      icon: CalendarBlank,
      iconColor: "text-[#EAB308]",
      bgBox: "bg-[#252516] border border-[#484218]",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Gym Pass Dashboard"
          className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
            Pass Purchases
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
            Track all Gym Pass purchases and customer usage
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {kpiStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.bgBox} flex items-center justify-center shrink-0 shadow-inner`}
              >
                <Icon size={22} weight="fill" className={stat.iconColor} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-[11px] sm:text-xs font-medium text-[#94A3B8] whitespace-nowrap">
                  {stat.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mt-0.5">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
