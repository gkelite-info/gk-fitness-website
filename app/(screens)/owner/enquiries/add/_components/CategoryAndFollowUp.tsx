"use client";

import { useState } from "react";

export default function CategoryAndFollowUp() {
  const [category, setCategory] = useState("hot");

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      
      <div className="flex flex-col items-start p-6 gap-4 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
        <div className="flex flex-row items-center gap-3.5 w-full">
          <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
            <span className="font-sans font-bold text-xs text-[#60A5FA]">5</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="font-sans font-semibold text-base text-white leading-6">Enquiry Category</h2>
            <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">Set the initial enquiry category.</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center w-full gap-2 mt-1">
          <button
            onClick={() => setCategory("hot")}
            className={`flex flex-row justify-center items-center px-4 py-2 gap-1.5 h-[34px] border rounded-lg transition-colors cursor-pointer ${
              category === "hot" ? "bg-[rgba(69,10,10,0.2)] border-[rgba(127,29,29,0.6)]" : "bg-transparent border-[#232E40] opacity-60 hover:opacity-100"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.16667V12.8333M7 1.16667L9.91667 4.08333M7 1.16667L4.08333 4.08333" stroke={category === "hot" ? "#EF4444" : "#94A3B8"} strokeWidth="0" fill={category === "hot" ? "#EF4444" : "#94A3B8"}/>
              <path d="M9.33 3.5C9.33 3.5 9.8 5.6 8.4 7.35C7.7 8.23 7.0 8.1 6.65 7.35C6.1 6.2 6.5 4.9 7.0 4.2C5.6 5.0 4.67 6.7 4.67 8.17C4.67 10.55 6.12 11.67 7.0 11.67C8.84 11.67 10.33 10.17 10.33 8.33C10.33 6.72 9.33 3.5 9.33 3.5Z" fill={category === "hot" ? "#EF4444" : "#94A3B8"}/>
            </svg>
            <span className={`font-sans font-medium text-xs leading-4 text-center ${category === "hot" ? "text-[#F87171]" : "text-[#94A3B8]"}`}>Hot</span>
          </button>
          
          <button
            onClick={() => setCategory("warm")}
            className={`flex flex-row justify-center items-center px-3 py-2 gap-1.5 h-[34px] border rounded-lg transition-colors cursor-pointer ${
              category === "warm" ? "bg-[rgba(69,26,3,0.2)] border-[rgba(146,64,14,0.4)]" : "bg-transparent border-[#232E40] opacity-60 hover:opacity-100"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.75V12.25M1.75 7H12.25M3.32 3.32L10.68 10.68M10.68 3.32L3.32 10.68" stroke={category === "warm" ? "#FBBF24" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`font-sans font-medium text-xs leading-4 text-center ${category === "warm" ? "text-[#FCD34D]" : "text-[#94A3B8]"}`}>Warm</span>
          </button>
          
          <button
            onClick={() => setCategory("cold")}
            className={`flex flex-row justify-center items-center px-4 py-2 gap-1.5 h-[34px] border rounded-lg transition-colors cursor-pointer ${
              category === "cold" ? "bg-[rgba(8,47,73,0.2)] border-[rgba(7,89,133,0.4)]" : "bg-transparent border-[#232E40] opacity-60 hover:opacity-100"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.16667V12.8333M2.33333 4.08333L11.6667 9.91667M11.6667 4.08333L2.33333 9.91667" stroke={category === "cold" ? "#38BDF8" : "#94A3B8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 1.16667L8.75 2.91667M7 1.16667L5.25 2.91667M7 12.8333L8.75 11.0833M7 12.8333L5.25 11.0833M2.33333 4.08333L2.33333 6.41667M2.33333 4.08333L4.66667 4.08333M11.6667 9.91667L11.6667 7.58333M11.6667 9.91667L9.33333 9.91667M11.6667 4.08333L9.33333 4.08333M11.6667 4.08333L11.6667 6.41667M2.33333 9.91667L4.66667 9.91667M2.33333 9.91667L2.33333 7.58333" stroke={category === "cold" ? "#38BDF8" : "#94A3B8"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`font-sans font-medium text-xs leading-4 text-center ${category === "cold" ? "text-[#38BDF8]" : "text-[#94A3B8]"}`}>Cold</span>
          </button>
          
          <button
            onClick={() => setCategory("other")}
            className={`flex flex-row justify-center items-center px-3 py-2 gap-1.5 h-[34px] border rounded-lg transition-colors cursor-pointer ${
              category === "other" ? "bg-[#0C1017] border-[#232E40]" : "bg-transparent border-[#232E40] opacity-60 hover:opacity-100"
            }`}
          >
            <span className={`font-sans font-medium text-xs leading-4 text-center ${category === "other" ? "text-[#CBD5E1]" : "text-[#94A3B8]"}`}>Other</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start p-6 gap-4 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
        <div className="flex flex-row items-center gap-3.5 w-full">
          <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
            <span className="font-sans font-bold text-xs text-[#60A5FA]">6</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="font-sans font-semibold text-base text-white leading-6">Follow-up</h2>
            <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">Set a follow-up date to track this enquiry.</p>
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-1.5 mt-1">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Follow-up Date <span className="text-[#EF4444]">*</span></label>
          <div className="relative w-full h-[42px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.6667 1.33333V4" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33334 1.33333V4" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 6.66667H14" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <input 
              type="date"
              className="w-full h-[42px] bg-[#0C1017] border border-[#232E40] rounded-lg pl-10 pr-3.5 font-sans font-normal text-sm text-[#E2E8F0] outline-none focus:border-[#38BDF8] transition-colors cursor-pointer"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
