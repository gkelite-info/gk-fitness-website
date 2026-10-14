import Link from "next/link";
import {
  Buildings,
  Barbell,
  PlusCircle,
  Users,
} from "@phosphor-icons/react";
import { PlatformKpiItem } from "./types";

interface PlatformKpiCardProps {
  kpi: PlatformKpiItem;
}

export default function PlatformKpiCard({ kpi }: PlatformKpiCardProps) {
  const getHref = () => {
    switch (kpi.iconType) {
      case "active-gyms":
        return "/superadmin/gyms?tab=active";
      case "total-gyms":
        return "/superadmin/gyms?tab=all";
      case "new-gyms":
        return "/superadmin/gyms?tab=all&month=2026-10";
      case "total-users":
        return "/superadmin/users";
      default:
        return "/superadmin/gyms";
    }
  };

  const renderIcon = () => {
    switch (kpi.iconType) {
      case "active-gyms":
        return <Buildings size={22} weight="bold" className="text-[#A3E635]" />;
      case "total-gyms":
        return <Buildings size={22} weight="bold" className="text-[#A3E635]" />;
      case "new-gyms":
        return <PlusCircle size={22} weight="bold" className="text-[#A3E635]" />;
      case "total-users":
        return <Users size={22} weight="bold" className="text-[#A3E635]" />;
      default:
        return <Barbell size={22} weight="bold" className="text-[#A3E635]" />;
    }
  };

  return (
    <Link
      href={getHref()}
      className="w-full h-[95px] bg-[#0F1722] border border-[#172332] rounded-xl p-4 flex items-center justify-between gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:border-[#D4FF32]/50 hover:bg-[#121d2b] cursor-pointer group"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-11 h-11 rounded-lg bg-[#192B1A] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          {renderIcon()}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-2xl font-bold text-white tracking-tight leading-6">
            {kpi.value}
          </span>
          <span className="text-xs font-normal text-[#94A3B8] group-hover:text-white transition-colors leading-4 mt-1 line-clamp-2 break-words">
            {kpi.label}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <div className="px-1.5 py-0.5 rounded bg-[rgba(2,44,34,0.6)] border border-[rgba(6,95,70,0.4)] flex items-center justify-center">
          <span className="text-[11px] font-semibold text-[#34D399] leading-4 whitespace-nowrap">
            {kpi.change}
          </span>
        </div>
        <span className="text-[10px] font-normal text-[#94A3B8] leading-4 text-right mt-1 whitespace-nowrap">
          {kpi.changePeriod}
        </span>
      </div>
    </Link>
  );
}
