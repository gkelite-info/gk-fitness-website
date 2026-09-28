"use client";

import React from "react";
import Avatar from "../Avatar";
import { PersonalDetailsData } from "./types";

interface MemberIdentityBannerProps {
  data: PersonalDetailsData;
}

export default function MemberIdentityBanner({ data }: MemberIdentityBannerProps) {
  const isActive = data.status === "Active";

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-5 gap-6 w-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl shrink-0">
      
      <div className="flex flex-row items-center gap-4">
        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#171C26] to-[#1E2532] border border-[#242C3A] rounded-2xl shrink-0 overflow-hidden">
          <Avatar src={data.avatarUrl} alt={data.name} className="w-full h-full !rounded-2xl" />
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3">
            <h2 className="font-sans font-bold text-lg leading-7 tracking-[0.45px] text-white m-0">
              {data.name}
            </h2>
            <div className="flex flex-row items-center px-2.5 py-0.5 gap-1.5 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-full">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#34D399]' : 'bg-[#F87171]'}`} />
              <span className={`font-sans font-semibold text-xs leading-4 ${isActive ? 'text-[#34D399]' : 'text-[#F87171]'}`}>
                {data.status} Member
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-start lg:justify-end gap-4 md:gap-6 w-full lg:w-auto shrink-0 border-t border-[#242C3A]/60 lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
        
        <div className="flex flex-col items-start lg:items-end gap-0.5 min-w-0 flex-1 lg:flex-none">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F] whitespace-nowrap">
            ASSIGNED TRAINER
          </span>
          <span className="font-sans font-semibold text-sm leading-5 text-white whitespace-nowrap">
            {data.assignedTrainer}
          </span>
        </div>

        <div className="hidden md:block w-[1px] h-8 bg-[#242C3A] shrink-0" />

        <div className="flex flex-col items-start lg:items-end gap-0.5 min-w-0 flex-1 lg:flex-none">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F] whitespace-nowrap">
            PRIMARY GOAL
          </span>
          <span className="font-sans font-bold text-sm leading-5 text-[#CCFF00] whitespace-normal lg:whitespace-nowrap break-words lg:break-normal">
            {data.primaryGoal}
          </span>
        </div>
        
      </div>

    </div>
  );
}
