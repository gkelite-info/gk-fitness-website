"use client";

import { MagnifyingGlass, Users, Bell, Gear } from "@phosphor-icons/react";

export default function TopHeader() {
  return (
    <header className="sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-5 w-full bg-[#0C0D10]/95 border-b border-[#181A22] backdrop-blur-md gap-4 sm:gap-0">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-12 h-12 rounded-full shadow-[0_0_0_2px_#222530] overflow-hidden flex-shrink-0 bg-gray-800">
          <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-900" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-[#94A3B8] tracking-wider uppercase">
            Alex - Gym Owner
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <h1 className="font-bold text-lg text-white">Good Morning, Alex</h1>
            <span className="text-[#94A3B8] text-xs font-medium hidden sm:inline-block">Welcome back</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-80">
          <MagnifyingGlass
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            weight="bold"
          />
          <input
            type="text"
            placeholder="Search members, payments, etc..."
            className="w-full h-10 bg-[#15161C] border border-[#232631] rounded-xl pl-10 pr-4 text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="cursor-pointer w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <Users size={20} className="text-[#CBD5E1]" weight="fill" />
          </button>
          <button className="cursor-pointer relative w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <Bell size={20} className="text-[#CBD5E1]" weight="fill" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#F43F5E] rounded-full shadow-[0_0_0_2px_#15161C]" />
          </button>
          <button className="cursor-pointer w-10 h-10 flex items-center justify-center bg-[#15161C] border border-[#232631] rounded-xl hover:bg-[#1f212a] transition-colors">
            <Gear size={20} className="text-[#CBD5E1]" weight="fill" />
          </button>
        </div>
      </div>
    </header>
  );
}
