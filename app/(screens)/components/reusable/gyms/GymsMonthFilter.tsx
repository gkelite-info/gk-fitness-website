"use client";

import { useRef } from "react";
import { CalendarBlank, X, CaretDown } from "@phosphor-icons/react";

interface GymsMonthFilterProps {
  selectedMonth: string;
  onChange: (month: string) => void;
  className?: string;
}

export default function GymsMonthFilter({
  selectedMonth,
  onChange,
  className = "",
}: GymsMonthFilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange("");
  };

  const formattedMonth = (() => {
    if (!selectedMonth) return "All Months";
    const parts = selectedMonth.split("-");
    if (parts.length === 2) {
      const year = parts[0];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const idx = parseInt(parts[1], 10) - 1;
      if (idx >= 0 && idx < 12) {
        return `${monthNames[idx]} ${year}`;
      }
    }
    return selectedMonth;
  })();

  return (
    <div
      className={`relative flex items-center justify-between h-10 px-3 rounded-xl bg-[#13151D] border transition-all cursor-pointer group select-none ${
        selectedMonth
          ? "border-[#D4FF32] text-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.15)]"
          : "border-[#222634] text-[#94A3B8] hover:text-white hover:border-[#323847]"
      } ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1 pointer-events-none">
        <CalendarBlank
          size={16}
          weight={selectedMonth ? "fill" : "regular"}
          className={`shrink-0 transition-colors ${
            selectedMonth ? "text-[#D4FF32]" : "text-[#94A3B8] group-hover:text-white"
          }`}
        />
        <span
          className={`text-xs font-semibold truncate ${
            selectedMonth ? "text-white" : "text-[#94A3B8] group-hover:text-white"
          }`}
        >
          {formattedMonth}
        </span>
      </div>

      {selectedMonth ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear month filter"
          className="relative z-20 ml-1.5 p-1 rounded-md hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X size={13} weight="bold" />
        </button>
      ) : (
        <CaretDown
          size={13}
          className="ml-1 text-[#64748B] group-hover:text-[#94A3B8] shrink-0 pointer-events-none"
        />
      )}

      <input
        ref={inputRef}
        type="month"
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 [color-scheme:dark]"
      />
    </div>
  );
}
