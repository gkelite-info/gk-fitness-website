import { UsersThree, CheckCircle, XCircle, CalendarBlank } from "@phosphor-icons/react";
import { VisitorKpiStats } from "./types";

interface GymPassVisitorsKpisProps {
  stats: VisitorKpiStats;
}

export default function GymPassVisitorsKpis({ stats }: GymPassVisitorsKpisProps) {
  const cards = [
    {
      id: "total-visitors",
      label: "Total Visitors",
      value: stats.totalVisitors,
      subText: "this month",
      subTextColor: "text-[#94A3B8]",
      icon: <UsersThree size={22} weight="bold" className="text-[#34D399]" />,
      iconBg: "rgba(6, 78, 59, 0.4)",
      iconBorder: "rgba(52, 211, 153, 0.25)",
    },
    {
      id: "visited",
      label: "Visited",
      value: stats.visited,
      subText: stats.visitedPercentage,
      subTextColor: "text-[#34D399]",
      icon: <CheckCircle size={22} weight="bold" className="text-[#34D399]" />,
      iconBg: "rgba(6, 78, 59, 0.4)",
      iconBorder: "rgba(52, 211, 153, 0.25)",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      value: stats.cancelled,
      subText: stats.cancelledLabel,
      subTextColor: "text-[#FB7185]",
      icon: <XCircle size={22} weight="bold" className="text-[#FB7185]" />,
      iconBg: "rgba(76, 5, 25, 0.45)",
      iconBorder: "rgba(244, 63, 94, 0.25)",
    },
    {
      id: "today-visitors",
      label: "Today's Visitors",
      value: stats.todayVisitors,
      subText: stats.todayDate,
      subTextColor: "text-[#94A3B8]",
      icon: <CalendarBlank size={22} weight="bold" className="text-[#C084FC]" />,
      iconBg: "rgba(59, 7, 100, 0.45)",
      iconBorder: "rgba(192, 132, 252, 0.25)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full min-w-0">
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-full bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)] min-w-0"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: card.iconBg,
              borderColor: card.iconBorder,
            }}
          >
            {card.icon}
          </div>

          <div className="flex flex-col min-w-0 justify-center flex-1">
            <span className="text-xs font-medium text-[#94A3B8] leading-tight truncate">
              {card.label}
            </span>
            <span className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-none my-1">
              {card.value}
            </span>
            <span className={`text-[11px] font-medium leading-tight ${card.subTextColor}`}>
              {card.subText}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
