import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  subtitle?: string;
  value: string;
  icon: ReactNode;
  trendIcon: ReactNode;
}

export default function MetricCard({
  title,
  subtitle,
  value,
  icon,
  trendIcon,
}: MetricCardProps) {
  return (
    <div className="box-border flex flex-row justify-between items-center p-5 md:p-6 gap-4 md:gap-6 w-full bg-[#12151C] border border-[#1E2330] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)]">
      <div className="flex flex-row items-center gap-4 md:gap-5">
        <div className="box-border flex flex-row justify-center items-center w-14 h-14 md:w-16 md:h-16 bg-[#1E2814] border border-[#2E401B] rounded-[16px] shrink-0 text-[#BBF225]">
          {icon}
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-center gap-1.5 flex-wrap">
            <span className="font-['Plus_Jakarta_Sans'] font-[600] text-[11px] md:text-[12px] leading-[16px] tracking-[0.3px] uppercase text-[#9CA3AF]">
              {title}
            </span>
            {subtitle && (
              <span className="font-['Plus_Jakarta_Sans'] font-[600] text-[10px] md:text-[11px] leading-[16px] tracking-[0.3px] lowercase text-[#6B7280]">
                {subtitle}
              </span>
            )}
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-[800] text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] tracking-[-0.75px] text-white">
            {value}
          </span>
        </div>
      </div>
      <div className="box-border flex flex-row justify-center items-center w-8 h-8 bg-[#192414] border border-[#2D421A] rounded-[8px] shrink-0 text-[#BBF225]">
        {trendIcon}
      </div>
    </div>
  );
}
