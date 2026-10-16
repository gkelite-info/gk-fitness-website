"use client";

import { MagnifyingGlass, CaretDown, X } from "@phosphor-icons/react";

interface WebsiteVideosFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onClearFilters?: () => void;
}

export function WebsiteVideosFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
}: WebsiteVideosFiltersProps) {
  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
      <div className="relative w-full sm:w-[380px] max-w-full">
        <MagnifyingGlass
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by date, video..."
          className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl pl-11 pr-10 text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-white"
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="relative w-full sm:w-[170px] shrink-0">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] text-xs sm:text-sm text-white rounded-xl px-4 pr-10 appearance-none focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-[#0E121A] text-white">All Status</option>
            <option value="visible" className="bg-[#0E121A] text-white">Visible</option>
            <option value="hidden" className="bg-[#0E121A] text-white">Hidden</option>
          </select>
          <CaretDown
            size={16}
            weight="bold"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
          />
        </div>

        {hasActiveFilters && onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="h-11 px-3.5 rounded-xl bg-[#141824] border border-[#2B3852] hover:border-[#D4FF32] text-white hover:text-[#D4FF32] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
