"use client";

import { X, PlusCircle, FloppyDisk, Trash, Power } from "@phosphor-icons/react";

interface CreateGymPassFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  onDeactivate?: () => void;
  isEdit?: boolean;
  status?: "active" | "inactive";
}

export default function CreateGymPassFooter({
  onCancel,
  onSubmit,
  onDeactivate,
  isEdit = false,
  status = "active",
}: CreateGymPassFooterProps) {
  if (isEdit) {
    return (
      <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onDeactivate}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1D1418] hover:bg-[#2A161E] border border-[#3E1C27] text-xs sm:text-sm font-semibold text-[#F87171] hover:text-[#EF4444] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <Trash size={16} weight="bold" />
          <span>{status === "active" ? "Deactivate Pass" : "Activate Pass"}</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4FF32] hover:bg-[#c3ec29] active:scale-[0.98] text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,50,0.25)] cursor-pointer"
        >
          <FloppyDisk size={18} weight="bold" />
          <span>Save Changes</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3">
      <button
        type="button"
        onClick={onCancel}
        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#161822] hover:bg-[#1E2230] border border-[#242836] text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <X size={15} weight="bold" />
        <span>Cancel</span>
      </button>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4FF32] hover:bg-[#c3ec29] active:scale-[0.98] text-black text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,50,0.25)] cursor-pointer"
      >
        <PlusCircle size={18} weight="fill" />
        <span>Create Pass</span>
      </button>
    </div>
  );
}
