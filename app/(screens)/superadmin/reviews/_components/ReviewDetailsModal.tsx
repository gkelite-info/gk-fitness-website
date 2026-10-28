"use client";

import {
  X,
  Star,
  CheckCircle,
  EyeSlash,
  ClockCountdown,
  SealCheck,
} from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";

interface ReviewDetailsModalProps {
  review: AdminReviewItem | null;
  onClose: () => void;
  onApprove: (review: AdminReviewItem) => void;
  onMarkPending: (review: AdminReviewItem) => void;
  onDelete: (review: AdminReviewItem) => void;
}

export function ReviewDetailsModal({
  review,
  onClose,
  onApprove,
  onMarkPending,
  onDelete,
}: ReviewDetailsModalProps) {
  if (!review) return null;

  const initials =
    review.fullname
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(review.createdAt));

  const isVisible = review.status === "visible" || (review.status as any) === "approved";
  const isPending = review.status === "pending";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0E121A] border border-[#222938] rounded-2xl shadow-2xl flex flex-col scrollbar-themed"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#222938] shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white m-0">Review Details</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isVisible
                  ? "bg-[#34D399]/20 text-[#34D399]"
                  : isPending
                  ? "bg-[#FBBF24]/20 text-[#FBBF24]"
                  : "bg-[#F87171]/20 text-[#F87171]"
              }`}
            >
              {isVisible ? "VISIBLE" : isPending ? "PENDING" : "HIDDEN"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E99AB] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#141824] border border-[#1E2536]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4FF32]/30 to-[#D4FF32]/10 border border-[#D4FF32]/40 text-[#D4FF32] font-black text-sm flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">{review.fullname}</span>
                {review.verifiedUser && (
                  <SealCheck size={16} weight="fill" className="text-[#D4FF32]" />
                )}
              </div>
              <span className="text-xs text-[#8E99AB]">{review.email}</span>
              {review.gymName && (
                <span className="text-[11px] text-[#64748B] mt-0.5">{review.gymName}</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  weight="fill"
                  className={i < review.ratings ? "text-[#D4FF32]" : "text-[#2D374D]"}
                />
              ))}
              <span className="text-sm font-bold text-white ml-2">
                {review.ratings} of 5 Stars
              </span>
            </div>
            <span className="text-xs text-[#8E99AB]">{formattedDate}</span>
          </div>

          <div className="p-4 rounded-xl bg-[#141824] border border-[#1E2536]">
            <span className="text-xs font-bold text-[#8E99AB] uppercase tracking-wider block mb-2">
              Review Content
            </span>
            <p className="text-sm text-[#CBD5E1] leading-relaxed m-0 whitespace-pre-wrap">
              {review.review || "No written review text provided."}
            </p>
          </div>

          {review.attachmentUrl && (
            <div className="p-4 rounded-xl bg-[#141824] border border-[#1E2536]">
              <span className="text-xs font-bold text-[#8E99AB] uppercase tracking-wider block mb-2">
                Attached Media
              </span>
              <img
                src={review.attachmentUrl}
                alt="Review Attachment"
                className="w-full max-h-72 object-cover rounded-lg border border-[#2D374D]"
              />
            </div>
          )}
        </div>

        <div className="p-5 border-t border-[#222938] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#141824] hover:bg-white/10 text-[#8E99AB] hover:text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {isVisible ? (
              <button
                type="button"
                onClick={() => onDelete(review)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F87171]/15 hover:bg-[#F87171]/25 text-[#F87171] text-xs font-semibold transition-all"
              >
                <EyeSlash size={14} />
                <span>Hide Review</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onApprove(review)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34D399] hover:bg-[#34D399]/90 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                <CheckCircle size={15} weight="bold" />
                <span>Make Visible</span>
              </button>
            )}

            {!isPending && (
              <button
                type="button"
                onClick={() => onMarkPending(review)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FBBF24]/15 hover:bg-[#FBBF24]/25 text-[#FBBF24] text-xs font-semibold transition-all"
              >
                <ClockCountdown size={14} weight="bold" />
                <span>Set Pending</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
