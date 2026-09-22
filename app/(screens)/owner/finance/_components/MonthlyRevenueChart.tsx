"use client";

import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const CHART_DATA = [
  { month: "Jan", value: 108000 },
  { month: "Feb", value: 69000 },
  { month: "Mar", value: 159000 },
  { month: "Apr", value: 120000 },
  { month: "May", value: 279000 },
  { month: "Jun", value: 198000 },
  { month: "Jul", value: 249000 },
  { month: "Aug", value: 215000 },
  { month: "Sep", value: 295000 },
  { month: "Oct", value: 325000 },
  { month: "Nov", value: 280000 },
  { month: "Dec", value: 345000 }
];

const formatLabel = (val: number) => {
  if (val === 0) return "0";
  if (val >= 100000) {
    const l = val / 100000;
    return Number.isInteger(l) ? `${l}L` : `${l.toFixed(1)}L`;
  }
  if (val >= 1000) {
    const k = val / 1000;
    return Number.isInteger(k) ? `${k}k` : `${k.toFixed(1)}k`;
  }
  return val.toString();
};

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function MonthlyRevenueChart() {
  const router = useRouter();
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const maxDataValue = Math.max(...CHART_DATA.map((d) => d.value), 1);
  const roughStep = Math.ceil(maxDataValue / 3);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalizedStep = roughStep / magnitude;

  let niceStep = 1;
  if (normalizedStep <= 1) niceStep = 1 * magnitude;
  else if (normalizedStep <= 2) niceStep = 2 * magnitude;
  else if (normalizedStep <= 2.5) niceStep = 2.5 * magnitude;
  else if (normalizedStep <= 5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const yMax = niceStep * 3;
  const yAxisLabels = [yMax, niceStep * 2, niceStep, 0];

  return (
    <div className="flex flex-col p-4 md:p-6 pb-4 md:pb-6 gap-6 md:gap-8 w-full bg-[#111418] border border-[#1D222B] rounded-[16px]">
      <div className="flex flex-row justify-between items-center w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Monthly Revenue
        </h2>
        <button 
          onClick={() => router.push('/owner/finance/monthly-growth')}
          className="flex flex-row items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="font-[600] text-[12px] leading-[16px] text-[#CCFF00]">
            View Trend
          </span>
          <CaretRight size={14} weight="regular" className="text-[#CCFF00]" />
        </button>
      </div>
      
      <div className="flex flex-row w-full relative">
        
        {/* Y-Axis Fixed (Outside Scroll Container for Perfect Clipping) */}
        <div className="flex flex-col justify-between items-end pr-3 w-12 shrink-0 h-[248px] pt-10 pb-8 z-30 bg-[#111418] border-r border-[#1B2029]">
          {yAxisLabels.map((val, idx) => (
            <span key={idx} className="font-[500] text-[11px] leading-[16px] text-[#64748B]">
              {formatLabel(val)}
            </span>
          ))}
        </div>
        
        {/* Scrollable Chart Area */}
        <div className="flex-1 overflow-x-auto scrollbar-themed">
          <div className="relative flex flex-row items-start min-w-[700px] h-[248px] pt-10 pb-8">
            <div className="relative flex-1 h-[176px] isolate">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between items-start pointer-events-none z-0">
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-dashed border-[#1B2029]" />
                <div className="w-full h-[1px] border-b border-solid border-[#1B2029]" />
              </div>
              
              {/* Bars */}
              <div className="relative flex flex-row justify-around items-end px-2 h-full w-full z-10">
                {CHART_DATA.map((data, index) => {
                  const heightPercent = (data.value / yMax) * 100;
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center group relative h-full justify-end cursor-pointer"
                      onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
                    >
                      {/* Hover Value Label */}
                      <div className={`absolute -top-7 transition-opacity whitespace-nowrap bg-[#1D222B] px-2 py-1 rounded-[6px] border border-[#232934] pointer-events-none z-20 ${activeTooltip === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <span className="font-[600] text-[10px] leading-[14px] text-[#CCFF00]">
                          {formatCurrency(data.value)}
                        </span>
                      </div>

                      <div 
                        className="w-8 md:w-9 bg-[#CCFF00] rounded-t-[3px] transition-all duration-300 group-hover:opacity-80"
                        style={{ height: `${heightPercent}%` }}
                      />
                      
                      <span className="absolute -bottom-6 font-[500] text-[11px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
                        {data.month}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
