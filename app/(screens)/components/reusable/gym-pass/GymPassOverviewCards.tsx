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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      {passes.map((pass) => {
        const isEmerald = pass.color === "emerald";

        return (
          <div
            key={pass.id}
            className="w-full bg-[#13151B] border border-[#232631] hover:border-[#383D4E] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-sm group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isEmerald
                    ? "bg-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.35)]"
                    : "bg-[#8B5CF6] shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                }`}
              >
                <Ticket size={24} weight="fill" className="text-white" />
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug truncate">
                  {pass.name}
                </h3>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
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

            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1E222D] sm:border-none shrink-0 gap-1.5">
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                  ₹{pass.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs sm:text-sm text-[#94A3B8] font-medium mt-1">
                  {pass.soldCount.toLocaleString("en-IN")} sold
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1 sm:mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(pass);
                  }}
                  aria-label={`Edit ${pass.name}`}
                  className="w-8.5 h-8.5 rounded-lg bg-[#181A22] hover:bg-[#262B3A] border border-[#242836] text-[#94A3B8] hover:text-[#D4FF32] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <PencilSimple size={15} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(pass);
                  }}
                  aria-label={`Delete ${pass.name}`}
                  className="w-8.5 h-8.5 rounded-lg bg-[#181A22] hover:bg-[#2C1920] border border-[#242836] text-[#94A3B8] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <Trash size={15} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
