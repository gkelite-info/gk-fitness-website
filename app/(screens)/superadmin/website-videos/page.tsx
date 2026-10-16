"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import {
  getWebsiteVideosAction,
  toggleWebsiteVideoStatusAction,
  deleteWebsiteVideoAction,
} from "@/app/actions/websiteVideos";
import { WebsiteVideo, VideoStatus } from "@/lib/types/websiteVideos";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { WebsiteVideosHeader } from "./_components/WebsiteVideosHeader";
import { WebsiteVideosFilters } from "./_components/WebsiteVideosFilters";
import { WebsiteVideosBatchBar } from "./_components/WebsiteVideosBatchBar";
import { WebsiteVideosTable } from "./_components/WebsiteVideosTable";
import { WebsiteVideoPreviewModal } from "./_components/WebsiteVideoPreviewModal";
import { DeleteConfirmationModal } from "./_components/DeleteConfirmationModal";
import { HideConfirmationModal } from "./_components/HideConfirmationModal";

export default function WebsiteVideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<WebsiteVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [previewVideo, setPreviewVideo] = useState<WebsiteVideo | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<WebsiteVideo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hidingVideo, setHidingVideo] = useState<WebsiteVideo | null>(null);
  const [isHiding, setIsHiding] = useState(false);
  const [selectedVideoIds, setSelectedVideoIds] = useState<string[]>([]);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    const res = await getWebsiteVideosAction({
      query: searchQuery,
      status: statusFilter,
      page: currentPage,
      pageSize,
    });
    if (res.success) {
      setVideos(res.data);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);
    } else {
      toast.error(res.error || "Failed to load videos");
    }
    setLoading(false);
  }, [searchQuery, statusFilter, currentPage, pageSize]);

  useEffect(() => {
    loadVideos();

    const channel = supabase
      .channel("website_videos_admin_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "web_videos" },
        () => {
          loadVideos();
        }
      )
      .on("broadcast", { event: "videos_updated" }, () => {
        loadVideos();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadVideos]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handleToggleSelect = (video: WebsiteVideo) => {
    setSelectedVideoIds((prev) =>
      prev.includes(video.id) ? prev.filter((id) => id !== video.id) : [...prev, video.id]
    );
  };

  const handleToggleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedVideoIds(videos.map((v) => v.id));
    } else {
      setSelectedVideoIds([]);
    }
  };

  const handleBatchStatus = async (status: VideoStatus) => {
    if (selectedVideoIds.length === 0) return;
    setIsBatchProcessing(true);

    try {
      await Promise.all(
        selectedVideoIds.map((id) => toggleWebsiteVideoStatusAction(id, status))
      );
      toast.success(
        status === "visible"
          ? `${selectedVideoIds.length} video(s) are now visible on website`
          : `${selectedVideoIds.length} video(s) hidden from website`
      );
      setSelectedVideoIds([]);
      await loadVideos();
    } catch {
      toast.error("Failed to update status for selected videos");
    } finally {
      setIsBatchProcessing(false);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedVideoIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedVideoIds.length} selected video(s)?`)) {
      return;
    }

    setIsBatchProcessing(true);
    try {
      await Promise.all(selectedVideoIds.map((id) => deleteWebsiteVideoAction(id)));
      toast.success(`${selectedVideoIds.length} video(s) deleted successfully`);
      setSelectedVideoIds([]);
      await loadVideos();
    } catch {
      toast.error("Failed to delete selected videos");
    } finally {
      setIsBatchProcessing(false);
    }
  };

  const handleToggleStatus = async (video: WebsiteVideo) => {
    if (video.status === "visible") {
      setHidingVideo(video);
      return;
    }

    const res = await toggleWebsiteVideoStatusAction(video.id, "visible");
    if (!res.success) {
      toast.error("Failed to update status");
    } else {
      toast.success("Video is now visible on website");
      await loadVideos();
    }
  };

  const handleConfirmHide = async () => {
    if (!hidingVideo) return;
    setIsHiding(true);
    const targetId = hidingVideo.id;

    const res = await toggleWebsiteVideoStatusAction(targetId, "hidden");
    if (!res.success) {
      toast.error("Failed to hide video");
    } else {
      toast.success("Video hidden from website");
      setHidingVideo(null);
      await loadVideos();
    }
    setIsHiding(false);
  };

  const handleReplace = (video: WebsiteVideo) => {
    router.push(`/superadmin/website-videos/upload?replaceId=${video.id}`);
  };

  const handleConfirmDelete = async () => {
    if (!deletingVideo) return;
    setIsDeleting(true);

    const targetId = deletingVideo.id;
    const res = await deleteWebsiteVideoAction(targetId);

    if (res.success) {
      toast.success("Video deleted successfully");
      setSelectedVideoIds((prev) => prev.filter((id) => id !== targetId));
      setDeletingVideo(null);
      await loadVideos();
    } else {
      toast.error(res.error || "Failed to delete video");
    }
    setIsDeleting(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
      <WebsiteVideosHeader />

      <WebsiteVideosFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      <WebsiteVideosBatchBar
        selectedCount={selectedVideoIds.length}
        isProcessing={isBatchProcessing}
        onBatchStatus={handleBatchStatus}
        onBatchDelete={handleBatchDelete}
        onDeselectAll={() => setSelectedVideoIds([])}
      />

      <WebsiteVideosTable
        videos={videos}
        loading={loading}
        selectedIds={selectedVideoIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onPreview={(video) => setPreviewVideo(video)}
        onReplace={handleReplace}
        onToggleStatus={handleToggleStatus}
        onDelete={(video) => setDeletingVideo(video)}
      />

      {!loading && totalCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <WebsiteVideoPreviewModal
        video={previewVideo}
        onClose={() => setPreviewVideo(null)}
      />

      <DeleteConfirmationModal
        video={deletingVideo}
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingVideo(null)}
      />

      <HideConfirmationModal
        video={hidingVideo}
        loading={isHiding}
        onConfirm={handleConfirmHide}
        onClose={() => setHidingVideo(null)}
      />
    </div>
  );
}
