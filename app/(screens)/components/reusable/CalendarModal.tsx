"use client";

import { useState, useEffect } from "react";
import {
  CaretLeft,
  CaretRight,
  X,
  CalendarBlank,
} from "@phosphor-icons/react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: string | null;
  onSelectDate: (formattedDate: string, rawDate: Date) => void;
  title?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function formatForApp(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = SHORT_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function CalendarModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  title = "Select Date",
}: CalendarModalProps) {
  const [viewDate, setViewDate] = useState(() => new Date());

  useEffect(() => {
    if (selectedDate) {
      const parsed = new Date(selectedDate);
      if (!isNaN(parsed.getTime())) {
        setViewDate(parsed);
      }
    }
  }, [selectedDate, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = (firstDayOfMonth + 6) % 7;

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === currentMonth &&
    today.getFullYear() === currentYear;

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const parsed = new Date(selectedDate);
    if (isNaN(parsed.getTime())) return false;
    return (
      parsed.getDate() === day &&
      parsed.getMonth() === currentMonth &&
      parsed.getFullYear() === currentYear
    );
  };

  const handlePickDate = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    onSelectDate(formatForApp(d), d);
    onClose();
  };

  const handlePickToday = () => {
    const d = new Date();
    onSelectDate(formatForApp(d), d);
    onClose();
  };

  const handlePickTomorrow = () => {
    const d = new Date(Date.now() + 86400000);
    onSelectDate(formatForApp(d), d);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-[#0E131E] border border-[#1C2638] rounded-2xl shadow-2xl overflow-hidden p-5 space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#1C2638]">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <CalendarBlank size={18} className="text-[#D4FF32]" />
            <span>{title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#141B28] hover:bg-[#1E283A] text-[#8E99AB] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-lg bg-[#141B28] border border-[#232F46] hover:bg-[#1E283A] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <CaretLeft size={16} />
          </button>
          <span className="text-sm font-bold text-white">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-lg bg-[#141B28] border border-[#232F46] hover:bg-[#1E283A] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <CaretRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#64748B] py-1">
          {WEEK_DAYS.map((wd) => (
            <span key={wd} className="h-7 flex items-center justify-center">
              {wd}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: offset }).map((_, idx) => (
            <span key={`empty-${idx}`} className="h-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const day = idx + 1;
            const active = isSelected(day);
            const currentDay = isToday(day);

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() => handlePickDate(day)}
                className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ${
                  active
                    ? "bg-[#D4FF32] text-black font-bold shadow-[0_0_10px_rgba(212,255,50,0.4)]"
                    : currentDay
                    ? "bg-[#141B28] border border-[#D4FF32]/50 text-[#D4FF32] hover:bg-[#1E283A]"
                    : "text-white hover:bg-[#141B28] hover:text-[#D4FF32]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#1C2638] text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePickToday}
              className="px-2.5 py-1.5 rounded-lg bg-[#141B28] border border-[#232F46] text-[#D4FF32] font-semibold hover:bg-[#1E283A] transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handlePickTomorrow}
              className="px-2.5 py-1.5 rounded-lg bg-[#141B28] border border-[#232F46] text-white font-semibold hover:bg-[#1E283A] transition-colors cursor-pointer"
            >
              Tomorrow
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#1A2234] text-[#8E99AB] hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
