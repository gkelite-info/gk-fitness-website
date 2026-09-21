"use client";

import { Clock } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";

export default function WorkingSchedule() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  
  const shiftPref = watch("shiftPreference") || "morning";
  const workingDaysArr = watch("workingDays") || ["MON", "TUE", "WED", "THU", "FRI"];

  const toggleDay = (day: string) => {
    let newDays = [...workingDaysArr];
    if (newDays.includes(day)) {
      newDays = newDays.filter((d) => d !== day);
    } else {
      newDays.push(day);
    }
    setValue("workingDays", newDays, { shouldValidate: true });
  };

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <Clock weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Working Schedule
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        {/* Shift Preference Radios */}
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Shift Preference <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full mt-1">
            {/* Morning Shift */}
            <label className="flex flex-row items-center cursor-pointer group">
              <div
                className={`flex flex-col justify-center items-center w-4 h-4 rounded-full border ${
                  shiftPref === "morning"
                    ? "bg-[#D4FF32] border-[#D4FF32]"
                    : "bg-[#1A2029] border-[#14161A]"
                } transition-colors`}
              >
                {shiftPref === "morning" && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <input
                type="radio"
                value="morning"
                {...register("shiftPreference")}
                className="hidden"
              />
              <span
                className={`ml-2.5 font-sans font-normal text-xs leading-4 ${
                  shiftPref === "morning" ? "text-[#E5E7EB]" : "text-[#9CA3AF]"
                }`}
              >
                Morning (06:00 AM - 02:00 PM)
              </span>
            </label>

            {/* Evening Shift */}
            <label className="flex flex-row items-center cursor-pointer group">
              <div
                className={`flex flex-col justify-center items-center w-4 h-4 rounded-full border ${
                  shiftPref === "evening"
                    ? "bg-[#D4FF32] border-[#D4FF32]"
                    : "bg-[#1A2029] border-[#14161A]"
                } transition-colors`}
              >
                {shiftPref === "evening" && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
              <input
                type="radio"
                value="evening"
                {...register("shiftPreference")}
                className="hidden"
              />
              <span
                className={`ml-2.5 font-sans font-normal text-xs leading-4 ${
                  shiftPref === "evening" ? "text-[#E5E7EB]" : "text-[#9CA3AF]"
                }`}
              >
                Evening (02:00 PM - 10:00 PM)
              </span>
            </label>
          </div>
          {errors.shiftPreference && <span className="text-red-500 text-[10px]">{errors.shiftPreference.message as string}</span>}
        </div>

        {/* Working Days Selection */}
        <div className="flex flex-col items-start gap-2 w-full mt-2">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Working Days <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row flex-wrap items-start gap-2 w-full">
            {days.map((day) => {
              const isSelected = workingDaysArr.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`flex flex-col justify-center items-center px-[10px] py-[7px] w-11 h-[30px] rounded-md transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-transparent"
                      : "bg-[#1A2029] border border-[#303744]"
                  }`}
                >
                  <span
                    className={`font-sans text-xs leading-4 text-center ${
                      isSelected ? "font-bold text-black" : "font-medium text-[#9CA3AF]"
                    }`}
                  >
                    {day}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.workingDays && <span className="text-red-500 text-[10px]">{errors.workingDays.message as string}</span>}
        </div>
      </div>
    </div>
  );
}
