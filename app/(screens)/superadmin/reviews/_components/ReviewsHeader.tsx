"use client";

import { ChatCircleDots, ArrowClockwise } from "@phosphor-icons/react";

interface ReviewsHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function ReviewsHeader({ onRefresh, isRefreshing }: ReviewsHeaderProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-white m-0">
            Website Reviews
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 text-[#D4FF32] text-xs font-semibold">
            <ChatCircleDots size={14} weight="fill" />
            Live Moderation
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] m-0 font-normal">
          Moderate, approve, and manage customer & gym owner feedback published on the homepage.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#141824] border border-[#232B3E] hover:border-[#D4FF32]/50 text-white hover:text-[#D4FF32] text-xs sm:text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
          >
            <ArrowClockwise
              size={16}
              weight="bold"
              className={isRefreshing ? "animate-spin" : ""}
            />
            <span>Refresh</span>
          </button>
        )}
      </div>
    </div>
  );
}
