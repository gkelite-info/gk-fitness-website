"use client";

import { useState } from "react";
import { Plus, CaretDown, SquaresFour, List } from "@phosphor-icons/react";

export interface UsersFilterBarProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function UsersFilterBar({ viewMode, onViewModeChange, activeFilter, onFilterChange }: UsersFilterBarProps) {
  const filters = [
    { name: "All", dot: null },
    { name: "Active", dot: "bg-[#22C55E]" },
    { name: "Inactive", dot: "bg-[#F43F5E]" },
  ];

  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center w-full mt-6 gap-4">
      <div className="flex flex-row flex-nowrap items-center gap-4 w-full xl:w-auto overflow-x-auto scrollbar-hide pb-2 xl:pb-0">
        <button className="flex flex-row items-center justify-center px-5 py-2.5 gap-1.5 h-[36px] bg-[#D2F829] shadow-[0_0_20px_rgba(210,248,41,0.2)] rounded-[12px] hover:bg-[#c2ef2b] transition-all cursor-pointer flex-shrink-0">
          <Plus size={16} weight="bold" className="text-black" />
          <span className="font-sans font-bold text-[12px] leading-4 tracking-[0.3px] text-black">
            Register Customer
          </span>
        </button>
        <div className="flex flex-row flex-nowrap items-center gap-2 flex-shrink-0">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => onFilterChange(filter.name)}
              className={`flex flex-row items-center justify-center px-4 py-1.5 gap-2 h-8 rounded-full border transition-all cursor-pointer ${
                activeFilter === filter.name
                  ? "bg-[#D2F829] border-[#D2F829] text-black font-bold shadow-[0_0_12px_rgba(210,248,41,0.2)]"
                  : "bg-transparent border-[#262B32] text-[#94A3B8] font-medium hover:text-white"
              }`}
            >
              {filter.dot && (
                <div className={`w-1.5 h-1.5 rounded-full ${filter.dot}`} />
              )}
              <span className="font-sans text-[12px] leading-[18px]">
                {filter.name}
              </span>
            </button>
          ))}
          <button className="flex flex-row items-center justify-center px-4 py-1.5 gap-2 h-8 rounded-full border border-[#D2F829] bg-transparent text-[#D2F829] hover:bg-[rgba(210,248,41,0.05)] transition-all cursor-pointer ml-1">
            <span className="font-sans font-medium text-[12px] leading-[18px]">
              Gold Plan
            </span>
            <CaretDown size={14} weight="bold" />
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap items-center justify-between w-full xl:w-auto gap-4 mt-2 xl:mt-0">
        <button className="flex flex-row items-center justify-center px-4 py-1.5 gap-2 h-8 rounded-full border border-[#262B32] bg-[#1B1F24] text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
          <span className="font-sans font-medium text-[12px] leading-4">
            Sort by: <strong className="font-bold text-white ml-0.5">Name (A-Z)</strong>
          </span>
          <CaretDown size={14} weight="bold" />
        </button>
        <div className="flex flex-row items-center gap-1.5">
          <button 
            onClick={() => onViewModeChange("grid")}
            className={`flex items-center justify-center w-8 h-8 rounded-[8px] transition-all cursor-pointer ${
              viewMode === "grid" 
                ? "bg-[rgba(210,248,41,0.1)] border border-[#D2F829] text-[#D2F829]" 
                : "bg-[#1B1F24] border border-[#262B32] text-[#64748B] hover:text-white"
            }`}
          >
            <SquaresFour size={16} weight={viewMode === "grid" ? "fill" : "regular"} />
          </button>
          <button 
            onClick={() => onViewModeChange("list")}
            className={`flex items-center justify-center w-8 h-8 rounded-[8px] transition-all cursor-pointer ${
              viewMode === "list" 
                ? "bg-[rgba(210,248,41,0.1)] border border-[#D2F829] text-[#D2F829]" 
                : "bg-[#1B1F24] border border-[#262B32] text-[#64748B] hover:text-white"
            }`}
          >
            <List size={16} weight={viewMode === "list" ? "fill" : "regular"} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
