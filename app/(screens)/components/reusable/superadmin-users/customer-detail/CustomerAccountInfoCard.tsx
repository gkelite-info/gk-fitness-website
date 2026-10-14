"use client";

import {
  ShieldCheck,
  CalendarBlank,
  User,
  Star,
  Clock,
  CreditCard,
} from "@phosphor-icons/react";
import { PlatformUser } from "../types";

interface CustomerAccountInfoCardProps {
  customer: PlatformUser;
}

export default function CustomerAccountInfoCard({
  customer,
}: CustomerAccountInfoCardProps) {
  const accountRows = [
    {
      icon: CalendarBlank,
      label: "Joined Date",
      value: customer.joinedDate || "12 Jan 2024",
      highlightClass: "text-white",
    },
    {
      icon: User,
      label: "Account Type",
      value: customer.accountType || "Individual Customer",
      highlightClass: "text-white",
    },
    {
      icon: Star,
      label: "Subscription Plan",
      value: customer.subscriptionPlan || "Annual Pro Elite",
      highlightClass: "text-[#D4FF32] font-bold",
    },
    {
      icon: Clock,
      label: "Renewal Date",
      value: customer.renewalDate || "11 Jan 2025",
      highlightClass: "text-white",
    },
    {
      icon: CreditCard,
      label: "Payment Status",
      value: customer.paymentStatus || "Paid",
      highlightClass: "text-[#34D399] font-bold",
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#12151D] border border-[#1E232E] p-6 flex flex-col gap-5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#1A1F2B]">
        <ShieldCheck size={22} weight="fill" className="text-[#D4FF32] shrink-0" />
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Account Information
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {accountRows.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-1.5 border-b border-[#161B24] last:border-0"
            >
              <div className="flex items-center gap-2.5 shrink-0">
                <Icon size={16} className="text-[#64748B] shrink-0" />
                <span className="text-xs sm:text-sm text-[#94A3B8] font-normal">
                  {item.label}
                </span>
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold ${item.highlightClass} sm:text-right break-words`}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
