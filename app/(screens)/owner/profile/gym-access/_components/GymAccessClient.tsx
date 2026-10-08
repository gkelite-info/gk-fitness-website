"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import GymTimingsCard from "./GymTimingsCard";
import CheckInRulesCard from "./CheckInRulesCard";


export default function GymAccessClient() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed text-white">

      <div className="flex flex-col gap-4 w-full shrink-0">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white mt-0.5 sm:mt-0"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-4">
              <h1 className="font-['Nimbus_Sans'] font-bold text-3xl sm:text-[34px] leading-9 tracking-[-0.6px] m-0">
                Gym Access
              </h1>
              <div className="bg-[#103D1A] border border-[#185525] rounded-full px-3 py-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></div>
                <span className="font-['Nimbus_Sans'] font-bold text-[11px] text-[#4ADE80] uppercase tracking-wide pt-0.5">Active</span>
              </div>
            </div>
            <p className="font-['Nimbus_Sans'] font-normal text-sm sm:text-[15px] text-[#94A3B8]">
              Manage gym timings and customer check-in rules.
            </p>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#232631] mt-3 sm:mt-4 mb-2"></div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full pb-10">
        <GymTimingsCard />
        <CheckInRulesCard />
      </div>
    </div>
  );
}
