"use client";

import Image from "next/image";
import {
  UploadSimple,
  Trash,
} from "@phosphor-icons/react";

/* Video uploading preset samples commented out - text and photos only
export const SAMPLE_PRESET_VIDEOS = [
  {
    label: "Lunges Workout",
    url: "https://swzhxokkrolnxvhekrmj.supabase.co/storage/v1/object/public/reviews/samples/gym-workout-lunges.mp4",
  },
  {
    label: "Medicine Ball Drill",
    url: "https://swzhxokkrolnxvhekrmj.supabase.co/storage/v1/object/public/reviews/samples/gym-medicine-ball.mp4",
  },
  {
    label: "Coach Training Split",
    url: "https://swzhxokkrolnxvhekrmj.supabase.co/storage/v1/object/public/reviews/samples/gym-training-session.mp4",
  },
];
*/

interface UploadReviewMediaPickerProps {
  photos: string[];
  videos?: string[];
  onPhotosChange: (updater: (prev: string[]) => string[]) => void;
  onVideosChange?: (updater: (prev: string[]) => string[]) => void;
  onRawFilesChange?: (files: File[]) => void;
}

export default function UploadReviewMediaPicker({
  photos,
  videos = [],
  onPhotosChange,
  onVideosChange,
  onRawFilesChange,
}: UploadReviewMediaPickerProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      if (onRawFilesChange) {
        onRawFilesChange(filesArray);
      }

      const newPhotos: string[] = [];
      /* Video uploading commented out - Here text and photos will be uploaded
      const newVideos: string[] = [];
      */

      filesArray.forEach((file) => {
        const url = URL.createObjectURL(file);
        /* Video uploading commented out - Here text and photos will be uploaded
        if (file.type.startsWith("video/")) {
          newVideos.push(url);
        } else {
          newPhotos.push(url);
        }
        */
        if (file.type.startsWith("image/")) {
          newPhotos.push(url);
        }
      });

      if (newPhotos.length > 0) {
        onPhotosChange((prev) => [...prev, ...newPhotos].slice(0, 5));
      }

      /* Video uploading commented out - Here text and photos will be uploaded
      if (newVideos.length > 0 && onVideosChange) {
        onVideosChange((prev) => [...prev, ...newVideos].slice(0, 3));
      }
      */
    }
  };

  /* Video sample toggle commented out - Here text and photos will be uploaded
  const handleToggleSampleVideo = (url: string) => {
    if (onVideosChange) {
      onVideosChange((prev) => {
        if (prev.includes(url)) {
          return prev.filter((v) => v !== url);
        }
        return [...prev, url].slice(0, 3);
      });
    }
  };
  */

  const handleRemovePhoto = (index: number) => {
    onPhotosChange((prev) => prev.filter((_, i) => i !== index));
  };

  /* Video removal commented out - Here text and photos will be uploaded
  const handleRemoveVideo = (index: number) => {
    if (onVideosChange) {
      onVideosChange((prev) => prev.filter((_, i) => i !== index));
    }
  };
  */

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
          UPLOAD PHOTOS
        </label>
        <span className="text-[11px] text-[#94A3B8]">
          {photos.length}/5 photos attached
        </span>
      </div>

      <label className="border-2 border-dashed border-[#232631] hover:border-[#D4FF32]/60 rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center cursor-pointer bg-[#0C0D10]/50 transition-colors group">
        <div className="flex items-center gap-2 text-[#D4FF32] mb-1.5 group-hover:scale-105 transition-transform">
          <UploadSimple size={24} weight="bold" />
        </div>
        <span className="text-xs font-medium text-[#CBD5E1] text-center">
          Click to select or drag and drop photos
        </span>
        <span className="text-[10px] text-[#94A3B8] mt-0.5 text-center">
          Photos (PNG, JPG, WEBP)
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          /* Video uploading in comment: accept="video/*,image/*" */
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Video uploading commented out - Here text and photos will be uploaded
      <div className="mt-3">
        <span className="text-[10px] sm:text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-1.5">
          Or attach sample workout video:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_PRESET_VIDEOS.map((sample) => (
            <button key={sample.url} type="button">...</button>
          ))}
        </div>
      </div>
      */}

      {photos.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider block">
            Selected Photos ({photos.length})
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-themed">
            {/* Video preview commented out - Here text and photos will be uploaded
            {videos.map((vidUrl, idx) => (
              <div key={`vid-${idx}`} ... />
            ))}
            */}

            {photos.map((src, idx) => (
              <div
                key={`pic-${idx}`}
                className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 border border-white/10 group"
              >
                <Image src={src} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash size={12} weight="bold" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
