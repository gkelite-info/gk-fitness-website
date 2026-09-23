"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { CalendarBlank, CaretDown, CurrencyInr, ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import WideKPICard from "@/app/(screens)/components/reusable/cards/WideKPICard";
import MonthlyGrowthChart from "@/app/(screens)/components/reusable/charts/MonthlyGrowthChart";
import InsightSplitCard from "@/app/(screens)/components/reusable/cards/InsightSplitCard";
import { useUser } from "@/app/context/UserContext";
import { getOwnerGymId } from "@/lib/helpers/trainers/trainerHelper";
import { useGymPayments } from "@/lib/hooks/useGymPayments";
import { useCustomerGymPayments } from "@/lib/hooks/customerGymPayments/useCustomerGymPayments";

export default function MonthlyGrowthView() {
  const router = useRouter();
  const { user } = useUser() || {};
  const [gymId, setGymId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      getOwnerGymId(user.id).then(id => setGymId(id));
    }
  }, [user?.id]);

  const { data: gymPayments = [] } = useGymPayments(user?.id || null);
  const { data: customerPayments = [] } = useCustomerGymPayments(gymId || undefined);

  const currentActualYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentActualYear);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const availableYears = Array.from({ length: Math.max(5, currentActualYear - 2023 + 1) }, (_, i) => currentActualYear - i);

  const yearRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const { chartData, totalRevenue, highestMonth, lowestMonth } = useMemo(() => {
    const monthlyTotals = new Array(12).fill(0);

    const processPayments = (payments: any[]) => {
      payments.forEach(p => {
        const dateStr = p.paymentDate || p.createdAt;
        if (dateStr && !p.is_deleted) {
          const d = new Date(dateStr);
          if (d.getFullYear() === selectedYear) {
            monthlyTotals[d.getMonth()] += Number(p.amountPaid || p.amount || 0);
          }
        }
      });
    };

    if (gymPayments) processPayments(gymPayments);
    if (customerPayments) processPayments(customerPayments);

    const chartData = monthlyTotals.map((val, idx) => ({
      month: months[idx],
      value: val,
      display: val === 0 ? "₹0" : `₹${(val / 1000).toFixed(1).replace(/\.0$/, '')}K`
    }));

    const totalRevenue = monthlyTotals.reduce((a, b) => a + b, 0);

    const nonZeroTotals = monthlyTotals.filter(v => v > 0);
    const highestValue = monthlyTotals.length > 0 ? Math.max(...monthlyTotals) : 0;
    const lowestValue = nonZeroTotals.length > 0 ? Math.min(...nonZeroTotals) : 0;

    const highestIdx = monthlyTotals.indexOf(highestValue);
    const lowestIdx = nonZeroTotals.length > 0 ? monthlyTotals.indexOf(lowestValue) : 0;

    return {
      chartData,
      totalRevenue,
      highestMonth: { month: months[highestIdx], value: highestValue },
      lowestMonth: { month: months[lowestIdx], value: lowestValue }
    };
  }, [gymPayments, customerPayments, selectedYear]);

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col w-full max-w-5xl mx-auto gap-6 md:gap-8 pb-10">
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
            <div className="relative" ref={yearRef}>
              <button 
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="flex flex-row justify-center items-center gap-2 px-4 py-2 border border-[#1E2A1E] rounded-[8px] bg-[#10151C] hover:bg-[#1A1F26] transition-colors cursor-pointer"
              >
                <span className="font-[500] text-[13px] leading-[18px] text-[#E2E8F0]">{selectedYear}</span>
                <CaretDown size={14} weight="bold" className={`text-[#64748B] transition-transform ${isYearDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isYearDropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+4px)] w-[100px] bg-[#12141C] border border-[#202534] rounded-[12px] shadow-lg z-50 overflow-hidden flex flex-col py-1">
                  {availableYears.map(year => (
                    <button 
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearDropdownOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 font-sans font-[500] text-[12px] text-left hover:bg-[#1A1F2B] transition-colors ${selectedYear === year ? "text-white bg-[#1A1F2B]" : "text-[#9CA3AF]"}`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* <button className="flex justify-center items-center w-9 h-9 border border-[#1E2A1E] rounded-[8px] bg-[#10151C] hover:bg-[#1A1F26] transition-colors cursor-pointer">
              <CalendarBlank size={16} weight="regular" className="text-[#CCFF00]" />
            </button> */}
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <WideKPICard
            title={`Total Revenue (${selectedYear})`}
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            trend="+0%"
            trendSuffix="vs Last Year"
            trendDirection="neutral"
            icon={<CurrencyInr size={20} weight="bold" />}
            iconBgColor="#2A3A1A"
            iconColor="#84cc16"
          />

          <MonthlyGrowthChart chartData={chartData} />

          <InsightSplitCard
            sectionTitle="Revenue Summary"
            sectionSubtitle="Performance Insights"
            sectionBadge={`Full Year ${selectedYear} Overview`}
            cards={[
              {
                title: "Highest Month",
                subtitle: `${highestMonth.month} ${selectedYear}`,
                value: `₹${highestMonth.value.toLocaleString('en-IN')}`,
                tag: { text: "Peak", type: "success" }
              },
              {
                title: "Lowest Month",
                subtitle: `${lowestMonth.month} ${selectedYear}`,
                value: `₹${lowestMonth.value.toLocaleString('en-IN')}`,
                tag: { text: "Baseline", type: "neutral" }
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
