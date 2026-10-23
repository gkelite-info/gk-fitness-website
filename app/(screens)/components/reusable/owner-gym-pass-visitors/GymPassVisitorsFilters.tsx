"use client";

import { MagnifyingGlass, CalendarBlank } from "@phosphor-icons/react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import { PASS_TYPE_OPTIONS, STATUS_OPTIONS } from "./types";

interface GymPassVisitorsFiltersProps {
  fromDate: Date;
  onFromDateChange: (d: Date) => void;
  toDate: Date;
  onToDateChange: (d: Date) => void;
  passType: string;
  onPassTypeChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function GymPassVisitorsFilters({
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  passType,
  onPassTypeChange,
  status,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: GymPassVisitorsFiltersProps) {
  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Mobile view (< 640px) */}
      <div className="flex flex-col gap-2.5 sm:hidden w-full">
        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap w-20 shrink-0">
            From Date
          </span>
          <div className="flex-1 min-w-0">
            <MonthCalendarPicker
              value={fromDate}
              onChange={onFromDateChange}
              showDay={true}
              noTruncate={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap w-20 shrink-0">
            To Date
          </span>
          <div className="flex-1 min-w-0">
            <MonthCalendarPicker
              value={toDate}
              onChange={onToDateChange}
              showDay={true}
              noTruncate={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap w-20 shrink-0">
            Pass Type
          </span>
          <div className="flex-1 min-w-0">
            <Dropdown
              options={PASS_TYPE_OPTIONS}
              value={passType}
              onChange={onPassTypeChange}
              noTruncate={true}
              triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full bg-[#12141A] border border-[#202532] rounded-xl cursor-pointer h-[40px] text-xs text-white hover:border-[#32394A] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap w-20 shrink-0">
            Status
          </span>
          <div className="flex-1 min-w-0">
            <Dropdown
              options={STATUS_OPTIONS}
              value={status}
              onChange={onStatusChange}
              noTruncate={true}
              triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full bg-[#12141A] border border-[#202532] rounded-xl cursor-pointer h-[40px] text-xs text-white hover:border-[#32394A] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Tablet, iPad & Desktop view (>= 640px) */}
      <div className="hidden sm:flex sm:flex-wrap items-center gap-x-2.5 sm:gap-x-3 md:gap-x-3.5 lg:gap-x-4 gap-y-2.5 w-full">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap shrink-0">
            From Date
          </span>
          <div className="w-[144px] shrink-0">
            <MonthCalendarPicker
              value={fromDate}
              onChange={onFromDateChange}
              showDay={true}
              noTruncate={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap shrink-0">
            To Date
          </span>
          <div className="w-[144px] shrink-0">
            <MonthCalendarPicker
              value={toDate}
              onChange={onToDateChange}
              showDay={true}
              noTruncate={true}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap shrink-0">
            Pass Type
          </span>
          <div className="w-[154px] shrink-0">
            <Dropdown
              options={PASS_TYPE_OPTIONS}
              value={passType}
              onChange={onPassTypeChange}
              noTruncate={true}
              triggerClassName="relative flex flex-row items-center justify-between px-2.5 sm:px-3 py-2 w-full bg-[#12141A] border border-[#202532] rounded-xl cursor-pointer h-[40px] text-xs text-white hover:border-[#32394A] transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap shrink-0">
            Status
          </span>
          <div className="w-[124px] shrink-0">
            <Dropdown
              options={STATUS_OPTIONS}
              value={status}
              onChange={onStatusChange}
              noTruncate={true}
              triggerClassName="relative flex flex-row items-center justify-between px-2.5 sm:px-3 py-2 w-full bg-[#12141A] border border-[#202532] rounded-xl cursor-pointer h-[40px] text-xs text-white hover:border-[#32394A] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by customer name, phone, pass ID..."
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#101217] border border-[#1E222D] text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white p-1 cursor-pointer"
          >
            <span className="text-xs">✕</span>
          </button>
        )}
      </div>
    </div>
  );
}
