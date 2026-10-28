"use client";

import { useState } from "react";
import { X, Star, CircleNotch } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import UploadReviewMediaPicker from "./UploadReviewMediaPicker";
import { submitReviewAction } from "@/app/actions/reviews";

interface UploadReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: {
    name: string;
    role: string;
    rating: number;
    text: string;
    photos: string[];
    videos: string[];
    date: string;
  }) => void;
}

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "trainer", label: "Trainer" },
  { value: "customer", label: "Customer" },
  { value: "globaltrainer", label: "Global Trainer" },
  { value: "individual", label: "Global Customer" },
  { value: "superadmin", label: "Super Admin" },
];

export default function UploadReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: UploadReviewModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !reviewText.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!rating || rating < 1) {
      toast.error("Rating is required. Please select at least 1 star.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPhotos: string[] = photos.filter((p) => !p.startsWith("blob:"));
      let uploadedAttachmentUrl: string | null = null;

      if (rawFiles.length > 0) {
        for (const file of rawFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const uploadResponse = await fetch("/api/upload-review", {
            method: "POST",
            body: formData,
          });

          const uploadRes = await uploadResponse.json();

          if (!uploadResponse.ok || uploadRes.error) {
            throw new Error(uploadRes.error || "Failed to upload photo");
          }

          if (uploadRes.url) {
            uploadedAttachmentUrl = uploadRes.url;
            if (!finalPhotos.includes(uploadRes.url)) {
              finalPhotos.push(uploadRes.url);
            }
          }
        }
      }

      const deduplicatedPhotos = Array.from(new Set(finalPhotos));

      if (!uploadedAttachmentUrl) {
        uploadedAttachmentUrl = deduplicatedPhotos[0] || null;
      }

      const res = await submitReviewAction({
        fullname: fullName,
        email,
        role,
        ratings: Number(rating),
        review: reviewText,
        attachmentUrl: uploadedAttachmentUrl,
        status: "pending",
      });

      if (!res.success) {
        toast.error(res.error || "Failed to submit review.");
        setIsSubmitting(false);
        return;
      }

      const today = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date());

      onSubmitReview({
        name: fullName,
        role,
        rating,
        text: reviewText,
        photos: deduplicatedPhotos.length > 0 ? deduplicatedPhotos : ["/images/landing/crm-technology.jpg"],
        videos: [],
        date: today,
      });

      toast.success("Review and photo submitted successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#232631]">
          <div>
            <h3 className="text-base sm:text-lg font-black uppercase italic tracking-tight text-white">
              SHARE YOUR <span className="text-[#D4FF32] not-italic">EXPERIENCE</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Upload photos and tell us about your journey
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1C1E24] hover:bg-[#252830] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto scrollbar-themed space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
              YOUR FULL NAME *
            </label>
            <input
              type="text"
              required
              maxLength={255}
              placeholder="e.g. Rahul Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
              YOUR EMAIL ADDRESS *
            </label>
            <input
              type="email"
              required
              maxLength={255}
              placeholder="e.g. yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
                YOUR ROLE *
              </label>
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors cursor-pointer"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#14151A] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
                RATING *
              </label>
              <div className="flex items-center gap-1.5 h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star size={19} weight={star <= rating ? "fill" : "regular"} />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#CBD5E1] ml-2">{rating}/5</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider">
                YOUR REVIEW / EXPERIENCE *
              </label>
              <span className="text-[11px] text-[#64748B]">
                {reviewText.length}/255
              </span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={255}
              placeholder="Tell us about your experience with GK- Gym Life, operations, gym workouts, or coaching..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors resize-none scrollbar-themed"
            />
          </div>

          <UploadReviewMediaPicker
            photos={photos}
            videos={videos}
            onPhotosChange={setPhotos}
            onVideosChange={setVideos}
            onRawFilesChange={setRawFiles}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.3)] active:scale-[0.98] cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Saving Review &amp; Media...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
