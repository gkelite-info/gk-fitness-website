"use client";

import { Ticket, Coins, CurrencyInr } from "@phosphor-icons/react";

interface KpiData {
  activePasses: string;
  totalPurchases: string;
  gymPayouts: string;
  revenue: string;
}

interface GymPassKpiCardsProps {
  data?: KpiData;
  onTotalPurchasesClick?: () => void;
  onGymPayoutsClick?: () => void;
}

const defaultData: KpiData = {
  activePasses: "1,248",
  totalPurchases: "2,315",
  gymPayouts: "10",
  revenue: "₹80.1L",
};

export default function GymPassKpiCards({
  data = defaultData,
  onTotalPurchasesClick,
  onGymPayoutsClick,
}: GymPassKpiCardsProps) {
  const cards = [
    {
      label: "ACTIVE PASSES",
      value: data.activePasses,
      icon: Ticket,
      iconWeight: "fill" as const,
      iconColor: "text-[#22C55E]",
      bgCircle: "bg-[#14291F] border border-[#165330]",
      onClick: undefined,
    },
    {
      label: "TOTAL PURCHASES",
      value: data.totalPurchases,
      icon: Ticket,
      iconWeight: "fill" as const,
      iconColor: "text-[#A855F7]",
      bgCircle: "bg-[#251833] border border-[#58207E]",
      onClick: onTotalPurchasesClick,
    },
    {
      label: "GYM PAYOUTS",
      value: data.gymPayouts,
      icon: Coins,
      iconWeight: "fill" as const,
      iconColor: "text-[#A855F7]",
      bgCircle: "bg-[#251833] border border-[#58207E]",
      onClick: onGymPayoutsClick,
    },
    {
      label: "REVENUE",
      value: data.revenue,
      icon: CurrencyInr,
      iconWeight: "bold" as const,
      iconColor: "text-[#22C55E]",
      bgCircle: "bg-[#14291F] border border-[#165330]",
      onClick: undefined,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const isClickable = !!card.onClick;

        return (
          <div
            key={card.label}
            onClick={card.onClick}
            className={`w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm select-none transition-all ${
              isClickable
                ? "cursor-pointer hover:border-[#4B5267] hover:bg-[#161822] active:scale-[0.99]"
                : ""
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full ${card.bgCircle} flex items-center justify-center shrink-0 shadow-inner`}
            >
              <Icon size={22} weight={card.iconWeight} className={card.iconColor} />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#94A3B8] tracking-wider uppercase whitespace-nowrap">
                {card.label}
              </span>
              <span className="text-xl sm:text-2xl lg:text-[24px] font-bold text-white tracking-tight leading-tight mt-0.5 break-words">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
