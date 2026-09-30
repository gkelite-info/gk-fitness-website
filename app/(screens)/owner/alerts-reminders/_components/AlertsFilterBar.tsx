"use client";

import { MagnifyingGlass, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { useState } from "react";

export default function AlertsFilterBar() {
  const [selectedType, setSelectedType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const typeOptions = [
    { label: "All Types", value: "" },
    { label: "Membership", value: "Membership" },
    { label: "Payment", value: "Payment" },
    { label: "Member", value: "Member" },
    { label: "Trainer", value: "Trainer" },
    { label: "Support", value: "Support" },
    { label: "PT Sessions", value: "PT Sessions" },
    { label: "Attendance", value: "Attendance" },
    { label: "Inventory", value: "Inventory" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4">
      {/* Search */}
      <div className="relative w-full lg:w-[400px] h-[38px] shrink-0">
        <div className="absolute left-3.5 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <MagnifyingGlass size={16} color="#64748B" weight="bold" />
        </div>
        <input 
          type="text" 
          placeholder="Search alerts..." 
          className="w-full h-full bg-[#131922] border border-[#222B37] rounded-lg pl-10 pr-4 font-sans font-normal text-[12px] leading-[14px] text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#323842]"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
        <div className="w-full sm:w-[140px]">
          <Dropdown
            options={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="All Types"
            triggerClassName="relative flex flex-row items-center justify-between px-3 w-full bg-[#131922] border border-[#222B37] rounded-lg cursor-pointer h-[38px] group transition-colors hover:bg-[#1a222c]"
          />
        </div>
        
        {/* Date Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-[360px]">
          <div className="relative flex items-center w-full h-[38px] bg-[#131922] border border-[#222B37] rounded-lg px-2.5 overflow-hidden hover:bg-[#1a222c] focus-within:border-[#323842] transition-colors">
            <span className="text-[#64748B] text-[10px] uppercase font-bold mr-1.5 tracking-wider shrink-0">From</span>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#CBD5E1] text-[12px] font-sans min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div className="relative flex items-center w-full h-[38px] bg-[#131922] border border-[#222B37] rounded-lg px-2.5 overflow-hidden hover:bg-[#1a222c] focus-within:border-[#323842] transition-colors">
            <span className="text-[#64748B] text-[10px] uppercase font-bold mr-1.5 tracking-wider shrink-0">To</span>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#CBD5E1] text-[12px] font-sans min-w-0 w-full cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
              style={{ colorScheme: "dark" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
