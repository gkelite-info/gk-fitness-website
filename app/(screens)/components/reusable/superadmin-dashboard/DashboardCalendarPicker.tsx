"use client";

import { useState, useRef } from "react";
import { CalendarBlank } from "@phosphor-icons/react";

export default function DashboardCalendarPicker() {
  const [dateValue, setDateValue] = useState("2026-10-09");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        try {
          inputRef.current.showPicker();
          return;
        } catch { }
      }
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="relative inline-flex items-center h-[34px] px-3.5 rounded-lg bg-[#111925] border border-[#1B2737] hover:border-[#22354A] shadow-sm transition-all cursor-pointer group"
    >
      <CalendarBlank
        size={16}
        className="text-[#94A3B8] shrink-0 mr-2 pointer-events-none group-hover:text-white transition-colors"
      />
      <input
        ref={inputRef}
        type="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        style={{ colorScheme: "dark" }}
        className="bg-transparent border-none outline-none text-xs font-medium text-[#CBD5E1] group-hover:text-white cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
      />
    </div>
  );
}
