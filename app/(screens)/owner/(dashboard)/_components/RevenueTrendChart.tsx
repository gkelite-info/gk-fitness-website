"use client";

import { CaretDown } from "@phosphor-icons/react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DATA_POINTS = [0, 2000, 5000, 6500, 7000, 6000, 8450, 7500, 6500, 7000, 12000, 18000];
const MAX_VALUE = 30000;
const Y_LABELS = ["₹0", "₹10K", "₹20K", "₹30K"];
const ACTIVE_INDEX = 6;

export default function RevenueTrendChart() {
  const chartWidth = 100;
  const chartHeight = 100;
  const paddingX = 2;
  const paddingY = 5;

  const points = DATA_POINTS.map((val, i) => {
    const x = paddingX + (i / (DATA_POINTS.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (val / MAX_VALUE) * (chartHeight - paddingY * 2);
    return { x, y, value: val };
  });

  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  const activePoint = points[ACTIVE_INDEX];

  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Revenue Trend
        </h3>
        <button className="flex flex-row items-center px-3 py-[6px] gap-2 bg-[#16171E] border border-[#262936] rounded-lg cursor-pointer">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#E2E8F0]">
            Monthly Chart
          </span>
          <CaretDown size={12} color="#94A3B8" weight="bold" />
        </button>
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="flex flex-col justify-between items-end h-[200px] py-1 flex-shrink-0">
          {Y_LABELS.slice().reverse().map((label) => (
            <span key={label} className="font-['Nimbus_Sans'] font-medium text-[10px] leading-3 text-[#94A3B8]">
              {label}
            </span>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="relative w-full h-[200px]">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4FF32" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D4FF32" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGradient)" />
              <path d={linePath} fill="none" stroke="#D4FF32" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={i === ACTIVE_INDEX ? "3" : "1.5"}
                  fill={i === ACTIVE_INDEX ? "#D4FF32" : "#D4FF32"}
                  stroke={i === ACTIVE_INDEX ? "#0C0D10" : "none"}
                  strokeWidth={i === ACTIVE_INDEX ? "1.5" : "0"}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <line
                x1={activePoint.x}
                y1={activePoint.y + 3}
                x2={activePoint.x}
                y2={chartHeight}
                stroke="#94A3B8"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div
              className="absolute bg-[#1E2027] border border-[#3a3e4f] rounded-md px-2 py-1 pointer-events-none"
              style={{
                left: `${(ACTIVE_INDEX / (DATA_POINTS.length - 1)) * 100}%`,
                top: `${(activePoint.y / chartHeight) * 100 - 12}%`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="font-['Nimbus_Sans'] font-bold text-[11px] leading-[14px] text-white">
                ₹8,450
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full px-1">
            {MONTHS.map((month, i) => (
              <span
                key={month}
                className={`font-['Nimbus_Sans'] text-[10px] leading-3 ${
                  i === ACTIVE_INDEX ? "font-bold text-white" : "font-medium text-[#94A3B8]"
                }`}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
