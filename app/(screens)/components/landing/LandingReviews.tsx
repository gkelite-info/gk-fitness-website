"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, CalendarBlank, Image as ImageIcon, Plus } from "@phosphor-icons/react";
import UploadReviewModal from "./UploadReviewModal";
import ReviewDetailModal from "./ReviewDetailModal";

const INITIAL_REVIEWS = [
  {
    id: "1",
    initials: "S",
    initialsBg: "bg-[#D4FF32]/20 text-[#D4FF32]",
    name: "Saraswathi",
    role: "Gym Owner • FitZone Club",
    rating: 5,
    text: "Switching to GK- Gym Life completely transformed our gym operations. We used to lose so many walk-in leads and renewal follow-ups every month. Now with the manual renewal tracking and centralized member database, our monthly revenue jumped by over 30% with zero confusion.",
    photos: [
      "/images/landing_page/Gym Manager Reviewing Financial Dashboard.png",
      "/images/landing_page/Gym Owner Reviewing Expenses.png",
      "/images/landing_page/Neon Gym Reception Enquiries.png",
    ],
    date: "Oct 06, 2026",
  },
  {
    id: "2",
    initials: "KS",
    initialsBg: "bg-blue-500/20 text-blue-400",
    name: "K. Sai Saraswathi",
    role: "Head Coach • Olympus Fitness",
    rating: 5,
    text: "As a coach managing multiple floor trainers, assigning workout routines and custom diet plans was chaos before GK- Gym Life. Now every trainer prescribes weekly splits and nutrition charts directly to members. The QR check-in and inventory tracking are flawless.",
    photos: [
      "/images/landing_page/Push Day_ Stronger Than Yesterday.png",
      "/images/landing_page/Weekly Meal Planner at the Gym.png",
      "/images/landing_page/Gym Staff Inspecting Equipment.png",
      "/images/landing_page/Fitlevel Gym Check-In Experience.png",
    ],
    date: "Oct 04, 2026",
  },
  {
    id: "3",
    initials: "CD",
    initialsBg: "bg-amber-500/20 text-amber-400",
    name: "Chatla Deekshitha",
    role: "Gym Customer • Iron Pulse Club",
    rating: 5,
    text: "I love the member app! Every morning I check my personalized workout split and custom nutrition meal plan before hitting the gym. Checking in with the QR code is instant, and logging my body transformation progress keeps me consistent every single week.",
    photos: [
      "/images/landing_page/Fitlevel Gym Check-In Experience.png",
      "/images/landing_page/Post-Workout Performance Dashboard.png",
      "/images/landing_page/Gym Announcements in Action.png",
    ],
    date: "Sep 28, 2026",
  },
];

export default function LandingReviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<(typeof INITIAL_REVIEWS)[0] | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleAddNewReview = (newRev: {
    name: string;
    role: string;
    rating: number;
    text: string;
    photos: string[];
    date: string;
  }) => {
    const initials = newRev.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const item = {
      id: Date.now().toString(),
      initials,
      initialsBg: "bg-[#D4FF32]/20 text-[#D4FF32]",
      name: newRev.name,
      role: newRev.role,
      rating: newRev.rating,
      text: newRev.text,
      photos: newRev.photos,
      date: newRev.date,
    };

    setReviews((prev) => [item, ...prev]);
  };

  return (
    <section id="reviews" className="w-full py-12 lg:py-16 bg-[#08090C] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32] px-3 py-1 rounded-full bg-[#15161C] border border-[#232631] inline-block mb-3">
            Member &amp; Partner Feedback
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white leading-tight">
              What Our Partners &amp; <span className="text-[#D4FF32] not-italic">Members Say</span>
            </h2>

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.25)] shrink-0 cursor-pointer self-start sm:self-auto active:scale-[0.98] whitespace-nowrap"
            >
              <Plus size={16} weight="bold" />
              Upload Review &amp; Photos
            </button>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#94A3B8]">
            Real stories. Real results. Real gym transformations across GK- Gym Life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-[#121319] border border-white/10 hover:border-[#D4FF32]/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(212,255,50,0.06)] group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0 border border-white/10 ${rev.initialsBg}`}>
                      {rev.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#D4FF32] transition-colors">
                        {rev.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8]">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={15} weight="fill" />
                    ))}
                  </div>
                </div>

                <div className="relative mb-5">
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-4">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedReview(rev)}
                    className="text-xs font-bold text-[#D4FF32] hover:text-[#C2EF2B] hover:underline transition-colors mt-2 inline-flex items-center gap-1 cursor-pointer"
                  >
                    View More →
                  </button>
                </div>

                {rev.photos.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon size={14} weight="bold" />
                        Attached Photos ({rev.photos.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
                      {rev.photos.slice(0, 3).map((photo, pIdx) => {
                        const isThirdAndHasMore = pIdx === 2 && rev.photos.length > 3;
                        const remainingCount = rev.photos.length - 3;

                        return (
                          <div
                            key={pIdx}
                            onClick={() => setSelectedReview(rev)}
                            className="relative h-20 sm:h-22 rounded-xl overflow-hidden border border-white/10 hover:border-[#D4FF32] cursor-pointer group/photo transition-all"
                          >
                            <Image
                              src={photo}
                              alt={`${rev.name} photo ${pIdx + 1}`}
                              fill
                              className="object-cover group-hover/photo:scale-105 transition-transform duration-300"
                            />
                            {isThirdAndHasMore && (
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
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UploadReviewModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmitReview={handleAddNewReview}
      />

      <ReviewDetailModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}
