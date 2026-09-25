import { Barbell } from "@phosphor-icons/react";

export default function EnquiryInterestRequirement() {
  return (
    <div className="flex flex-col p-5 bg-[#141B24] border border-[#202938] rounded-2xl gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E2634]">
        <div className="flex items-center justify-center w-7 h-7 bg-[#CCFF00]/10 rounded-lg">
          <Barbell size={16} weight="bold" className="text-[#CCFF00]" />
        </div>
        <h3 className="font-sans font-bold text-[13px] text-white tracking-wide uppercase">Interest & Requirement</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col p-3.5 bg-[#10151C] border border-[#1B232E] rounded-xl gap-1">
            <span className="font-sans text-xs text-[#9CA3AF]">Interested In</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#CCFF00] rounded-full"></div>
              <span className="font-sans font-bold text-sm text-white">Gym Membership</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-3.5 bg-[#10151C] border border-[#1B232E] rounded-xl gap-1">
            <span className="font-sans text-xs text-[#9CA3AF]">Preferred Plan</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span className="font-sans font-bold text-sm text-amber-300">Gold Plan</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col p-4 bg-[#10151C] border border-[#1B232E] rounded-xl gap-1.5">
          <span className="font-sans font-medium text-xs text-[#9CA3AF]">Customer Requirement</span>
          <p className="font-sans text-sm text-[#D1D5DB] leading-5">
            Looking for a 6-month gym membership with access to all facilities. Interested in strength training and general fitness. Wants a personal trainer guidance in the initial phase.
          </p>
        </div>
      </div>
    </div>
  );
}
