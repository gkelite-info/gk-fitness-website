"use client";

import { PlusCircle } from "@phosphor-icons/react";

interface GymPassDashboardHeaderProps {
  onCreatePass?: () => void;
}

export default function GymPassDashboardHeader({
  onCreatePass,
}: GymPassDashboardHeaderProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-[#1E222D]">
      <div className="flex flex-col gap-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight break-words">
          Gym Pass Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-normal">
          Overview of pass performance
        </p>
      </div>

      <button
        onClick={onCreatePass}
        type="button"
        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4FF32] text-black font-semibold text-xs sm:text-sm hover:bg-[#c3ec29] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(212,255,50,0.25)] cursor-pointer w-full sm:w-auto shrink-0"
      >
        <PlusCircle size={20} weight="fill" className="shrink-0" />
        <span className="whitespace-nowrap">Create Gym Pass</span>
      </button>
    </div>
  );
}
