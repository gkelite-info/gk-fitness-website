import { Target, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function ManualAttendanceBanner() {
  return (
    <div className="w-full h-[76px] bg-[#14151A] border border-[#D4FF32]/30 rounded-[14px] px-6 py-4 flex flex-row justify-between items-center cursor-pointer hover:bg-[#1a1c23] transition-colors">
      <div className="flex flex-row items-center gap-4">
        {/* Icon Wrapper */}
        <div className="w-12 h-12 flex justify-center items-center bg-[#141812] border border-[#D4FF32]/30 rounded-[12px] flex-shrink-0">
          <Target size={24} color="#D4FF32" weight="regular" />
        </div>
        
        {/* Text */}
        <div className="flex flex-col gap-1">
          <span className="font-['Nimbus_Sans'] font-bold text-[15px] leading-5 text-white tracking-[0.2px]">
            Manual Attendance
          </span>
          <span className="font-['Sora'] font-normal text-[12px] leading-4 text-[#94A3B8]">
            Mark a customer&apos;s attendance
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-[34px] h-[34px] flex justify-center items-center bg-[#1E2028] rounded-[10px] flex-shrink-0">
        <ArrowRight size={16} color="#D4FF32" weight="bold" />
      </div>
    </div>
  );
}
