import { ReactNode } from "react";

export interface SessionKPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  accentColor: string;
  iconBgColor: string;
  iconBorderColor: string;
  iconColor: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function SessionKPICard({
  title,
  value,
  subtitle,
  icon,
  accentColor,
  iconBgColor,
  iconBorderColor,
  iconColor,
  isActive = false,
  onClick,
}: SessionKPICardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-start p-5 w-full h-[120px] bg-[#121620] border rounded-xl cursor-pointer transition-all ${
        isActive ? "border-[#323842]" : "border-[#1B2230] hover:border-[#232A39]"
      }`}
      style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)" }}
    >
      <div
        className="absolute left-[1px] top-[1px] bottom-[1.5px] w-1 rounded-l-[4px]"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-row items-start gap-4 w-full h-full z-10">
        <div
          className="flex justify-center items-center w-[46px] h-[46px] shrink-0 rounded-xl border"
          style={{
            backgroundColor: iconBgColor,
            borderColor: iconBorderColor,
            color: iconColor,
          }}
        >
          {icon}
        </div>

        <div className="flex flex-col items-start pt-[5px] gap-[3px] flex-1">
          <span className="font-sans font-normal text-[12px] leading-4 text-[#8F9CAE]">
            {title}
          </span>
          <span className="font-sans font-bold text-[24px] leading-8 tracking-[-0.6px] text-white">
            {value}
          </span>
          <span className="font-sans font-normal text-[11px] leading-4 text-[#627084]">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
