"use client";

import { MagnifyingGlass, CalendarBlank, CaretDown, X } from "@phosphor-icons/react";

interface DemoRequestsFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedDateRange: string;
  onDateRangeChange: (range: string) => void;
  onClearFilters: () => void;
}

export function DemoRequestsFilters({
  searchQuery,
  onSearchChange,
  selectedPlan,
  onPlanChange,
  selectedStatus,
  onStatusChange,
  selectedDateRange,
  onDateRangeChange,
  onClearFilters,
}: DemoRequestsFiltersProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedPlan !== "all" ||
    selectedStatus !== "all" ||
    selectedDateRange !== "last_30_days";

  return (
    <div className="w-full flex flex-col xl:flex-row items-stretch xl:items-end justify-between gap-4">
      <div className="flex-1 min-w-[280px] sm:min-w-[340px]">
        <div className="relative w-full">
          <MagnifyingGlass
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E99AB]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, gym name, city, email or phone..."
            className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl pl-11 pr-10 text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99AB] hover:text-white p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-end gap-3 sm:gap-4 shrink-0">
        <div className="flex flex-col gap-1.5 flex-1 sm:flex-initial">
          <label className="text-xs font-bold text-[#CBD5E1] tracking-wide ml-0.5">
            Plan
          </label>
          <div className="relative">
            <select
              value={selectedPlan}
              onChange={(e) => onPlanChange(e.target.value)}
              className="h-11 w-full sm:w-[135px] appearance-none bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl px-3.5 pr-8 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#D4FF32] cursor-pointer"
            >
              <option value="all" className="bg-[#0E121A] text-white">All Plans</option>
              <option value="Gold" className="bg-[#0E121A] text-white">Gold</option>
              <option value="Silver" className="bg-[#0E121A] text-white">Silver</option>
              <option value="Basic" className="bg-[#0E121A] text-white">Basic</option>
            </select>
            <CaretDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 sm:flex-initial">
          <label className="text-xs font-bold text-[#CBD5E1] tracking-wide ml-0.5">
            Status
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="h-11 w-full sm:w-[145px] appearance-none bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl px-3.5 pr-8 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#D4FF32] cursor-pointer"
            >
              <option value="all" className="bg-[#0E121A] text-white">All Status</option>
              <option value="New" className="bg-[#0E121A] text-white">New</option>
              <option value="Contacted" className="bg-[#0E121A] text-white">Contacted</option>
              <option value="Demo Scheduled" className="bg-[#0E121A] text-white">Demo Scheduled</option>
              <option value="Converted" className="bg-[#0E121A] text-white">Converted</option>
              <option value="Not Interested" className="bg-[#0E121A] text-white">Not Interested</option>
            </select>
            <CaretDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-xs font-bold text-[#CBD5E1] tracking-wide ml-0.5">
            Date Range
          </label>
          <div className="relative">
            <CalendarBlank
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
            <select
              value={selectedDateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="h-11 w-full sm:w-[160px] appearance-none bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl pl-9 pr-8 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-[#D4FF32] cursor-pointer"
            >
              <option value="last_30_days" className="bg-[#0E121A] text-white">Last 30 Days</option>
              <option value="last_7_days" className="bg-[#0E121A] text-white">Last 7 Days</option>
              <option value="last_90_days" className="bg-[#0E121A] text-white">Last 90 Days</option>
              <option value="all_time" className="bg-[#0E121A] text-white">All Time</option>
            </select>
            <CaretDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="h-11 px-4 rounded-xl bg-[#151B27] border border-[#2B3852] hover:border-[#D4FF32] text-white hover:text-[#D4FF32] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
