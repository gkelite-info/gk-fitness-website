"use client";

import { User } from "@phosphor-icons/react";
import Avatar from "../../Avatar";
import { PlatformUser } from "../types";

interface CustomerHeroCardProps {
  customer: PlatformUser;
}

export default function CustomerHeroCard({ customer }: CustomerHeroCardProps) {
  const isInactive = customer.status === "Inactive";

  return (
    <div className="w-full rounded-2xl bg-[#12151D] border border-[#1E232E] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 relative">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto min-w-0 text-center sm:text-left">
        <div className="relative shrink-0 flex justify-center">
          <Avatar
            src={customer.avatarUrl}
            alt={customer.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#262E3E] object-cover bg-[#1A1F2B]"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start gap-1.5 min-w-0 w-full sm:w-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight break-words">
            {customer.name}
          </h2>

          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <span className="text-xs sm:text-sm text-[#94A3B8]">
              Customer ID
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#D4FF32]">
              {customer.code || "CUS-00124"}
            </span>
          </div>

          <div className="pt-0.5 flex justify-center sm:justify-start">
            {isInactive ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-[rgba(69,26,3,0.6)] border border-[rgba(146,64,14,0.5)] text-[#FB923C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
                Inactive
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-[rgba(2,44,34,0.6)] border border-[rgba(6,95,70,0.5)] text-[#34D399]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                Active
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[#181D26] border border-[#242C3B] text-[#64748B] shrink-0">
        <User size={20} weight="regular" />
      </div>
    </div>
  );
}
