"use client";

import { ArrowRight, DeviceMobile } from "@phosphor-icons/react";

import { openAppOrStore } from "../../../utils/deepLink";

export default function AppDeepLinkBanner() {
  return (
    <div className="w-full bg-[#1A1A1A] border-b border-[#2A2A2A] px-4 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <DeviceMobile size={18} color="#D7FF00" weight="fill" />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-xs font-semibold">Get the full experience</span>
          <span className="text-[#8E8E93] text-[10px]">Download the GK-Gym Life App</span>
        </div>
      </div>
      
      <button 
        onClick={() => openAppOrStore("home")}
        className="bg-[#D7FF00] py-1.5 px-3 rounded-full flex items-center gap-1 active:opacity-80 transition-opacity cursor-pointer border-none"
      >
        <span className="text-black text-[10px] font-bold tracking-wide">OPEN IN APP</span>
        <ArrowRight size={12} color="#000000" weight="bold" />
      </button>
    </div>
  );
}
