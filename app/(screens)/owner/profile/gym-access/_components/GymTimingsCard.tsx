"use client";

import { Clock, PencilSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const schedule = [
  { day: "Monday", time: "6:00 AM - 10:00 PM", active: true },
  { day: "Tuesday", time: "6:00 AM - 10:00 PM", active: true },
  { day: "Wednesday", time: "6:00 AM - 10:00 PM", active: true },
  { day: "Thursday", time: "6:00 AM - 10:00 PM", active: true },
  { day: "Friday", time: "6:00 AM - 10:00 PM", active: true },
  { day: "Saturday", time: "7:00 AM - 9:00 PM", active: true, tag: "WEEKEND", tagColor: "bg-[#3F2B14] text-[#EAB308]" },
  { day: "Sunday", time: "7:00 AM - 1:00 PM", active: true, tag: "SHORT HOURS", tagColor: "bg-[#3F2B14] text-[#EAB308]" },
];

export default function GymTimingsCard() {
  const router = useRouter();
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-[24px] flex flex-col p-6 w-full h-full">

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between pb-6 border-b border-[#232631]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 w-full">
          <div className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-[14px] flex items-center justify-center shrink-0">
            <Clock size={24} weight="regular" className="text-[#C8FF00]" />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 sm:gap-1.5 pr-2 w-full text-center sm:text-left mt-1 sm:mt-0">
            <h2 className="font-['Nimbus_Sans'] font-bold text-[20px] sm:text-[18px] text-white leading-tight break-words">Gym Timings</h2>
            <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">Set the days and time your gym is open.</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/owner/profile/gym-access/settings')}
          className="absolute top-0 right-0 sm:relative w-[34px] h-[34px] bg-[#1A1C22] border border-[#232631] rounded-full flex items-center justify-center shrink-0 hover:bg-[#232631] transition-colors cursor-pointer"
        >
          <PencilSimple size={16} weight="bold" className="text-[#94A3B8]" />
        </button>
      </div>


      <div className="flex flex-col mt-6 gap-6 sm:gap-7">
        {schedule.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between group gap-3">
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-['Nimbus_Sans'] font-medium text-[14px] sm:text-[15px] text-white">{item.day}</span>
              {item.tag && (
                <div className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-[0.5px] ${item.tagColor} pt-[3px] hidden sm:block`}>
                  {item.tag}
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[13px] sm:text-[14px] text-[#D1D5DB] tracking-wide whitespace-nowrap">{item.time}</span>
                {item.active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                )}
              </div>

              {item.tag && (
                <div className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-[0.5px] ${item.tagColor} pt-[3px] sm:hidden`}>
                  {item.tag}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
