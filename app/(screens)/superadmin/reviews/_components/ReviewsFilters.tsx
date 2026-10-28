"use client";

import {
  MagnifyingGlass,
  CaretDown,
  X,
  SquaresFour,
  Table,
} from "@phosphor-icons/react";
import { ReviewFiltersState } from "../types";

interface ReviewsFiltersProps {
  filters: ReviewFiltersState;
  totalFilteredCount: number;
  viewMode: "cards" | "table";
  onFilterChange: (updates: Partial<ReviewFiltersState>) => void;
  onClearFilters: () => void;
  onToggleViewMode: (mode: "cards" | "table") => void;
}

export function ReviewsFilters({
  filters,
  totalFilteredCount,
  viewMode,
  onFilterChange,
  onClearFilters,
  onToggleViewMode,
}: ReviewsFiltersProps) {
  const hasActiveFilters =
    filters.searchQuery.trim() !== "" ||
    filters.status !== "all" ||
    filters.role !== "all" ||
    filters.rating !== "all" ||
    filters.sortBy !== "newest";

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
      <div className="relative w-full lg:w-[380px]">
        <MagnifyingGlass
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
        />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder="Search by name, email, or content..."
          className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] rounded-xl pl-11 pr-10 text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => onFilterChange({ searchQuery: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B] hover:text-white"
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <div className="relative w-full sm:w-[155px] shrink-0">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as any })}
            className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] text-xs sm:text-sm text-white rounded-xl px-3.5 pr-8 appearance-none focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="all" className="bg-[#0E121A]">All Status</option>
            <option value="approved" className="bg-[#0E121A]">Live & Visible</option>
            <option value="pending" className="bg-[#0E121A]">Pending</option>
            <option value="deleted" className="bg-[#0E121A]">Archived / Hidden</option>
          </select>
          <CaretDown
            size={14}
            weight="bold"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
          />
        </div>

        <div className="relative w-full sm:w-[145px] shrink-0">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="w-full h-11 bg-[#0E121A] border border-[#222938] hover:border-[#333E54] text-xs sm:text-sm text-white rounded-xl px-3.5 pr-8 appearance-none focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="newest" className="bg-[#0E121A]">Newest First</option>
            <option value="oldest" className="bg-[#0E121A]">Oldest First</option>
            <option value="highest_rated" className="bg-[#0E121A]">Highest Rating</option>
            <option value="lowest_rated" className="bg-[#0E121A]">Lowest Rating</option>
          </select>
          <CaretDown
            size={14}
            weight="bold"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
          />
        </div>

        <div className="h-11 px-3 rounded-xl bg-[#0E121A] border border-[#222938] flex items-center justify-center text-xs font-bold text-white shrink-0">
          <span>{totalFilteredCount} {totalFilteredCount === 1 ? "review" : "reviews"}</span>
        </div>

        <div className="flex items-center p-1 bg-[#0E121A] border border-[#222938] rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => onToggleViewMode("cards")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === "cards"
                ? "bg-[#D4FF32] text-black shadow-sm"
                : "text-[#8E99AB] hover:text-white"
            }`}
            title="Card View"
          >
            <SquaresFour size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => onToggleViewMode("table")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === "table"
                ? "bg-[#D4FF32] text-black shadow-sm"
                : "text-[#8E99AB] hover:text-white"
            }`}
            title="Table View"
          >
            <Table size={16} weight="bold" />
          </button>
        </div>

        {hasActiveFilters && (
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
