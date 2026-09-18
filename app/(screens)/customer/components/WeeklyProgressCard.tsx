"use client";

import { ArrowRight } from "@phosphor-icons/react";

import { openAppOrStore } from "../../../utils/deepLink";

export default function WeeklyProgressCard() {
  // Static placeholder data since we don't have active sync to Supabase for the pedometer
  // on web. Instruct users to view full details in the app.
  const dynamicWeeklyBars = [
    { day: 'M', height: 40, active: false },
    { day: 'T', height: 60, active: true },
    { day: 'W', height: 30, active: false },
    { day: 'T', height: 80, active: true },
    { day: 'F', height: 50, active: true },
    { day: 'S', height: 10, active: false },
    { day: 'S', height: 5, active: false },
  ];

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#D7FF00] text-[11px] font-semibold tracking-wider">
          WEEKLY PROGRESS
        </span>
        <button 
          onClick={() => openAppOrStore("home")}
          className="flex items-center gap-1 active:opacity-80 hover:text-white group transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <span className="text-[#8E8E93] group-hover:text-white transition-colors text-xs font-medium">View in App</span>
          <ArrowRight size={13} className="text-[#8E8E93] group-hover:text-white transition-colors" />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <div className="justify-end mb-2">
          <div className="flex items-baseline">
            <span className="text-white text-3xl sm:text-4xl font-semibold">--</span>
            <span className="text-white text-lg sm:text-xl font-semibold ml-0.5">%</span>
          </div>
          <span className="text-[#8E8E93] text-xs font-medium mt-1 block">Completed</span>
        </div>

        <div className="flex items-end gap-1.5 sm:gap-2.5">
          {dynamicWeeklyBars.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-3 sm:w-3.5 h-16 sm:h-20 bg-[#1E1E1E] rounded-full flex items-end overflow-hidden">
                <div
                  className="w-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    height: `${item.height}%`,
                    backgroundColor: item.height > 5 ? `rgba(196, 239, 0, ${Math.max(item.height / 100, 0.2)})` : '#2A2A2A',
                  }}
                />
              </div>
              <span className="text-[#8E8E93] text-[10px] sm:text-[11px] font-semibold">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
