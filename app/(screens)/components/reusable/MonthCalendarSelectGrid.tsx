"use client";

import { useEffect, useRef, useState } from "react";
import { SHORT_MONTHS } from "./monthCalendarUtils";

interface MonthCalendarSelectGridProps {
  viewMode: "months" | "years";
  value: Date;
  viewYear: number;
  onSelectMonth: (monthIndex: number) => void;
  onSelectYear: (year: number) => void;
}

export default function MonthCalendarSelectGrid({
  viewMode,
  value,
  viewYear,
  onSelectMonth,
  onSelectYear,
}: MonthCalendarSelectGridProps) {
  const yearsContainerRef = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState<number[]>(() => {
    const baseStart = Math.min(2026, value.getFullYear());
    return Array.from({ length: 30 }, (_, i) => baseStart + i);
  });

  useEffect(() => {
    if (viewMode === "years") {
      setYears((prev) => {
        const minYear = Math.min(2026, value.getFullYear());
        if (prev[0] > minYear) {
          const diff = prev[0] - minYear;
          const preBatch = Array.from({ length: diff }, (_, i) => minYear + i);
          return [...preBatch, ...prev];
        }
        return prev;
      });
    }
  }, [viewMode, value]);

  useEffect(() => {
    if (viewMode === "years" && yearsContainerRef.current) {
      const activeYearBtn = yearsContainerRef.current.querySelector(
        '[data-selected="true"]'
      );
      if (activeYearBtn) {
        activeYearBtn.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [viewMode]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 60) {
      setYears((prev) => {
        const last = prev[prev.length - 1];
        const nextBatch = Array.from({ length: 15 }, (_, i) => last + 1 + i);
        return [...prev, ...nextBatch];
      });
    }
  };

  if (viewMode === "months") {
    return (
      <div className="pt-3">
        <div className="grid grid-cols-3 gap-2">
          {SHORT_MONTHS.map((m, idx) => {
            const isSelectedMonth =
              value.getMonth() === idx && value.getFullYear() === viewYear;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onSelectMonth(idx)}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelectedMonth
                    ? "bg-[#D4FF32] text-black shadow-[0_0_12px_rgba(212,255,50,0.35)] font-bold"
                    : "bg-[#181A22] border border-[#242836] text-white hover:border-[#383D50] hover:text-[#D4FF32]"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3">
      <div
        ref={yearsContainerRef}
        onScroll={handleScroll}
        className="grid grid-cols-3 gap-2 max-h-[190px] overflow-y-auto pr-1 select-none"
      >
        {years.map((y) => {
          const isSelectedYear = value.getFullYear() === y;
          return (
            <button
              key={y}
              type="button"
              data-selected={isSelectedYear ? "true" : "false"}
              onClick={() => onSelectYear(y)}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelectedYear
                  ? "bg-[#D4FF32] text-black shadow-[0_0_12px_rgba(212,255,50,0.35)] font-bold"
                  : "bg-[#181A22] border border-[#242836] text-white hover:border-[#383D50] hover:text-[#D4FF32]"
              }`}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
}
