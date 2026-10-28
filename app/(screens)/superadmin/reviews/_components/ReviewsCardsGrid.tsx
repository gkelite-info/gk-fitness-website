"use client";

import { ChatCircleDots } from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";
import { ReviewCard } from "./ReviewCard";

interface ReviewsCardsGridProps {
  reviews: AdminReviewItem[];
  onToggleStatus: (review: AdminReviewItem) => void;
  onDelete: (review: AdminReviewItem) => void;
  onPhotoClick: (photoUrl: string) => void;
}

export function ReviewsCardsGrid({
  reviews,
  onToggleStatus,
  onDelete,
  onPhotoClick,
}: ReviewsCardsGridProps) {
  if (reviews.length === 0) {
    return (
      <div className="w-full py-16 px-4 bg-[#0E121A] border border-[#1E2536] rounded-2xl flex flex-col items-center justify-center gap-2 text-center">
        <ChatCircleDots size={40} className="text-[#333E54]" />
        <h4 className="text-sm font-semibold text-white m-0">No reviews found</h4>
        <p className="text-xs text-[#64748B] m-0">
          Try adjusting your search query or status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </div>
  );
}
