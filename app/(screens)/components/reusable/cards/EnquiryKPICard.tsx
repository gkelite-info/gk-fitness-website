import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react";

interface EnquiryKPICardProps {
  title: string;
  value: number | string;
  trend: "up" | "down" | "none";
  trendValue: string;
  trendLabel?: string;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  href?: string;
}

export default function EnquiryKPICard({
  title,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
  iconBgColor,
  iconColor
}: EnquiryKPICardProps) {
  return (
    <div className="flex flex-row items-center p-3.5 gap-3 w-full bg-[#10161C] border border-[#1C2631] rounded-[10px]">
      <div 
        className="w-9 h-9 rounded-[6.5px] flex justify-center items-center shrink-0"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        {icon}
      </div>

      <div className="flex flex-col items-start gap-0.5">
        <span className="font-sans font-medium text-[10px] leading-3 text-[#7E8B9B]">
          {title}
        </span>
        <span className="font-sans font-bold text-xl leading-6 text-white mt-[1px]">
          {value}
        </span>
        
        <div className="flex flex-row items-center gap-1 mt-[1px]">
          {trend === "none" ? (
            <span className="font-sans font-medium text-[9px] leading-[14px] text-[#64748B]">
              — {trendValue}
            </span>
          ) : (
            <div className={`flex items-center gap-0.5 ${trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {trend === "up" ? <ArrowUp size={10} weight="bold" /> : <ArrowDown size={10} weight="bold" />}
              <span className="font-sans font-medium text-[9px] leading-[14px]">{trendValue}</span>
            </div>
          )}
          {trend !== "none" && trendLabel && (
            <span className="font-sans font-medium text-[9px] leading-[14px] text-[#64748B]">
              {trendLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
