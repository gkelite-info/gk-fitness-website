"use client";

import { useState } from "react";
import {
  CalendarBlank,
  Clock,
  CaretDown,
  CaretUp,
  X,
  CheckCircle,
  Trash,
} from "@phosphor-icons/react";

interface DemoRequestScheduleCardProps {
  isScheduled: boolean;
  scheduledDate: string;
  scheduledTime: string;
  onSaveSchedule: (date: string, time: string) => void;
  onRemoveSchedule: () => void;
}

const AVAILABLE_TIMES = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export function DemoRequestScheduleCard({
  isScheduled,
  scheduledDate,
  scheduledTime,
  onSaveSchedule,
  onRemoveSchedule,
}: DemoRequestScheduleCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(!isScheduled);
  const [dateInput, setDateInput] = useState(scheduledDate || "16 Oct 2026");
  const [timeInput, setTimeInput] = useState(scheduledTime || "11:00 AM");

  const handleSave = () => {
    if (!dateInput.trim()) return;
    onSaveSchedule(dateInput, timeInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (isScheduled) {
      setDateInput(scheduledDate);
      setTimeInput(scheduledTime);
      setIsEditing(false);
    } else {
      setDateInput("");
    }
  };

  const handleReschedule = () => {
    setIsEditing(true);
  };

  return (
    <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-[#121826]/40 transition-colors text-left cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <CalendarBlank size={18} className="text-[#8E99AB]" />
          <span className="text-sm font-bold text-white tracking-tight">
            Schedule Demo
          </span>
        </div>
        {isOpen ? (
          <CaretUp size={16} className="text-[#8E99AB]" />
        ) : (
          <CaretDown size={16} className="text-[#8E99AB]" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4">
          {isScheduled && !isEditing ? (
            <div className="space-y-3">
              <div className="bg-[#091F18] border border-[#144A39] rounded-xl p-4 flex items-start gap-3">
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="text-[#10B981] shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#10B981]">
                    Demo Scheduled
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {scheduledDate || dateInput} • {scheduledTime || timeInput}
                  </span>
                  <span className="text-xs text-[#8E99AB]">Google Meet</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleReschedule}
                  className="flex-1 h-10 px-4 rounded-xl bg-[#141B28] border border-[#232F46] hover:bg-[#1A2436] hover:border-[#384A6E] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CalendarBlank size={15} />
                  <span>Reschedule</span>
                </button>

                <button
                  type="button"
                  onClick={onRemoveSchedule}
                  className="h-10 px-4 rounded-xl bg-[#261014] border border-[#48181D] hover:bg-[#38151B] text-[#EF4444] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash size={15} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#8E99AB] block mb-1.5">
                  Demo Date
                </label>
                <div className="relative">
                  <CalendarBlank
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
                  />
                  <input
                    type="text"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    placeholder="e.g. 16 Oct 2026"
                    className="w-full h-10 bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-10 pr-9 text-xs sm:text-sm font-medium text-white placeholder:text-[#64748B] focus:outline-none transition-colors"
                  />
                  {dateInput && (
                    <button
                      type="button"
                      onClick={() => setDateInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99AB] hover:text-white p-0.5 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#8E99AB] block mb-1.5">
                  Demo Time
                </label>
                <div className="relative">
                  <Clock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
                  />
                  <select
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    className="w-full h-10 appearance-none bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-10 pr-9 text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer transition-colors"
                  >
                    {AVAILABLE_TIMES.map((time) => (
                      <option
                        key={time}
                        value={time}
                        className="bg-[#0E131E] text-white"
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={14}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl bg-[#141B28] border border-[#232F46] hover:bg-[#1A2436] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-[#D4FF32] hover:bg-[#C0EA29] text-black text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
