"use client";

import { useState } from "react";
import Image from "next/image";
import { X, UploadSimple, Star, CircleNotch, Trash } from "@phosphor-icons/react";
import toast from "react-hot-toast";

interface UploadReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: {
    name: string;
    role: string;
    rating: number;
    text: string;
    photos: string[];
    date: string;
  }) => void;
}

export default function UploadReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
}: UploadReviewModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Gym Member");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newUrls = filesArray.map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...newUrls].slice(0, 4));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !reviewText.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const today = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date());

      onSubmitReview({
        name: fullName,
        role: role.trim() || "Gym Partner",
        rating,
        text: reviewText,
        photos: photos.length > 0 ? photos : ["/images/landing/crm-technology.jpg"],
        date: today,
      });

      setIsSubmitting(false);
      toast.success("Review uploaded successfully! It is now visible.");
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#14151A] border border-[#232631] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#232631] shrink-0">
          <div>
            <h3 className="text-lg font-bold text-white">Upload Review</h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Share your journey and photos with GK- Gym Life community.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E2028] transition-colors cursor-pointer"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto scrollbar-themed space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
              YOUR FULL NAME *
            </label>
            <input
              type="text"
              required
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
              placeholder="e.g. yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
                YOUR ROLE / GYM NAME
              </label>
              <input
                type="text"
                placeholder="e.g. Gym Owner • Iron Hub"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
                RATING
              </label>
              <div className="flex items-center gap-1.5 h-11 px-3.5 rounded-xl bg-[#0C0D10] border border-[#232631]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star size={20} weight={star <= rating ? "fill" : "regular"} />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#CBD5E1] ml-2">{rating}/5</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
              YOUR REVIEW / EXPERIENCE *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about your experience with GK- Gym Life, operations, gym workouts, or coaching..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#0C0D10] border border-[#232631] text-white text-sm focus:border-[#D4FF32] outline-none transition-colors resize-none scrollbar-themed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 uppercase tracking-wider">
              UPLOAD PHOTOS
            </label>
            <label className="border-2 border-dashed border-[#232631] hover:border-[#D4FF32]/50 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-[#0C0D10]/50 transition-colors">
              <UploadSimple size={24} className="text-[#D4FF32] mb-1.5" weight="bold" />
              <span className="text-xs font-medium text-[#CBD5E1]">
                Click to select or drag and drop photos
              </span>
              <span className="text-[10px] text-[#94A3B8] mt-0.5">PNG, JPG, WEBP up to 5MB</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {photos.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-themed">
                {photos.map((src, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 group">
                    <Image src={src} alt="Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash size={16} weight="bold" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,255,50,0.3)] active:scale-[0.98] cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch size={18} className="animate-spin" />
                  Submitting Review...
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
