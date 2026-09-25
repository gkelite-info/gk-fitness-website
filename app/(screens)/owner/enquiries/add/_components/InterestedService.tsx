"use client";

import { useState } from "react";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { User, Users, Barbell } from "@phosphor-icons/react";

export default function InterestedService() {
  const [activeService, setActiveService] = useState("membership");
  const [plan, setPlan] = useState("");

  const planOptions = [
    { label: "1 Month Standard", value: "1m_std" },
    { label: "3 Month Standard", value: "3m_std" },
    { label: "6 Month Standard", value: "6m_std" },
    { label: "1 Year Standard", value: "1y_std" },
  ];

  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center gap-3.5 w-full">
        <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
          <span className="font-sans font-bold text-xs text-[#60A5FA]">2</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans font-semibold text-base text-white leading-6">Interested Service / Plan</h2>
          <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">What is the customer interested in?</p>
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-4">
        
        <div className="flex flex-col items-start w-full gap-2">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Interested In <span className="text-[#EF4444]">*</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-2.5">
            <button
              onClick={() => setActiveService("membership")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2.5 h-[42px] border rounded-lg transition-colors cursor-pointer w-full whitespace-nowrap ${
                activeService === "membership" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <Barbell size={22} className={activeService === "membership" ? "text-[#34D399]" : "text-[#94A3B8]"} />
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                activeService === "membership" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Membership
              </span>
            </button>

            <button
              onClick={() => setActiveService("pt")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2.5 h-[42px] border rounded-lg transition-colors cursor-pointer w-full whitespace-nowrap ${
                activeService === "pt" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <User size={22} className={`shrink-0 ${activeService === "pt" ? "text-[#34D399]" : "text-[#94A3B8]"}`} />
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                activeService === "pt" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Personal Training
              </span>
            </button>

            <button
              onClick={() => setActiveService("group")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2.5 h-[42px] border rounded-lg transition-colors cursor-pointer w-full whitespace-nowrap ${
                activeService === "group" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <Users size={22} className={activeService === "group" ? "text-[#34D399]" : "text-[#94A3B8]"} />
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                activeService === "group" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Group Class
              </span>
            </button>
            <button
              onClick={() => setActiveService("other")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 h-[42px] border rounded-lg transition-colors cursor-pointer w-full whitespace-nowrap ${
                activeService === "other" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                activeService === "other" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Other
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-1.5 mt-2">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Preferred Plan / Membership Plan <span className="text-[#EF4444]">*</span></label>
          <div className="relative w-full h-[42px]">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33333 2V4.66667H14" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.3333 14H4.66667C3.19424 14 2 12.8058 2 11.3333V4.66667C2 3.19424 3.19424 2 4.66667 2H9.33333L14 6.66667V11.3333C14 12.8058 12.8058 14 11.3333 14Z" stroke="#64748B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Dropdown 
              options={planOptions}
              value={plan}
              onChange={setPlan}
              placeholder="Select plan"
              triggerClassName="flex flex-row items-center justify-between pl-10 pr-3 w-full h-[42px] bg-[#0C1017] border border-[#232E40] rounded-lg cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
