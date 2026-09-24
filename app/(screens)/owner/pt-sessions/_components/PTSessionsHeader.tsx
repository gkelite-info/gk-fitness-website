"use client";

import { useRef } from "react";
import { CalendarBlank, CaretDown } from "@phosphor-icons/react";

interface PTSessionsHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const getLocalYMD = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
};

export default function PTSessionsHeader({ selectedDate, onDateChange }: PTSessionsHeaderProps) {
  const dateRef = useRef<HTMLInputElement>(null);

  const handleOpenCalendar = () => {
    dateRef.current?.showPicker();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-sans font-bold text-[24px] leading-8 tracking-[-0.6px] text-white">
          PT Sessions
        </h1>
        <p className="font-sans font-normal text-[12px] leading-4 text-[#828F9F]">
          Manage personal training sessions for {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
        </p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={handleOpenCalendar}
          className="flex flex-row items-center px-4 py-2 gap-2.5 bg-[#121620] border border-[#212836] rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2C] transition-colors cursor-pointer"
        >
          <CalendarBlank size={16} weight="regular" className="text-[#94A3B8]" />
          <span className="font-sans font-medium text-[12px] leading-4 text-white whitespace-nowrap">
            {selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <CaretDown size={14} weight="bold" className="text-[#64748B] ml-1.5" />
        </button>
        <input
          ref={dateRef}
          type="date"
          className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
          value={getLocalYMD(selectedDate)}
          max={getLocalYMD(new Date())}
          onChange={(e) => {
            if (e.target.value) {
              const [year, month, day] = e.target.value.split('-').map(Number);
              onDateChange(new Date(year, month - 1, day));
            }
          }}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}

