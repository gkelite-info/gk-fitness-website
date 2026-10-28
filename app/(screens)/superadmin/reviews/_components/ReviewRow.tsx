import { useState } from "react";
import {
  Check,
  Star,
  Eye,
  CheckCircle,
  Trash,
  ArrowCounterClockwise,
  Image as ImageIcon,
  SealCheck,
} from "@phosphor-icons/react";
import { AdminReviewItem } from "../types";

interface ReviewRowProps {
  review: AdminReviewItem;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onViewDetails: (review: AdminReviewItem) => void;
  onApprove: (review: AdminReviewItem) => void;
  onDelete: (review: AdminReviewItem) => void;
  onRestore: (review: AdminReviewItem) => void;
}

export function ReviewRow({
  review,
  selected,
  onToggleSelect,
  onViewDetails,
  onApprove,
  onDelete,
  onRestore,
}: ReviewRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initials =
    review.fullname
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const allPhotos =
    review.photos && review.photos.length > 0
      ? review.photos
      : review.attachmentUrl && review.attachmentType !== "video"
      ? [review.attachmentUrl]
      : [];

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

  const roleBadgeStyle =
    review.role === "owner"
      ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
      : review.role === "trainer" || review.role === "globaltrainer"
      ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
      : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";

  const isVisible = review.status === "visible" || (review.status as any) === "approved";
  const isPending = review.status === "pending";

  const statusBadge = isVisible ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
      <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
      Visible
    </span>
  ) : isPending ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FBBF24]/15 text-[#FBBF24] border border-[#FBBF24]/30">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
      Pending
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F87171]/15 text-[#F87171] border border-[#F87171]/30">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
      Hidden
    </span>
  );

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(review.createdAt));

  return (
    <tr
      className={`border-b border-[#1B2232] transition-colors hover:bg-[#141926]/60 ${
        selected ? "bg-[#182033]" : ""
      }`}
    >
      <td className="py-4 px-3 text-center">
        <button
          type="button"
          onClick={() => onToggleSelect(review.id)}
          className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
            selected
              ? "bg-[#D4FF32] border-[#D4FF32] text-black shadow-[0_0_8px_rgba(212,255,50,0.35)]"
              : "bg-[#141824] border-[#2D374D] text-transparent hover:border-[#D4FF32]"
          }`}
          aria-label={`Select review by ${review.fullname}`}
        >
          <Check size={13} weight="bold" />
        </button>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4FF32]/25 to-[#D4FF32]/10 border border-[#D4FF32]/30 text-[#D4FF32] font-black text-xs flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {review.fullname}
              </span>
              {review.verifiedUser && (
                <SealCheck size={13} weight="fill" className="text-[#D4FF32] shrink-0" />
              )}
            </div>
            <span className="text-[11px] text-[#8E99AB] truncate">{review.email}</span>
          </div>
        </div>
      </td>

      <td className="py-4 px-3 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${roleBadgeStyle}`}
        >
          {roleLabel}
        </span>
      </td>

      <td className="py-4 px-3 whitespace-nowrap">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              weight="fill"
              className={i < review.ratings ? "text-[#FBBF24]" : "text-[#242D40]"}
            />
          ))}
          <span className="text-xs font-bold text-white ml-1">
            {review.ratings.toFixed(1)}
          </span>
        </div>
      </td>

      <td className="py-4 px-4 max-w-[280px]">
        <p className="text-xs text-[#E2E8F0] line-clamp-2 m-0 leading-relaxed">
          {review.review || "No review text provided."}
        </p>
        {allPhotos.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1B2232] text-[10px] text-[#38BDF8] font-semibold border border-white/5">
              <ImageIcon size={12} weight="bold" />
              {allPhotos.length} {allPhotos.length === 1 ? "Photo" : "Photos"}
            </span>
          </div>
        )}
      </td>

      <td className="py-4 px-3 text-xs text-[#8E99AB] whitespace-nowrap">
        {formattedDate}
      </td>

      <td className="py-4 px-3 whitespace-nowrap">{statusBadge}</td>

      <td className="py-4 px-4 text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onViewDetails(review)}
            title="View Details"
            className="p-1.5 rounded-lg bg-[#141824] hover:bg-white/10 text-[#8E99AB] hover:text-white transition-colors cursor-pointer"
          >
            <Eye size={16} />
          </button>

          {!isVisible && (
            <button
              type="button"
              onClick={() => onApprove(review)}
              title="Make Visible"
              className="p-1.5 rounded-lg bg-[#34D399]/15 hover:bg-[#34D399]/25 text-[#34D399] transition-colors cursor-pointer"
            >
              <CheckCircle size={16} weight="bold" />
            </button>
          )}

          {isVisible ? (
            <button
              type="button"
              onClick={() => onDelete(review)}
              title="Hide Review"
              className="p-1.5 rounded-lg bg-[#F87171]/15 hover:bg-[#F87171]/25 text-[#F87171] transition-colors cursor-pointer"
            >
              <Trash size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRestore(review)}
              title="Make Visible"
              className="p-1.5 rounded-lg bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 text-[#38BDF8] transition-colors cursor-pointer"
            >
              <ArrowCounterClockwise size={16} weight="bold" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
