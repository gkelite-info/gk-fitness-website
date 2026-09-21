"use client";

import { CalendarBlank, CaretDown } from "@phosphor-icons/react";

export default function FinanceHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
          Finances
        </h1>
        <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
          Overview of your gym's financial performance.
        </span>
      </div>
      <button className="flex flex-row items-center justify-center px-3.5 py-2 gap-2 bg-[#13161C] border border-[#232934] rounded-[12px] hover:bg-[#1a1f27] transition-colors cursor-pointer shrink-0">
        <CalendarBlank size={16} weight="regular" className="text-[#94A3B8]" />
        <span className="font-[500] text-[12px] leading-[16px] text-[#E2E8F0] whitespace-nowrap">
          This Month
        </span>
        <CaretDown size={14} weight="regular" className="text-[#94A3B8] ml-1" />
      </button>
    </div>
  );
}
