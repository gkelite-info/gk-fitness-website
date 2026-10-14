"use client";

import { useState } from "react";
import {
  PencilSimple,
  CaretDown,
  CaretUp,
  CheckCircle,
  Buildings,
} from "@phosphor-icons/react";
import { DemoRequestItem } from "@/app/actions/demoRequests";

interface DemoRequestStatusCardProps {
  currentStatus: DemoRequestItem["status"];
  isScheduled: boolean;
  statusSaved: boolean;
  savedTimestamp: string;
  onSaveStatus: (status: DemoRequestItem["status"]) => void;
  onConvertToGym: () => void;
}

const STATUS_OPTIONS: { label: DemoRequestItem["status"]; color: string }[] = [
  { label: "New", color: "bg-[#10B981]" },
  { label: "Contacted", color: "bg-[#A855F7]" },
  { label: "Demo Scheduled", color: "bg-[#3B82F6]" },
  { label: "Converted", color: "bg-[#D4FF32]" },
  { label: "Not Interested", color: "bg-[#EF4444]" },
];

export function DemoRequestStatusCard({
  currentStatus,
  isScheduled,
  statusSaved,
  savedTimestamp,
  onSaveStatus,
  onConvertToGym,
}: DemoRequestStatusCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedStatus, setSelectedStatus] =
    useState<DemoRequestItem["status"]>(currentStatus);

  const handleStatusChange = (status: DemoRequestItem["status"]) => {
    setSelectedStatus(status);
  };

  const handleSave = () => {
    onSaveStatus(selectedStatus);
  };

  const activeColor =
    STATUS_OPTIONS.find((s) => s.label === selectedStatus)?.color ||
    "bg-[#3B82F6]";

  return (
    <div className="space-y-5">
      <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-[#121826]/40 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <PencilSimple size={18} className="text-[#8E99AB]" />
            <span className="text-sm font-bold text-white tracking-tight">
              Update Status
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
            <div>
              <label className="text-xs font-medium text-[#8E99AB] block mb-1.5">
                Status
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${activeColor} pointer-events-none`}
                />
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    handleStatusChange(
                      e.target.value as DemoRequestItem["status"]
                    )
                  }
                  className="w-full h-10 appearance-none bg-[#070A10] border border-[#1E283A] hover:border-[#2D3C56] focus:border-[#D4FF32] rounded-xl pl-8 pr-9 text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer transition-colors"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option
                      key={opt.label}
                      value={opt.label}
                      className="bg-[#0E131E] text-white"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={14}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
                />
              </div>
            </div>

            {statusSaved ? (
              <div className="bg-[#091F18] border border-[#144A39] rounded-xl p-3.5 flex items-center gap-3">
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="text-[#10B981] shrink-0"
                />
                <div>
                  <p className="text-xs font-semibold text-[#10B981]">
                    Status updated successfully
                  </p>
                  <p className="text-[11px] text-[#8E99AB]">
                    {savedTimestamp || "16 Oct 2026, 10:25 AM"}
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="w-full h-10 rounded-xl bg-[#D4FF32] hover:bg-[#C0EA29] text-black text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Save Status
              </button>
            )}
          </div>
        )}
      </div>

      <div>
        {isScheduled ? (
          <button
            type="button"
            onClick={onConvertToGym}
            className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C0EA29] text-black flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg shadow-[#D4FF32]/10"
          >
            <Buildings size={18} weight="bold" />
            <span>Convert to Gym</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onConvertToGym}
            className="w-full h-12 rounded-xl bg-transparent border border-[#D4FF32] text-[#D4FF32] hover:bg-[#D4FF32]/10 flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            <Buildings size={18} />
            <span>Convert to Gym</span>
          </button>
        )}
      </div>
    </div>
  );
}
