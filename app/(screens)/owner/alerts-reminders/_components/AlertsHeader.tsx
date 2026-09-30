"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function AlertsHeader() {
  const router = useRouter();
  
  return (
    <div className="flex flex-row items-center gap-[16px] w-full shrink-0">
      <button
        onClick={() => router.back()}
        className="flex justify-center items-center w-[44px] h-[44px] bg-[#141822] border border-[#272E3D] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2B] transition-colors cursor-pointer shrink-0"
      >
        <CaretLeft size={20} className="text-[#E2E8F0]" weight="bold" />
      </button>
      <div className="flex flex-col items-start gap-1">
        <h2 className="font-sans font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-white">
          Alerts & Reminders
        </h2>
        <span className="font-sans font-normal text-[12px] leading-[16px] text-[#94A3B8]">
          View all important alerts, reminders and notifications.
        </span>
      </div>
    </div>
  );
}
