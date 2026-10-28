"use client";

import { CaretRight } from "@phosphor-icons/react";
import { openAppOrStore } from "@/app/utils/deepLink";
import type { ScheduleItemData } from "@/app/actions/globaltrainer/getGlobalTrainerDashboard";

interface GlobalTrainerScheduleSectionProps {
  schedule?: ScheduleItemData[];
}

const DEFAULT_SCHEDULE_ITEMS: ScheduleItemData[] = [
  {
    id: "1",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    clientName: "Rahul Sharma",
    sessionType: "Strength Training",
    status: "Completed",
    accentColor: "bg-[#D4FF32]",
    badgeBg: "bg-[#064E3B]/40",
    badgeText: "text-[#34D399]",
    badgeBorder: "border-[#059669]/30",
    avatarText: "RS",
    avatarBg: "from-[#1E293B] to-[#334155]",
  },
  {
    id: "2",
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    clientName: "Priya Reddy",
    sessionType: "Personal Training",
    status: "Completed",
    accentColor: "bg-[#D4FF32]",
    badgeBg: "bg-[#064E3B]/40",
    badgeText: "text-[#34D399]",
    badgeBorder: "border-[#059669]/30",
    avatarText: "PR",
    avatarBg: "from-[#3B1E29] to-[#553341]",
  },
  {
    id: "3",
    startTime: "05:30 PM",
    endTime: "06:30 PM",
    clientName: "Arjun Kumar",
    sessionType: "Strength Training",
    status: "Upcoming",
    accentColor: "bg-[#A855F7]",
    badgeBg: "bg-[#3B0764]/50",
    badgeText: "text-[#C084FC]",
    badgeBorder: "border-[#7E22CE]/40",
    avatarText: "AK",
    avatarBg: "from-[#1E1B4B] to-[#312E81]",
  },
];

export default function GlobalTrainerScheduleSection({
  schedule,
}: GlobalTrainerScheduleSectionProps) {
  const items = schedule && schedule.length > 0 ? schedule : DEFAULT_SCHEDULE_ITEMS;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-white text-base sm:text-lg font-bold tracking-tight">
          Today's Schedule
        </h2>
        <button
          type="button"
          onClick={() => openAppOrStore("schedule")}
          className="text-[#D4FF32] text-xs font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <CaretRight size={13} weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openAppOrStore(`schedule-${item.id}`)}
            className="w-full bg-[#141414] hover:bg-[#1A1A1E] border border-[#222222] hover:border-[#333333] rounded-2xl p-3.5 flex items-center gap-3 sm:gap-4 transition-all cursor-pointer text-left active:scale-[0.99]"
          >
            <div className="flex flex-col items-center justify-center shrink-0 w-16 sm:w-20 text-center">
              <span className="text-white text-[11px] sm:text-xs font-bold leading-tight">
                {item.startTime}
              </span>
              <span className="text-[#64748B] text-[10px] leading-tight my-0.5">-</span>
              <span className="text-[#94A3B8] text-[11px] sm:text-xs font-medium leading-tight">
                {item.endTime}
              </span>
            </div>

            <div className={`w-[3px] h-10 rounded-full shrink-0 ${item.accentColor}`} />

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} border border-white/10 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-inner`}>
                {item.avatarText}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white text-sm font-bold truncate">
                  {item.clientName}
                </span>
                <span className="text-[#8E8E93] text-xs truncate">
                  {item.sessionType}
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
