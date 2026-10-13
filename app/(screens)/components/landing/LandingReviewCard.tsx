"use client";

import Image from "next/image";
import { Star, CalendarBlank, Image as ImageIcon, VideoCamera, Play } from "@phosphor-icons/react";
import { ReviewItem } from "./ReviewDetailModal";

interface LandingReviewCardProps {
  review: ReviewItem;
  onSelectReview: (review: ReviewItem) => void;
}

export default function LandingReviewCard({
  review,
  onSelectReview,
}: LandingReviewCardProps) {
  const uniqueVideos = Array.from(new Set(review.videos || []));
  const uniquePhotos = Array.from(new Set(review.photos || []));
  const hasVideos = uniqueVideos.length > 0;
  const totalMediaCount = uniqueVideos.length + uniquePhotos.length;
  const cleanText = review.text.replace(/^["'\s]+|["'\s]+$/g, "");

  return (
    <div className="rounded-2xl bg-[#121319] border border-white/10 hover:border-[#D4FF32]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(212,255,50,0.06)] group">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 border border-white/10 ${review.initialsBg}`}
            >
              {review.initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-[#D4FF32] transition-colors">
                {review.name}
              </h3>
              <p className="text-xs text-[#94A3B8]">{review.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={15} weight="fill" />
            ))}
          </div>
        </div>

        <div className="relative mb-5">
          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-4">
            &ldquo;{cleanText}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => onSelectReview(review)}
            className="text-xs font-bold text-[#D4FF32] hover:text-[#C2EF2B] hover:underline transition-colors mt-2 inline-flex items-center gap-1 cursor-pointer"
          >
            View More &rarr;
          </button>
        </div>

        {totalMediaCount > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
              <span className="flex items-center gap-1.5 text-[#D4FF32]">
                {hasVideos ? (
                  <>
                    <VideoCamera size={14} weight="bold" />
                    Workout Video &amp; Photos ({totalMediaCount})
                  </>
                ) : (
                  <>
                    <ImageIcon size={14} weight="bold" />
                    Attached Photos ({uniquePhotos.length})
                  </>
                )}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
              {hasVideos && (
                <div
                  onClick={() => onSelectReview(review)}
                  className="relative h-20 sm:h-22 rounded-xl overflow-hidden border border-[#D4FF32]/50 hover:border-[#D4FF32] cursor-pointer group/vid transition-all bg-black"
                >
                  <video
                    src={uniqueVideos[0]}
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover/vid:opacity-100 group-hover/vid:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover/vid:bg-black/20 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#D4FF32] text-black flex items-center justify-center shadow-lg group-hover/vid:scale-110 transition-transform">
                      <Play size={13} weight="fill" className="ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-1 left-1 bg-black/80 text-[#D4FF32] text-[8px] font-black px-1 rounded">
                    VIDEO
                  </span>
                </div>
              )}

              {uniquePhotos.slice(0, hasVideos ? 2 : 3).map((photo, pIdx) => {
                const maxVisiblePhotos = hasVideos ? 2 : 3;
                const isLastSlot = pIdx === maxVisiblePhotos - 1;
                const remainingCount = uniquePhotos.length - maxVisiblePhotos;
                const showRemainingBadge = isLastSlot && remainingCount > 0;

                return (
                  <div
                    key={pIdx}
                    onClick={() => onSelectReview(review)}
                    className="relative h-20 sm:h-22 rounded-xl overflow-hidden border border-white/10 hover:border-[#D4FF32] cursor-pointer group/photo transition-all"
                  >
                    <Image
                      src={photo}
                      alt={`${review.name} media ${pIdx + 1}`}
                      fill
                      className="object-cover group-hover/photo:scale-105 transition-transform duration-300"
                    />
                    {showRemainingBadge && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center transition-colors group-hover/photo:bg-black/60">
                        <span className="text-white font-black text-sm tracking-wide">
                          +{remainingCount}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-white/[0.08] flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
        <CalendarBlank size={14} />
        <span>{review.date}</span>
      </div>
    </div>
  );
}
