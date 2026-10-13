"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CalendarBlank, CaretLeft, CaretRight, X } from "@phosphor-icons/react";

interface YearCalendarPickerProps {
  value: string;
  onChange: (year: string) => void;
  placeholder?: string;
}

const QUICK_YEARS = [2026, 2024, 2022, 2020, 2018, 2015];

export default function YearCalendarPicker({
  value,
  onChange,
  placeholder = "Select year",
}: YearCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getValidYear = useCallback((val: string) => {
    const p = parseInt(val, 10);
    return isNaN(p) || p < 1900 || p > 2100 ? new Date().getFullYear() : p;
  }, []);

  const [currentYear, setCurrentYear] = useState(() => getValidYear(value));
  const [yearPage, setYearPage] = useState(() => Math.floor(currentYear / 12) * 12);

  const checkPlacement = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setOpenUpwards(spaceBelow < 340 && spaceAbove > spaceBelow);
  }, []);

  const handleOpen = () => {
    if (!isOpen) {
      checkPlacement();
      setIsOpen(true);
    }
  };

  const handleToggle = () => {
    if (!isOpen) checkPlacement();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    checkPlacement();
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", checkPlacement, true);
    window.addEventListener("resize", checkPlacement);

    const valid = getValidYear(value);
    setCurrentYear(valid);
    setYearPage(Math.floor(valid / 12) * 12);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", checkPlacement, true);
      window.removeEventListener("resize", checkPlacement);
    };
  }, [isOpen, value, checkPlacement, getValidYear]);

  const handleYearSelect = (yr: number) => {
    setCurrentYear(yr);
    onChange(yr.toString());
    setIsOpen(false);
  };

  const yearsList = Array.from({ length: 12 }, (_, i) => yearPage + i);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`relative flex items-center rounded-xl bg-[#1B202D] border transition-colors w-full ${
          isOpen ? "border-[#D4FF32]" : "border-[#232B3C] focus-within:border-[#D4FF32]"
        }`}
      >
        <input
          type="text"
          value={value}
          onClick={handleOpen}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-11 pl-3.5 pr-10 bg-transparent text-sm text-white placeholder-[#4A5568] outline-none focus:outline-none focus-visible:outline-none"
        />

        <button
          type="button"
          onClick={handleToggle}
          aria-label="Toggle calendar"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#D4FF32] hover:bg-[#232B3C]/60 transition-all cursor-pointer active:scale-95"
        >
          <CalendarBlank size={18} weight={isOpen ? "fill" : "regular"} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            openUpwards ? "bottom-full mb-2.5" : "top-full mt-2.5"
          } left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 z-50 w-[calc(100vw-32px)] max-w-[320px] sm:w-[320px] bg-[#141824] border border-[#263145] rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-md flex flex-col gap-2.5`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#20293A]">
            <button
              type="button"
              onClick={() => setYearPage((prev) => prev - 12)}
              className="w-7 h-7 rounded-lg bg-[#1B2232] hover:bg-[#242E44] border border-[#28354E] flex items-center justify-center text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
            <span className="text-xs font-bold text-white tracking-wide">
              {yearPage} - {yearPage + 11}
            </span>
            <button
              type="button"
              onClick={() => setYearPage((prev) => prev + 12)}
              className="w-7 h-7 rounded-lg bg-[#1B2232] hover:bg-[#242E44] border border-[#28354E] flex items-center justify-center text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 py-0.5">
            {yearsList.map((yr) => {
              const isSelected = value === yr.toString();
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => handleYearSelect(yr)}
                  className={`h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "bg-[#D4FF32] text-black shadow-[0_0_12px_rgba(212,255,50,0.35)]"
                      : "bg-[#181F2E] hover:bg-[#222B3F] text-[#CBD5E1] hover:text-[#D4FF32] border border-[#242E42]"
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 pt-1.5 border-t border-[#20293A]">
            <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider">
              Quick Pick
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_YEARS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => handleYearSelect(yr)}
                  className="px-2 py-0.5 rounded-lg bg-[#1B2232] hover:bg-[#242E44] border border-[#28354E] text-[11px] font-medium text-[#CBD5E1] hover:text-[#D4FF32] transition-colors cursor-pointer"
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 pb-0.5 border-t border-[#20293A] text-xs">
            <button
              type="button"
              onClick={() => { onChange(""); setIsOpen(false); }}
              className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <X size={12} />
              <span>Clear</span>
            </button>
            <button
              type="button"
              onClick={() => handleYearSelect(new Date().getFullYear())}
              className="font-semibold text-[#D4FF32] hover:underline cursor-pointer"
            >
              Current Year ({new Date().getFullYear()})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
