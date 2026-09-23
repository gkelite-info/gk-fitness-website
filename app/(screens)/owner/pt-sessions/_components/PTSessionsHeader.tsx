import { CalendarBlank, CaretDown } from "@phosphor-icons/react/dist/ssr";

export default function PTSessionsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
      <div className="flex flex-col items-start gap-1">
        <h1 className="font-sans font-bold text-[24px] leading-8 tracking-[-0.6px] text-white">
          PT Sessions
        </h1>
        <p className="font-sans font-normal text-[12px] leading-4 text-[#828F9F]">
          Manage personal training sessions for today.
        </p>
      </div>

      <button className="flex flex-row items-center px-4 py-2 gap-2.5 bg-[#121620] border border-[#212836] rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2C] transition-colors">
        <CalendarBlank size={16} weight="regular" className="text-[#94A3B8]" />
        <span className="font-sans font-medium text-[12px] leading-4 text-white whitespace-nowrap">
          Wed, 29 July 2026
        </span>
        <CaretDown size={14} weight="bold" className="text-[#64748B] ml-1.5" />
      </button>
    </div>
  );
}
