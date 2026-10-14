"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../Dropdown";
import { TrainerSortOption } from "./types";

interface TrainersSearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  count: number;
  label?: string;
  sortOption?: TrainerSortOption;
  onSortChange?: (sort: TrainerSortOption) => void;
  showSort?: boolean;
}

const SORT_OPTIONS: DropdownOption[] = [
  { label: "Recently Added", value: "recent" },
  { label: "Rating (High to Low)", value: "rating" },
  { label: "Experience (Most)", value: "experience" },
  { label: "Name (A-Z)", value: "name" },
];

export default function TrainersSearchBar({
  searchQuery,
  onSearchChange,
  count,
  label = "All Trainers",
  sortOption = "recent",
  onSortChange,
  showSort = true,
}: TrainersSearchBarProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <MagnifyingGlass
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search trainers by name or specialization..."
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0F141E] border border-[#1C2536] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:ring-1 focus:ring-[#D4FF32] transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-white">
            {label}
          </span>
          <span className="text-base sm:text-lg font-bold text-[#D4FF32]">
            ({count})
          </span>
        </div>

        {showSort && onSortChange && (
          <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">
              Sort by:
            </span>
            <Dropdown
              options={SORT_OPTIONS}
              value={sortOption}
              onChange={(val) => onSortChange(val as TrainerSortOption)}
              className="w-[180px] sm:w-[200px]"
              align="right"
            />
          </div>
        )}
      </div>
    </div>
  );
}
