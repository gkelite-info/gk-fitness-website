"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { CloudArrowUp, Trash, ArrowsClockwise } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../ConfirmationModal";

interface GymLogoUploadCardProps {
  logoUrl?: string;
  onLogoChange: (url?: string) => void;
  isEdit?: boolean;
}

export default function GymLogoUploadCard({
  logoUrl,
  onLogoChange,
  isEdit = false,
}: GymLogoUploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP)", {
        id: "logo-type-err",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit", { id: "logo-size-err" });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onLogoChange(result);
      toast.success("Logo uploaded successfully!", { id: "logo-uploaded" });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveClick = () => {
    if (isEdit) {
      setIsRemoveModalOpen(true);
    } else {
      onLogoChange(undefined);
      toast.success("Logo removed", { id: "logo-remove" });
    }
  };

  const handleConfirmRemove = () => {
    onLogoChange(undefined);
    setIsRemoveModalOpen(false);
    toast.success("Logo removed successfully", { id: "logo-remove-success" });
  };

  return (
    <div className="w-full bg-[#121620] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#94A3B8]">Gym Logo</span>
        {logoUrl && (
          <span className="text-[11px] font-medium text-[#D4FF32]">Uploaded</span>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {logoUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-6 sm:p-8 min-h-[220px] sm:min-h-[250px] md:min-h-[270px] border-2 rounded-2xl bg-[#161B26] gap-4 transition-all ${
            isDragging
              ? "border-[#D4FF32] bg-[#D4FF32]/10"
              : "border-[#232B3C]"
          }`}
        >
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-[#2A3448] bg-[#12151D] shadow-lg">
            <Image
              src={logoUrl}
              alt="Gym Logo Preview"
              fill
              sizes="144px"
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-[#1F2637] hover:bg-[#2B354D] border border-[#2D374E] text-xs font-semibold text-[#CBD5E1] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <ArrowsClockwise size={15} />
              <span>Change Logo</span>
            </button>
            <button
              type="button"
              onClick={handleRemoveClick}
              className="px-3.5 py-2 rounded-xl bg-[#2A1519] hover:bg-[#3D1E24] border border-[#4E222A] text-xs font-semibold text-[#FB7185] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Trash size={15} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full min-h-[220px] sm:min-h-[250px] md:min-h-[270px] py-10 sm:py-14 md:py-16 px-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group ${
            isDragging
              ? "border-[#D4FF32] bg-[#D4FF32]/10 scale-[1.01] shadow-[0_0_25px_rgba(212,255,50,0.15)]"
              : "border-[#242C3D] hover:border-[#D4FF32]/60 bg-[#161B26]/60 hover:bg-[#161B26]"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
              isDragging
                ? "bg-[#D4FF32] text-black border-[#D4FF32]"
                : "bg-[#1C2332] group-hover:bg-[#263147] border-[#29344A] text-[#94A3B8] group-hover:text-[#D4FF32]"
            }`}
          >
            <CloudArrowUp size={28} weight="bold" />
          </div>

          <div className="flex flex-col items-center gap-1 text-center max-w-[240px]">
            <span className="text-sm font-bold text-[#D4FF32] group-hover:underline">
              {isDragging ? "Drop your logo here" : "Upload Logo"}
            </span>
            <span className="text-xs text-[#94A3B8]">
              Drag & drop gym logo or click to browse
            </span>
            <span className="text-[11px] text-[#64748B]">PNG, JPG up to 2MB</span>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Gym Logo"
        message="Are you sure you want to remove the gym logo? This action cannot be undone."
        confirmText="Remove Logo"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
