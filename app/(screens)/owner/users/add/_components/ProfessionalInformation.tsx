"use client";

import { Briefcase } from "@phosphor-icons/react";

export default function ProfessionalInformation() {
  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <Briefcase weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Professional Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        {/* Specialization Pills */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Specialization
          </label>
          <div className="flex flex-row flex-wrap items-start gap-2 w-full">
            <button
              type="button"
              className="flex flex-col justify-center items-center px-3 py-1.5 border border-[#303744] rounded-full hover:bg-[#303744]/50 transition-colors cursor-pointer"
            >
              <span className="font-sans font-normal text-xs leading-4 text-center text-[#D1D5DB]">
                Strength Training
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col justify-center items-center px-3 py-1.5 border border-[#303744] rounded-full hover:bg-[#303744]/50 transition-colors cursor-pointer"
            >
              <span className="font-sans font-normal text-xs leading-4 text-center text-[#D1D5DB]">
                Fat Loss
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col justify-center items-center px-3 py-[7px] bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-full transition-colors cursor-pointer"
            >
              <span className="font-sans font-semibold text-xs leading-4 text-center text-black">
                Cross Fit
              </span>
            </button>
          </div>
        </div>

        {/* Experience & Joining Date Dual Column */}
        <div className="flex flex-col md:flex-row items-start gap-[15px] w-full">
          {/* Experience */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Experience (Years)
            </label>
            <div className="flex flex-row justify-center items-start px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg">
              <input
                type="number"
                placeholder="e.g. 5"
                className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Joining Date */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Joining Date
            </label>
            <div className="relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg h-[34px]">
              <input
                type="date"
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Fee Structures Dual Column */}
        <div className="flex flex-col md:flex-row items-start gap-[15px] w-full">
          {/* Personal Training Fee */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Personal Training Fee
            </label>
            <div className="flex flex-row items-stretch w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg overflow-hidden">
              <div className="flex flex-col items-start justify-center px-3 py-2 bg-[rgba(17,22,29,0.6)] border-r border-[#14161A] min-w-[31px]">
                <span className="font-[FreeSans] font-normal text-xs leading-4 text-[#9CA3AF]">
                  ₹
                </span>
              </div>
              <input
                type="number"
                className="flex-1 bg-transparent px-3 outline-none font-sans font-normal text-xs leading-[14px] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex flex-col items-end justify-center pr-3 py-2">
                <span className="font-sans font-normal text-xs leading-4 text-[#6B7280] whitespace-nowrap">
                  / month
                </span>
              </div>
            </div>
          </div>

          {/* Group Training Fee */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Group Training Fee
            </label>
            <div className="flex flex-row items-stretch w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg overflow-hidden">
              <div className="flex flex-col items-start justify-center px-3 py-2 bg-[rgba(17,22,29,0.6)] border-r border-[#14161A] min-w-[31px]">
                <span className="font-[FreeSans] font-normal text-xs leading-4 text-[#9CA3AF]">
                  ₹
                </span>
              </div>
              <input
                type="number"
                className="flex-1 bg-transparent px-3 outline-none font-sans font-normal text-xs leading-[14px] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex flex-col items-end justify-center pr-3 py-2">
                <span className="font-sans font-normal text-xs leading-4 text-[#6B7280] whitespace-nowrap">
                  0 / day
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualification / Certification */}
        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Qualification / Certification
          </label>
          <div className="flex flex-row justify-center items-start px-3 py-[9px] w-full bg-[#1A2029] border border-[#14161A] rounded-lg">
            <input
              type="text"
              placeholder="NASM Certified Trainer, BSc Sports Science"
              className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
