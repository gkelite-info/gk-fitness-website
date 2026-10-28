"use client";

import {
  Star,
  Eye,
  EyeSlash,
  ClockCountdown,
} from "@phosphor-icons/react";
import { ReviewsStats } from "../types";

interface ReviewsKPIsProps {
  stats: ReviewsStats;
  activeStatus: string;
  onSelectStatus: (status: "all" | "approved" | "pending" | "deleted") => void;
}

export function ReviewsKPIs({ stats, activeStatus, onSelectStatus }: ReviewsKPIsProps) {
  const cards = [
    {
      label: "TOTAL TESTIMONIALS",
      value: String(stats.total).padStart(2, "0"),
      statusKey: "all" as const,
      icon: Star,
      accentColor: "text-white",
      borderColor: activeStatus === "all" ? "border-[#D4FF32]" : "border-[#1E2536]",
      bgGlow: activeStatus === "all" ? "bg-[#D4FF32]/[0.06]" : "bg-[#0E121A]",
      iconBg: "bg-white/10 text-white",
    },
    {
      label: "LIVE & VISIBLE",
      value: String(stats.approved).padStart(2, "0"),
      statusKey: "approved" as const,
      icon: Eye,
      accentColor: "text-[#34D399]",
      borderColor: activeStatus === "approved" ? "border-[#34D399]" : "border-[#1E2536]",
      bgGlow: activeStatus === "approved" ? "bg-[#34D399]/[0.08]" : "bg-[#0E121A]",
      iconBg: "bg-[#34D399]/20 text-[#34D399]",
    },
    {
      label: "PENDING MODERATION",
      value: String(stats.pending).padStart(2, "0"),
      statusKey: "pending" as const,
      icon: ClockCountdown,
      accentColor: "text-[#FBBF24]",
      borderColor: activeStatus === "pending" ? "border-[#FBBF24]" : "border-[#1E2536]",
      bgGlow: activeStatus === "pending" ? "bg-[#FBBF24]/[0.08]" : "bg-[#0E121A]",
      iconBg: "bg-[#FBBF24]/20 text-[#FBBF24]",
    },
    {
      label: "ARCHIVED / HIDDEN",
      value: String(stats.deleted).padStart(2, "0"),
      statusKey: "deleted" as const,
      icon: EyeSlash,
      accentColor: "text-[#F87171]",
      borderColor: activeStatus === "deleted" ? "border-[#F87171]" : "border-[#1E2536]",
      bgGlow: activeStatus === "deleted" ? "bg-[#F87171]/[0.08]" : "bg-[#0E121A]",
      iconBg: "bg-[#F87171]/20 text-[#F87171]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
      {cards.map((c) => {
        const Icon = c.icon;

        return (
          <button
            key={c.label}
            type="button"
            onClick={() => onSelectStatus(c.statusKey)}
            className={`w-full p-5 rounded-2xl border transition-all cursor-pointer text-left ${c.borderColor} ${c.bgGlow} hover:border-white/30 shadow-md`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#8E99AB] uppercase tracking-wider">
                {c.label}
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
                <Icon size={18} weight="bold" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-3xl sm:text-4xl font-black tracking-tight ${c.accentColor}`}>
                {c.value}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
