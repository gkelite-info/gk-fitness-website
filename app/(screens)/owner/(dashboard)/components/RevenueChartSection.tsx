"use client";

import { CaretDown } from "@phosphor-icons/react";

export default function RevenueChartSection() {
  return (
    <div className="w-full bg-[#14151A] border border-white/5 rounded-2xl p-6 flex flex-col gap-6 mt-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="font-bold text-base text-white tracking-wide">Revenue Trend</h3>
        <button className="cursor-pointer flex items-center justify-center gap-2 px-3 py-1.5 bg-[#191B22] border border-[#262936] rounded-lg text-xs font-semibold text-[#E2E8F0] hover:bg-[#1f212a] transition-colors w-fit">
          Monthly <CaretDown size={12} className="text-[#94A3B8]" weight="bold" />
        </button>
      </div>

      <div className="relative w-full h-[224px] flex flex-col">
        <div className="absolute inset-0 flex flex-col justify-between pb-8 z-0">
          {[40, 30, 20, 10, 0].map((val, i) => (
            <div key={i} className="flex items-center w-full gap-4 opacity-50">
              <span className="w-8 text-right font-medium text-[11px] text-[#64748B]">${val}k</span>
              <div className="flex-grow h-px bg-[#1E2027]" />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-12 top-2 bottom-8 z-10 overflow-visible flex items-end">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D4FF32" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#D4FF32" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#D4FF32" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 C100,140 150,110 200,80 C250,50 300,120 400,90 C500,60 600,110 700,50 C750,20 780,10 800,40 L800,200 L0,200 Z"
              fill="url(#gradient)"
            />
            <path
              d="M0,150 C100,140 150,110 200,80 C250,50 300,120 400,90 C500,60 600,110 700,50 C750,20 780,10 800,40"
              fill="none"
              stroke="#D4FF32"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            <circle cx="700" cy="50" r="6" fill="#D4FF32" className="drop-shadow-[0_0_12px_#D4FF32]" />
            <line x1="700" y1="50" x2="700" y2="200" stroke="#D4FF32" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
          </svg>
          
          <div className="absolute top-0 right-[10%] -translate-y-4 translate-x-1/2 flex items-center justify-center px-3 py-1.5 bg-[#1D2028] border border-[#343847] rounded-lg shadow-xl">
            <span className="font-bold text-xs text-white">$42,500</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-12 right-0 flex justify-between text-[11px] font-medium text-[#94A3B8]">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span className="text-[#D4FF32] font-bold">Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}
