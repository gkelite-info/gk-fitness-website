"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CloudArrowUp, CircleNotch } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { VideoDropzone } from "./VideoDropzone";
import { SelectedVideosList } from "./SelectedVideosList";
import { VideoVisibilitySection } from "./VideoVisibilitySection";
import { SelectedVideoItem } from "./videoUploadUtils";
import { WebsiteVideo } from "@/lib/types/websiteVideos";
import { useUser } from "@/app/context/UserContext";
import { broadcastWebsiteVideosUpdate } from "@/lib/helpers/websiteVideos/broadcastWebsiteVideosUpdate";

interface UploadVideoFormProps {
  replaceTarget?: WebsiteVideo | null;
}

export function UploadVideoForm({ replaceTarget }: UploadVideoFormProps) {
  const router = useRouter();
  const { profile } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedVideos, setSelectedVideos] = useState<SelectedVideoItem[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(
    replaceTarget ? replaceTarget.status === "visible" : true
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");

  const handleVideosAdded = (newVideos: SelectedVideoItem[]) => {
    setSelectedVideos((prev) => {
      const existingNames = new Set(prev.map((v) => `${v.file.name}-${v.file.size}`));
      const filtered = newVideos.filter((v) => !existingNames.has(`${v.file.name}-${v.file.size}`));
      return [...prev, ...filtered];
    });
  };

  const handleToggleVideo = (id: string) => {
    setSelectedVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selected: !v.selected } : v))
    );
  };

  const handleToggleAll = (selectAll: boolean) => {
    setSelectedVideos((prev) => prev.map((v) => ({ ...v, selected: selectAll })));
  };

  const handleRemoveVideo = (id: string) => {
    setSelectedVideos((prev) => {
      const target = prev.find((v) => v.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((v) => v.id !== id);
    });
  };

  const handleClearAll = () => {
    selectedVideos.forEach((v) => {
      if (v.previewUrl) URL.revokeObjectURL(v.previewUrl);
    });
    setSelectedVideos([]);
  };

  const selectedCount = selectedVideos.filter((v) => v.selected).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (replaceTarget) {
      if (selectedVideos.length === 0) {
        toast.error("Please select a video file to replace the existing video");
        return;
      }
      setIsSubmitting(true);
      setUploadProgressText("Uploading replacement video...");
      try {
        const item = selectedVideos[0];
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("status", isVisible ? "visible" : "hidden");
        formData.append("replaceId", replaceTarget.id);
        if (profile?.userId) formData.append("userId", profile.userId);

        const res = await fetch("/api/upload-website-video", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok || !data.url) {
          toast.error(data.error || "Failed to replace video");
          setIsSubmitting(false);
          return;
        }
        toast.success("Video replaced and published successfully!");
        router.push("/superadmin/website-videos");
      } catch {
        toast.error("An unexpected error occurred during replacement");
        setIsSubmitting(false);
      }
      return;
    }

    const videosToUpload = selectedVideos.filter((v) => v.selected);
    if (videosToUpload.length === 0) {
      toast.error("Please select at least one video checkbox to upload");
      return;
    }

    setIsSubmitting(true);
    let successCount = 0;

    try {
      for (let i = 0; i < videosToUpload.length; i++) {
        const item = videosToUpload[i];
        setUploadProgressText(
          `Uploading video ${i + 1} of ${videosToUpload.length}: ${item.file.name}...`
        );

        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("status", isVisible ? "visible" : "hidden");
        if (profile?.userId) {
          formData.append("userId", profile.userId);
        }

        const res = await fetch("/api/upload-website-video", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          successCount++;
        } else {
          toast.error(`Failed to upload ${item.file.name}: ${data.error || "Upload failed"}`);
        }
      }

      if (successCount > 0) {
        broadcastWebsiteVideosUpdate();
        toast.success(
          successCount === 1
            ? "1 video uploaded and published successfully!"
            : `${successCount} videos uploaded and published successfully!`
        );
        router.push("/superadmin/website-videos");
      } else {
        toast.error("Failed to upload selected videos. Please try again.");
      }
    } catch {
      toast.error("An error occurred during video upload");
    } finally {
      setIsSubmitting(false);
      setUploadProgressText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="w-full bg-[#0B0E14] border border-[#1B2232] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
        <VideoDropzone
          ref={fileInputRef}
          onVideosSelected={handleVideosAdded}
          multiple={!replaceTarget}
        />

        {selectedVideos.length > 0 && (
          <SelectedVideosList
            videos={selectedVideos}
            onToggleVideo={handleToggleVideo}
            onToggleAll={handleToggleAll}
            onRemoveVideo={handleRemoveVideo}
            onClearAll={handleClearAll}
            onAddMore={() => fileInputRef.current?.click()}
          />
        )}

        <VideoVisibilitySection
          isVisible={isVisible}
          onToggle={setIsVisible}
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#94A3B8]">
          {selectedVideos.length > 0 && (
            <span>
              {selectedCount} of {selectedVideos.length} video{selectedVideos.length > 1 ? "s" : ""} selected for upload
            </span>
          )}
        </div>

        <div className="flex items-center gap-3.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => router.push("/superadmin/website-videos")}
            disabled={isSubmitting}
            className="cursor-pointer px-6 py-2.5 rounded-xl bg-[#141824] hover:bg-[#1E2538] border border-[#262F44] text-sm font-medium text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || selectedCount === 0}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4FF32] text-black font-semibold text-sm hover:bg-[#CEFE00] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(212,255,50,0.35)]"
          >
            {isSubmitting ? (
              <>
                <CircleNotch size={18} className="animate-spin" />
                <span>{uploadProgressText || "Uploading..."}</span>
              </>
            ) : (
              <>
                <CloudArrowUp size={18} weight="bold" />
                <span>
                  {replaceTarget
                    ? "Replace Video"
                    : selectedCount <= 1
                    ? "Upload Video & Publish"
                    : `Upload ${selectedCount} Videos & Publish`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
