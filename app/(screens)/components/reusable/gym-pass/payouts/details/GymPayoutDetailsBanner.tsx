"use client";

import { User, MapPin, Clock, Check } from "@phosphor-icons/react";
import { GymPayoutDetailsData } from "./payoutDetailsData";

interface GymPayoutDetailsBannerProps {
  data: GymPayoutDetailsData;
}

export default function GymPayoutDetailsBanner({
  data,
}: GymPayoutDetailsBannerProps) {
  const isPending = data.status === "Pending";

  return (
    <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 shadow-sm">
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#181A22] border border-[#262B3A] flex items-center justify-center text-white shrink-0 shadow-inner">
          <div className="w-6 h-6 rounded-full bg-[#202433] border border-[#2B3142]" />
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug truncate">
            {data.gymName}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <User size={13} className="text-[#64748B]" />
              <span>Owner: {data.ownerName}</span>
            </span>

            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin size={13} className="text-[#64748B]" />
              <span>{data.location}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 md:gap-1 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#1E222D] w-full md:w-auto">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[11px] font-semibold text-[#8E95A9] uppercase tracking-wider">
            Payout Amount
          </span>

          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none mt-0.5">
            ₹{data.payoutAmount.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold w-fit ${
              isPending
                ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30"
                : "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30"
            }`}
          >
            {isPending ? (
              <Clock size={12} weight="bold" />
            ) : (
              <Check size={12} weight="bold" />
            )}
            <span>{data.status}</span>
          </span>

          <span className="text-[10px] text-[#64748B] font-medium text-right">
            Current Status
          </span>
        </div>
      </div>
    </div>
  );
}
