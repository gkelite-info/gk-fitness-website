"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";

interface RecentTransactionsHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onBack: () => void;
}

export default function RecentTransactionsHeader({
  selectedDate,
  onDateChange,
  onBack,
}: RecentTransactionsHeaderProps) {
  const currentYear = selectedDate.getFullYear();
  const label = `01 Oct ${currentYear} - 31 Oct ${currentYear}`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Finance"
            className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Recent Transactions
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Track the latest finance activity across the platform.
        </p>
      </div>

      <div className="w-full sm:w-auto shrink-0 flex items-center justify-start sm:justify-end">
        <MonthCalendarPicker
          value={selectedDate}
          onChange={onDateChange}
          label={label}
          noTruncate
          className="w-full sm:w-auto min-w-[240px]"
        />
      </div>
    </div>
  );
}
