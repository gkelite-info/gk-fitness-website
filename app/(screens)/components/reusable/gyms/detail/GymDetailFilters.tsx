"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import Dropdown, { DropdownOption } from "../../Dropdown";
import { DetailStatus } from "./types";

interface GymDetailFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: DetailStatus;
  onStatusChange: (status: DetailStatus) => void;
  counts: { all: number; active: number; inactive: number };
  sortOption: string;
  onSortChange: (sort: string) => void;
  activeTabLabel: string;
}

const SORT_OPTIONS: DropdownOption[] = [
  { label: "Sort: Active", value: "active" },
  { label: "Sort: Inactive", value: "inactive" },
  { label: "Sort: Name (A-Z)", value: "name" },
  { label: "Sort: Recent", value: "recent" },
];

export default function GymDetailFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  counts,
  sortOption,
  onSortChange,
  activeTabLabel,
}: GymDetailFiltersProps) {
  const segmentTabs: { key: DetailStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "inactive", label: "Inactive", count: counts.inactive },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        <div className="relative w-full sm:w-[384px]">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${activeTabLabel.toLowerCase()} by name or phone`}
            className="w-full h-[42px] pl-10 pr-4 rounded-xl bg-[#141B25] border border-[#232D3D] text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-colors"
          />
        </div>

        <div className="w-full sm:w-[175px] shrink-0">
          <Dropdown
            options={SORT_OPTIONS}
            value={sortOption}
            onChange={(val) => onSortChange(val)}
            className="w-full"
            triggerClassName="relative flex flex-row items-center justify-between px-3.5 w-full h-[42px] bg-[#141B25] border border-[#232D3D] text-xs font-medium text-[#CBD5E1] rounded-xl cursor-pointer hover:border-[#323D4D] transition-colors whitespace-nowrap"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {segmentTabs.map((tab) => {
          const isSelected = statusFilter === tab.key;
          const isInactive = tab.key === "inactive";

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onStatusChange(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? isInactive
                    ? "bg-[#2A1215] border border-red-500 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.25)]"
                    : "bg-[rgba(212,255,0,0.15)] border border-[#D4FF00] text-[#D4FF00] shadow-[0_0_8px_rgba(212,255,0,0.15)]"
                  : isInactive
                  ? "bg-[#141A24] border border-[#232D3D] text-[#94A3B8] hover:text-red-400 hover:border-red-900/40"
                  : "bg-[#141A24] border border-[#232D3D] text-[#94A3B8] hover:text-white hover:border-[#323D4D]"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}
