import React from "react";
import { Copy } from "@phosphor-icons/react";

export function ExpenseInfoRow({ label, value, isBold, isCategory, isPill, hasCopy }: any) {
  return (
    <div className="flex flex-row justify-between items-center py-3 border-b border-[#1E293B]/50 last:border-none w-full">
      <span className="font-sans font-medium text-xs text-[#64748B] shrink-0">{label}</span>
      <div className="flex items-center gap-2 text-right">
        {isCategory ? (
          <div className="inline-flex items-center px-2 py-0.5 rounded border border-[#522D1B] bg-[#332219]">
            <span className="font-sans font-medium text-[11px] text-[#EA580C] capitalize">{value}</span>
          </div>
        ) : isPill ? (
          <div className="inline-flex items-center px-2 py-0.5 rounded border border-[#273648] bg-[#1A232F]">
            <span className="font-sans font-medium text-[11px] text-[#D1D5DB] capitalize">{value}</span>
          </div>
        ) : (
          <span className={`font-sans text-xs ${isBold ? "font-bold text-white" : "font-medium text-[#E2E8F0]"}`}>
            {value}
          </span>
        )}
        {hasCopy && (
          <Copy size={14} className="text-[#64748B] cursor-pointer hover:text-white transition-colors" />
        )}
      </div>
    </div>
  );
}
