"use client";

import { useState, useRef } from "react";
import { UploadSimple, FileVideo, CheckCircle, CircleNotch, Link as LinkIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { getWorkoutMediaUrl } from "@/lib/helpers/workoutVideos/workoutVideoHelper";

interface WorkoutVideoSectionProps {
  videoUrl: string;
  onVideoUrlChange: (val: string) => void;
}

export function WorkoutVideoSection({
  videoUrl,
  onVideoUrlChange,
}: WorkoutVideoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const previewUrl = getWorkoutMediaUrl(videoUrl);
  const isGif = videoUrl?.toLowerCase().endsWith(".gif");

  const handleFileUpload = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["mp4", "mov", "webm", "gif"].includes(ext)) {
      toast.error("Please select a valid video (.mp4, .mov, .webm) or animation (.gif) file");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name} to workout-videos storage...`);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-workout-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload file");
      }

      onVideoUrlChange(data.fileName);
      toast.success("Demonstration media uploaded successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 w-full">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white">
          3. Exercise Video / Animation File
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Upload an MP4 video or animated GIF to the Supabase storage bucket 'workout-videos'.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,image/gif"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Drag & drop upload box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          dragOver
            ? "border-[#D4FF32] bg-[#D4FF32]/5"
            : "border-[#262A36] bg-[#181A20] hover:border-[#3B4254] hover:bg-[#1B1E26]"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <CircleNotch size={36} className="text-[#D4FF32] animate-spin" />
            <p className="text-sm font-semibold text-white">Uploading file to storage bucket...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center text-[#D4FF32]">
              <UploadSimple size={24} weight="bold" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Click to browse or drag & drop video/GIF
              </p>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Supports MP4, MOV, WEBM, and GIF (up to 50MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Direct File or URL input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#CBD5E1] flex items-center gap-1.5">
          <LinkIcon size={14} />
          <span>Storage Filename or URL <span className="text-[#D4FF32]">*</span></span>
        </label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => onVideoUrlChange(e.target.value)}
          placeholder="e.g. 1787749148390_video.gif or https://..."
          className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32]"
          required
        />
      </div>

      {/* Live Preview */}
      {previewUrl && (
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-semibold text-[#94A3B8]">Demonstration Preview</span>
          <div className="relative aspect-[16/10] max-h-72 bg-black rounded-xl overflow-hidden border border-[#262A36] flex items-center justify-center">
            {isGif ? (
              <img
                src={previewUrl}
                alt="Exercise preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                src={previewUrl}
                className="w-full h-full object-contain"
                controls
                loop
                autoPlay
                muted
                playsInline
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
