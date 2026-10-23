"use client";

import { CalendarBlank, CaretDown } from "@phosphor-icons/react";

interface GymPassVisitorsHeaderProps {
  dateRangeText?: string;
  onDateRangeClick?: () => void;
}

export default function GymPassVisitorsHeader({
  dateRangeText = "01 Oct 2026 - 31 Oct 2026",
  onDateRangeClick,
}: GymPassVisitorsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
          Gym Pass Visitors
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Customers who have visited your gym using a Gym Pass.
        </p>
      </div>

      <button
        type="button"
        onClick={onDateRangeClick}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#131620] border border-[#222736] text-[#CBD5E1] hover:text-white hover:border-[#D4FF32]/50 text-xs sm:text-sm font-medium transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
      >
        <CalendarBlank size={16} className="text-[#94A3B8]" />
        <span>{dateRangeText}</span>
        <CaretDown size={14} className="text-[#94A3B8]" />
      </button>
    </div>
  );
}
