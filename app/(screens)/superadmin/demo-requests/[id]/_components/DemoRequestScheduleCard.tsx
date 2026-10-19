import { useState, useEffect } from "react";
import {
  CalendarBlank,
  Clock,
  CaretDown,
  CaretUp,
  X,
  CheckCircle,
  Trash,
  CircleNotch,
} from "@phosphor-icons/react";
import { DemoBookingHistoryItem } from "@/app/actions/demoRequests";
import CalendarModal from "@/app/(screens)/components/reusable/CalendarModal";
import { DemoRequestScheduleHistory } from "./DemoRequestScheduleHistory";

interface DemoRequestScheduleCardProps {
  isScheduled: boolean;
  scheduledDate: string;
  scheduledTime: string;
  history?: DemoBookingHistoryItem[];
  onSaveSchedule: (date: string, time: string) => Promise<void> | void;
  onRemoveSchedule: () => Promise<void> | void;
}

const QUICK_TIMES = ["10:00 AM", "11:30 AM", "02:30 PM", "03:30 PM", "05:00 PM"];

function splitTime(raw?: string): [string, "AM" | "PM"] {
  if (!raw) return ["11:00", "AM"];
  const isPm = /PM/i.test(raw);
  const clean = raw.replace(/\s*(AM|PM)/gi, "").trim();
  return [clean || "11:00", isPm ? "PM" : "AM"];
}

export function DemoRequestScheduleCard({
  isScheduled,
  scheduledDate,
  scheduledTime,
  history = [],
  onSaveSchedule,
  onRemoveSchedule,
}: DemoRequestScheduleCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(!isScheduled);
  const [dateInput, setDateInput] = useState(scheduledDate || "");
  const [initT, initM] = splitTime(scheduledTime);
  const [timeValue, setTimeValue] = useState(initT);
  const [meridiem, setMeridiem] = useState<"AM" | "PM">(initM);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    setDateInput(scheduledDate || "");
    const [t, m] = splitTime(scheduledTime);
    setTimeValue(t);
    setMeridiem(m);
    setIsEditing(!isScheduled);
  }, [scheduledDate, scheduledTime, isScheduled]);

  const handleTimeChange = (val: string) => {
    if (/am/i.test(val)) setMeridiem("AM");
    if (/pm/i.test(val)) setMeridiem("PM");
    setTimeValue(val.replace(/\s*(AM|PM)/gi, ""));
  };

  const handleQuickTime = (chip: string) => {
    const [t, m] = splitTime(chip);
    setTimeValue(t);
    setMeridiem(m);
  };

  const handleSave = async () => {
    if (!dateInput.trim()) {
      setShowCalendarModal(true);
      return;
    }
    setSaving(true);
    try {
      const formatted = timeValue.trim() ? `${timeValue.trim()} ${meridiem}` : "";
      await onSaveSchedule(dateInput, formatted);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (isScheduled) {
      setDateInput(scheduledDate);
      const [t, m] = splitTime(scheduledTime);
      setTimeValue(t);
      setMeridiem(m);
      setIsEditing(false);
    } else {
      setDateInput("");
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await onRemoveSchedule();
    } finally {
      setRemoving(false);
    }
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
          <span className="text-sm font-bold text-white tracking-tight">Schedule Demo</span>
        </div>
        {isOpen ? <CaretUp size={16} className="text-[#8E99AB]" /> : <CaretDown size={16} className="text-[#8E99AB]" />}
      </button>

      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4">
          {isScheduled && !isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 h-10 px-4 rounded-xl bg-[#141B28] border border-[#232F46] hover:bg-[#1A2436] hover:border-[#384A6E] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CalendarBlank size={15} />
                  <span>Reschedule</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={removing}
                  className="h-10 px-4 rounded-xl bg-[#261014] border border-[#48181D] hover:bg-[#38151B] text-[#EF4444] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {removing ? <CircleNotch size={15} className="animate-spin" /> : <Trash size={15} />}
                  <span>{removing ? "Removing..." : "Remove"}</span>
                </button>
              </div>

              <div className="bg-[#091F18] border border-[#144A39] rounded-xl p-4 flex items-start gap-3">
                <CheckCircle size={22} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#10B981]">Demo Scheduled</span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {scheduledDate || dateInput} • {scheduledTime || `${timeValue} ${meridiem}`}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#8E99AB] block mb-1.5">Demo Date</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendarModal(true)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] hover:text-[#D4FF32] transition-colors cursor-pointer"
                    title="Open Calendar"
                  >
                    <CalendarBlank size={16} />
                  </button>
                  <input
                    type="text"
                    value={dateInput}
                    onClick={() => setShowCalendarModal(true)}
                    onChange={(e) => setDateInput(e.target.value)}
                    placeholder="Select date (e.g. 16 Oct 2026)"
                    className="w-full h-10 bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-10 pr-20 text-xs sm:text-sm font-medium text-white placeholder:text-[#64748B] focus:outline-none transition-colors cursor-pointer"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {dateInput && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setDateInput(""); }}
                        className="text-[#8E99AB] hover:text-white p-1 cursor-pointer"
                      >
                        <X size={13} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowCalendarModal(true)}
                      className="px-2 py-1 rounded-md bg-[#141B28] hover:bg-[#1E283A] text-[11px] font-semibold text-[#D4FF32] border border-[#232F46] transition-colors cursor-pointer"
                    >
                      Pick
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#8E99AB]">Demo Time</label>
                  <span className="text-[10px] text-[#64748B]">Enter time and select AM/PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none" />
                    <input
                      type="text"
                      value={timeValue}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      placeholder="e.g. 12:00, 3:30, 2:34"
                      className="w-full h-10 bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-10 pr-8 text-xs sm:text-sm font-medium text-white placeholder:text-[#64748B] focus:outline-none transition-colors"
                    />
                    {timeValue && (
                      <button
                        type="button"
                        onClick={() => setTimeValue("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E99AB] hover:text-white p-0.5 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="relative w-24 shrink-0">
                    <select
                      value={meridiem}
                      onChange={(e) => setMeridiem(e.target.value as "AM" | "PM")}
                      className="w-full h-10 appearance-none bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-3.5 pr-8 text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer transition-colors"
                    >
                      <option value="AM" className="bg-[#0E131E] text-white">AM</option>
                      <option value="PM" className="bg-[#0E131E] text-white">PM</option>
                    </select>
                    <CaretDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {QUICK_TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleQuickTime(t)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                        `${timeValue} ${meridiem}`.toUpperCase() === t.toUpperCase()
                          ? "bg-[#D4FF32] text-black border-[#D4FF32]"
                          : "bg-[#070A10] text-[#8E99AB] border-[#1C2638] hover:text-white hover:border-[#2D3C56]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-[#141B28] border border-[#232F46] hover:bg-[#1A2436] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-[#D4FF32] hover:bg-[#C0EA29] text-black text-xs font-bold transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving && <CircleNotch size={14} className="animate-spin" />}
                  <span>{saving ? "Saving..." : "Save Schedule"}</span>
                </button>
              </div>

              <CalendarModal
                isOpen={showCalendarModal}
                onClose={() => setShowCalendarModal(false)}
                selectedDate={dateInput}
                onSelectDate={(formatted) => setDateInput(formatted)}
              />
            </div>
          )}

          <DemoRequestScheduleHistory history={history} />
        </div>
      )}
    </div>
  );
}
