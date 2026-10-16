"use client";

import { ArrowLeft, Wallet, Receipt, Coins } from "@phosphor-icons/react";

interface GymPayoutsHeaderProps {
  onBack: () => void;
}

export default function GymPayoutsHeader({ onBack }: GymPayoutsHeaderProps) {
  const payoutStats = [
    {
      label: "Pending Payouts",
      value: "₹2,84,650",
      subLabel: "8 gyms",
      subColor: "text-[#D4FF32]",
      icon: Wallet,
      iconColor: "text-[#D4FF32]",
      bgBox: "bg-[#14291F] border border-[#165330]",
    },
    {
      label: "Paid This Month",
      value: "₹6,42,300",
      subLabel: "15 gyms",
      subColor: "text-[#94A3B8]",
      icon: Receipt,
      iconColor: "text-[#22C55E]",
      bgBox: "bg-[#14291F] border border-[#165330]",
    },
    {
      label: "Total Payouts",
      value: "₹9,26,950",
      subLabel: "This Month",
      subColor: "text-[#94A3B8]",
      icon: Coins,
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
            Gym Payouts
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
            Manage and track payout distributions across partner gyms
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {payoutStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bgBox} flex items-center justify-center shrink-0 shadow-inner`}
                >
                  <Icon size={20} weight="fill" className={stat.iconColor} />
                </div>
                <span className="text-xs font-medium text-[#94A3B8]">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className={`text-xs font-semibold ${stat.subColor}`}>
                  {stat.subLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
