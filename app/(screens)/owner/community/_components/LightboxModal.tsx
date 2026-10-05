"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { PostMedia } from "./mockData";

type Props = {
  media: PostMedia[];
  initialIndex: number;
  onClose: () => void;
};

export default function LightboxModal({ media, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : prev));
  }, [media.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  const modalContent = (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center bg-black/95 backdrop-blur-md">
      
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer z-50"
      >
        <X size={24} weight="bold" className="text-white" />
      </button>

      {media.length > 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className={`absolute left-4 md:left-12 lg:left-24 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer z-50 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <CaretLeft size={24} weight="bold" className="text-white" />
        </button>
      )}

      <div className="relative w-full h-full max-w-7xl max-h-[100dvh] flex items-center justify-center p-4 md:p-12">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={media[currentIndex].url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full object-contain"
            alt="Lightbox media"
          />
        </AnimatePresence>
      </div>

      {media.length > 1 && (
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className={`absolute right-4 md:right-12 lg:right-24 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer z-50 ${currentIndex === media.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <CaretRight size={24} weight="bold" className="text-white" />
        </button>
      )}

      {media.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white font-['Nimbus_Sans'] font-medium text-sm z-50 pointer-events-none">
          {currentIndex + 1} / {media.length}
        </div>
      )}

    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(modalContent, document.body);
}
