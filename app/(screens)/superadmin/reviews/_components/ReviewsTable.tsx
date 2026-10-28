"use client";

import { Check, ChatCircleDots } from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";
import { ReviewRow } from "./ReviewRow";

interface ReviewsTableProps {
  reviews: AdminReviewItem[];
  selectedIds: string[];
  onToggleSelectAll: (checked: boolean) => void;
  onToggleSelect: (id: string) => void;
  onViewDetails: (review: AdminReviewItem) => void;
  onApprove: (review: AdminReviewItem) => void;
  onDelete: (review: AdminReviewItem) => void;
  onRestore: (review: AdminReviewItem) => void;
}

export function ReviewsTable({
  reviews,
  selectedIds,
  onToggleSelectAll,
  onToggleSelect,
  onViewDetails,
  onApprove,
  onDelete,
  onRestore,
}: ReviewsTableProps) {
  const allSelected = reviews.length > 0 && selectedIds.length === reviews.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < reviews.length;

  return (
    <div className="w-full bg-[#0B0E14] border border-[#1B2232] rounded-2xl overflow-hidden shadow-xl">
      <div className="w-full overflow-x-auto scrollbar-themed">
        <table className="w-full min-w-[840px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B2232] bg-[#0E121A]/80 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <th scope="col" className="py-4 px-3 w-10 text-center">
                <button
                  type="button"
                  onClick={() => onToggleSelectAll(!allSelected)}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                    allSelected || isIndeterminate
                      ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
                      : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
                  }`}
                  aria-label="Select all reviews"
                >
                  <Check size={13} weight="bold" />
                </button>
              </th>
              <th scope="col" className="py-4 px-4 w-60">REVIEWER</th>
              <th scope="col" className="py-4 px-3 w-32">ROLE</th>
              <th scope="col" className="py-4 px-3 w-36">RATING</th>
              <th scope="col" className="py-4 px-4">REVIEW</th>
              <th scope="col" className="py-4 px-3 w-32">SUBMITTED</th>
              <th scope="col" className="py-4 px-3 w-28">STATUS</th>
              <th scope="col" className="py-4 px-4 w-32 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-[#8E99AB]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ChatCircleDots size={38} className="text-[#333E54]" />
                    <span className="text-sm font-medium text-white">No reviews found</span>
                    <span className="text-xs text-[#64748B]">
                      Try switching tabs or adjusting search query and filters.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              reviews.map((r) => (
                <ReviewRow
                  key={r.id}
                  review={r}
                  selected={selectedIds.includes(r.id)}
                  onToggleSelect={onToggleSelect}
                  onViewDetails={onViewDetails}
                  onApprove={onApprove}
                  onDelete={onDelete}
                  onRestore={onRestore}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
