"use client";
import { Cube, Gear, WarningCircle } from "@phosphor-icons/react";

interface InventoryStatsProps {
  inventoryData: any[];
}

export default function InventoryStats({ inventoryData = [] }: InventoryStatsProps) {
  const totalEquipmentTypes = inventoryData.length;
  const totalUnits = inventoryData.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const underMaintenance = inventoryData.reduce((sum, item) => sum + (Number(item.underMaint) || 0), 0);
  const outOfService = inventoryData.reduce((sum, item) => sum + (Number(item.outOfService) || 0), 0);

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
              {totalEquipmentTypes}
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
              {totalUnits}
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
              {underMaintenance}
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
              {outOfService}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
