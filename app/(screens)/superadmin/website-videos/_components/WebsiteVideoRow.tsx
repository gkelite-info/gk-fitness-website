"use client";

import { Play, ArrowsClockwise, Eye, EyeSlash, Trash, Check } from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface WebsiteVideoRowProps {
  video: WebsiteVideo;
  index: number;
  selected?: boolean;
  onToggleSelect?: (video: WebsiteVideo) => void;
  onPreview: (video: WebsiteVideo) => void;
  onReplace: (video: WebsiteVideo) => void;
  onToggleStatus: (video: WebsiteVideo) => void;
  onDelete: (video: WebsiteVideo) => void;
}

function formatUploadedDate(isoDate: string): { dateStr: string; timeStr: string } {
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) {
      return { dateStr: "09 Oct 2026", timeStr: "10:24 AM" };
    }
    const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = d.toLocaleDateString("en-GB", { month: "short" });
    const year = d.toLocaleDateString("en-GB", { year: "numeric" });
    const dateStr = `${day} ${month} ${year}`;
    const timeStr = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { dateStr, timeStr };
  } catch {
    return { dateStr: "09 Oct 2026", timeStr: "10:24 AM" };
  }
}

export function WebsiteVideoRow({
  video,
  index,
  selected = false,
  onToggleSelect,
  onPreview,
  onReplace,
  onToggleStatus,
  onDelete,
}: WebsiteVideoRowProps) {
  const { dateStr, timeStr } = formatUploadedDate(video.uploadedAt);
  const isVisible = video.status === "visible";

  return (
    <tr className={`border-b border-[#1A202E]/60 transition-colors ${selected ? "bg-[#D4FF32]/5" : "hover:bg-[#121622]/40"}`}>
      <td className="py-5 px-3 w-10 text-center">
        <button
          type="button"
          onClick={() => onToggleSelect?.(video)}
          className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
            selected
              ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
              : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
          }`}
          aria-label={`Select video ${index}`}
        >
          <Check size={13} weight="bold" />
        </button>
      </td>
      <td className="py-5 px-3 text-sm font-medium text-[#CBD5E1] whitespace-nowrap">
        {index}
      </td>

      <td className="py-5 px-4">
        <button
          type="button"
          onClick={() => onPreview(video)}
          className="group relative cursor-pointer block w-[140px] sm:w-[150px] h-[78px] rounded-xl overflow-hidden bg-gradient-to-br from-[#121F24] via-[#0E1520] to-[#171A21] border border-[#232B3C] shadow-sm hover:border-[#D4FF32]/50 transition-all text-left"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-black/60 pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-black/90 group-hover:border-[#D4FF32] transition-transform">
              <Play size={14} weight="fill" className="text-white ml-0.5 group-hover:text-[#D4FF32]" />
            </div>
          </div>

          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-mono font-medium text-white">
            {video.duration || "00:30"}
          </div>
        </button>
      </td>

      <td className="py-5 px-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-tight">
            {dateStr}
          </span>
          <span className="text-xs font-normal text-[#94A3B8] mt-0.5">
            {timeStr}
          </span>
        </div>
      </td>

      <td className="py-5 px-4 whitespace-nowrap">
        {isVisible ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Visible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            Hidden
          </span>
        )}
      </td>

      <td className="py-5 px-4 text-right whitespace-nowrap">
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => onReplace(video)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-[#CBD5E1] hover:text-white text-xs font-medium transition-colors"
          >
            <ArrowsClockwise size={14} weight="bold" />
            <span>Replace</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleStatus(video)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-[#CBD5E1] hover:text-white text-xs font-medium transition-colors"
          >
            {isVisible ? (
              <>
                <EyeSlash size={14} weight="bold" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye size={14} weight="bold" />
                <span>Show</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onDelete(video)}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141824] hover:bg-[#2C161D] border border-[#3E1C24] text-[#F87171] hover:text-[#EF4444] text-xs font-medium transition-colors"
          >
            <Trash size={14} weight="bold" />
            <span>Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}
