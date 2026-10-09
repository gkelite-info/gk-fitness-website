"use client";

import Image from "next/image";
import { useState } from "react";
import { X, Star, CalendarBlank, Image as ImageIcon } from "@phosphor-icons/react";

interface ReviewItem {
  id: string;
  initials: string;
  initialsBg: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photos: string[];
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

  if (!review) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#232631] shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 border border-white/10 ${review.initialsBg}`}
            >
              {review.initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{review.name}</h3>
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
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors cursor-pointer"
            >
              <X size={20} weight="bold" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto scrollbar-themed space-y-6">
          <div>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <CalendarBlank size={15} />
              <span>{review.date}</span>
            </div>
          </div>

          {review.photos.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
                <ImageIcon size={16} weight="bold" />
                <span>All Attached Photos ({review.photos.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {review.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePhoto(photo)}
                    className="relative h-44 rounded-xl overflow-hidden border border-white/10 hover:border-[#D4FF32] cursor-pointer group transition-all"
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
