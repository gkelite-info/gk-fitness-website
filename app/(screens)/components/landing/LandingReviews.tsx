"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Camera, Plus } from "@phosphor-icons/react";
import UploadReviewModal from "./UploadReviewModal";
import ReviewDetailModal, { ReviewItem } from "./ReviewDetailModal";
import LandingReviewCard from "./LandingReviewCard";
import { getReviewsAction } from "@/app/actions/reviews";

export default function LandingReviews() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isUploadModalOpen =
    searchParams.get("uploadReview") === "true" ||
    searchParams.get("modal") === "upload-review";

  const handleOpenUploadModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("uploadReview", "true");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCloseUploadModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("uploadReview");
    params.delete("modal");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  useEffect(() => {
    async function loadDbReviews() {
      try {
        const res = await getReviewsAction({ limit: 12 });
        if (res.success && res.data && res.data.length > 0) {
          const mapped: ReviewItem[] = res.data.map((r) => {
            const initials =
              r.fullname
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U";

            const isVideo =
              r.attachmentUrl &&
              (r.attachmentUrl.endsWith(".mp4") ||
                r.attachmentUrl.endsWith(".webm") ||
                r.attachmentUrl.endsWith(".mov") ||
                r.attachmentUrl.includes("video"));

            return {
              id: r.reviewId,
              initials,
              initialsBg: "bg-[#D4FF32]/20 text-[#D4FF32]",
              name: r.fullname,
              role:
                r.role === "owner"
                  ? "Gym Owner"
                  : r.role === "trainer"
                    ? "Trainer / Coach"
                    : r.role === "globaltrainer"
                      ? "Global Trainer"
                      : r.role === "individual"
                        ? "Global Customer"
                        : r.role === "superadmin"
                          ? "Super Admin"
                          : "Gym Member",
              rating: Math.round(r.ratings),
              text: r.review || "",
              videos: isVideo && r.attachmentUrl ? [r.attachmentUrl] : [],
              photos: !isVideo && r.attachmentUrl ? [r.attachmentUrl] : [],
              date: new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(r.createdAt)),
            };
          });

          setReviews(mapped);
        } else {
          setReviews([]);
        }
      } catch {
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    }
    loadDbReviews();
  }, []);

  const handleAddNewReview = (newRev: {
    name: string;
    role: string;
    rating: number;
    text: string;
    photos: string[];
    videos: string[];
    date: string;
  }) => {
    const initials =
      newRev.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    const item: ReviewItem = {
      id: Date.now().toString(),
      initials,
      initialsBg: "bg-[#D4FF32]/20 text-[#D4FF32]",
      name: newRev.name,
      role: newRev.role,
      rating: newRev.rating,
      text: newRev.text,
      videos: newRev.videos,
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
              onClick={handleOpenUploadModal}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.25)] shrink-0 cursor-pointer self-start sm:self-auto active:scale-[0.98] whitespace-nowrap"
            >
              <Camera size={16} weight="bold" />
              Upload Review &amp; Photos
              {/* Video uploading in comment: &amp; Videos */}
            </button>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#94A3B8]">
            Real stories. Real results. Real member photos and transformations across GK- Gym Life.
            {/* Video uploading in comment: Real gym workout videos and transformations */}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-[#121319] border border-white/5" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <LandingReviewCard
                key={rev.id}
                review={rev}
                onSelectReview={setSelectedReview}
              />
            ))}
          </div>
        ) : (
          <div className="w-full py-16 px-6 rounded-2xl bg-[#121319] border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center text-[#D4FF32] mb-4">
              <Camera size={26} weight="bold" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">No Reviews Yet</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mb-6">
              Be the first to share your fitness journey, photos, and experience with the GK- Gym Life community.
              {/* Video uploading in comment: workout videos */}
            </p>
            <button
              type="button"
              onClick={handleOpenUploadModal}
              className="h-11 px-5 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.25)] cursor-pointer active:scale-[0.98]"
            >
              <Plus size={16} weight="bold" />
              Upload First Review &amp; Photo
              {/* Video uploading in comment: &amp; Video */}
            </button>
          </div>
        )}
      </div>

      <UploadReviewModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSubmitReview={handleAddNewReview}
      />

      <ReviewDetailModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}
