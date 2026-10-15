"use client";

import { useState } from "react";
import Dropdown, { DropdownOption } from "@/app/(screens)/components/reusable/Dropdown";
import { ChartPoint } from "./GymPassTypes";

const timeframeOptions: DropdownOption[] = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 14 Days", value: "14d" },
  { label: "Last 30 Days", value: "30d" },
];

interface TimeframeConfig {
  svgWidth: number;
  highlightDate: string;
  points: { date: string; value: number; formattedValue: string; isPeak?: boolean }[];
}

const sevenDaysPoints = [
  { date: "May 12", value: 0, formattedValue: "₹0" },
  { date: "May 13", value: 1.2, formattedValue: "₹1.2L" },
  { date: "May 14", value: 9.8, formattedValue: "₹9.8L" },
  { date: "May 15", value: 8.1, formattedValue: "₹8.1L" },
  { date: "May 16", value: 15.6, formattedValue: "₹15.6L", isPeak: true },
  { date: "May 17", value: 7.4, formattedValue: "₹7.4L" },
  { date: "May 18", value: 4.8, formattedValue: "₹4.8L" },
];

const fourteenDaysPoints = [
  { date: "May 05", value: 2.1, formattedValue: "₹2.1L" },
  { date: "May 06", value: 3.4, formattedValue: "₹3.4L" },
  { date: "May 07", value: 5.6, formattedValue: "₹5.6L" },
  { date: "May 08", value: 6.2, formattedValue: "₹6.2L" },
  { date: "May 09", value: 8.8, formattedValue: "₹8.8L" },
  { date: "May 10", value: 10.5, formattedValue: "₹10.5L" },
  { date: "May 11", value: 12.0, formattedValue: "₹12.0L" },
  { date: "May 12", value: 9.5, formattedValue: "₹9.5L" },
  { date: "May 13", value: 13.8, formattedValue: "₹13.8L" },
  { date: "May 14", value: 17.5, formattedValue: "₹17.5L", isPeak: true },
  { date: "May 15", value: 14.2, formattedValue: "₹14.2L" },
  { date: "May 16", value: 11.8, formattedValue: "₹11.8L" },
  { date: "May 17", value: 8.4, formattedValue: "₹8.4L" },
  { date: "May 18", value: 5.2, formattedValue: "₹5.2L" },
];

const thirtyDaysPoints = [
  { date: "Apr 19", value: 4.0, formattedValue: "₹4.0L" },
  { date: "Apr 20", value: 5.2, formattedValue: "₹5.2L" },
  { date: "Apr 21", value: 6.1, formattedValue: "₹6.1L" },
  { date: "Apr 22", value: 5.8, formattedValue: "₹5.8L" },
  { date: "Apr 23", value: 7.2, formattedValue: "₹7.2L" },
  { date: "Apr 24", value: 8.0, formattedValue: "₹8.0L" },
  { date: "Apr 25", value: 9.5, formattedValue: "₹9.5L" },
  { date: "Apr 26", value: 8.6, formattedValue: "₹8.6L" },
  { date: "Apr 27", value: 10.2, formattedValue: "₹10.2L" },
  { date: "Apr 28", value: 11.5, formattedValue: "₹11.5L" },
  { date: "Apr 29", value: 13.0, formattedValue: "₹13.0L" },
  { date: "Apr 30", value: 12.2, formattedValue: "₹12.2L" },
  { date: "May 01", value: 14.5, formattedValue: "₹14.5L" },
  { date: "May 02", value: 13.8, formattedValue: "₹13.8L" },
  { date: "May 03", value: 16.0, formattedValue: "₹16.0L" },
  { date: "May 04", value: 18.5, formattedValue: "₹18.5L" },
  { date: "May 05", value: 17.2, formattedValue: "₹17.2L" },
  { date: "May 06", value: 19.4, formattedValue: "₹19.4L", isPeak: true },
  { date: "May 07", value: 16.8, formattedValue: "₹16.8L" },
  { date: "May 08", value: 15.0, formattedValue: "₹15.0L" },
  { date: "May 09", value: 13.5, formattedValue: "₹13.5L" },
  { date: "May 10", value: 12.0, formattedValue: "₹12.0L" },
  { date: "May 11", value: 14.2, formattedValue: "₹14.2L" },
  { date: "May 12", value: 11.0, formattedValue: "₹11.0L" },
  { date: "May 13", value: 12.5, formattedValue: "₹12.5L" },
  { date: "May 14", value: 10.2, formattedValue: "₹10.2L" },
  { date: "May 15", value: 9.0, formattedValue: "₹9.0L" },
  { date: "May 16", value: 11.4, formattedValue: "₹11.4L" },
  { date: "May 17", value: 8.2, formattedValue: "₹8.2L" },
  { date: "May 18", value: 6.5, formattedValue: "₹6.5L" },
];

const configMap: Record<string, TimeframeConfig> = {
  "7d": { svgWidth: 600, highlightDate: "May 17", points: sevenDaysPoints },
  "14d": { svgWidth: 900, highlightDate: "May 17", points: fourteenDaysPoints },
  "30d": { svgWidth: 1600, highlightDate: "May 17", points: thirtyDaysPoints },
};

function valueToY(val: number): number {
  const clamped = Math.max(0, Math.min(20, val));
  return 200 - (clamped / 20) * 180;
}

export default function GymPassRevenueTrendCard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("7d");
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);

  const config = configMap[selectedTimeframe] || configMap["7d"];
  const count = config.points.length;
  const paddingX = 40;
  const usableWidth = config.svgWidth - paddingX * 2;
  const stepX = usableWidth / (count - 1);

  const chartCoords = config.points.map((pt, i) => {
    const x = paddingX + i * stepX;
    const y = valueToY(pt.value);
    return {
      x,
      y,
      pt: {
        date: pt.date,
        label: pt.date,
        value: pt.value,
        formattedValue: pt.formattedValue,
        isPeak: pt.isPeak,
      },
    };
  });

  const pathD = chartCoords.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ""
  );

  const lastCoord = chartCoords[chartCoords.length - 1];
  const firstCoord = chartCoords[0];
  const areaD = `${pathD} L ${lastCoord.x} 200 L ${firstCoord.x} 200 Z`;

  return (
    <div className="w-full h-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col shadow-sm relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-20 shrink-0">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Revenue Trend
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Daily gross collections for current period
          </p>
        </div>

        <div className="w-36 shrink-0">
          <Dropdown
            options={timeframeOptions}
            value={selectedTimeframe}
            onChange={(val) => setSelectedTimeframe(val)}
            align="right"
            triggerClassName="relative flex flex-row items-center justify-between px-3 py-1.5 w-full bg-[#1A1D26] hover:bg-[#232734] border border-[#2B303F] rounded-xl text-xs font-medium text-[#CBD5E1] transition-all cursor-pointer h-[34px]"
          />
        </div>
      </div>

      <div className="w-full border-b border-[#1E222D] mt-3 mb-2 shrink-0" />

      {hoveredPoint && (
        <div className="absolute top-14 right-5 bg-[#1E222E] border border-[#2B303F] px-3 py-1 rounded-xl shadow-lg pointer-events-none z-30 text-xs">
          <span className="text-[#94A3B8]">{hoveredPoint.date}: </span>
          <span className="text-[#D4FF32] font-bold">{hoveredPoint.formattedValue}</span>
        </div>
      )}

      <div className="w-full flex-1 flex items-stretch min-h-[240px] relative overflow-hidden">
        <div className="w-12 sm:w-14 shrink-0 flex flex-col justify-between pb-8 pt-4 select-none z-10 bg-[#13151B] border-r border-[#1E222D]/60 text-[#64748B] text-[11px] font-medium text-right pr-2">
          <span>₹20L</span>
          <span>₹15L</span>
          <span>₹10L</span>
          <span>₹5L</span>
          <span>₹0</span>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-themed relative">
          <div style={{ width: `${config.svgWidth}px` }} className="h-full">
            <svg
              viewBox={`0 0 ${config.svgWidth} 230`}
              className="w-full h-full select-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="neonAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4FF32" stopOpacity="0.25" />
                  <stop offset="60%" stopColor="#D4FF32" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#D4FF32" stopOpacity="0.0" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g stroke="#1E222D" strokeWidth="1" strokeDasharray="3 3">
                <line x1="0" y1="20" x2={config.svgWidth} y2="20" />
                <line x1="0" y1="65" x2={config.svgWidth} y2="65" />
                <line x1="0" y1="110" x2={config.svgWidth} y2="110" />
                <line x1="0" y1="155" x2={config.svgWidth} y2="155" />
                <line x1="0" y1="200" x2={config.svgWidth} y2="200" strokeDasharray="none" stroke="#252A38" />
              </g>

              <path d={areaD} fill="url(#neonAreaGradient)" />

              <path
                d={pathD}
                fill="none"
                stroke="#D4FF32"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#neonGlow)"
              />

              {chartCoords.map((c) => {
                const isHovered = hoveredPoint?.date === c.pt.date;
                const isPeak = c.pt.isPeak;

                return (
                  <g
                    key={c.pt.date}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredPoint(c.pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={isHovered ? 6.5 : isPeak ? 5 : 3.5}
                      fill="#D4FF32"
                      stroke="#0C0D10"
                      strokeWidth={2}
                      className="transition-all duration-150"
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="14"
                      fill="transparent"
                      className="cursor-pointer"
                    />
                  </g>
                );
              })}

              <g className="text-[11px] font-medium" fill="#94A3B8">
                {chartCoords.map((c) => {
                  const isHighlight = c.pt.date === config.highlightDate;
                  return (
                    <text
                      key={c.pt.date}
                      x={c.x}
                      y="222"
                      textAnchor="middle"
                      fill={isHighlight ? "#D4FF32" : "#94A3B8"}
                      fontWeight={isHighlight ? "700" : "500"}
                    >
                      {c.pt.label}
                    </text>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
