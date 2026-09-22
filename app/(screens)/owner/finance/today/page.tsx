"use client";

import TodayHeroBanner from "./_components/TodayHeroBanner";
import TodayRevenueByPlan from "./_components/TodayRevenueByPlan";
import TodayPaymentMethods from "./_components/TodayPaymentMethods";
import TodayRecentPayments from "./_components/TodayRecentPayments";
import { CaretDown, CalendarBlank, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function TodayRevenuePage() {
  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
        <div className="flex flex-row items-center gap-3">
          <Link href="/owner/finance" className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-col items-start gap-0.5">
            <h1 className="font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
              Today's Revenue
            </h1>
            <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
              Track today's payments and revenue collection
            </span>
          </div>
        </div>

        <button className="flex flex-row items-center justify-center px-3.5 py-1.5 gap-2 bg-[#171B21] border border-[#262C36] rounded-[6px] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0">
          <CalendarBlank size={14} className="text-[#94A3B8]" />
          <span className="font-[500] text-[12px] leading-[16px] text-[#E2E8F0]">
            Today
          </span>
          <div className="pl-1 flex flex-col justify-center">
            <CaretDown size={12} weight="fill" className="text-[#94A3B8]" />
          </div>
        </button>
      </div>

      {/* Main Content Areas */}
      <div className="flex flex-col w-full gap-5">
        <TodayHeroBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <TodayRevenueByPlan />
          <TodayPaymentMethods />
        </div>

        <TodayRecentPayments />
      </div>

    </div>
  );
}
