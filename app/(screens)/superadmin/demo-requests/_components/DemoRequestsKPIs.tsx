"use client";

import { EnvelopeSimple, CalendarBlank, User, CheckCircle, XCircle } from "@phosphor-icons/react";
import { DemoRequestsStats } from "@/app/actions/demoRequests";

interface DemoRequestsKPIsProps {
  stats: DemoRequestsStats;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export function DemoRequestsKPIs({
  stats,
  selectedStatus,
  onSelectStatus,
}: DemoRequestsKPIsProps) {
  const cards = [
    {
      id: "all",
      label: "Total Requests",
      count: stats.total,
      iconBg: "bg-[#271E44]",
      icon: <EnvelopeSimple size={22} weight="fill" className="text-[#A78BFA]" />,
      activeBorder: "border-[#8B5CF6]",
      statusFilter: "all",
    },
    {
      id: "new",
      label: "New Requests",
      count: stats.newRequests,
      iconBg: "bg-[#0E2820]",
      icon: <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]" />,
      activeBorder: "border-[#10B981]",
      statusFilter: "New",
    },
    {
      id: "demo_scheduled",
      label: "Demo Scheduled",
      count: stats.demoScheduled,
      iconBg: "bg-[#251A3B]",
      icon: <CalendarBlank size={22} weight="fill" className="text-[#C084FC]" />,
      activeBorder: "border-[#A855F7]",
      statusFilter: "Demo Scheduled",
    },
    {
      id: "contacted",
      label: "Contacted",
      count: stats.contacted,
      iconBg: "bg-[#2E1F14]",
      icon: <User size={22} weight="fill" className="text-[#FB923C]" />,
      activeBorder: "border-[#F97316]",
      statusFilter: "Contacted",
    },
    {
      id: "converted",
      label: "Converted",
      count: stats.converted,
      iconBg: "bg-[#112438]",
      icon: <CheckCircle size={22} weight="fill" className="text-[#60A5FA]" />,
      activeBorder: "border-[#3B82F6]",
      statusFilter: "Converted",
    },
    {
      id: "not_interested",
      label: "Not Interested",
      count: stats.notInterested,
      iconBg: "bg-[#33151A]",
      icon: <XCircle size={22} weight="fill" className="text-[#F87171]" />,
      activeBorder: "border-[#EF4444]",
      statusFilter: "Not Interested",
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-[#232B3C] scrollbar-track-transparent">
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-max">
        {cards.map((card) => {
          const isSelected =
            (card.statusFilter === "all" && selectedStatus === "all") ||
            selectedStatus === card.statusFilter;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectStatus(card.statusFilter)}
              className={`min-w-[195px] sm:min-w-[210px] h-24 p-4 rounded-2xl bg-[#0D111A] border transition-all duration-200 flex items-center gap-4 text-left cursor-pointer group hover:bg-[#121724] shrink-0 ${
                isSelected
                  ? `${card.activeBorder} shadow-[0_0_15px_rgba(212,255,50,0.1)] bg-[#121724]`
                  : "border-[#1A2232] hover:border-[#28344D]"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 border border-white/5 transition-transform group-hover:scale-105`}
              >
                {card.icon}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black text-white leading-tight">
                  {card.count}
                </span>
                <span className="text-xs font-bold text-[#CBD5E1] whitespace-nowrap mt-1">
                  {card.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
