"use client";

import { WebsiteVideo } from "@/lib/types/websiteVideos";
import { WebsiteVideoRow } from "./WebsiteVideoRow";
import { VideoCamera, Check } from "@phosphor-icons/react";

import { WebsiteVideosTableShimmer } from "./WebsiteVideosTableShimmer";

interface WebsiteVideosTableProps {
  videos: WebsiteVideo[];
  loading?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (video: WebsiteVideo) => void;
  onToggleSelectAll?: (selectAll: boolean) => void;
  onPreview: (video: WebsiteVideo) => void;
  onReplace: (video: WebsiteVideo) => void;
  onToggleStatus: (video: WebsiteVideo) => void;
  onDelete: (video: WebsiteVideo) => void;
}

export function WebsiteVideosTable({
  videos,
  loading,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  onPreview,
  onReplace,
  onToggleStatus,
  onDelete,
}: WebsiteVideosTableProps) {
  const allSelected = videos.length > 0 && selectedIds.length === videos.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < videos.length;

  if (loading) {
    return <WebsiteVideosTableShimmer />;
  }

  return (
    <div className="w-full bg-[#0B0E14] border border-[#1B2232] rounded-2xl overflow-hidden shadow-xl">
      <div className="w-full overflow-x-auto scrollbar-themed">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B2232] bg-[#0E121A]/80 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <th scope="col" className="py-4 px-3 w-10 text-center">
                <button
                  type="button"
                  onClick={() => onToggleSelectAll?.(!allSelected)}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                    allSelected || isIndeterminate
                      ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
                      : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
                  }`}
                  aria-label="Select all videos"
                >
                  <Check size={13} weight="bold" />
                </button>
              </th>
              <th scope="col" className="py-4 px-3 w-12">#</th>
              <th scope="col" className="py-4 px-4 w-48">VIDEO</th>
              <th scope="col" className="py-4 px-4 w-44">UPLOADED ON</th>
              <th scope="col" className="py-4 px-4 w-36">STATUS</th>
              <th scope="col" className="py-4 px-4 text-right pr-6">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-[#8E99AB]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <VideoCamera size={36} className="text-[#333E54]" />
                    <span className="text-sm font-medium text-white">No videos found</span>
                    <span className="text-xs text-[#64748B]">Try adjusting your search query or status filter</span>
                  </div>
                </td>
              </tr>
            ) : (
              videos.map((video, idx) => (
                <WebsiteVideoRow
                  key={video.id}
                  video={video}
                  index={idx + 1}
                  selected={selectedIds.includes(video.id)}
                  onToggleSelect={onToggleSelect}
                  onPreview={onPreview}
                  onReplace={onReplace}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
