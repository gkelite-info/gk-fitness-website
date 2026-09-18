"use client";

import { Flame, Footprints, Drop, Lightning } from "@phosphor-icons/react";

export default function StatsGrid() {
  return (
    <div className="flex flex-wrap justify-between gap-y-3 mb-4">
      <a 
        href="gk-fitness://fitness/calories" 
        className="w-[48.5%] bg-[#141414] border border-[#222222] rounded-3xl p-4 active:opacity-80 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-[#FF453A]/10 flex items-center justify-center mb-2">
          <Flame size={20} color="#FF453A" weight="fill" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-white text-xl sm:text-2xl font-semibold">Track in</span>
          <span className="text-[#FF453A] text-xl sm:text-2xl font-bold">App</span>
        </div>
        <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1 block group-hover:text-white transition-colors">
          CALORIES KCAL
        </span>
      </a>

      <a 
        href="gk-fitness://fitness/steps" 
        className="w-[48.5%] bg-[#141414] border border-[#222222] rounded-3xl p-4 active:opacity-80 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-[#C3F400]/10 flex items-center justify-center mb-2">
          <Footprints size={20} color="#C3F400" weight="fill" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-white text-xl sm:text-2xl font-semibold">Track in</span>
          <span className="text-[#C3F400] text-xl sm:text-2xl font-bold">App</span>
        </div>
        <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1 block group-hover:text-white transition-colors">
          STEPS
        </span>
      </a>

      <a 
        href="gk-fitness://fitness/water" 
        className="w-[48.5%] bg-[#141414] border border-[#222222] rounded-3xl p-4 active:opacity-80 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-[#00DBE7]/10 flex items-center justify-center mb-2">
          <Drop size={20} color="#00DBE7" weight="fill" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-white text-xl sm:text-2xl font-semibold">Track in</span>
          <span className="text-[#00DBE7] text-xl sm:text-2xl font-bold">App</span>
        </div>
        <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1 block group-hover:text-white transition-colors">
          WATER (LITERS)
        </span>
      </a>

      <a 
        href="gk-fitness://streak-details" 
        className="w-[48.5%] bg-[#141414] border border-[#222222] rounded-3xl p-4 active:opacity-80 hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-[#FB923C]/10 flex items-center justify-center mb-2">
          <Lightning size={20} color="#FB923C" weight="fill" />
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-white text-xl sm:text-2xl font-semibold">Track in</span>
          <span className="text-[#FB923C] text-xl sm:text-2xl font-bold">App</span>
        </div>
        <span className="text-[#8E8E8E] text-[10px] sm:text-[11px] font-semibold tracking-wider mt-1 block group-hover:text-white transition-colors">
          WORKOUT STREAK
        </span>
      </a>
    </div>
  );
}
