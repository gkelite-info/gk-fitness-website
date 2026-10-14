"use client";

import { Plus } from "@phosphor-icons/react";

interface TrainersHeaderProps {
  title: string;
  subtitle: string;
  showAddButton?: boolean;
  onAddTrainer?: () => void;
}

export default function TrainersHeader({
  title,
  subtitle,
  showAddButton = false,
  onAddTrainer,
}: TrainersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          {subtitle}
        </p>
      </div>

      {showAddButton && (
        <button
          type="button"
          onClick={onAddTrainer}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF32] text-black font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_12px_rgba(212,255,50,0.25)] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={18} weight="bold" />
          <span>Add Global Trainer</span>
        </button>
      )}
    </div>
  );
}
