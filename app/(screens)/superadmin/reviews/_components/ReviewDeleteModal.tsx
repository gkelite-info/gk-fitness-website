"use client";

import { Warning, Trash, X } from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";

interface ReviewDeleteModalProps {
  review: AdminReviewItem | null;
  onClose: () => void;
  onConfirm: (review: AdminReviewItem) => void;
}

export function ReviewDeleteModal({
  review,
  onClose,
  onConfirm,
}: ReviewDeleteModalProps) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#0E121A] border border-[#222938] rounded-2xl shadow-2xl p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#F87171]/15 text-[#F87171] flex items-center justify-center shrink-0">
            <Warning size={24} weight="bold" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#8E99AB] hover:text-white hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white m-0">Delete Review</h3>
          <p className="text-xs sm:text-sm text-[#8E99AB] mt-2 leading-relaxed">
            Are you sure you want to remove the review from{" "}
            <span className="text-white font-semibold">{review.fullname}</span>? It
            will be moved to the Deleted tab and hidden from the public website.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#8E99AB] hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(review)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F87171] hover:bg-[#F87171]/90 text-white text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(248,113,113,0.3)]"
          >
            <Trash size={15} weight="bold" />
            <span>Confirm Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
