"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PRECISE_DATA = [1500, 3500, 4500, 5000, 4000, 4500, 8450, 4200, 5000, 13000, 19000, 20000]; // Example data fitting the curve
const MAX_VALUE = 30000;
const Y_LABELS = [
  { label: "₹30K", value: 30000 },
  { label: "₹20K", value: 20000 },
  { label: "₹10K", value: 10000 },
  { label: "₹0", value: 0 },
];

export default function RevenueTrendChart() {
  const [activeIndex, setActiveIndex] = useState(6);
  const paddingY = 5; // % padding top/bottom
  const points = PRECISE_DATA.map((val, i) => {
    const x = (i / (PRECISE_DATA.length - 1)) * 100;
    const y = 100 - paddingY - (val / MAX_VALUE) * (100 - paddingY * 2);
    return { x, y, value: val };
  });

  const activePoint = points[activeIndex];
  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = p.x - (p.x - prev.x) * 0.4;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

  return (
    <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-6 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-sans font-bold text-[18px] leading-[24px] tracking-[0.4px] text-white">
          Revenue Trend
        </h3>
        <button className="flex flex-row items-center px-3 py-1.5 gap-1.5 bg-[#16171E] border border-[rgba(255,255,255,0.06)] rounded-lg cursor-pointer hover:bg-white/[0.05] transition-colors">
          <span className="font-sans font-medium text-[12px] leading-[18px] text-[#E2E8F0]">
            Monthly Chart
          </span>
          <CaretDown size={14} color="#94A3B8" weight="bold" />
        </button>
      </div>
      <div className="w-full flex flex-row gap-4 mt-2">
        <div className="relative w-[32px] h-[220px] flex-shrink-0">
          {Y_LABELS.map((item) => {
            const y = 100 - paddingY - (item.value / MAX_VALUE) * (100 - paddingY * 2);
            return (
              <span
                key={item.label}
                className="absolute w-full text-right transform -translate-y-1/2 font-sans font-medium text-[11px] leading-[16px] text-[#64748B]"
                style={{ top: `${y}%` }}
              >
                {item.label}
              </span>
            );
          })}
        </div>
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="relative w-full h-[220px] overflow-visible group">
            {points.map((p, i) => {
              const leftBound = i === 0 ? 0 : (points[i - 1].x + p.x) / 2;
              const rightBound = i === points.length - 1 ? 100 : (p.x + points[i + 1].x) / 2;
              return (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 cursor-crosshair z-20"
                  style={{
                    left: `${leftBound}%`,
                    width: `${rightBound - leftBound}%`,
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                />
              );
            })}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4FF32" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D4FF32" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Y_LABELS.map((item) => {
                const y = 100 - paddingY - (item.value / MAX_VALUE) * (100 - paddingY * 2);
                return (
                  <line
                    key={item.label}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#ffffff"
                    strokeOpacity="0.04"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              <path d={areaPath} fill="url(#areaGradient)" />
              <path d={linePath} fill="none" stroke="#D4FF32" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </svg>
            {points.map((p, i) => {
              if (i === activeIndex) return null;
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-[#D4FF32] transform -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                />
              );
            })}
            <div
              className="absolute w-[1px] border-l-[1.5px] border-dashed border-[#D4FF32] opacity-70 pointer-events-none transition-all duration-300 ease-out"
              style={{
                left: `${activePoint.x}%`,
                top: `${Math.max(activePoint.y - 45, 0)}%`,
                bottom: `${100 - activePoint.y}%`,
                transform: 'translateX(-50%)',
              }}
            />
            <div
              className="absolute bg-[#1D1E25] border border-[#2A2D3A] rounded-[6px] px-2.5 py-1 pointer-events-none z-10 shadow-lg transition-all duration-300 ease-out"
              style={{
                left: `${activePoint.x}%`,
                top: `${Math.max(activePoint.y - 45, 0)}%`,
                transform: 'translate(-50%, -100%)',
                marginTop: '-4px',
              }}
            >
              <span className="font-sans font-bold text-[12px] leading-[18px] text-white">
                ₹{activePoint.value.toLocaleString("en-IN")}
              </span>
            </div>
            <div
              className="absolute rounded-full bg-[#D4FF32] opacity-30 transform -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] pointer-events-none transition-all duration-300 ease-out"
              style={{ left: `${activePoint.x}%`, top: `${activePoint.y}%` }}
            />
            <div
              className="absolute rounded-full bg-[#D4FF32] border-[3px] border-[#14151A] transform -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] shadow-[0_0_10px_rgba(212,255,50,0.6)] pointer-events-none transition-all duration-300 ease-out"
              style={{ left: `${activePoint.x}%`, top: `${activePoint.y}%` }}
            />
          </div>
          <div className="relative w-full h-[20px]">
            {MONTHS.map((month, i) => (
              <span
                key={month}
                className={`absolute top-0 transform -translate-x-1/2 font-sans text-[11px] leading-[16px] transition-colors duration-300 ${
                  i === activeIndex ? "font-bold text-[#D4FF32]" : "font-medium text-[#64748B]"
                }`}
                style={{ left: `${(i / (MONTHS.length - 1)) * 100}%` }}
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
