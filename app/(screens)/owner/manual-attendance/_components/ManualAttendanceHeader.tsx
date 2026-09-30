"use client";

import { CaretLeft, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

interface Props {
  totalCount: number;
  isBulkMode: boolean;
  onToggleBulkMode: () => void;
}

export default function ManualAttendanceHeader({ totalCount, isBulkMode, onToggleBulkMode }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full pb-6 border-b border-[#232936] gap-4 sm:gap-0">
      <div className="flex flex-row items-center gap-4 min-w-0">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center w-8 h-8 sm:w-9 sm:h-9 bg-[#141822] border border-[#272E3D] rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2B] transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={16} className="text-[#E2E8F0]" weight="bold" />
        </button>
        <div className="flex flex-row items-center gap-3 overflow-hidden">
          <h1 className="font-sans font-bold text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] tracking-[-0.6px] text-white truncate">
            Manual Attendance
          </h1>
          <div className="flex flex-col items-center justify-center px-3 py-1 bg-[#1F232B] border border-[#2C3344] rounded-full h-[26px] shrink-0">
            <span className="font-sans font-semibold text-[12px] leading-[16px] text-[#CBD5E1]">
              {totalCount}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onToggleBulkMode}
        className={`flex flex-row justify-center items-center px-5 py-2 w-full sm:w-auto gap-2 rounded-xl transition-all cursor-pointer shrink-0 ${
          isBulkMode 
            ? "bg-[#0D1017] border border-[#232936] text-[#8B949E] hover:bg-[#1A1C23]"
            : "bg-[#C8FF00] shadow-[0px_0px_20px_rgba(200,255,0,0.25)] text-black hover:bg-[#d4ff32]"
        }`}
      >
        {!isBulkMode && <CheckCircle size={16} weight="bold" />}
        <span className="font-sans font-bold text-[12px] leading-[16px]">
          {isBulkMode ? "Cancel" : "Mark Present"}
        </span>
      </button>
    </div>
  );
}
