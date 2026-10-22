"use client";

import { useState, useRef, useEffect } from "react";
import {
  CloudArrowUp,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash,
  CircleNotch,
  CheckCircle,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { updateRecipePhotoAction } from "@/app/actions/recipes";

interface RecipeImageSectionProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  recipeId?: string;
}

export function RecipeImageSection({
  imageUrl,
  onImageChange,
  recipeId,
}: RecipeImageSectionProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [urlInput, setUrlInput] = useState(imageUrl || "");
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrlInput(imageUrl || "");
  }, [imageUrl]);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading high-resolution recipe photo...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-recipe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to upload image");
      }

      onImageChange(data.url);
      setUrlInput(data.url);
      setImageError(false);

      if (recipeId) {
        const updateRes = await updateRecipePhotoAction(recipeId, data.url);
        if (updateRes.success) {
          toast.success("Photo uploaded and saved to recipe!", { id: toastId });
        } else {
          toast.success("Photo uploaded successfully!", { id: toastId });
        }
      } else {
        toast.success("Recipe photo uploaded successfully!", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUrlApply = async () => {
    if (!urlInput.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    const clean = urlInput.trim();
    if (clean.length > 255) {
      toast.error("Image URL exceeds 255 characters. Please use a shorter URL or upload the file.");
      return;
    }
    setImageError(false);
    onImageChange(clean);

    if (recipeId) {
      setIsSavingPhoto(true);
      const toastId = toast.loading("Saving photo URL to recipe...");
      const res = await updateRecipePhotoAction(recipeId, clean);
      if (res.success) {
        toast.success("Image URL applied and saved to recipe!", { id: toastId });
      } else {
        toast.error(res.error || "Failed to save photo URL", { id: toastId });
      }
      setIsSavingPhoto(false);
    } else {
      toast.success("Image URL applied!");
    }
  };

  const handleRemove = async () => {
    onImageChange("");
    setUrlInput("");
    setImageError(false);

    if (recipeId) {
      setIsSavingPhoto(true);
      const toastId = toast.loading("Removing photo from recipe...");
      const res = await updateRecipePhotoAction(recipeId, null);
      if (res.success) {
        toast.success("Photo removed and saved to database!", { id: toastId });
      } else {
        toast.error(res.error || "Failed to remove photo", { id: toastId });
      }
      setIsSavingPhoto(false);
    } else {
      toast.success("Photo removed!");
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ImageIcon size={18} className="text-[#D4FF32]" />
            <span>Recipe Photo & Cover</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Upload high-resolution photography to Supabase Storage or paste an external image URL.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#181A20] rounded-xl border border-[#262A36] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "upload"
                ? "bg-[#D4FF32] text-black shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <CloudArrowUp size={15} weight={activeTab === "upload" ? "bold" : "regular"} />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "url"
                ? "bg-[#D4FF32] text-black shadow-sm"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <LinkIcon size={15} weight={activeTab === "url" ? "bold" : "regular"} />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      {activeTab === "upload" ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#282D3D] hover:border-[#D4FF32]/60 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[#15171F]/50 hover:bg-[#181B24] transition-all text-center"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-[#D4FF32]">
              <CircleNotch size={32} className="animate-spin" />
              <p className="text-xs font-medium text-white">Uploading to recipes bucket...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center text-[#D4FF32]">
                <CloudArrowUp size={24} weight="fill" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Click to browse or drag & drop recipe image
                </p>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Stored directly in Supabase Storage. Supports JPEG, PNG, WebP up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4 bg-[#15171F]/50 border border-[#232631] rounded-xl">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Image URL (HTTPS)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onImageChange(e.target.value);
                setImageError(false);
              }}
              className="flex-1 h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
            />
            <button
              type="button"
              disabled={isSavingPhoto}
              onClick={handleUrlApply}
              className="h-10 px-4 rounded-xl bg-[#D4FF32] hover:bg-[#c2ed25] text-black font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle size={15} weight="bold" />
              <span>{recipeId ? "Apply & Save" : "Apply"}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Paste any public image link (Unsplash, CDN, or cloud storage).
          </p>
        </div>
      )}

      {imageUrl ? (
        <div className="flex flex-col gap-2 pt-2 border-t border-[#1C202B]">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-medium text-white">Selected Image Preview:</span>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isSavingPhoto}
              className="text-[#EF4444] hover:underline flex items-center gap-1 disabled:opacity-50"
            >
              <Trash size={13} />
              <span>{recipeId ? "Remove & Save" : "Remove Photo"}</span>
            </button>
          </div>

          <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#0A0B0E] border border-[#262A36] group">
            {imageError ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center">
                <p className="text-xs text-[#EF4444] font-medium">
                  Failed to load image from URL. Please verify the link.
                </p>
                <p className="text-[11px] text-[#64748B] truncate max-w-md">{imageUrl}</p>
              </div>
            ) : (
              <img
                src={imageUrl}
                alt="Recipe Cover Preview"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-[#94A3B8] truncate max-w-[80%]">
                {imageUrl}
              </span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] text-[#D4FF32] hover:underline font-semibold shrink-0"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-[#181A20] rounded-xl border border-dashed border-[#262A36] flex items-center justify-between text-xs text-[#94A3B8]">
          <span>No cover photo selected (default meal placeholder will be used)</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
