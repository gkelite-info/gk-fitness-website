"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";

interface GymPlanRevenueHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isThisMonth: boolean;
  onBack: () => void;
}

export default function GymPlanRevenueHeader({
  selectedDate,
  onDateChange,
  isThisMonth,
  onBack,
}: GymPlanRevenueHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Finance"
            className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Gym Plan Revenue
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View revenue generated from gym owners' plan subscriptions.
        </p>
      </div>

      <div className="w-full sm:w-auto shrink-0 flex items-center justify-start sm:justify-end">
        <MonthCalendarPicker
          value={selectedDate}
          onChange={onDateChange}
          label={isThisMonth ? "This Month" : undefined}
          className="w-full sm:w-[170px]"
        />
      </div>
    </div>
  );
}
