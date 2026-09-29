"use client";
import { Cube, Gear, WarningCircle } from "@phosphor-icons/react";

export default function InventoryStats() {
  return (
    <div className="w-full mt-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="flex flex-row items-center p-4 gap-4 bg-[#121720] border border-[#1C2430] rounded-[16px]">
          <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#1C281E] rounded-xl shrink-0">
            <Cube size={24} weight="regular" className="text-[#D2FF00]" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-sans font-medium text-[12px] leading-[16px] text-[#94A3B8]">
              Total Equipment
            </span>
            <span className="font-sans font-bold text-[22px] leading-[28px] tracking-[-0.5px] text-white">
              128
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center p-4 gap-4 bg-[#121720] border border-[#1C2430] rounded-[16px]">
          <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#1C281E] rounded-xl shrink-0">
            <Cube size={24} weight="regular" className="text-[#D2FF00]" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-sans font-medium text-[12px] leading-[16px] text-[#94A3B8]">
              Total Units
            </span>
            <span className="font-sans font-bold text-[22px] leading-[28px] tracking-[-0.5px] text-white">
              324
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center p-4 gap-4 bg-[#121720] border border-[#1C2430] rounded-[16px]">
          <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#2B2214] rounded-xl shrink-0">
            <Gear size={24} weight="regular" className="text-[#F59E0B]" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-sans font-medium text-[12px] leading-[16px] text-[#94A3B8]">
              Under Maintenance
            </span>
            <span className="font-sans font-bold text-[22px] leading-[28px] tracking-[-0.5px] text-white">
              18
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center p-4 gap-4 bg-[#121720] border border-[#1C2430] rounded-[16px]">
          <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#2A171A] rounded-xl shrink-0">
            <WarningCircle size={24} weight="regular" className="text-[#EF4444]" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-sans font-medium text-[12px] leading-[16px] text-[#94A3B8]">
              Out of Service
            </span>
            <span className="font-sans font-bold text-[22px] leading-[28px] tracking-[-0.5px] text-white">
              6
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
