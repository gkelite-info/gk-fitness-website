"use client";

import { Warning, Trash, X } from "@phosphor-icons/react";
import { WorkoutVideoItem } from "@/lib/types/workouts";

interface WorkoutDeleteModalProps {
  exercise: WorkoutVideoItem | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function WorkoutDeleteModal({
  exercise,
  isDeleting,
  onConfirm,
  onCancel,
}: WorkoutDeleteModalProps) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#0E1015] border border-[#232631] rounded-2xl p-6 shadow-2xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <Warning size={26} weight="fill" className="text-red-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Delete Exercise</h3>
            <p className="text-xs text-[#94A3B8]">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-[#CBD5E1] bg-[#141720] border border-[#232733] rounded-xl p-3">
          Are you sure you want to remove{" "}
          <strong className="text-white">"{exercise.exerciseName || "this exercise"}"</strong> from
          the GK-Fitness library?
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-[#181A20] border border-[#262A36] text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <Trash size={16} weight="bold" />
            <span>{isDeleting ? "Deleting..." : "Delete Exercise"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
