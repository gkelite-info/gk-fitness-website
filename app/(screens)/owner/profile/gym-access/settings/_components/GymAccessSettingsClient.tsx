"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import DayTimingRow from "./DayTimingRow";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const INITIAL_STATE = DAYS.reduce((acc, day) => {
  acc[day] = {
    isClosed: false,
    opensAt: day === "Saturday" || day === "Sunday" ? "07:00 AM" : "06:00 AM",
    closesAt: day === "Saturday" ? "09:00 PM" : day === "Sunday" ? "01:00 PM" : "10:00 PM",
  };
  return acc;
}, {} as Record<string, { isClosed: boolean; opensAt: string; closesAt: string }>);

export default function GymAccessSettingsClient() {
  const router = useRouter();
  const [timings, setTimings] = useState(INITIAL_STATE);

  const handleUpdateDay = (day: string, field: string, value: any) => {
    setTimings(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    toast.success("Gym timings saved successfully");
    router.back();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed text-white">
      <div className="flex flex-col gap-4 w-full shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-['Nimbus_Sans'] font-bold text-[24px] sm:text-[28px] leading-8 tracking-[-0.6px] m-0">
              Gym Access Settings
            </h1>
            <p className="font-['Nimbus_Sans'] font-normal text-[13px] sm:text-[14px] text-[#94A3B8]">
              Set gym timings and customer check-in rules.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-[20px] flex flex-col w-full shrink-0">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 p-5 sm:p-6 border-b border-[#232631]">
          <div className="w-[48px] h-[48px] sm:w-[42px] sm:h-[42px] bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-full flex items-center justify-center shrink-0">
            <Clock size={22} weight="regular" className="text-[#C8FF00]" />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1 pr-2 mt-1 sm:mt-0.5 text-center sm:text-left">
            <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-[17px] text-white leading-tight">Gym Timings</h2>
            <p className="font-['Nimbus_Sans'] text-[13px] text-[#94A3B8]">Set opening and closing time for each day.</p>
          </div>
        </div>

        <div className="flex flex-col px-5 sm:px-6 py-4">
          {DAYS.map((day, index) => (
            <div key={day}>
              <DayTimingRow 
                day={day} 
                data={timings[day]} 
                onChange={(field, val) => handleUpdateDay(day, field, val)} 
              />
              {index < DAYS.length - 1 && (
                <div className="w-full h-px bg-[#232631] my-5 sm:my-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2 pb-10">
        <button
          onClick={() => router.back()}
          className="w-full sm:w-[120px] h-[48px] bg-[#1A1C22] hover:bg-[#232631] border border-[#232631] text-white font-['Nimbus_Sans'] font-bold text-[15px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full sm:w-[160px] h-[48px] bg-[#C8FF00] hover:bg-[#D4FF32] text-black font-['Nimbus_Sans'] font-bold text-[15px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer ml-auto"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}
