"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Buildings,
  UserSquare,
  Headset,
  Crown,
  CreditCard,
  Globe,
  CaretRight,
} from "@phosphor-icons/react";
import { DashboardActionCardItem } from "./types";

interface DashboardActionCardProps {
  item: DashboardActionCardItem;
}

export default function DashboardActionCard({ item }: DashboardActionCardProps) {
  const router = useRouter();

  const renderIcon = () => {
    switch (item.iconType) {
      case "register-gym":
        return <Buildings size={18} weight="bold" style={{ color: item.iconColor }} />;
      case "global-trainers":
        return <UserSquare size={18} weight="bold" style={{ color: item.iconColor }} />;
      case "support-requests":
        return <Headset size={18} weight="bold" style={{ color: item.iconColor }} />;
      case "gym-owners":
        return <Crown size={18} weight="bold" style={{ color: item.iconColor }} />;
      case "payment-request":
        return <CreditCard size={18} weight="bold" style={{ color: item.iconColor }} />;
      case "leads-global-trainers":
        return <Globe size={18} weight="bold" style={{ color: item.iconColor }} />;
      default:
        return <Buildings size={18} weight="bold" style={{ color: item.iconColor }} />;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    e.preventDefault();
    router.push(item.href);
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      style={{
        backgroundColor: item.bgStyle,
        borderColor: item.borderStyle,
      }}
      className="w-full h-[100px] border rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer group select-none"
    >
      <div className="flex flex-col justify-between h-full min-w-0 pr-1">
        <div
          style={{ backgroundColor: item.iconBg }}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        >
          {renderIcon()}
        </div>

        <span className="text-xs font-semibold text-[#E2E8F0] group-hover:text-white leading-[15px] mt-2 line-clamp-2 break-words">
          {item.title}
        </span>
      </div>

      <CaretRight
        size={16}
        weight="bold"
        className="text-[#64748B] group-hover:text-white transition-colors shrink-0"
      />
    </Link>
  );
}
