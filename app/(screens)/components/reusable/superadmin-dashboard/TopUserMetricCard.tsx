import Link from "next/link";
import {
  UsersThree,
  Users,
  User,
  Globe,
  IdentificationBadge,
} from "@phosphor-icons/react";
import { TopUserMetricCardItem } from "./types";

interface TopUserMetricCardProps {
  metric: TopUserMetricCardItem;
}

export default function TopUserMetricCard({ metric }: TopUserMetricCardProps) {
  const renderIcon = () => {
    switch (metric.iconType) {
      case "owners":
        return <UsersThree size={22} weight="bold" style={{ color: metric.iconColor }} />;
      case "gym-customers":
        return <Users size={22} weight="bold" style={{ color: metric.iconColor }} />;
      case "individual-customers":
        return <User size={22} weight="bold" style={{ color: metric.iconColor }} />;
      case "global-trainers":
        return <Globe size={22} weight="bold" style={{ color: metric.iconColor }} />;
      case "trainers":
        return <IdentificationBadge size={22} weight="bold" style={{ color: metric.iconColor }} />;
      default:
        return <User size={22} weight="bold" style={{ color: metric.iconColor }} />;
    }
  };

  return (
    <Link
      href={metric.href}
      prefetch={true}
      className="w-full min-h-[92px] sm:min-h-[96px] bg-[#0E1015] border border-[#1A1D26] rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 sm:gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 hover:border-[#D4FF32]/50 hover:bg-[#13161F] hover:shadow-[0_8px_20px_rgba(0,0,0,0.35),0_0_12px_rgba(212,255,50,0.06)] cursor-pointer group min-w-0"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105"
        style={{
          backgroundColor: metric.iconBg,
          borderColor: metric.iconBorder,
        }}
      >
        {renderIcon()}
      </div>

      <div className="flex flex-col min-w-0 justify-center">
        <span className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-none group-hover:text-[#D4FF32] transition-colors truncate">
          {metric.value}
        </span>
        <span className="text-xs sm:text-[13px] font-medium text-[#94A3B8] leading-snug mt-1.5 break-words line-clamp-2">
          {metric.label}
        </span>
      </div>
    </Link>
  );
}
