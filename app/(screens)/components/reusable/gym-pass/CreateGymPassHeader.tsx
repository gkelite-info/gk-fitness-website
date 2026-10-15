"use client";

import { ArrowLeft } from "@phosphor-icons/react";

interface CreateGymPassHeaderProps {
  onBack: () => void;
  isEdit?: boolean;
}

export default function CreateGymPassHeader({
  onBack,
  isEdit = false,
}: CreateGymPassHeaderProps) {
  return (
    <div className="flex items-center gap-3.5 pb-2">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to Gym Pass Dashboard"
        className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
      >
        <ArrowLeft size={16} weight="bold" />
      </button>

      <div className="flex flex-col min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
          {isEdit ? "Edit Gym Pass" : "Create Gym Pass"}
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
          Configure the pass details and settings for your gym members.
        </p>
      </div>
    </div>
  );
}
