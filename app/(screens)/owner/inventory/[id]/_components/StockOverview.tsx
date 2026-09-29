"use client";
import { Cube, CheckCircle, Gear, Prohibit } from "@phosphor-icons/react";

export default function StockOverview() {
  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full bg-[#12171E] border border-[#1D2633] shadow-sm rounded-2xl">
      <h3 className="font-sans font-semibold text-base leading-6 text-white">
        Stock Overview
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-2">
        <div className="flex flex-col items-center justify-center p-4">
          <Cube size={24} className="text-[#8090A2] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Total Units
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-white text-center">
            5
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <CheckCircle size={24} weight="fill" className="text-[#4ADE80] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Available
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#69DB3B] text-center">
            4
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Gear size={24} weight="fill" className="text-[#F97316] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Under Maint.
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#F97316] text-center">
            1
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Prohibit size={24} className="text-[#EF4444] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Out of Service
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#EF4444] text-center">
            0
          </span>
        </div>

      </div>
    </div>
  );
}
