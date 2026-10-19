"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

interface FinanceYearCalendarPickerProps {
  value: string;
  onChange: (year: string) => void;
}

const QUICK_YEARS = ["This Year", "2025", "2024", "2023"];

export default function FinanceYearCalendarPicker({
  value,
  onChange,
}: FinanceYearCalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const currentYearNum = new Date().getFullYear();
  const getInitialYear = () => {
    if (value === "This Year") return currentYearNum;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? currentYearNum : parsed;
  };

  const [pageStartYear, setPageStartYear] = useState(() =>
    Math.floor(getInitialYear() / 12) * 12
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePrevDecade = () => {
    setPageStartYear((prev) => prev - 12);
  };

  const handleNextDecade = () => {
    setPageStartYear((prev) => prev + 12);
  };

  const handleSelectYear = (yr: number | string) => {
    onChange(yr.toString());
    setIsOpen(false);
  };

  const yearsGrid = Array.from({ length: 12 }, (_, i) => pageStartYear + i);

  const renderModalContent = () => (
    <div
      ref={popupRef}
      className={`${
        isMobile
          ? "fixed inset-x-4 top-1/2 -translate-y-1/2 z-[9999] max-w-[320px] mx-auto shadow-[0_24px_60px_rgba(0,0,0,0.95)]"
          : "absolute right-0 top-full mt-2 z-50 w-[300px] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      } bg-[#13151B] border border-[#232631] rounded-2xl p-4 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100`}
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-[#1E222D]">
        <button
          type="button"
          onClick={handlePrevDecade}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1C202C] transition-colors cursor-pointer"
        >
          <CaretLeft size={15} weight="bold" />
        </button>
        <span className="text-xs font-bold text-white tracking-wide">
          {pageStartYear} – {pageStartYear + 11}
        </span>
        <button
          type="button"
          onClick={handleNextDecade}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1C202C] transition-colors cursor-pointer"
        >
          <CaretRight size={15} weight="bold" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3">
        {yearsGrid.map((yr) => {
          const isSelected =
            value === yr.toString() ||
            (value === "This Year" && yr === currentYearNum);

          return (
            <button
              key={yr}
              type="button"
              onClick={() => handleSelectYear(yr)}
              className={`h-8 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                isSelected
                  ? "bg-[#D4FF32] text-black shadow-[0_0_10px_rgba(212,255,50,0.3)]"
                  : "bg-[#181F2E] hover:bg-[#222B3F] text-[#CBD5E1] hover:text-[#D4FF32] border border-[#242E42]"
              }`}
            >
              {yr}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-[#1E222D]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider">
            Quick Pick
          </span>
          <button
            type="button"
            onClick={() => {
              setPageStartYear(Math.floor(currentYearNum / 12) * 12);
              handleSelectYear("This Year");
            }}
            className="text-[10px] font-bold text-[#D4FF32] hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_YEARS.map((yr) => {
            const isSelected = value === yr;
            return (
              <button
                key={yr}
                type="button"
                onClick={() => handleSelectYear(yr)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#D4FF32]/10 border-[#D4FF32] text-[#D4FF32]"
                    : "bg-[#181F2E] border-[#242E42] text-[#CBD5E1] hover:text-white hover:border-[#384663]"
                }`}
              >
                {yr}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative inline-block text-left shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181D26] border border-[#262F3E] text-xs font-semibold text-white hover:border-[#383D50] transition-colors cursor-pointer select-none"
      >
        <CalendarBlank size={14} className="text-[#94A3B8] shrink-0" />
        <span className="whitespace-nowrap">{value}</span>
        <CaretDown
          size={12}
          className={`text-[#94A3B8] shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {isOpen &&
        (isMobile && mounted
          ? createPortal(
              <>
                <div
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs"
                />
                {renderModalContent()}
              </>,
              document.body
            )
          : renderModalContent())}
    </div>
  );
}
