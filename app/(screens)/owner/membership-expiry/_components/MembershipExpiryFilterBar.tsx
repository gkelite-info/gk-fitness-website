"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";

const sortOptions: DropdownOption[] = [
  { label: "Expiry Date (Soonest)", value: "soonest" },
  { label: "Expiry Date (Latest)", value: "latest" },
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
];

interface MembershipExpiryFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  total7Days: number;
  todayCount: number;
  next3DaysCount: number;
  next7DaysCount: number;
}

export default function MembershipExpiryFilterBar({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
  total7Days,
  todayCount,
  next3DaysCount,
  next7DaysCount
}: MembershipExpiryFilterBarProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 600);
    return () => clearTimeout(handler);
  }, [localSearch, setSearchTerm]);

  return (
    <div className="flex flex-row flex-wrap items-center gap-3 w-full mb-6">
      <div className="relative w-full md:w-[307px] h-[34px] shrink-0">
        <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none z-10">
          <MagnifyingGlass size={16} color="#717E95" weight="bold" />
        </div>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search members by name, ID or phone..."
          className="w-full h-full bg-[#131926] border border-[#1A2234] rounded-[12px] pl-[40px] pr-4 font-sans font-normal text-[12px] text-[#E2E8F0] placeholder-[#717E95] focus:outline-none focus:border-[#4ADE80] transition-colors"
        />
      </div>

      <button 
        onClick={() => setActiveFilter('all')}
        className={`flex justify-center items-center px-4 py-1.5 h-[30px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] cursor-pointer shrink-0 transition-colors ${activeFilter === 'all' ? 'bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.4)]' : 'bg-transparent border border-transparent hover:bg-white/5'}`}>
        <span className={`font-sans ${activeFilter === 'all' ? 'font-semibold text-[#FBBF24]' : 'font-medium text-[#717E95]'} text-[12px] leading-[16px] whitespace-nowrap`}>All ({total7Days})</span>
      </button>
      <button 
        onClick={() => setActiveFilter('today')}
        className={`flex justify-center items-center px-4 py-1.5 h-[30px] rounded-[12px] cursor-pointer transition-colors shrink-0 ${activeFilter === 'today' ? 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.4)]' : 'bg-transparent border border-transparent hover:bg-white/5'}`}>
        <span className={`font-sans ${activeFilter === 'today' ? 'font-semibold text-[#F87171]' : 'font-medium text-[#717E95]'} text-[12px] leading-[16px] whitespace-nowrap`}>Today ({todayCount})</span>
      </button>
      <button 
        onClick={() => setActiveFilter('next3')}
        className={`flex justify-center items-center px-4 py-1.5 h-[30px] rounded-[12px] cursor-pointer transition-colors shrink-0 ${activeFilter === 'next3' ? 'bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.4)]' : 'bg-transparent border border-transparent hover:bg-white/5'}`}>
        <span className={`font-sans ${activeFilter === 'next3' ? 'font-semibold text-[#FBBF24]' : 'font-medium text-[#717E95]'} text-[12px] leading-[16px] whitespace-nowrap`}>Next 3 Days ({next3DaysCount})</span>
      </button>
      <button 
        onClick={() => setActiveFilter('next7')}
        className={`flex justify-center items-center px-4 py-1.5 h-[30px] rounded-[12px] cursor-pointer transition-colors shrink-0 ${activeFilter === 'next7' ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.4)]' : 'bg-transparent border border-transparent hover:bg-white/5'}`}>
        <span className={`font-sans ${activeFilter === 'next7' ? 'font-semibold text-[#34D399]' : 'font-medium text-[#717E95]'} text-[12px] leading-[16px] whitespace-nowrap`}>Next 7 Days ({next7DaysCount})</span>
      </button>

      <div className="flex-1 min-w-[20px]"></div>

      <div className="flex items-center gap-2.5 shrink-0">
        <span className="font-sans font-medium text-[12px] leading-[16px] text-[#717E95] whitespace-nowrap">Sort by</span>
        <div className="w-auto min-w-[170px]">
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  );
}
