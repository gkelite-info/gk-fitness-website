import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "@phosphor-icons/react/dist/ssr";

export interface WideKPICardProps {
  title: string;
  value: string | ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendSuffix?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export default function WideKPICard({
  title,
  value,
  trend,
  trendDirection = "up",
  trendSuffix,
  icon,
  iconBgColor = "#1B2A15",
  iconColor = "#CCFF00",
}: WideKPICardProps) {
  const isPositive = trendDirection === "up";
  const trendTextColor = isPositive ? "text-[#CCFF00]" : trendDirection === "down" ? "text-[#F43F5E]" : "text-[#94A3B8]";

  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#10151C] border border-[#1E2A1E] rounded-[16px] p-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <span className="font-sans font-[500] text-[13px] leading-[16px] text-[#64748B]">
          {title}
        </span>
        
        <span className="font-sans font-[700] text-[28px] md:text-[32px] leading-[36px] text-white">
          {value}
        </span>
        
        {(trend || trendSuffix) && (
          <div className="flex flex-row items-center gap-1.5 mt-1">
            {trendDirection !== "neutral" && (
              isPositive ? (
                <ArrowUp size={14} weight="bold" className={trendTextColor} />
              ) : (
                <ArrowDown size={14} weight="bold" className={trendTextColor} />
              )
            )}
            <span className={`font-sans font-[600] text-[12px] leading-[16px] ${trendTextColor}`}>
              {trend}
            </span>
            {trendSuffix && (
              <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#64748B] ml-1">
                {trendSuffix}
              </span>
            )}
          </div>
        )}
      </div>

      {icon && (
        <div 
          className="flex justify-center items-center w-12 h-12 md:w-14 md:h-14 rounded-full shrink-0"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
