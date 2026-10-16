"use client";

import { EyeSlash, X } from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface HideConfirmationModalProps {
  video: WebsiteVideo | null;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function HideConfirmationModal({
  video,
  loading,
  onConfirm,
  onClose,
}: HideConfirmationModalProps) {
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
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <EyeSlash size={20} weight="bold" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white m-0">
              Hide Website Video
            </h3>
            <p className="text-xs text-[#94A3B8] m-0 mt-0.5">
              This video will be hidden from website visitors.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#CBD5E1] mb-6 leading-relaxed">
          Are you sure you want to hide this video ({video.duration})? It will no longer appear in the video showcase on the GK-Gym website until you show it again.
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
            className="cursor-pointer px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(217,119,6,0.3)]"
          >
            <EyeSlash size={14} weight="bold" />
            <span>{loading ? "Hiding..." : "Hide Video"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
