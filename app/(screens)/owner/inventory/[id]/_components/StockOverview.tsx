"use client";
import { Cube, CheckCircle, Gear, Prohibit } from "@phosphor-icons/react";

interface StockOverviewProps {
  equipment: any;
  history: any[];
}

export default function StockOverview({ equipment, history }: StockOverviewProps) {
  // Compute available, maintenance, out of service based on history
  let total = equipment.quantity || 0;
  let maintenanceCount = 0;
  let outOfServiceCount = 0;

  history?.forEach((log) => {
    if (log.action === 'maintenance') maintenanceCount += log.quantity;
    if (log.action === 'restore_maintenance') maintenanceCount -= log.quantity;
    if (log.action === 'out_of_service') outOfServiceCount += log.quantity;
    if (log.action === 'restore_out_of_service') outOfServiceCount -= log.quantity;
  });

  const available = total - maintenanceCount - outOfServiceCount;

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
            {total}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <CheckCircle size={24} weight="fill" className="text-[#4ADE80] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Available
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#69DB3B] text-center">
            {available}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Gear size={24} weight="fill" className="text-[#F97316] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Under Maint.
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#F97316] text-center">
            {maintenanceCount}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Prohibit size={24} className="text-[#EF4444] mb-2" />
          <span className="font-sans font-medium text-[11.5px] leading-4 text-[#7E8B9B] text-center mb-1 uppercase tracking-wider whitespace-nowrap">
            Out of Service
          </span>
          <span className="font-sans font-bold text-[26px] leading-[26px] text-[#EF4444] text-center">
            {outOfServiceCount}
          </span>
        </div>

      </div>
    </div>
  );
}
