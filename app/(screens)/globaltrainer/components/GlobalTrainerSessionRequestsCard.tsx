"use client";

import { CalendarCheck, ArrowRight } from "@phosphor-icons/react";
import { openAppOrStore } from "@/app/utils/deepLink";

interface GlobalTrainerSessionRequestsCardProps {
  pendingRequestsCount?: number;
}

export default function GlobalTrainerSessionRequestsCard({
  pendingRequestsCount = 4,
}: GlobalTrainerSessionRequestsCardProps) {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-5 shadow-lg">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-[#1C1C20] border border-[#2A2A30] flex items-center justify-center text-[#D4FF32] shrink-0">
            <CalendarCheck size={20} weight="fill" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4FF32] shadow-[0_0_8px_#D4FF32]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
              GLOBAL SESSION REQUESTS
            </h3>
            <span className="text-[#8E8E93] text-[11px] sm:text-xs">
              New customers want to book a session
            </span>
          </div>
        </div>

        <span className="bg-[#D4FF32] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 shadow-[0_0_12px_rgba(212,255,50,0.25)]">
          {pendingRequestsCount} PENDING
        </span>
      </div>

      <div className="pt-3 border-t border-[#222222] mt-3 flex items-center justify-between">
        <span className="text-[#94A3B8] text-xs font-medium">
          Check new inquiries
        </span>

        <button
          type="button"
          onClick={() => openAppOrStore("session-requests")}
          className="bg-[#1C1C20] hover:bg-[#25252B] border border-[#2E313D] text-[#D4FF32] rounded-xl px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer group active:scale-95"
        >
          <span>View All</span>
          <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
