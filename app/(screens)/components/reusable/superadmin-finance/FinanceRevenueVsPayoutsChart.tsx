"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { MONTHLY_FINANCE_DATA } from "./mockData";
import { MonthlyChartPoint } from "./types";
import FinanceYearCalendarPicker from "./FinanceYearCalendarPicker";

const MAX_VALUE = 2000000;
const Y_AXIS_STEPS = [
  { label: "₹20L", value: 2000000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹10L", value: 1000000 },
  { label: "₹5L", value: 500000 },
  { label: "₹0", value: 0 },
];

export default function FinanceRevenueVsPayoutsChart() {
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [hoveredPoint, setHoveredPoint] = useState<MonthlyChartPoint | null>(null);

  const formatCurrency = (val: number) => {
    return "₹" + val.toLocaleString("en-IN");
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <Link
            href="/superadmin/finance/revenue-vs-payouts"
            className="group/title flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight whitespace-nowrap group-hover/title:text-[#D4FF32] transition-colors">
              Revenue vs Payouts
            </h2>
            <div className="w-6 h-6 rounded-md bg-[#181D26] border border-[#262F3E] group-hover/title:border-[#D4FF32] group-hover/title:bg-[#D4FF32] flex items-center justify-center text-[#94A3B8] group-hover/title:text-black transition-colors shrink-0">
              <CaretRight size={13} weight="bold" />
            </div>
          </Link>
          {hoveredPoint && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#181D26] border border-[#2A3448] text-xs">
              <span className="font-bold text-[#D4FF32]">{hoveredPoint.month}:</span>
              <span className="text-[#00E599] font-medium">Rev {formatCurrency(hoveredPoint.revenue)}</span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[#A855F7] font-medium">Payout {formatCurrency(hoveredPoint.payouts)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap justify-between sm:justify-end w-full sm:w-auto">
          <div className="flex items-center gap-3 text-xs font-semibold shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E599] shrink-0" />
              <span className="text-[#94A3B8]">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shrink-0" />
              <span className="text-[#94A3B8]">Payouts</span>
            </div>
          </div>

          <FinanceYearCalendarPicker
            value={selectedYear}
            onChange={setSelectedYear}
          />
        </div>
      </div>

      <div className="flex w-full relative">
        <div className="w-12 sm:w-14 shrink-0 flex flex-col justify-between text-right pr-2.5 z-20 select-none bg-[#12141A] pt-2 sm:pt-3">
          <div className="h-[210px] flex flex-col justify-between">
            {Y_AXIS_STEPS.map((step) => (
              <span
                key={step.value}
                className="text-[11px] font-medium text-[#64748B] leading-none whitespace-nowrap"
              >
                {step.label}
              </span>
            ))}
          </div>
          <div className="h-6 mt-2.5 pt-2" />
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-none pb-2 min-w-0">
          <div className="min-w-[560px] flex flex-col relative pt-2 sm:pt-3">
            <div className="h-[210px] relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {Y_AXIS_STEPS.map((step) => (
                  <div
                    key={step.value}
                    className="w-full border-b border-[#181B24]"
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-end justify-between gap-1 sm:gap-2 px-1 z-10">
                {MONTHLY_FINANCE_DATA.map((pt) => {
                  const revPercent = Math.min(100, (pt.revenue / MAX_VALUE) * 100);
                  const payPercent = Math.min(100, (pt.payouts / MAX_VALUE) * 100);
                  const isHovered = hoveredPoint?.month === pt.month;
                  const tooltipAlignment =
                    pt.month === "Jan"
                      ? "left-0"
                      : pt.month === "Dec"
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2";

                  return (
                    <div
                      key={pt.month}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="flex-1 h-full flex flex-col justify-end items-center relative group cursor-pointer"
                    >
                      {isHovered && (
                        <div
                          className={`absolute top-2 ${tooltipAlignment} z-40 bg-[#0E1015]/95 backdrop-blur-md border border-[#2B3547] rounded-xl px-3 py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.9)] flex flex-col gap-0.5 whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-100`}
                        >
                          <span className="text-[10px] font-bold text-[#D4FF32]">
                            {pt.month}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] shrink-0" />
                            <span className="text-[#94A3B8]">Revenue:</span>
                            <span className="font-bold text-white">
                              {formatCurrency(pt.revenue)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shrink-0" />
                            <span className="text-[#94A3B8]">Payouts:</span>
                            <span className="font-bold text-white">
                              {formatCurrency(pt.payouts)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5">
                        <div
                          className="w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-300 group-hover:brightness-125 group-hover:scale-y-[1.02]"
                          style={{
                            height: `${revPercent * 2.1}px`,
                            maxHeight: "100%",
                            backgroundColor: "#00E599",
                          }}
                        />
                        <div
                          className="w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-300 group-hover:brightness-125 group-hover:scale-y-[1.02]"
                          style={{
                            height: `${payPercent * 2.1}px`,
                            maxHeight: "100%",
                            backgroundColor: "#A855F7",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center pl-1 pr-1 mt-2.5 pt-2 border-t border-[#1C2230]">
              {MONTHLY_FINANCE_DATA.map((pt) => {
                const isHovered = hoveredPoint?.month === pt.month;
                return (
                  <div key={pt.month} className="flex-1 text-center">
                    <span
                      className={`text-[11px] sm:text-xs font-semibold transition-colors select-none ${
                        isHovered ? "text-[#D4FF32] font-bold" : "text-[#717E95]"
                      }`}
                    >
                      {pt.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
