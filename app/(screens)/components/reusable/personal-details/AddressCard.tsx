"use client";

import React from "react";
import { MapPin } from "@phosphor-icons/react";
import { PersonalDetailsData } from "./types";

interface AddressCardProps {
  data: PersonalDetailsData["address"];
}

export default function AddressCard({ data }: AddressCardProps) {
  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full h-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl">
      
      <div className="flex flex-row justify-between items-center pb-4 w-full border-b border-[#242C3A]/60">
        <div className="flex flex-row items-center gap-2.5">
          <MapPin size={20} className="text-[#CCFF00]" weight="bold" />
          <h3 className="font-sans font-extrabold text-xs leading-4 tracking-[1.2px] uppercase text-[#CCFF00] m-0">
            Address
          </h3>
        </div>
        <span className="font-sans font-medium text-[11px] leading-4 text-[#7E8B9F]">
          Residential / Primary
        </span>
      </div>

      <div className="flex flex-col items-start gap-3.5 w-full">
        
        <div className="flex flex-col items-start p-3.5 gap-1 w-full bg-[#171C26] border border-[#242C3A] rounded-xl">
          <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
            Address
          </span>
          <span className="font-sans font-semibold text-sm leading-[23px] text-white">
            {data.fullAddress}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
          
          <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              City
            </span>
            <span className="font-sans font-bold text-sm leading-5 text-white">
              {data.city}
            </span>
          </div>

          <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              State
            </span>
            <span className="font-sans font-bold text-sm leading-5 text-white">
              {data.state}
            </span>
          </div>

          <div className="flex flex-col items-start p-3.5 gap-1 bg-[#171C26] border border-[#242C3A] rounded-xl">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              Pincode
            </span>
            <span className="font-sans font-bold text-sm leading-5 tracking-[0.7px] text-white">
              {data.pincode}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
