"use client";

import { X } from "@phosphor-icons/react";

interface PhotoLightboxModalProps {
  photoUrl: string | null;
  onClose: () => void;
}

export function PhotoLightboxModal({ photoUrl, onClose }: PhotoLightboxModalProps) {
  if (!photoUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl max-h-[90vh] bg-[#0E121A] border border-[#232B3E] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
          aria-label="Close photo preview"
        >
          <X size={18} weight="bold" />
        </button>

        <img
          src={photoUrl}
          alt="Attached review photo preview"
          className="w-full max-h-[85vh] object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
