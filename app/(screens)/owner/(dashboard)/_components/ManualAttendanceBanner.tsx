import { Target, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function ManualAttendanceBanner() {
  return (
    <div className="w-full min-h-[70px] bg-[#13151B] border border-[rgba(212,255,50,0.45)] shadow-[0px_0px_15px_rgba(212,255,50,0.08)] rounded-[16px] px-4 sm:px-[20px] py-3 sm:py-[14px] flex flex-row justify-between items-center cursor-pointer hover:bg-[#1a1c23] transition-all">
      <div className="flex flex-row items-center gap-3 sm:gap-[14px]">
        <div className="w-9 h-9 sm:w-[36px] sm:h-[36px] flex justify-center items-center bg-[rgba(212,255,50,0.15)] border border-[rgba(212,255,50,0.3)] rounded-[12px] flex-shrink-0">
          <Target size={17} color="#D4FF32" weight="regular" />
        </div>
        <div className="flex flex-col sm:pt-[3px] gap-[1px]">
          <span className="font-sans font-semibold text-[14px] leading-[20px] text-white">
            Manual Attendance
          </span>
          <span className="font-sans font-normal text-[12px] leading-[16px] text-[#94A3B8]">
            Mark a customer&apos;s attendance
          </span>
        </div>
      </div>
      <div className="w-8 h-8 sm:w-[32px] sm:h-[32px] flex justify-center items-center bg-[#1A1D25] rounded-[8px] flex-shrink-0">
        <ArrowRight size={13} color="#D4FF32" weight="bold" />
      </div>
    </div>
  );
}
