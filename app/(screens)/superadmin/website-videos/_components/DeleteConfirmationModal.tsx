"use client";

import { Trash, X } from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface DeleteConfirmationModalProps {
  video: WebsiteVideo | null;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmationModal({
  video,
  loading,
  onConfirm,
  onClose,
}: DeleteConfirmationModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0D111A] border border-[#262F44] rounded-2xl p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1A202E]"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <Trash size={20} weight="bold" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white m-0">
              Delete Website Video
            </h3>
            <p className="text-xs text-[#94A3B8] m-0 mt-0.5">
              This video will be permanently removed.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6 leading-relaxed">
          Are you sure you want to delete this video ({video.duration})? This will remove it from display on the GK-Gym website.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="cursor-pointer px-4 py-2 rounded-xl bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-xs font-semibold text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            <Trash size={14} weight="bold" />
            <span>{loading ? "Deleting..." : "Delete Video"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
