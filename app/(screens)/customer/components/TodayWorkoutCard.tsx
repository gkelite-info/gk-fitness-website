"use client";

import { Barbell, Clock, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import { openAppOrStore } from "../../../utils/deepLink";

export default function TodayWorkoutCard() {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4 relative overflow-hidden flex flex-row items-center justify-between">
      <div className="flex-1 z-10 pr-2">
        <span className="text-[#D7FF00] text-[11px] font-semibold tracking-wider mb-1 block">
          TODAY'S WORKOUT
        </span>
        <h2 className="text-white text-2xl font-semibold mb-2">
          Ready to train?
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Barbell size={16} color="#8E8E93" />
            <span className="text-[#8E8E93] text-xs font-medium">Your Routine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} color="#8E8E93" />
            <span className="text-[#8E8E93] text-xs font-medium">Tracked</span>
          </div>
        </div>

        <button
          onClick={() => openAppOrStore("home")}
          className="bg-[#D7FF00] rounded-full py-3 px-5 flex items-center justify-center self-start w-fit active:opacity-90 hover:bg-[#c2e600] transition-colors cursor-pointer"
        >
          <span className="text-black font-bold text-sm mr-2 tracking-wide">OPEN WORKOUTS</span>
          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center">
            <ArrowRight size={14} color="#000000" weight="bold" />
          </div>
        </button>
      </div>

      <div className="items-end justify-center hidden sm:flex shrink-0">
        <div className="w-[145px] h-[160px] relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A] to-[#2A2A2A] rounded-2xl flex items-center justify-center border border-[#333]">
                <Barbell size={64} className="text-[#444] opacity-50" weight="fill" />
            </div>
        </div>
      </div>
    </div>
  );
}
