"use client";

import { useState } from "react";
import {
  Star,
  Eye,
  EyeSlash,
  Trash,
  Calendar,
  Image as ImageIcon,
  SealCheck,
  CaretDown,
  CaretUp,
  Quotes,
} from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";

interface ReviewCardProps {
  review: AdminReviewItem;
  onToggleStatus: (review: AdminReviewItem) => void;
  onDelete: (review: AdminReviewItem) => void;
  onPhotoClick: (photoUrl: string) => void;
}

export function ReviewCard({
  review,
  onToggleStatus,
  onDelete,
  onPhotoClick,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initials =
    review.fullname
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const roleLabel =
    review.role === "owner"
      ? "Gym Owner"
      : review.role === "trainer"
      ? "Trainer"
      : review.role === "globaltrainer"
      ? "Global Trainer"
      : review.role === "superadmin"
      ? "Super Admin"
      : "Customer";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(review.createdAt));

  const allPhotos = review.photos && review.photos.length > 0
    ? review.photos
    : review.attachmentUrl && review.attachmentType !== "video"
    ? [review.attachmentUrl]
    : [];

  const textThreshold = 160;
  const isLongText = (review.review?.length || 0) > textThreshold;
  const displayText =
    isLongText && !isExpanded
      ? `${review.review.slice(0, textThreshold).trim()}...`
      : review.review;

  const isVisible = review.status === "visible" || (review.status as any) === "approved";
  const isPending = review.status === "pending";

  const statusLabel = isVisible
    ? "Visible"
    : isPending
    ? "Pending"
    : "Hidden";

  const statusBadgeStyle = isVisible
    ? "bg-[#34D399]/15 text-[#34D399] border-[#34D399]/30"
    : isPending
    ? "bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/30"
    : "bg-[#F87171]/15 text-[#F87171] border-[#F87171]/30";

  return (
    <div className="w-full bg-[#0E121A] border border-[#1E2536] hover:border-[#2C3852] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#182030] border border-[#2D3850] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  weight="fill"
                  className={i < review.ratings ? "text-[#FBBF24]" : "text-[#283248]"}
                />
              ))}
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border shrink-0 ${statusBadgeStyle}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="relative pt-1 overflow-hidden">
          <Quotes size={20} weight="fill" className="text-[#384562] inline-block mr-1 align-top" />
          <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed m-0 inline">
            {displayText || "No written review text provided."}
          </p>

          {isLongText && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 ml-1.5 text-xs font-bold text-[#D4FF32] hover:underline cursor-pointer select-none"
            >
              <span>{isExpanded ? "View less" : "View more"}</span>
              {isExpanded ? <CaretUp size={12} weight="bold" /> : <CaretDown size={12} weight="bold" />}
            </button>
          )}
        </div>

        <div className="pt-2 border-t border-[#1B2232] flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-white m-0 truncate">
              {review.fullname}
            </h4>
            {review.verifiedUser && (
              <SealCheck size={15} weight="fill" className="text-[#D4FF32] shrink-0" />
            )}
          </div>

          <p className="text-xs text-[#8E99AB] m-0 truncate">
            {review.email}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-md bg-[#161C2A] border border-[#26324B] text-[11px] font-semibold text-[#94A3B8]">
              {roleLabel}
            </span>

            <div className="flex items-center gap-1 text-[11px] text-[#64748B]">
              <Calendar size={13} weight="bold" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {allPhotos.length > 0 && (
          <div className="pt-3 border-t border-[#1B2232]">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8E99AB] mb-2.5">
              <ImageIcon size={14} weight="bold" />
              <span>Attached Photos ({allPhotos.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allPhotos.map((photo, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onPhotoClick(photo)}
                  className="w-14 h-14 rounded-xl overflow-hidden border border-[#232D42] hover:border-[#D4FF32] transition-colors relative group shrink-0 cursor-pointer"
                  title="Click to view full photo"
                >
                  <img
                    src={photo}
                    alt={`Attached review photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye size={16} className="text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-5 mt-4 border-t border-[#1B2232] flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => onToggleStatus(review)}
          className={`flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
            isVisible
              ? "bg-[#141824] border-[#252F44] hover:border-white/30 text-white"
              : "bg-[#34D399]/15 border-[#34D399]/30 hover:bg-[#34D399]/25 text-[#34D399]"
          }`}
        >
          {isVisible ? (
            <>
              <EyeSlash size={16} />
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye size={16} />
              <span>Make Visible</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onDelete(review)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#F87171]/10 border border-[#F87171]/20 hover:bg-[#F87171]/20 text-[#F87171] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <Trash size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
