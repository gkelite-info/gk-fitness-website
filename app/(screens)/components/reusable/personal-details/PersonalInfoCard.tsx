"use client";

import React from "react";
import { User } from "@phosphor-icons/react";
import { PersonalDetailsData } from "./types";

interface PersonalInfoCardProps {
  data: PersonalDetailsData["personalInfo"];
}

export default function PersonalInfoCard({ data }: PersonalInfoCardProps) {
  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl">
      
      <div className="flex flex-row justify-between items-center pb-4 w-full border-b border-[#242C3A]/60">
        <div className="flex flex-row items-center gap-2.5">
          <User size={20} className="text-[#CCFF00]" weight="bold" />
          <h3 className="font-sans font-extrabold text-xs leading-4 tracking-[1.2px] uppercase text-[#CCFF00] m-0">
            Personal Information
          </h3>
        </div>
        <span className="font-sans font-medium text-[11px] leading-4 text-[#7E8B9F]">
          Verified Identity
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
        
        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Full Name
          </span>
          <span className="font-sans font-bold text-sm leading-5 tracking-[0.35px] text-white">
            {data.fullName}
          </span>
        </div>

        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Gender
          </span>
          <span className="font-sans font-bold text-sm leading-5 text-white">
            {data.gender}
          </span>
        </div>

        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Date of Birth
          </span>
          <span className="font-sans font-bold text-sm leading-5 text-white">
            {data.dateOfBirth}
          </span>
        </div>

        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Age
          </span>
          <span className="font-sans font-bold text-sm leading-5 text-white">
            {data.age}
          </span>
        </div>

        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Email Address
          </span>
          <span className="font-sans font-semibold text-sm leading-5 text-white break-all">
            {data.email}
          </span>
        </div>

        <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Phone Number
          </span>
          <span className="font-sans font-bold text-sm leading-5 tracking-[0.35px] text-white">
            {data.phone}
          </span>
        </div>

      </div>
    </div>
  );
}
