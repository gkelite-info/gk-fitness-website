"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import { getWeekDays, formatDateStr, DEMO_TODAY } from "./utils";

interface ThisWeekStripProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  attendanceData: Record<string, boolean>;
}

export default function ThisWeekStrip({ selectedDate, setSelectedDate, attendanceData }: ThisWeekStripProps) {
  const todayDate = new Date();
  const weekDays = getWeekDays(todayDate);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Calculate week range text (e.g. 13 Jul - 19 Jul 2026)
  const firstDay = weekDays[0];
  const lastDay = weekDays[6];
  const weekRangeStr = `${firstDay.getDate()} ${monthNames[firstDay.getMonth()]} – ${lastDay.getDate()} ${monthNames[lastDay.getMonth()]} ${lastDay.getFullYear()}`;

  // Calculate "X/7 Days" present in this week
  const presentDaysCount = weekDays.filter(d => attendanceData[formatDateStr(d)]).length;

  const todayStr = formatDateStr(todayDate);

  return (
    <div className="flex flex-col items-start p-6 gap-4 w-full bg-[#111319] border border-[#232730] rounded-2xl overflow-hidden">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
        <div className="flex flex-row items-center gap-3">
          <h3 className="font-sans font-bold text-lg leading-7 text-white m-0">
            This Week
          </h3>
          <div className="flex flex-row items-center px-2.5 py-1 bg-[rgba(200,255,0,0.15)] border border-[rgba(200,255,0,0.3)] rounded-md">
            <span className="font-sans font-semibold text-xs leading-4 text-[#C8FF00]">
              {presentDaysCount}/7 Days
            </span>
          </div>
        </div>
        <span className="font-sans font-normal text-xs leading-4 text-[#94A3B8]">
          Week ({weekRangeStr})
        </span>
      </div>

      <div className="flex flex-row items-start gap-3 w-full overflow-x-auto pb-2 scrollbar-themed pt-2 px-[2px]">
        {weekDays.map((date, idx) => {
          const dateStr = formatDateStr(date);
          const isPresent = attendanceData[dateStr] === true;
          const isSelected = formatDateStr(selectedDate) === dateStr;
          const isRealToday = dateStr === todayStr;

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`relative flex flex-col justify-start items-center pt-5 pb-3 px-2 gap-1.5 min-w-[100px] sm:min-w-[118px] flex-1 min-h-[104px] h-auto rounded-xl shrink-0 cursor-pointer transition-all ${
                isSelected 
                  ? "bg-[#14171D] border-2 border-[#C8FF00] shadow-[0_10px_15px_-3px_rgba(200,255,0,0.1)] scale-[1.02]" 
                  : isPresent 
                    ? "bg-[#14171D] border border-[#232730] hover:border-[#C8FF00]/50" 
                    : "bg-[rgba(20,23,29,0.6)] border border-[rgba(35,39,48,0.6)] opacity-70 hover:opacity-100"
              }`}
            >
              {isRealToday && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C8FF00] rounded-full px-3 py-0.5 z-10">
                  <span className="font-sans font-bold text-[10px] leading-[14px] text-black uppercase whitespace-nowrap block mt-[1px]">
                    TODAY
                  </span>
                </div>
              )}

              <span className={`font-sans font-medium text-xs leading-4 text-center ${isSelected ? "text-[#C8FF00] font-bold" : "text-[#94A3B8]"}`}>
                {dayNames[idx]}
              </span>

              <div className="relative flex justify-center items-center w-8 h-8 rounded-full shrink-0">
                {isPresent ? (
                  <>
                    <div className="absolute inset-0 bg-[#C8FF00] rounded-full shadow-[0_0_14px_-2px_rgba(200,255,0,0.35)]" />
                    <Check size={16} weight="bold" className="text-black relative z-10" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[#232730] rounded-full" />
                    <span className="font-sans font-bold text-base leading-6 text-[#94A3B8] relative z-10">-</span>
                  </>
                )}
              </div>

              <span className={`font-mono font-normal text-[10px] leading-[15px] text-center ${isSelected ? "text-[#C8FF00] font-bold" : "text-[#64748B]"}`}>
                {date.getDate()} {monthNames[date.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
