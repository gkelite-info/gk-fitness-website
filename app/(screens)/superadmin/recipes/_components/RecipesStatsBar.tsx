"use client";

import { Egg, BowlFood, Cookie, Sparkle } from "@phosphor-icons/react";

interface RecipesStatsBarProps {
  stats: {
    total: number;
    breakfast: number;
    lunch: number;
    snack: number;
    dinner: number;
  };
}

export function RecipesStatsBar({ stats }: RecipesStatsBarProps) {
  const cards = [
    {
      title: "All Recipes",
      value: stats.total,
      icon: Sparkle,
      color: "text-[#D4FF32]",
      bg: "bg-[#D4FF32]/10",
      border: "border-[#D4FF32]/20",
    },
    {
      title: "Breakfast Meals",
      value: stats.breakfast,
      icon: Egg,
      color: "text-[#FBBF24]",
      bg: "bg-[#FBBF24]/10",
      border: "border-[#FBBF24]/20",
    },
    {
      title: "Lunch & Dinner",
      value: stats.lunch + stats.dinner,
      icon: BowlFood,
      color: "text-[#38BDF8]",
      bg: "bg-[#38BDF8]/10",
      border: "border-[#38BDF8]/20",
    },
    {
      title: "Snacks & Quick Bites",
      value: stats.snack,
      icon: Cookie,
      color: "text-[#FB923C]",
      bg: "bg-[#FB923C]/10",
      border: "border-[#FB923C]/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 flex items-center justify-between transition-all hover:border-[#353A4B]"
          >
            <div>
              <p className="text-xs font-medium text-[#94A3B8]">{card.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center shrink-0`}>
              <Icon size={20} weight="fill" className={card.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
