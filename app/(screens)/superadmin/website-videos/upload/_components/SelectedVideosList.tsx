"use client";

import { Check, Plus, Trash, Play } from "@phosphor-icons/react";
import { SelectedVideoItem, formatFileSize } from "./videoUploadUtils";

interface SelectedVideosListProps {
  videos: SelectedVideoItem[];
  onToggleVideo: (id: string) => void;
  onToggleAll: (selectAll: boolean) => void;
  onRemoveVideo: (id: string) => void;
  onClearAll: () => void;
  onAddMore: () => void;
}

export function SelectedVideosList({
  videos,
  onToggleVideo,
  onToggleAll,
  onRemoveVideo,
  onClearAll,
  onAddMore,
}: SelectedVideosListProps) {
  const selectedCount = videos.filter((v) => v.selected).length;
  const allSelected = videos.length > 0 && selectedCount === videos.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < videos.length;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-[#0E121A] border border-[#1E2638] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleAll(!allSelected)}
            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
              allSelected || isIndeterminate
                ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_10px_rgba(212,255,50,0.35)]"
                : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
            }`}
            aria-label="Toggle all videos"
          >
            <Check size={14} weight="bold" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              Select All Videos
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A2234] border border-[#2B3752] text-[#D4FF32] font-mono font-medium">
              {selectedCount} of {videos.length} selected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={onAddMore}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] hover:border-[#D4FF32]/50 text-xs font-semibold text-white transition-all active:scale-95"
          >
            <Plus size={14} weight="bold" className="text-[#D4FF32]" />
            <span>Add More Videos</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141824] hover:bg-[#2C161D] border border-[#3E1C24] text-xs font-medium text-[#F87171] transition-colors"
          >
            <Trash size={14} weight="bold" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {videos.map((item, idx) => {
          const isChecked = item.selected;

          return (
            <div
              key={item.id}
              className={`w-full rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 border ${
                isChecked
                  ? "bg-[#090C12] border-[#2E3C56] shadow-md"
                  : "bg-[#080B10]/60 border-[#1B2232] opacity-60"
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onToggleVideo(item.id)}
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                    isChecked
                      ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
                      : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
                  }`}
                  aria-label={`Toggle selection for ${item.file.name}`}
                >
                  <Check size={14} weight="bold" />
                </button>

                <div className="relative w-28 sm:w-32 h-18 sm:h-20 bg-black rounded-lg overflow-hidden border border-[#232B3C] shrink-0">
                  <video
                    src={item.previewUrl}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/70 border border-white/20 flex items-center justify-center">
                      <Play size={12} weight="fill" className="text-[#D4FF32] ml-0.5" />
                    </div>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono text-white">
                      {item.duration}
                    </div>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-white truncate max-w-[220px] sm:max-w-xs md:max-w-md">
                    {item.file.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8] mt-1">
                    <span>#{idx + 1}</span>
                    <span>•</span>
                    <span>{formatFileSize(item.file.size)}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <span className="text-[11px] mt-1">
                    {isChecked ? (
                      <span className="text-[#34D399] font-medium">Ready to upload</span>
                    ) : (
                      <span className="text-[#64748B]">Skipped</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => onRemoveVideo(item.id)}
                  className="cursor-pointer p-2 rounded-lg bg-[#141824] hover:bg-[#2C161D] border border-[#3E1C24] text-[#F87171] hover:text-[#EF4444] text-xs transition-colors"
                  aria-label="Remove video"
                >
                  <Trash size={16} weight="bold" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
