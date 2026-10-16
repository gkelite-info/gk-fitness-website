"use client";

import { VideoStatus } from "@/lib/types/websiteVideos";

interface WebsiteVideosBatchBarProps {
  selectedCount: number;
  isProcessing: boolean;
  onBatchStatus: (status: VideoStatus) => void;
  onBatchDelete: () => void;
  onDeselectAll: () => void;
}

export function WebsiteVideosBatchBar({
  selectedCount,
  isProcessing,
  onBatchStatus,
  onBatchDelete,
  onDeselectAll,
}: WebsiteVideosBatchBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="w-full bg-[#121622] border border-[#232B3C] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 text-[#D4FF32] font-semibold">
          {selectedCount} video{selectedCount > 1 ? "s" : ""} selected
        </span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => onBatchStatus("visible")}
          className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-xs font-medium text-[#34D399] transition-colors disabled:opacity-50"
        >
          Make Visible
        </button>
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => onBatchStatus("hidden")}
          className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-xs font-medium text-[#CBD5E1] transition-colors disabled:opacity-50"
        >
          Hide
        </button>
        <button
          type="button"
          disabled={isProcessing}
          onClick={onBatchDelete}
          className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#2C161D] border border-[#3E1C24] text-xs font-medium text-[#F87171] transition-colors disabled:opacity-50"
        >
          Delete Selected
        </button>
        <button
          type="button"
          onClick={onDeselectAll}
          className="cursor-pointer px-2.5 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-white transition-colors"
        >
          Deselect
        </button>
      </div>
    </div>
  );
}
