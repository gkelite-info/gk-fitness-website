"use client";

import { Heart } from "@phosphor-icons/react";
import { PersonalDetailsData } from "./types";

interface HealthInfoCardProps {
  data: PersonalDetailsData["healthInfo"];
}

export default function HealthInfoCard({ data }: HealthInfoCardProps) {
  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl">
      
      <div className="flex flex-row justify-between items-center pb-4 w-full border-b border-[#242C3A]/60">
        <div className="flex flex-row items-center gap-2.5">
          <Heart size={20} className="text-[#CCFF00]" weight="bold" />
          <h3 className="font-sans font-extrabold text-xs leading-4 tracking-[1.2px] uppercase text-[#CCFF00] m-0">
            Health Information
          </h3>
        </div>
        <div className="flex flex-row items-center px-2.5 py-0.5 bg-[rgba(204,255,0,0.1)] border border-[rgba(204,255,0,0.2)] rounded-full">
          <span className="font-sans font-semibold text-[11px] leading-4 text-[rgba(204,255,0,0.9)]">
            Fit to Train
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 w-full">
        
        <div className="flex flex-col justify-between items-start p-3.5 h-[77px] bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Height
          </span>
          <div className="flex flex-row items-baseline gap-1">
            <span className="font-sans font-extrabold text-xl leading-7 text-white">
              {data.height}
            </span>
            <span className="font-sans font-medium text-xs leading-4 text-[#7E8B9F]">
              cm
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start p-3.5 h-[77px] bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Weight
          </span>
          <div className="flex flex-row items-baseline gap-1">
            <span className="font-sans font-extrabold text-xl leading-7 text-white">
              {data.weight}
            </span>
            <span className="font-sans font-medium text-xs leading-4 text-[#7E8B9F]">
              kg
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
