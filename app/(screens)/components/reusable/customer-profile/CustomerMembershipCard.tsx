"use client";

import { Pen, Star, CalendarBlank } from "@phosphor-icons/react";
import { CustomerProfileData } from "./types";

interface CustomerMembershipCardProps {
  membership?: CustomerProfileData["membership"];
  onEditPlan?: () => void;
}

export default function CustomerMembershipCard({ membership, onEditPlan }: CustomerMembershipCardProps) {
  return (
    <div className="flex flex-col justify-between items-start p-4 sm:p-6 w-full md:flex-[7] bg-[#10151E] border border-[#1B2433] shadow-lg rounded-2xl h-full min-h-[274px]">

      <div className="flex flex-row justify-between items-start w-full gap-4">
        <div className="flex flex-row items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 bg-[#1C2214] border border-[#3B4C12] rounded-full shrink-0">
            <Star size={20} className="text-[#D2F802]" weight="fill" />
          </div>
          <div className="flex flex-col items-start gap-1 min-w-0">
            <span className="font-sans font-medium text-[11px] leading-4 tracking-wider uppercase text-[#9CA3AF] truncate w-full">
              Current Membership
            </span>
            <h3 className="font-sans font-extrabold text-lg sm:text-xl leading-7 tracking-tight text-[#D2F802] m-0 truncate w-full">
              {membership?.planName || "No Plan"}
            </h3>
          </div>
        </div>
        <button
          onClick={onEditPlan}
          className="flex flex-row items-center px-3.5 py-1.5 gap-2 border border-[rgba(210,248,2,0.6)] rounded-xl hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <Pen size={14} className="text-[#D2F802]" />
          <span className="font-sans font-semibold text-xs leading-4 text-[#D2F802] hidden sm:block">
            Edit Plan
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 py-5 gap-4 w-full border-b border-[#1B2433] mt-2">
        <div className="flex flex-col items-start gap-1">
          <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">Start Date</span>
          <span className="font-sans font-bold text-sm leading-5 tracking-wide text-white break-words">
            {membership?.startDate || "-"}
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">Expiry Date</span>
          <span className="font-sans font-bold text-sm leading-5 tracking-wide text-white break-words">
            {membership?.expiryDate || "-"}
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">Duration</span>
          <span className="font-sans font-bold text-sm leading-5 tracking-wide text-white break-words">
            {membership?.duration || "-"}
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="font-sans font-normal text-xs leading-4 text-[#9CA3AF]">Status</span>
          <div className={`px-2.5 py-0.5 rounded border ${membership?.status === 'Active' ? 'bg-[#112613] border-[#1F5426] text-[#4ADE80]' : 'bg-[#2F1B1E] border-[#482025] text-[#F87171]'}`}>
            <span className="font-sans font-semibold text-[11px] leading-4">
              {membership?.status || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center gap-3 pt-4 w-full">
        <div className="flex flex-row items-center gap-2.5">
          <CalendarBlank size={20} className="text-[#D2F802]" weight="regular" />
          <span className="font-sans font-medium text-sm leading-5 text-[#E5E7EB]">
            Remaining Days
          </span>
        </div>
        <div className="font-sans font-extrabold text-2xl leading-none tracking-tight text-[#D2F802] shrink-0">
          {membership?.remainingDays || 0} <span className="text-sm font-bold">Days</span>
        </div>
      </div>

    </div>
  );
}
