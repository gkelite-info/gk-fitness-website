"use client";

import { ArrowLeft, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

export default function MembershipExpiryHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 w-full pb-6 border-b border-[#232936]">
      <button 
        onClick={() => router.back()}
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#232936] bg-[#0E1117] hover:bg-[#1A1C23] transition-colors cursor-pointer shrink-0"
      >
        <ArrowLeft size={16} color="#E2E8F0" />
      </button>
      
      <div className="flex flex-row items-start md:items-center gap-3.5">
        <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <CalendarBlank size={24} color="#F59E0B" weight="bold" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="font-sans font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-white">
            Membership Expiry
          </h1>
          <p className="font-sans font-medium text-[12px] leading-[16px] text-[#717E95]">
            Track members whose memberships are expiring soon.
          </p>
        </div>
      </div>
    </div>
  );
}
