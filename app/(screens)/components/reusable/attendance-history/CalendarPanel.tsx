"use client";

import { CaretLeft, CaretRight, Check } from "@phosphor-icons/react/dist/ssr";
import { getDaysInMonth, getFirstDayOfMonth, formatDateStr } from "./utils";

interface CalendarPanelProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  attendanceData: Record<string, boolean>;
}

import { useState } from "react";

export default function CalendarPanel({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  attendanceData
}: CalendarPanelProps) {
  const [filterMode, setFilterMode] = useState<'all' | 'present' | 'absent'>('all');

  const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const startDayOfWeek = getFirstDayOfMonth(year, month);
  
  const prevMonthDays = getDaysInMonth(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1);
  
  // Generate weeks matrix
  const weeks: { d: number; type: "prev" | "next" | "current"; date: Date }[][] = [];
  let currentWeek = [];
  
  // Previous month padding
  for (let i = 0; i < startDayOfWeek; i++) {
    const d = prevMonthDays - startDayOfWeek + i + 1;
    const date = new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, d);
    currentWeek.push({ d, type: "prev" as const, date });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    currentWeek.push({ d: i, type: "current" as const, date });
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Next month padding
  let nextMonthDay = 1;
  while (currentWeek.length > 0 && currentWeek.length < 7) {
    const date = new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, nextMonthDay);
    currentWeek.push({ d: nextMonthDay, type: "next" as const, date });
    nextMonthDay++;
  }
  if (currentWeek.length === 7) {
    weeks.push(currentWeek);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col justify-between items-start p-4 sm:p-6 bg-[#111319] border border-[#232730] rounded-2xl flex-[2] min-w-[280px] sm:min-w-[300px] h-full sm:min-h-[600px] w-full">
      
      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex flex-row flex-wrap justify-between items-center w-full pb-4 border-b border-[rgba(35,39,48,0.8)] gap-4">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <div className="relative">
              <input 
                type="month"
                value={`${year}-${String(month + 1).padStart(2, '0')}`}
                onChange={(e) => {
                  if (e.target.value) {
                    const [y, m] = e.target.value.split('-');
                    setCurrentMonth(new Date(parseInt(y), parseInt(m) - 1, 1));
                  }
                }}
                className="font-sans font-bold text-xl sm:text-2xl leading-8 tracking-[-0.6px] text-white m-0 bg-transparent border-none outline-none cursor-pointer w-auto min-w-[140px] sm:min-w-[200px] hover:text-[#C8FF00] transition-colors"
                style={{ colorScheme: "dark" }}
              />
            </div>
            <button 
              onClick={() => {
                setCurrentMonth(new Date());
                setSelectedDate(new Date());
              }}
              className="flex flex-col items-start px-2 py-0.5 bg-[#14171D] border border-[#232730] rounded shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <span className="font-sans font-normal text-xs leading-4 text-[#94A3B8]">
                {new Date().getMonth() === month && new Date().getFullYear() === year ? "Current Month" : "Selected Month"}
              </span>
            </button>
          </div>
          
          <div className="flex flex-row items-center gap-1.5">
            <button onClick={handlePrevMonth} className="flex justify-center items-center p-2 w-[34px] h-[34px] bg-[#14171D] border border-[#232730] rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <CaretLeft size={16} className="text-[#94A3B8]" />
            </button>
            <button onClick={handleNextMonth} className="flex justify-center items-center p-2 w-[34px] h-[34px] bg-[#14171D] border border-[#232730] rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <CaretRight size={16} className="text-[#94A3B8]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 w-full pt-3 gap-1 sm:gap-2">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="flex justify-center items-center">
              <span className="font-sans font-semibold text-[10px] sm:text-xs leading-4 text-center tracking-[0.6px] uppercase text-[#94A3B8]">
                {day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-2">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="grid grid-cols-7 w-full gap-1 sm:gap-2">
              {week.map((day, dIdx) => {
                const dateStr = formatDateStr(day.date);
                const isPresent = day.type === "current" && attendanceData[dateStr] === true;
                const isSelected = formatDateStr(selectedDate) === dateStr;
                const isVisible = filterMode === 'all' || (filterMode === 'present' && isPresent) || (filterMode === 'absent' && !isPresent);

                return (
                  <div key={dIdx} className="flex justify-center items-center h-10 sm:h-12 w-full">
                    {day.type === "current" ? (
                      <button 
                        onClick={() => setSelectedDate(day.date)}
                        className={`flex justify-center items-center w-full max-w-[62px] h-10 sm:h-12 rounded-xl transition-all cursor-pointer ${
                          !isVisible ? 'opacity-10 pointer-events-none' :
                          isSelected && isPresent ? 'bg-[#C8FF00] border-2 border-white shadow-[0_0_15px_rgba(200,255,0,0.5)]' :
                          isSelected && !isPresent ? 'bg-[rgba(20,23,29,0.8)] border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' :
                          isPresent ? 'bg-[#C8FF00] hover:scale-105' : 'bg-transparent hover:bg-white/5 border border-[rgba(255,255,255,0.05)]'
                        }`}
                      >
                        <span className={`font-sans font-bold text-sm sm:text-base leading-6 ${isPresent && isVisible ? 'text-black' : 'text-[#94A3B8]'}`}>
                          {day.d}
                        </span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setCurrentMonth(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
                          setSelectedDate(day.date);
                        }}
                        className="flex justify-center items-center w-full max-w-[62px] h-10 sm:h-12 cursor-pointer hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <span className={`font-sans font-medium text-xs sm:text-sm leading-5 text-center text-[#475569]`}>
                          {day.d}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-start pt-8 w-full mt-4 border-t border-[rgba(35,39,48,0.7)]">
        <div className="flex flex-row justify-center sm:justify-start items-center gap-8 w-full">
          
          <button 
            onClick={() => setFilterMode(prev => prev === 'present' ? 'all' : 'present')}
            className="flex flex-row items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className={`flex justify-center items-center w-3.5 h-3.5 rounded shrink-0 transition-colors ${
              filterMode === 'absent' 
                ? 'bg-[#232730] border border-[rgba(35,39,48,0.8)]' 
                : 'bg-[#C8FF00]'
            }`} />
            <span className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
              Present (Workout Day)
            </span>
          </button>

          <button 
            onClick={() => setFilterMode(prev => prev === 'absent' ? 'all' : 'absent')}
            className="flex flex-row items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className={`flex justify-center items-center w-3.5 h-3.5 rounded shrink-0 transition-colors ${
              filterMode === 'absent' 
                ? 'bg-[#C8FF00]' 
                : 'bg-[#232730] border border-[rgba(35,39,48,0.8)]'
            }`} />
            <span className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
              Absent / Rest Day
            </span>
          </button>

        </div>
      </div>

    </div>
  );
}
