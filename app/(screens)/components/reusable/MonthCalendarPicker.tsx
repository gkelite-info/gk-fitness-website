"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CalendarBlank, CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { MONTH_NAMES } from "./monthCalendarUtils";
import MonthCalendarDaysGrid from "./MonthCalendarDaysGrid";
import MonthCalendarSelectGrid from "./MonthCalendarSelectGrid";

interface MonthCalendarPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
  label?: string;
}

export default function MonthCalendarPicker({
  value,
  onChange,
  className = "",
  label,
}: MonthCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(new Date(value));
  const [viewMode, setViewMode] = useState<"calendar" | "months" | "years">("calendar");
  const [isMobile, setIsMobile] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setViewDate(new Date(value));
  }, [value]);

  const calculateCoords = () => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    const rect = triggerRef.current.getBoundingClientRect();
    const calendarWidth = 320;
    const calendarHeight = 360;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let left = Math.max(16, rect.right - calendarWidth);
    if (left + calendarWidth > windowWidth - 16) {
      left = windowWidth - calendarWidth - 16;
    }

    const openUpwards = (windowHeight - rect.bottom) < calendarHeight && rect.top > calendarHeight;
    const top = openUpwards
      ? Math.max(16, rect.top - calendarHeight - 8)
      : Math.min(windowHeight - calendarHeight - 16, rect.bottom + 8);

    return { top, left };
  };

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const isMobileView = window.innerWidth < 640;
    setIsMobile(isMobileView);
    if (isMobileView) return;
    setCoords(calculateCoords());
  };

  const handleToggle = () => {
    if (!isOpen) {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
      if (!isMobileView && triggerRef.current) {
        setCoords(calculateCoords());
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setViewMode("calendar");
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener("scroll", handleScrollOrResize, true);
      window.addEventListener("resize", handleScrollOrResize);
      return () => {
        window.removeEventListener("scroll", handleScrollOrResize, true);
        window.removeEventListener("resize", handleScrollOrResize);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || popupRef.current?.contains(target)) return;
      setIsOpen(false);
      setViewMode("calendar");
    };

    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handlePrev = () => {
    const step = viewMode === "calendar" ? [0, -1] : viewMode === "months" ? [-1, 0] : [-5, 0];
    setViewDate(new Date(viewYear + step[0], viewMonth + step[1], 1));
  };

  const handleNext = () => {
    const step = viewMode === "calendar" ? [0, 1] : viewMode === "months" ? [1, 0] : [5, 0];
    setViewDate(new Date(viewYear + step[0], viewMonth + step[1], 1));
  };

  const handleSelectMonth = (monthIndex: number) => {
    const updated = new Date(viewYear, monthIndex, 1);
    setViewDate(updated);
    onChange(updated);
    setViewMode("calendar");
  };

  const handleSelectYear = (year: number) => {
    const updated = new Date(year, viewMonth, 1);
    setViewDate(updated);
    onChange(updated);
    setViewMode("months");
  };

  const handleSelectDay = (day: number) => {
    onChange(new Date(viewYear, viewMonth, day));
    setIsOpen(false);
  };

  const handleSelectThisMonth = () => {
    const now = new Date();
    setViewDate(now);
    onChange(now);
    setIsOpen(false);
    setViewMode("calendar");
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
  const displayLabel = label || `${MONTH_NAMES[value.getMonth()]} ${value.getFullYear()}`;

  const renderCalendarContent = () => {
    const activeCoords = !isMobile && coords.top === 0 && coords.left === 0 ? calculateCoords() : coords;

    return (
      <div
        ref={popupRef}
        style={!isMobile ? { top: activeCoords.top, left: activeCoords.left } : undefined}
        className={`${
          isMobile
            ? "fixed inset-x-4 top-1/2 -translate-y-1/2 z-[9999] max-w-[340px] mx-auto"
            : "fixed z-[9999] w-[320px]"
        } bg-[#13151B] border border-[#232631] rounded-2xl p-4 shadow-[0_24px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-150`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#1E222D]">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1C202C] transition-colors cursor-pointer"
          >
            <CaretLeft size={16} weight="bold" />
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "months" ? "calendar" : "months")}
              className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                viewMode === "months"
                  ? "bg-[#D4FF32] text-black shadow-[0_0_10px_rgba(212,255,50,0.3)]"
                  : "text-white hover:text-[#D4FF32] hover:bg-[#1C202C]"
              }`}
            >
              {MONTH_NAMES[viewMonth]}
            </button>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === "years" ? "calendar" : "years")}
              className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                viewMode === "years"
                  ? "bg-[#D4FF32] text-black shadow-[0_0_10px_rgba(212,255,50,0.3)]"
                  : "text-white hover:text-[#D4FF32] hover:bg-[#1C202C]"
              }`}
            >
              {viewYear}
            </button>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1C202C] transition-colors cursor-pointer"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>

        {viewMode === "calendar" && (
          <MonthCalendarDaysGrid
            value={value}
            viewYear={viewYear}
            viewMonth={viewMonth}
            firstDayOfWeek={firstDayOfWeek}
            daysInMonth={daysInMonth}
            prevMonthDays={prevMonthDays}
            onSelectDay={handleSelectDay}
          />
        )}

        {(viewMode === "months" || viewMode === "years") && (
          <MonthCalendarSelectGrid
            viewMode={viewMode}
            value={value}
            viewYear={viewYear}
            onSelectMonth={handleSelectMonth}
            onSelectYear={handleSelectYear}
          />
        )}

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1E222D]">
          <button
            type="button"
            onClick={handleSelectThisMonth}
            className="text-xs font-bold text-[#D4FF32] hover:underline cursor-pointer"
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setViewMode("calendar");
            }}
            className="text-xs font-medium text-[#94A3B8] hover:text-white cursor-pointer px-2 py-1 rounded-md hover:bg-[#1C202C] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className="w-full h-[40px] px-3 py-2 bg-[#181A22] border border-[#242836] hover:border-[#383D50] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white flex items-center justify-between gap-2.5 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <CalendarBlank size={16} className="text-[#D4FF32] shrink-0" />
          <span className="truncate font-medium">{displayLabel}</span>
        </div>
        <CaretDown
          size={14}
          className={`text-[#64748B] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {mounted &&
        isOpen &&
        createPortal(
          <>
            {isMobile && (
              <div
                onClick={() => {
                  setIsOpen(false);
                  setViewMode("calendar");
                }}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs"
              />
            )}
            {renderCalendarContent()}
          </>,
          document.body
        )}
    </div>
  );
}
