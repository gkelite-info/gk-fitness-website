"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Star, CalendarBlank, Image as ImageIcon, VideoCamera } from "@phosphor-icons/react";
import ReviewVideoPlayer from "./ReviewVideoPlayer";

export interface ReviewItem {
  id: string;
  initials: string;
  initialsBg: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photos: string[];
  videos?: string[];
  date: string;
}

interface ReviewDetailModalProps {
  review: ReviewItem | null;
  onClose: () => void;
}

export default function ReviewDetailModal({
  review,
  onClose,
}: ReviewDetailModalProps) {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const uniqueVideos = Array.from(new Set(review?.videos || []));
  const uniquePhotos = Array.from(new Set(review?.photos || []));

  useEffect(() => {
    if (uniqueVideos.length > 0) {
      setActiveVideo(uniqueVideos[0]);
    } else {
      setActiveVideo(null);
    }
    setActivePhoto(null);
  }, [review]);

  if (!review) return null;

  const cleanText = review.text.replace(/^["'\s]+|["'\s]+$/g, "");

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#232631] shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 sm:w-11 h-10 sm:h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 border border-white/10 ${review.initialsBg}`}
            >
              {review.initials}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                {review.name}
              </h3>
              <p className="text-xs text-[#94A3B8]">{review.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={16} weight="fill" />
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors cursor-pointer shrink-0"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto scrollbar-themed space-y-5">
          <div className="bg-[#0C0D10] border border-[#232631] rounded-xl p-4 sm:p-5">
            <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed">
              &ldquo;{cleanText}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <CalendarBlank size={14} />
              <span>Posted on {review.date}</span>
            </div>
          </div>

          {uniqueVideos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
                  <VideoCamera size={16} weight="bold" />
                  Workout Video ({uniqueVideos.length})
                </span>
                {uniqueVideos.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {uniqueVideos.map((vid, vIdx) => (
                      <button
                        key={vIdx}
                        type="button"
                        onClick={() => setActiveVideo(vid)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          activeVideo === vid
                            ? "bg-[#D4FF32] text-black"
                            : "bg-[#1E2028] text-[#CBD5E1] hover:text-white"
                        }`}
                      >
                        Clip {vIdx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeVideo && <ReviewVideoPlayer src={activeVideo} />}
            </div>
          )}

          {uniquePhotos.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                <ImageIcon size={16} weight="bold" />
                <span>Attached Photos ({uniquePhotos.length})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {uniquePhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhoto(photo)}
                    className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-white/10 hover:border-[#D4FF32] cursor-pointer group transition-all"
                  >
                    <Image
                      src={photo}
                      alt={`${review.name} photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {activePhoto && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setActivePhoto(null);
          }}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 bg-[#121319]"
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-[#D4FF32] hover:text-black transition-colors cursor-pointer"
            >
              <X size={18} weight="bold" />
            </button>
            <div className="relative w-full h-[65vh]">
              <Image
                src={activePhoto}
                alt="Enlarged photo"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
