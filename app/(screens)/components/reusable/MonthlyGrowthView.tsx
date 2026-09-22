"use client";

import { CalendarBlank, CaretDown, CurrencyInr, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import WideKPICard from "@/app/(screens)/components/reusable/cards/WideKPICard";
import MonthlyGrowthChart from "@/app/(screens)/components/reusable/charts/MonthlyGrowthChart";
import InsightSplitCard from "@/app/(screens)/components/reusable/cards/InsightSplitCard";

export default function MonthlyGrowthView() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-6 md:gap-8 pb-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4">
          <div className="flex flex-row items-start sm:items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex flex-col gap-1">
              <h1 className="font-[700] text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] text-white m-0">
                Monthly Growth
              </h1>
              <p className="font-[400] text-[13px] leading-[18px] text-[#94A3B8] m-0">
                Track your monthly revenue growth
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 sm:ml-auto">
            <button className="flex flex-row justify-center items-center gap-2 px-4 py-2 border border-[#1E2A1E] rounded-[8px] bg-[#10151C] hover:bg-[#1A1F26] transition-colors cursor-pointer">
              <span className="font-[500] text-[13px] leading-[18px] text-[#E2E8F0]">2026</span>
              <CaretDown size={14} weight="bold" className="text-[#64748B]" />
            </button>
            <button className="flex justify-center items-center w-9 h-9 border border-[#1E2A1E] rounded-[8px] bg-[#10151C] hover:bg-[#1A1F26] transition-colors cursor-pointer">
              <CalendarBlank size={16} weight="regular" className="text-[#CCFF00]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 w-full">
          <WideKPICard 
            title="Total Revenue (This Year)"
            value="₹1,02,450"
            trend="+8.4%"
            trendSuffix="vs Last Year"
            trendDirection="up"
            icon={<CurrencyInr size={20} weight="bold" />}
            iconBgColor="#2A3A1A"
            iconColor="#84cc16"
          />

          <MonthlyGrowthChart />

          <InsightSplitCard 
            sectionTitle="Revenue Summary"
            sectionSubtitle="Performance Insights"
            sectionBadge="Full Year 2026 Overview"
            cards={[
              {
                title: "Highest Month",
                subtitle: "Dec 2026",
                value: "₹19,800",
                tag: { text: "+219%", type: "success" }
              },
              {
                title: "Lowest Month",
                subtitle: "Jan 2026",
                value: "₹6,200",
                tag: { text: "Baseline", type: "neutral" }
              }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
