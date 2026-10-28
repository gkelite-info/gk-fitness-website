"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getReviewsAction,
  updateReviewStatusAction,
  batchUpdateReviewStatusAction,
  removeReviewAction,
} from "@/app/actions/reviews";
import { normalizeReviewStatus } from "@/lib/helpers/reviews/reviewsHelper";
import { useRealtimeReviews } from "@/lib/hooks/reviews/useRealtimeReviews";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { AdminReviewItem, ReviewFiltersState, ReviewsStats } from "./types";
import { ReviewsHeader } from "./_components/ReviewsHeader";
import { ReviewsKPIs } from "./_components/ReviewsKPIs";
import { ReviewsFilters } from "./_components/ReviewsFilters";
import { ReviewsCardsGrid } from "./_components/ReviewsCardsGrid";
import { ReviewsTable } from "./_components/ReviewsTable";
import { ReviewsShimmer } from "./_components/ReviewsShimmer";
import { ReviewDetailsModal } from "./_components/ReviewDetailsModal";
import { ReviewDeleteModal } from "./_components/ReviewDeleteModal";
import { ReviewsBatchBar } from "./_components/ReviewsBatchBar";
import { PhotoLightboxModal } from "./_components/PhotoLightboxModal";

export default function SuperAdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState<ReviewFiltersState>({
    searchQuery: "",
    status: "all",
    role: "all",
    rating: "all",
    sortBy: "newest",
  });
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewingReview, setViewingReview] = useState<AdminReviewItem | null>(null);
  const [deletingReview, setDeletingReview] = useState<AdminReviewItem | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const loadDatabaseReviews = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await getReviewsAction({ limit: 100 });
      if (res.success && res.data) {
        const dbItems: AdminReviewItem[] = res.data.map((r) => {
          const isVideo =
            r.attachmentUrl &&
            (r.attachmentUrl.endsWith(".mp4") ||
              r.attachmentUrl.endsWith(".webm") ||
              r.attachmentUrl.endsWith(".mov") ||
              r.attachmentUrl.includes("video"));

          return {
            id: r.reviewId,
            fullname: r.fullname,
            email: r.email,
            role: (r.role || "customer") as any,
            ratings: Math.round(r.ratings),
            review: r.review || "",
            photos: r.attachmentUrl && !isVideo ? [r.attachmentUrl] : [],
            attachmentUrl: r.attachmentUrl,
            attachmentType: r.attachmentUrl ? (isVideo ? "video" : "photo") : null,
            status: normalizeReviewStatus(r.status),
            createdAt: r.createdAt,
            verifiedUser: true,
          };
        });

        setReviews(dbItems);
      } else {
        setReviews([]);
      }
    } catch {
      setReviews([]);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDatabaseReviews();
  }, [loadDatabaseReviews]);

  useRealtimeReviews(loadDatabaseReviews);

  const stats: ReviewsStats = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === "visible").length;
    const pending = reviews.filter((r) => r.status === "pending").length;
    const deleted = reviews.filter((r) => r.status === "invisible").length;
    const avg =
      reviews.length > 0
        ? reviews.reduce((acc, curr) => acc + curr.ratings, 0) / reviews.length
        : 5.0;

    return { total, approved, pending, deleted, averageRating: avg };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        if (filters.status !== "all") {
          const isVisible = r.status === "visible";
          const isHidden = r.status === "invisible";
          if ((filters.status === "visible" || filters.status === "approved") && !isVisible) return false;
          if ((filters.status === "invisible" || filters.status === "deleted") && !isHidden) return false;
          if (filters.status === "pending" && r.status !== "pending") return false;
        }
        if (filters.role !== "all" && r.role !== filters.role) return false;
        if (filters.rating !== "all" && r.ratings !== Number(filters.rating)) return false;
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          return (
            r.fullname.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            (r.gymName?.toLowerCase().includes(q) || false) ||
            r.review.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (filters.sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (filters.sortBy === "highest_rated") return b.ratings - a.ratings;
        if (filters.sortBy === "lowest_rated") return a.ratings - b.ratings;
        return 0;
      });
  }, [reviews, filters]);

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReviews.slice(start, start + pageSize);
  }, [filteredReviews, currentPage, pageSize]);

  const handleUpdateStatus = async (id: string, newStatus: "visible" | "invisible" | "pending") => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    await updateReviewStatusAction(id, newStatus);
  };

  const handleToggleCardStatus = (review: AdminReviewItem) => {
    const isCurrentlyVisible = review.status === "visible";
    const nextStatus = isCurrentlyVisible ? "invisible" : "visible";
    handleUpdateStatus(review.id, nextStatus);
    toast.success(
      nextStatus === "visible"
        ? `Review by ${review.fullname} is now visible on the website!`
        : `Review by ${review.fullname} is now hidden.`
    );
  };

  const handleApprove = (review: AdminReviewItem) => {
    handleUpdateStatus(review.id, "visible");
    toast.success(`Review by ${review.fullname} is now visible on website!`);
    if (viewingReview?.id === review.id) setViewingReview(null);
  };

  const handleHide = (review: AdminReviewItem) => {
    handleUpdateStatus(review.id, "invisible");
    toast.success(`Review by ${review.fullname} is now hidden.`);
    if (viewingReview?.id === review.id) setViewingReview(null);
  };

  const handleConfirmDelete = async (review: AdminReviewItem) => {
    setReviews((prev) => prev.filter((r) => r.id !== review.id));
    toast.success(`Review by ${review.fullname} deleted.`);
    setDeletingReview(null);
    if (viewingReview?.id === review.id) setViewingReview(null);
    await removeReviewAction(review.id);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <ReviewsHeader onRefresh={loadDatabaseReviews} isRefreshing={isRefreshing} />

      <ReviewsKPIs
        stats={stats}
        activeStatus={filters.status}
        onSelectStatus={(status) => {
          setFilters((f) => ({ ...f, status }));
          setCurrentPage(1);
        }}
      />

      <ReviewsFilters
        filters={filters}
        totalFilteredCount={filteredReviews.length}
        viewMode={viewMode}
        onFilterChange={(updates) => {
          setFilters((f) => ({ ...f, ...updates }));
          setCurrentPage(1);
        }}
        onClearFilters={() => {
          setFilters({ searchQuery: "", status: "all", role: "all", rating: "all", sortBy: "newest" });
          setCurrentPage(1);
        }}
        onToggleViewMode={setViewMode}
      />

      {isLoading ? (
        <ReviewsShimmer viewMode={viewMode} />
      ) : viewMode === "cards" ? (
        <ReviewsCardsGrid
          reviews={paginatedReviews}
          onToggleStatus={handleToggleCardStatus}
          onDelete={handleHide}
          onPhotoClick={setPreviewPhoto}
        />
      ) : (
        <ReviewsTable
          reviews={paginatedReviews}
          selectedIds={selectedIds}
          onToggleSelectAll={(checked) => setSelectedIds(checked ? paginatedReviews.map((r) => r.id) : [])}
          onToggleSelect={handleToggleSelect}
          onViewDetails={setViewingReview}
          onApprove={handleApprove}
          onDelete={handleHide}
          onRestore={(r) => handleUpdateStatus(r.id, "visible")}
        />
      )}

      {!isLoading && filteredReviews.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredReviews.length / pageSize) || 1}
          totalItems={filteredReviews.length}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      <ReviewsBatchBar
        selectedCount={selectedIds.length}
        onApproveSelected={async () => {
          const ids = [...selectedIds];
          setReviews((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status: "visible" } : r)));
          setSelectedIds([]);
          toast.success(`${ids.length} reviews set to visible!`);
          await batchUpdateReviewStatusAction(ids, "visible");
        }}
        onDeleteSelected={async () => {
          const ids = [...selectedIds];
          setReviews((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status: "invisible" } : r)));
          setSelectedIds([]);
          toast.success(`${ids.length} reviews hidden.`);
          await batchUpdateReviewStatusAction(ids, "invisible");
        }}
        onClearSelection={() => setSelectedIds([])}
      />

      <ReviewDetailsModal
        review={viewingReview}
        onClose={() => setViewingReview(null)}
        onApprove={handleApprove}
        onMarkPending={(r) => handleUpdateStatus(r.id, "pending")}
        onDelete={handleHide}
      />

      <ReviewDeleteModal
        review={deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={handleConfirmDelete}
      />

      <PhotoLightboxModal
        photoUrl={previewPhoto}
        onClose={() => setPreviewPhoto(null)}
      />
    </div>
  );
}
