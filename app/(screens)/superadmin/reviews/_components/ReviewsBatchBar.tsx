"use client";

import { CheckCircle, Trash, X } from "@phosphor-icons/react";

interface ReviewsBatchBarProps {
  selectedCount: number;
  onApproveSelected: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
}

export function ReviewsBatchBar({
  selectedCount,
  onApproveSelected,
  onDeleteSelected,
  onClearSelection,
}: ReviewsBatchBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0E121A] border border-[#2B354C] rounded-2xl px-5 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center gap-4 animate-slideUp">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#D4FF32] text-black text-xs font-black flex items-center justify-center">
          {selectedCount}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
          {selectedCount === 1 ? "review" : "reviews"} selected
        </span>
      </div>

      <div className="h-5 w-px bg-[#2B354C]" />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onApproveSelected}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#34D399] hover:bg-[#34D399]/90 text-black text-xs font-bold transition-all shadow-[0_0_12px_rgba(52,211,153,0.3)] cursor-pointer"
        >
          <CheckCircle size={14} weight="bold" />
          <span>Approve All</span>
        </button>

        <button
          type="button"
          onClick={onDeleteSelected}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F87171]/20 hover:bg-[#F87171]/30 text-[#F87171] border border-[#F87171]/30 text-xs font-bold transition-all cursor-pointer"
        >
          <Trash size={14} />
          <span>Delete All</span>
        </button>

        <button
          type="button"
          onClick={onClearSelection}
          className="p-1.5 rounded-lg text-[#8E99AB] hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
          title="Clear selection"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
