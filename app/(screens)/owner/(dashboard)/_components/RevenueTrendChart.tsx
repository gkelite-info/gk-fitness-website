"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { useMemo } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const Y_LABELS = [
  { label: "₹30K", value: 30000 },
  { label: "₹20K", value: 20000 },
  { label: "₹10K", value: 10000 },
  { label: "₹0", value: 0 },
];

interface RevenueTrendChartProps {
  data: number[];
}

export default function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  // Use provided data or fallback to zeroes
  const revenueData = data && data.length === 12 ? data : Array(12).fill(0);
  
  // Calculate max value to scale the chart dynamically (minimum 30k)
  const maxValue = Math.max(...revenueData, 30000);
  const chartMax = Math.ceil(maxValue / 10000) * 10000;

  // Use dynamic labels if data exceeds 30K, else stick to exactly 30K, 20K, 10K, 0
  const labelsToUse = chartMax <= 30000 ? Y_LABELS : [
    { label: `₹${chartMax/1000}K`, value: chartMax },
    { label: `₹${Math.round(chartMax * 0.66 / 1000)}K`, value: chartMax * 0.66 },
    { label: `₹${Math.round(chartMax * 0.33 / 1000)}K`, value: chartMax * 0.33 },
    { label: "₹0", value: 0 },
  ];

  // Derive visually matching expenditure data strictly for UI display (as requested)
  // We use useMemo with a seeded-like approach based on revenue so it doesn't flicker on re-renders
  const expenditureData = useMemo(() => {
    return revenueData.map((rev, i) => {
      if (rev === 0) return 0;
      // Fixed ratios for a consistent, beautiful visualization
      const ratios = [0.6, 0.55, 0.65, 0.6, 0.62, 0.66, 0.64, 0.6, 0.66, 0.65, 0.6, 0.6];
      return rev * ratios[i];
    });
  }, [revenueData]);

  // Find the last active month to highlight (the one with data, or Dec if all have data)
  let lastActiveMonthIndex = 11;
  for (let i = 11; i >= 0; i--) {
    if (revenueData[i] > 0) {
      lastActiveMonthIndex = i;
      break;
    }
  }
  // If all are zero, don't highlight specially
  if (revenueData.every(r => r === 0)) lastActiveMonthIndex = -1;

  return (
    <div className="w-full bg-[#14151A] border border-[#1B2330] rounded-[18px] p-6 shadow-[0px_19px_39px_-9px_rgba(0,0,0,0.25)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="font-sans font-bold text-[24px] leading-[28px] tracking-[-0.6px] text-white">
          Revenue Trend
        </h2>
        <button className="flex flex-row items-center px-3 py-1.5 gap-1.5 bg-[#121822] border border-[#1F2937] shadow-[0px_1px_1.5px_rgba(0,0,0,0.05)] rounded-[9.5px] cursor-pointer hover:bg-white/[0.05] transition-colors">
          <span className="font-sans font-medium text-[11px] leading-[16px] text-[#E5E7EB]">
            Monthly Chart
          </span>
          <CaretDown size={12} color="#9CA3AF" weight="bold" />
        </button>
      </div>

      {/* Legends */}
      <div className="flex flex-row items-center gap-6 w-full -mt-1">
        <div className="flex flex-row items-center gap-2">
          <div className="relative w-[9.5px] h-[9.5px] bg-[#D4F835] rounded-full shadow-[0px_0px_8px_1px_rgba(190,242,100,0.65)]" />
          <span className="font-sans font-medium text-[11px] leading-[16px] text-[#D1D5DB] tracking-[0.27px]">
            Revenue
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="relative w-[9.5px] h-[9.5px] bg-[#F97316] rounded-full shadow-[0px_0px_8px_1px_rgba(249,115,22,0.65)]" />
          <span className="font-sans font-medium text-[11px] leading-[16px] text-[#D1D5DB] tracking-[0.27px]">
            Expenditure
          </span>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="w-full flex flex-row pt-5 pb-1 relative">
        
        {/* Static Y-Axis Labels (Fixed on left) */}
        <div className="w-[44px] shrink-0 relative z-20 bg-[#14151A] h-[270px]">
          <div className="absolute inset-x-0 top-0 bottom-[28px]">
            {labelsToUse.map((item) => {
              const topPercent = 100 - (item.value / chartMax) * 100;
              return (
                <div 
                  key={item.label}
                  className="absolute w-full flex flex-row items-center transform -translate-y-1/2"
                  style={{ top: `${topPercent}%` }}
                >
                  <span className="font-sans font-semibold text-[9.5px] leading-[13px] text-[#9CA3B8] pl-[1.5px]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable Chart Area (Grid + Bars) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-themed z-10">
          <div className="relative min-w-[560px] h-[270px]">
            
            {/* Y-Axis Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-[28px] z-0 pointer-events-none">
              {labelsToUse.map((item) => {
                const topPercent = 100 - (item.value / chartMax) * 100;
                return (
                  <div 
                    key={item.label}
                    className="absolute w-full flex flex-row items-center transform -translate-y-1/2"
                    style={{ top: `${topPercent}%` }}
                  >
                    <div 
                      className={`w-full ${
                        item.value === 0 
                          ? "border-t-[0.8px] border-solid border-[rgba(31,41,55,0.8)]" 
                          : "border-t-[0.8px] border-dashed border-[rgba(255,255,255,0.07)]"
                      }`} 
                    />
                  </div>
                );
              })}
            </div>

            {/* Bars and X-Axis Labels */}
            <div className="absolute inset-0 flex flex-row justify-between items-end z-10">
              {MONTHS.map((month, i) => {
                const rev = revenueData[i];
                const exp = expenditureData[i]; 
                
                // Percentages relative to the 242px active bar area
                const revHeight = (rev / chartMax) * 100;
                const expHeight = (exp / chartMax) * 100;

                return (
                  <div key={month} className="h-full flex flex-col justify-end items-center isolate relative w-[72px]">
                    
                    {/* Bars Container */}
                    <div className="w-full h-[calc(100%-28px)] flex flex-row justify-center items-end gap-[6px]">
                      
                      {/* Revenue Bar */}
                      <div 
                        className="relative w-[19px] flex justify-center group" 
                        style={{ height: `${revHeight}%` }}
                      >
                        {rev > 0 && (
                          <>
                            <div 
                              className="absolute inset-0 rounded-t-[6.3px]" 
                              style={{ background: 'linear-gradient(180deg, #DCF836 0%, #A3E635 28%, #4ADE80 75%, #15803D 100%)' }}
                            />
                            <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] shadow-[0px_0px_12px_-1px_rgba(163,230,53,0.35)] rounded-t-[6.3px]" />
                          </>
                        )}
                      </div>

                      {/* Expenditure Bar */}
                      <div 
                        className="relative w-[19px] flex justify-center group" 
                        style={{ height: `${expHeight}%` }}
                      >
                        {exp > 0 && (
                          <>
                            <div 
                              className="absolute inset-0 rounded-t-[6.3px]"
                              style={{ background: 'linear-gradient(180deg, #FDBA74 0%, #FB923C 28%, #F97316 65%, #C2410C 100%)' }}
                            />
                            <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] shadow-[0px_0px_12px_-1px_rgba(249,115,22,0.32)] rounded-t-[6.3px]" />
                          </>
                        )}
                      </div>

                    </div>
                    
                    {/* Month Label */}
                    <div className="h-[28px] w-full flex items-center justify-center">
                      <span className={`font-sans font-medium text-[9.5px] leading-[13px] ${
                        i === lastActiveMonthIndex ? "text-[#A3E635] font-semibold" : "text-[#9CA3B8]"
                      }`}>
                        {month}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
