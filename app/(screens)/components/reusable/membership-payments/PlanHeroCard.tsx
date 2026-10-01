"use client";

import { Star, CalendarBlank, ShieldCheck, ArrowsClockwise, Pen } from "@phosphor-icons/react";
import { MembershipPaymentsData } from "./types";

interface PlanHeroCardProps {
  plan: MembershipPaymentsData["plan"];
  onEditPlan?: () => void;
}

export default function PlanHeroCard({ plan, onEditPlan }: PlanHeroCardProps) {
  return (
    <div className="flex flex-col p-6 w-full bg-gradient-to-b from-[rgba(29,32,37,0.6)] via-[#191C21] to-[#0B0E13] border border-[rgba(157,223,46,0.2)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl relative overflow-hidden shrink-0">
      <div className="absolute left-[33%] right-[25%] bottom-[-187px] h-[256px] bg-[rgba(157,223,46,0.05)] blur-[20px] rounded-full pointer-events-none" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pb-6 border-b border-[#272A30]/60 z-10 w-full relative">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center justify-center w-16 h-16 bg-[rgba(39,42,48,0.8)] border border-[rgba(157,223,46,0.3)] shadow-[0_0_20px_rgba(157,223,46,0.2)] rounded-2xl shrink-0">
            <Star size={26} className="text-[#9DDF2E]" weight="fill" />
          </div>
          <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-auto text-center md:text-left">
            <div className="flex flex-row items-center justify-center md:justify-start gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[1px] uppercase text-[#9DDF2E] whitespace-nowrap">
                CURRENT ACTIVE PLAN
              </span>
              {/* <span className="font-mono font-normal text-[11px] leading-5 text-[#C4CAAC] whitespace-nowrap">
                • {plan.tier}
              </span> */}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 flex-wrap justify-center md:justify-start">
              <h2 className="font-sans font-bold text-[22px] sm:text-[32px] leading-8 sm:leading-10 tracking-[-0.8px] text-white m-0 shrink-0">
                {plan.name}
              </h2>
              <div className="flex flex-row items-center px-3 py-1 gap-1.5 bg-[rgba(157,223,46,0.15)] border border-[rgba(157,223,46,0.3)] shadow-[0_0_10px_rgba(157,223,46,0.15)] rounded-full">
                <div className="w-2 h-2 bg-[#9DDF2E] rounded-full" />
                <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[0.5px] uppercase text-[#9DDF2E]">
                  {plan.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <button 
          onClick={onEditPlan}
          className="flex flex-row items-center justify-center px-4 py-2.5 gap-2 bg-[#272A30] border border-[rgba(157,223,46,0.2)] shadow-sm rounded-xl hover:bg-white/5 transition-colors shrink-0 w-full md:w-auto"
        >
          <Pen size={14} className="text-[#9DDF2E]" weight="bold" />
          <span className="font-mono font-medium text-xs leading-4 text-[#9DDF2E]">
            Edit Plan
          </span>
        </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-6 z-10 relative">
        <div className="flex flex-row items-center p-4 gap-3.5 w-full bg-[rgba(11,14,19,0.8)] border border-[rgba(39,42,48,0.8)] rounded-xl">
          <div className="flex items-center justify-center w-10 h-10 bg-[#191C21] border border-[#272A30] rounded-xl shrink-0">
            <CalendarBlank size={16} className="text-[#9DDF2E]" weight="regular" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[0.5px] uppercase text-[#C4CAAC]">
              START DATE
            </span>
            <span className="font-sans font-semibold text-base leading-6 text-white">
              {plan.startDate}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center p-4 gap-3.5 w-full bg-[rgba(11,14,19,0.8)] border border-[rgba(39,42,48,0.8)] rounded-xl">
          <div className="flex items-center justify-center w-10 h-10 bg-[#191C21] border border-[#272A30] rounded-xl shrink-0">
            <CalendarBlank size={16} className="text-[#9DDF2E]" weight="regular" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[0.5px] uppercase text-[#C4CAAC]">
              EXPIRY DATE
            </span>
            <span className="font-sans font-semibold text-base leading-6 text-white">
              {plan.expiryDate}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center p-4 gap-3.5 w-full bg-[rgba(11,14,19,0.8)] border border-[rgba(39,42,48,0.8)] rounded-xl">
          <div className="flex items-center justify-center w-10 h-10 bg-[#191C21] border border-[#272A30] rounded-xl shrink-0">
            <ShieldCheck size={16} className="text-[#9DDF2E]" weight="regular" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[0.5px] uppercase text-[#C4CAAC]">
              STATUS
            </span>
            <div className="flex flex-row items-center gap-2 mt-0.5">
              <div className="w-2 h-2 bg-[#9DDF2E] shadow-[0_0_8px_rgba(157,223,46,0.8)] rounded-full" />
              <span className="font-sans font-semibold text-base leading-6 text-[#9DDF2E]">
                {plan.planStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center p-4 gap-3.5 w-full bg-[rgba(11,14,19,0.8)] border border-[rgba(39,42,48,0.8)] rounded-xl">
          <div className="flex items-center justify-center w-10 h-10 bg-[#191C21] border border-[#272A30] rounded-xl shrink-0">
            <ArrowsClockwise size={16} className="text-[#9DDF2E]" weight="regular" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-mono font-semibold text-[10px] leading-3.5 tracking-[0.5px] uppercase text-[#C4CAAC]">
              RENEWAL DATE
            </span>
            <span className="font-sans font-semibold text-base leading-6 text-white">
              {plan.renewalDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
