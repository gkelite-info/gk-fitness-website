"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown, SquaresFour, ListBullets } from "@phosphor-icons/react";
import { GymFilterTab, GymSortOption, ViewMode } from "./types";
import GymsMonthFilter from "./GymsMonthFilter";

interface GymsFilterTabsProps {
  currentTab: GymFilterTab;
  onTabChange: (tab: GymFilterTab) => void;
  counts: { all: number; active: number; inactive: number };
  sortOption: GymSortOption;
  onSortChange: (sort: GymSortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function GymsFilterTabs({
  currentTab,
  onTabChange,
  counts,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  selectedMonth,
  onMonthChange,
}: GymsFilterTabsProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortLabels: Record<GymSortOption, string> = {
    recent: "Recently Added",
    name: "Name (A-Z)",
    members: "Most Members",
  };

  const tabs: { key: GymFilterTab; label: string; count: number }[] = [
    { key: "all", label: "All Gyms", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "inactive", label: "Inactive", count: counts.inactive },
  ];

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 w-full min-w-0">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full xl:w-auto xl:flex-1 min-w-0">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const isInactiveTab = tab.key === "inactive";

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? isInactiveTab
                    ? "bg-[#2A1215] border border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
                    : "bg-[#182310] border border-[#D4FF32] text-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.15)]"
                  : isInactiveTab
                  ? "bg-[#13151D] border border-[#222634] text-[#94A3B8] hover:text-red-400 hover:border-red-900/50"
                  : "bg-[#13151D] border border-[#222634] text-[#94A3B8] hover:text-white hover:border-[#323847]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? isInactiveTab
                      ? "bg-red-900/70 text-red-200"
                      : "bg-[#253713] text-[#D4FF32]"
                    : isInactiveTab
                    ? "bg-[#221618] text-[#EF4444] border border-red-900/40"
                    : "bg-[#1B1E28] text-[#64748B]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 w-full xl:w-auto shrink-0 justify-between sm:justify-end">
        <div className="flex-1 sm:w-[145px] sm:flex-initial min-w-0">
          <GymsMonthFilter
            selectedMonth={selectedMonth}
            onChange={onMonthChange}
            className="w-full"
          />
        </div>

        <div ref={sortRef} className="relative flex-1 sm:w-[165px] sm:flex-initial min-w-0">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between gap-1.5 h-10 px-3 sm:px-3.5 rounded-xl bg-[#13151D] border border-[#222634] text-xs font-medium text-[#94A3B8] hover:text-white hover:border-[#323847] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="hidden sm:inline">Sort:</span>
              <span className="text-white font-semibold truncate">{sortLabels[sortOption]}</span>
            </div>
            <CaretDown size={14} className="text-[#64748B] shrink-0" />
          </button>

          {isSortOpen && (
            <div className="absolute left-0 sm:left-auto right-0 top-full mt-1.5 w-full sm:w-48 rounded-xl bg-[#161922] border border-[#262C3D] py-1 shadow-2xl z-30 backdrop-blur-md">
              {(Object.keys(sortLabels) as GymSortOption[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSortChange(key);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                    sortOption === key
                      ? "text-[#D4FF32] bg-[#1E2516]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#1E222D]"
                  }`}
                >
                  {sortLabels[key]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center rounded-xl bg-[#13151D] border border-[#222634] p-1 shrink-0 h-10">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#1A2213] text-[#D4FF32] shadow-sm"
                : "text-[#64748B] hover:text-[#94A3B8]"
            }`}
          >
            <SquaresFour size={16} weight={viewMode === "grid" ? "fill" : "regular"} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-[#1A2213] text-[#D4FF32] shadow-sm"
                : "text-[#64748B] hover:text-[#94A3B8]"
            }`}
          >
            <ListBullets size={16} weight={viewMode === "list" ? "fill" : "regular"} />
          </button>
        </div>
      </div>
    </div>
  );
}
