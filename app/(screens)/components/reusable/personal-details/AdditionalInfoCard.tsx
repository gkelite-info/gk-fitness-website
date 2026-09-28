"use client";

import { FileText, CaretRight } from "@phosphor-icons/react";
import { PersonalDetailsData } from "./types";

interface AdditionalInfoCardProps {
  data: PersonalDetailsData["additionalInfo"];
}

export default function AdditionalInfoCard({ data }: AdditionalInfoCardProps) {
  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full h-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl">
      
      <div className="flex flex-row justify-between items-center pb-4 w-full border-b border-[#242C3A]/60">
        <div className="flex flex-row items-center gap-2.5">
          <FileText size={20} className="text-[#CCFF00]" weight="bold" />
          <h3 className="font-sans font-extrabold text-xs leading-4 tracking-[1.2px] uppercase text-[#CCFF00] m-0">
            Additional Information
          </h3>
        </div>
        <span className="font-sans font-medium text-[11px] leading-4 text-[#7E8B9F]">
          Program Target
        </span>
      </div>

      <div className="flex flex-col items-start gap-3 w-full">
        
        <div className="flex flex-row justify-between items-center p-3.5 w-full bg-[#171C26] border border-[#242C3A] rounded-xl cursor-pointer hover:bg-white/5 transition-colors group">
          <span className="font-sans font-medium text-sm leading-5 text-[#7E8B9F]">
            Fitness Goal
          </span>
          <div className="flex flex-row items-center gap-2.5">
            <span className="font-sans font-bold text-sm leading-5 text-white">
              {data.fitnessGoal}
            </span>
            <CaretRight size={16} className="text-[#7E8B9F] group-hover:text-white transition-colors" weight="bold" />
          </div>
        </div>

      </div>

    </div>
  );
}
