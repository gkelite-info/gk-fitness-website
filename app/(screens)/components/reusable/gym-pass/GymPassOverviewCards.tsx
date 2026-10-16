"use client";

import { Ticket, PencilSimple, Trash } from "@phosphor-icons/react";
import { GymPassItem } from "./GymPassTypes";

interface GymPassOverviewCardsProps {
  passes?: GymPassItem[];
  onEdit?: (pass: GymPassItem) => void;
  onDelete?: (pass: GymPassItem) => void;
}

const defaultPasses: GymPassItem[] = [
  {
    id: "day-pass",
    name: "Day Pass",
    type: "day",
    price: 799,
    soldCount: 845,
    status: "active",
    color: "emerald",
    durationDays: 1,
  },
  {
    id: "monthly-pass",
    name: "Monthly Pass",
    type: "monthly",
    price: 4999,
    soldCount: 1470,
    status: "active",
    color: "purple",
    durationDays: 30,
  },
];

export default function GymPassOverviewCards({
  passes = defaultPasses,
  onEdit,
  onDelete,
}: GymPassOverviewCardsProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
      {passes.map((pass) => {
        const isEmerald = pass.color === "emerald";

        return (
          <div
            key={pass.id}
            className="w-full bg-[#13151B] border border-[#232631] hover:border-[#383D4E] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isEmerald
                    ? "bg-[#10B981] shadow-[0_0_16px_rgba(16,185,129,0.3)]"
                    : "bg-[#8B5CF6] shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                }`}
              >
                <Ticket size={20} weight="fill" className="text-white" />
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate">
                  {pass.name}
                </h3>
                <div className="mt-0.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold whitespace-nowrap ${
                      pass.status === "active"
                        ? "bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] text-[#22C55E]"
                        : "bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.25)] text-[#EF4444]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        pass.status === "active" ? "bg-[#22C55E] animate-pulse" : "bg-[#EF4444]"
                      } shrink-0`}
                    />
                    {pass.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#1E222D] sm:border-none shrink-0">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-none whitespace-nowrap">
                  ₹{pass.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium mt-1 whitespace-nowrap">
                  {pass.soldCount.toLocaleString("en-IN")} sold
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:pl-3 sm:border-l sm:border-[#232631]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(pass);
                  }}
                  aria-label={`Edit ${pass.name}`}
                  className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#181A22] hover:bg-[#262B3A] border border-[#242836] text-[#94A3B8] hover:text-[#D4FF32] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
                >
                  <PencilSimple size={14} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(pass);
                  }}
                  aria-label={`Delete ${pass.name}`}
                  className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-lg bg-[#181A22] hover:bg-[#2C1920] border border-[#242836] text-[#94A3B8] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm shrink-0"
                >
                  <Trash size={14} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
