"use client";

import { Barbell, BowlFood, Plus } from "@phosphor-icons/react";
import { openAppOrStore } from "@/app/utils/deepLink";

export default function GlobalTrainerQuickActions() {
  return (
    <div className="mb-4">
      <span className="text-[#D4FF32] text-[11px] font-bold tracking-wider uppercase block mb-2.5 px-1">
        QUICK ACTIONS
      </span>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => openAppOrStore("create-workout")}
          className="bg-[#141414] hover:bg-[#1A1A1E] border border-[#222222] hover:border-[#D4FF32]/40 rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer text-left active:scale-95 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#1C1C20] border border-[#2A2A30] flex items-center justify-center text-[#D4FF32] shrink-0">
              <Barbell size={18} weight="fill" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-medium leading-tight">
                Create
              </span>
              <span className="text-white text-xs sm:text-sm font-bold leading-tight truncate">
                Workout Plan
              </span>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#D4FF32] flex items-center justify-center text-black shrink-0 shadow-[0_0_10px_rgba(212,255,50,0.3)]">
            <Plus size={13} weight="bold" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => openAppOrStore("create-diet")}
          className="bg-[#141414] hover:bg-[#1A1A1E] border border-[#222222] hover:border-[#D4FF32]/40 rounded-2xl p-3.5 flex items-center justify-between transition-all cursor-pointer text-left active:scale-95 group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#1C1C20] border border-[#2A2A30] flex items-center justify-center text-[#D4FF32] shrink-0">
              <BowlFood size={18} weight="fill" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-medium leading-tight">
                Create
              </span>
              <span className="text-white text-xs sm:text-sm font-bold leading-tight truncate">
                Diet Plan
              </span>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#D4FF32] flex items-center justify-center text-black shrink-0 shadow-[0_0_10px_rgba(212,255,50,0.3)]">
            <Plus size={13} weight="bold" />
          </div>
        </button>
      </div>
    </div>
  );
}
