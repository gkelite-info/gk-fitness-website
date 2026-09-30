"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarBlank, CaretDown, CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function FinanceHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setSelectedYear(viewYear);
    setIsOpen(false);
  };

  const isCurrentMonth = selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear();
  const displayText = isCurrentMonth ? "This Month" : `${MONTHS[selectedMonth]} ${selectedYear}`;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-sans font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
          Finances
        </h1>
        <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
          Overview of your gym's financial performance.
        </span>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-row items-center justify-center px-3.5 py-2 gap-2 border rounded-[12px] transition-colors cursor-pointer shrink-0 ${
            isOpen 
              ? "bg-[#1A1C23] border-[#374151]" 
              : "bg-[#13161C] border-[#232934] hover:bg-[#1A1C23]"
          }`}
        >
          <CalendarBlank size={16} weight="regular" className={isCurrentMonth ? "text-[#CCFF00]" : "text-[#94A3B8]"} />
          <span className={`font-sans font-[500] text-[12px] leading-[16px] whitespace-nowrap ${isCurrentMonth ? "text-[#CCFF00]" : "text-[#E2E8F0]"}`}>
            {displayText}
          </span>
          <CaretDown size={14} weight="regular" className="text-[#94A3B8] ml-1" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-[240px] bg-[#111622] border border-[#232936] rounded-[16px] shadow-[0px_8px_32px_rgba(0,0,0,0.4)] z-50 p-4">
            {/* Year Navigation */}
            <div className="flex flex-row items-center justify-between mb-4">
              <button 
                onClick={() => setViewYear(prev => prev - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1A1C23] transition-colors cursor-pointer text-[#9CA3AF] hover:text-white"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <span className="font-sans font-semibold text-[14px] text-white">
                {viewYear}
              </span>
              <button 
                onClick={() => setViewYear(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1A1C23] transition-colors cursor-pointer text-[#9CA3AF] hover:text-white"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>

            {/* Months Grid */}
            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((month, index) => {
                const isSelected = selectedMonth === index && selectedYear === viewYear;
                return (
                  <button
                    key={month}
                    onClick={() => handleSelectMonth(index)}
                    className={`h-9 flex items-center justify-center rounded-[10px] font-sans font-medium text-[12px] transition-colors cursor-pointer ${
                      isSelected 
                        ? "bg-[rgba(204,255,0,0.1)] text-[#CCFF00] border border-[rgba(204,255,0,0.25)]" 
                        : "bg-transparent text-[#94A3B8] hover:bg-[#1A1C23] hover:text-[#E2E8F0]"
                    }`}
                  >
                    {month}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
