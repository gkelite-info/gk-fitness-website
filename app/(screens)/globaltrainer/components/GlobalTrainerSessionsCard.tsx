"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Barbell, CheckCircle, Clock, CalendarBlank } from "@phosphor-icons/react";
import { openAppOrStore } from "@/app/utils/deepLink";

interface GlobalTrainerSessionsCardProps {
  totalSessions?: number;
  completedSessions?: number;
  upcomingSessions?: number;
  dateLabel?: string;
}

export default function GlobalTrainerSessionsCard({
  totalSessions = 4,
  completedSessions = 3,
  upcomingSessions = 1,
}: GlobalTrainerSessionsCardProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    if (dateInputRef.current) {
      if ("showPicker" in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
        } catch {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split("-").map(Number);
    setSelectedDate(new Date(y, m - 1, d));
  };

  const toIsoDateString = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getSessionsTitle = (d: Date) => {
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    if (isToday) return "Today's Sessions";

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow =
      d.getDate() === tomorrow.getDate() &&
      d.getMonth() === tomorrow.getMonth() &&
      d.getFullYear() === tomorrow.getFullYear();

    if (isTomorrow) return "Tomorrow's Sessions";

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear();

    if (isYesterday) return "Yesterday's Sessions";

    const day = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });
    return `${day} ${month}'s Sessions`;
  };

  const day = selectedDate.getDate();
  const month = selectedDate.toLocaleDateString("en-US", { month: "short" });
  const year = selectedDate.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;
  const sessionsTitle = getSessionsTitle(selectedDate);
  const isoDate = toIsoDateString(selectedDate);

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-base sm:text-lg font-bold tracking-tight">
          {sessionsTitle}
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={handleOpenPicker}
            className="flex items-center gap-1.5 text-[#D4FF32] hover:text-[#e4ff66] bg-[#1C1C20] hover:bg-[#25252B] border border-[#2A2A30] px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer group active:scale-95 shadow-sm"
            title="Choose date"
          >
            <CalendarBlank size={15} weight="bold" className="shrink-0 group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap">{formattedDate}</span>
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={isoDate}
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0 pointer-events-auto cursor-pointer w-full h-full"
            aria-label="Select session date"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={() => openAppOrStore("sessions")}
          className="bg-[#1C1C20] hover:bg-[#25252B] border border-[#2A2A30] rounded-2xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer text-center group active:scale-95"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Barbell size={20} className="text-[#D4FF32]" weight="fill" />
            <span className="text-white text-xl sm:text-2xl font-black">{totalSessions}</span>
          </div>
          <span className="text-[#8E8E93] text-[10px] sm:text-xs font-medium whitespace-nowrap">
            Total Sessions
          </span>
        </button>

        <button
          type="button"
          onClick={() => openAppOrStore("sessions-completed")}
          className="bg-[#1C1C20] hover:bg-[#25252B] border border-[#2A2A30] rounded-2xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer text-center group active:scale-95"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <CheckCircle size={20} className="text-[#3B82F6]" weight="fill" />
            <span className="text-white text-xl sm:text-2xl font-black">{completedSessions}</span>
          </div>
          <span className="text-[#8E8E93] text-[10px] sm:text-xs font-medium whitespace-nowrap">
            Completed
          </span>
        </button>

        <button
          type="button"
          onClick={() => openAppOrStore("sessions-upcoming")}
          className="bg-[#1C1C20] hover:bg-[#25252B] border border-[#2A2A30] rounded-2xl p-3 flex flex-col items-center justify-center transition-all cursor-pointer text-center group active:scale-95"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Clock size={20} className="text-[#A855F7]" weight="fill" />
            <span className="text-white text-xl sm:text-2xl font-black">{upcomingSessions}</span>
          </div>
          <span className="text-[#8E8E93] text-[10px] sm:text-xs font-medium whitespace-nowrap">
            Upcoming
          </span>
        </button>
      </div>
    </div>
  );
}
