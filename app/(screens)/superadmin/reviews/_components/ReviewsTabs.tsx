"use client";

import { ReviewStatus, ReviewsStats } from "../types";

interface ReviewsTabsProps {
  currentTab: ReviewStatus;
  stats: ReviewsStats;
  onChangeTab: (tab: ReviewStatus) => void;
}

export function ReviewsTabs({ currentTab, stats, onChangeTab }: ReviewsTabsProps) {
  const tabs = [
    {
      id: "all" as ReviewStatus,
      label: "All Reviews",
      count: stats.total,
      badgeColor: "bg-white/10 text-white",
    },
    {
      id: "approved" as ReviewStatus,
      label: "Approved",
      count: stats.approved,
      badgeColor: "bg-[#34D399]/20 text-[#34D399]",
    },
    {
      id: "pending" as ReviewStatus,
      label: "Pending Moderation",
      count: stats.pending,
      badgeColor: "bg-[#FBBF24]/20 text-[#FBBF24]",
    },
    {
      id: "deleted" as ReviewStatus,
      label: "Deleted / Rejected",
      count: stats.deleted,
      badgeColor: "bg-[#F87171]/20 text-[#F87171]",
    },
  ];

  return (
    <div className="w-full flex items-center gap-2 border-b border-[#1E2536] overflow-x-auto scrollbar-themed pb-px">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              isActive
                ? "border-[#D4FF32] text-[#D4FF32]"
                : "border-transparent text-[#8E99AB] hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                isActive ? "bg-[#D4FF32] text-black" : tab.badgeColor
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
