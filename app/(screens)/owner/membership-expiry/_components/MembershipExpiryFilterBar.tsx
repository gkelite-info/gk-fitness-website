"use client";

import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";

const sortOptions: DropdownOption[] = [
  { label: "Expiry Date (Soonest)", value: "soonest" },
  { label: "Expiry Date (Latest)", value: "latest" },
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
];

export default function MembershipExpiryFilterBar() {
  const [sortBy, setSortBy] = useState("soonest");

  return (
    <div className="flex flex-row flex-wrap items-center gap-3 w-full mb-6">
      <div className="relative w-full md:w-[307px] h-[34px] shrink-0">
        <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none z-10">
          <MagnifyingGlass size={16} color="#717E95" weight="bold" />
        </div>
        <input
          type="text"
          placeholder="Search members by name, ID or phone..."
          className="w-full h-full bg-[#131926] border border-[#1A2234] rounded-[12px] pl-[40px] pr-4 font-sans font-normal text-[12px] text-[#E2E8F0] placeholder-[#717E95] focus:outline-none focus:border-[#4ADE80] transition-colors"
        />
      </div>

      <button className="flex justify-center items-center px-4 py-1.5 h-[30px] bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.4)] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] cursor-pointer shrink-0">
        <span className="font-sans font-semibold text-[12px] leading-[16px] text-[#FBBF24] whitespace-nowrap">All (18)</span>
      </button>
      <button className="flex justify-center items-center px-4 py-1.5 h-[30px] bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-[12px] cursor-pointer hover:bg-[rgba(239,68,68,0.1)] transition-colors shrink-0">
        <span className="font-sans font-medium text-[12px] leading-[16px] text-[#F87171] whitespace-nowrap">Today (3)</span>
      </button>
      <button className="flex justify-center items-center px-4 py-1.5 h-[30px] bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-[12px] cursor-pointer hover:bg-[rgba(245,158,11,0.1)] transition-colors shrink-0">
        <span className="font-sans font-medium text-[12px] leading-[16px] text-[#FBBF24] whitespace-nowrap">Next 3 Days (6)</span>
      </button>
      <button className="flex justify-center items-center px-4 py-1.5 h-[30px] bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-[12px] cursor-pointer hover:bg-[rgba(16,185,129,0.1)] transition-colors shrink-0">
        <span className="font-sans font-medium text-[12px] leading-[16px] text-[#34D399] whitespace-nowrap">Next 7 Days (9)</span>
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
