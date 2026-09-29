"use client";
import { MagnifyingGlass, Funnel } from "@phosphor-icons/react/dist/ssr";

const filters = ["All", "Strength", "Weight Loss", "Cardio & Endurance", "Yoga & Flexibility", "CrossFit"];

export default function TrainerSearchFilters() {
  return (
    <div className="flex flex-col items-start gap-[16px] w-full shrink-0">
      <div className="flex flex-row items-center gap-[12px] w-full">
        <div className="relative flex flex-col justify-center w-full flex-1 h-[50px] bg-[#131720] border border-[#252C3C] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] rounded-[12px] overflow-hidden">
          <div className="absolute left-[16px] flex justify-center items-center w-[20px] h-[20px] pointer-events-none">
            <MagnifyingGlass size={20} className="text-[#94A3B8]" weight="bold" />
          </div>
          <input
            type="text"
            placeholder="Search trainer..."
            className="w-full h-full bg-transparent pl-[44px] pr-[16px] outline-none font-sans font-normal text-[14px] text-white placeholder-[#64748B] tracking-[0.35px]"
          />
        </div>
        <button className="flex justify-center items-center w-[48px] h-[48px] bg-[#141822] border border-[#272E3F] rounded-[12px] shrink-0 hover:bg-[#1A1F2B] transition-colors cursor-pointer">
          <Funnel size={20} className="text-[#CCFF00]" weight="bold" />
        </button>
      </div>

      <div className="flex flex-row items-center gap-[10px] w-full overflow-x-auto scrollbar-none py-[4px]">
        {filters.map((filter, index) => {
          const isActive = filter === "All";
          return (
            <button
              key={filter}
              className={`flex justify-center items-center px-[16px] sm:px-[20px] py-[8px] h-[36px] sm:h-[38px] rounded-[8px] shrink-0 transition-all ${
                isActive 
                  ? "bg-[#CCFF00] shadow-[0px_0px_12px_rgba(204,255,0,0.3)] border border-transparent" 
                  : "bg-[#161A24] border border-[#252C3C] hover:bg-[#1A1F2B]"
              }`}
            >
              <span
                className={`font-sans font-bold sm:font-medium text-[13px] sm:text-[14px] leading-[20px] tracking-[0.35px] whitespace-nowrap ${
                  isActive ? "text-black" : "text-[#CBD5E1]"
                }`}
              >
                {filter}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
