import { MagnifyingGlass, CaretDown, CalendarBlank } from "@phosphor-icons/react";

export default function ConvertedFiltersToolbar() {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 w-full shrink-0">
      
      <div className="relative w-full lg:w-[380px] shrink-0">
        <div className="absolute left-3.5 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <MagnifyingGlass size={16} className="text-[#64748B]" />
        </div>
        <input 
          type="text"
          placeholder="Search by name, phone, member ID or enquiry ID..."
          className="w-full bg-[#111723] border border-[#1F2738] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#64748B] placeholder:text-[#64748B] focus:outline-none focus:border-[#34D399]/50 transition-colors"
        />
      </div>

      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-start items-center gap-3 w-full lg:flex-1 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
        <button className="flex items-center justify-between px-3 py-[6px] bg-[#111723] border border-[#1F2738] rounded-xl flex-1 sm:flex-none shrink-0 min-w-[120px] transition-colors hover:border-[#34D399]/50 group lg:ml-auto">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[10px] text-[#94A3B8] tracking-wider uppercase">Source</span>
            <span className="font-sans text-xs text-white">All</span>
          </div>
          <CaretDown size={14} className="text-[#6B7280] ml-2 group-hover:text-[#94A3B8] transition-colors" />
        </button>
        
        <button className="flex items-center justify-between px-3 py-[6px] bg-[#111723] border border-[#1F2738] rounded-xl flex-1 sm:flex-none shrink-0 min-w-[120px] transition-colors hover:border-[#34D399]/50 group">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[10px] text-[#94A3B8] tracking-wider uppercase">Plan</span>
            <span className="font-sans text-xs text-white">All</span>
          </div>
          <CaretDown size={14} className="text-[#6B7280] ml-2 group-hover:text-[#94A3B8] transition-colors" />
        </button>
        
        <button className="flex items-center justify-between px-3.5 py-2 bg-[#111723] border border-[#1F2738] rounded-xl w-full sm:w-auto shrink-0 transition-colors hover:border-[#34D399]/50 group">
          <div className="flex items-center gap-2">
            <CalendarBlank size={16} className="text-[#94A3B8]" />
            <span className="font-sans font-bold text-[10px] text-[#94A3B8] tracking-wider uppercase">Conversion Date</span>
            <span className="font-sans text-xs text-[#E2E8F0] whitespace-nowrap">Select date range</span>
          </div>
          <CaretDown size={14} className="text-[#64748B] ml-2 group-hover:text-[#94A3B8] transition-colors" />
        </button>
      </div>
    </div>
  );
}
