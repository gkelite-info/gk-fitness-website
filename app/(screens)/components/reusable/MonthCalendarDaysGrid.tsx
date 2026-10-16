"use client";

import { WEEKDAYS } from "./monthCalendarUtils";

interface MonthCalendarDaysGridProps {
  value: Date;
  viewYear: number;
  viewMonth: number;
  firstDayOfWeek: number;
  daysInMonth: number;
  prevMonthDays: number;
  onSelectDay: (day: number) => void;
}

export default function MonthCalendarDaysGrid({
  value,
  viewYear,
  viewMonth,
  firstDayOfWeek,
  daysInMonth,
  prevMonthDays,
  onSelectDay,
}: MonthCalendarDaysGridProps) {
  const isSelected = (day: number) => {
    return (
      value.getFullYear() === viewYear &&
      value.getMonth() === viewMonth &&
      value.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  return (
    <div className="pt-3">
      <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
        {WEEKDAYS.map((w) => (
          <span
            key={w}
            className="text-[11px] font-bold text-[#64748B] uppercase py-0.5"
          >
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div
            key={`prev-${i}`}
            className="h-8 flex items-center justify-center text-xs text-[#333A4D] font-medium"
          >
            {prevMonthDays - firstDayOfWeek + i + 1}
          </div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                selected
                  ? "bg-[#D4FF32] text-black shadow-[0_0_12px_rgba(212,255,50,0.35)] font-bold scale-105"
                  : today
                  ? "text-[#D4FF32] border border-[#D4FF32]/40 hover:bg-[#1C202C]"
                  : "text-white hover:bg-[#1C202C] hover:text-[#D4FF32]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
