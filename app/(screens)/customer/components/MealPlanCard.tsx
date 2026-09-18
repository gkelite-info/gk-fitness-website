"use client";

import { BowlFood, ForkKnife, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";

export default function MealPlanCard() {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4 relative overflow-hidden flex flex-row items-center justify-between">
      <div className="flex-1 z-10 py-1">
        <div className="w-10 h-10 rounded-2xl bg-[#C0F905]/10 flex items-center justify-center mb-3">
          <BowlFood size={22} color="#C0F905" weight="fill" />
        </div>

        <h2 className="text-white text-2xl font-semibold tracking-tight mb-1">
          Today's Meal Plan
        </h2>

        <p className="text-[#8E8E93] text-[11px] font-medium mb-5">
          Track your meals and macros in the app
        </p>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full border-2 border-[#C0F905] flex items-center justify-center">
            <ForkKnife size={14} color="#C0F905" weight="fill" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#C0F905] text-lg font-semibold">Track</span>
            <span className="text-[#8E8E93] text-xs font-medium">nutrition goals</span>
          </div>
        </div>

        <a
          href="gk-fitness://nutrition"
          className="bg-[#C4EF00] rounded-xl py-3 px-5 flex items-center justify-center self-start w-fit active:opacity-90 hover:bg-[#b0d600] transition-colors"
        >
          <span className="text-black font-bold text-sm mr-2">Open Nutrition</span>
          <ArrowRight size={16} color="#000000" weight="bold" />
        </a>
      </div>

      <div className="absolute -right-20 top-0 bottom-0 flex justify-center items-center opacity-50 sm:opacity-100 hidden sm:flex">
        <div className="w-48 h-48 bg-gradient-to-l from-[#C0F905]/10 to-transparent rounded-full blur-2xl absolute"></div>
        <BowlFood size={140} className="text-[#222] absolute -right-4" weight="fill" />
      </div>
    </div>
  );
}
