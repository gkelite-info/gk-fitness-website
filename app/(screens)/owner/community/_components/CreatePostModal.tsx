"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ArrowRight, Image as ImageIcon, UploadSimple, Lightbulb, Hash, At, CaretLeft, Plus } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  onPost: (content: string, images: string[]) => void;
  initialContent?: string;
  initialImages?: string[];
  isEditing?: boolean;
};

export default function CreatePostModal({ onClose, onPost, initialContent = "", initialImages = [], isEditing = false }: Props) {
  const [caption, setCaption] = useState(initialContent);
  const [images, setImages] = useState<string[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 5;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const availableSlots = MAX_IMAGES - images.length;
    const filesToAdd = validFiles.slice(0, availableSlots);

    const newImageUrls = filesToAdd.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImageUrls]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePost = () => {
    onPost(caption, images);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-[#0C0D10]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-hidden bg-[#12141A] border border-[#232631] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl flex flex-col z-10"
      >
        <div className="flex flex-row justify-between items-center w-full p-4 sm:p-5 border-b border-[#232631] shrink-0 bg-[#12141A] z-20 gap-3">
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1A1D24] hover:bg-[#232631] transition-colors cursor-pointer shrink-0"
          >
            <CaretLeft size={20} className="text-white" weight="bold" />
          </button>
          
          <div className="flex flex-col items-center flex-1 min-w-0 text-center px-2">
            <h2 className="font-['Nimbus_Sans'] font-bold text-[16px] sm:text-[20px] text-white whitespace-nowrap">
              {isEditing ? "Edit Post" : "Create Post"}
            </h2>
            <span className="font-['Nimbus_Sans'] font-medium text-[11px] sm:text-[12px] text-[#94A3B8] hidden sm:block">
              {isEditing ? "Update your post content and photos." : "Share your progress and inspire the community."}
            </span>
          </div>

          <button 
            onClick={handlePost}
            disabled={!caption.trim() && images.length === 0}
            className="flex flex-row items-center justify-center px-4 py-2 gap-2 bg-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.25)] rounded-full hover:bg-[#d4ff33] transition-colors cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-['Nimbus_Sans'] font-bold text-[14px] text-black">
              {isEditing ? "Save" : "Post"}
            </span>
            {isEditing ? null : <ArrowRight size={16} weight="bold" className="text-black" />}
          </button>
        </div>

        <div className="flex flex-col p-5 gap-6 overflow-y-auto scrollbar-themed flex-1">
          
          <div className="flex flex-col gap-2 w-full">
            <span className="font-['Nimbus_Sans'] font-bold text-[12px] tracking-[0.5px] uppercase text-[#94A3B8]">
              CAPTION
            </span>
            <div className="flex flex-col w-full bg-[#161920] border border-[#232631] rounded-xl p-4 gap-4 focus-within:border-[#334155] transition-colors">
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 500))}
                placeholder="Write a caption..."
                className="w-full min-h-[100px] bg-transparent font-['Nimbus_Sans'] text-[14px] text-white placeholder:text-[#475569] resize-none focus:outline-none scrollbar-hide"
              />
              <div className="flex flex-row justify-between items-center w-full pt-3 border-t border-[#232631]">
                <div className="flex flex-row gap-3">
                  <button className="text-[#475569] hover:text-white transition-colors cursor-pointer">
                    <Hash size={16} weight="bold" />
                  </button>
                  <button className="text-[#475569] hover:text-white transition-colors cursor-pointer">
                    <At size={16} weight="bold" />
                  </button>
                </div>
                <span className="font-['Nimbus_Sans'] font-medium text-[12px] text-[#475569]">
                  {caption.length}/500
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
              <div className="flex flex-row items-center gap-2 shrink-0">
                <span className="font-['Nimbus_Sans'] font-bold text-[15px] sm:text-[16px] text-white whitespace-nowrap">
                  Add Photo
                </span>
                <div className="flex items-center justify-center px-2.5 py-1 bg-[#1E293B] rounded-full border border-[#334155] shrink-0">
                  <span className="font-['Nimbus_Sans'] font-medium text-[10px] text-[#94A3B8] whitespace-nowrap leading-none mt-[1px]">
                    Max 5 photos
                  </span>
                </div>
              </div>
              <span className="font-['Nimbus_Sans'] font-medium text-[11px] sm:text-[12px] text-[#C8FF00] whitespace-nowrap">
                High Resolution Supported
              </span>
            </div>

            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center p-6 gap-6 w-full min-h-[260px] bg-[#161920] border-2 border-dashed rounded-xl transition-all ${
                isDragging ? "border-[#C8FF00] bg-[#C8FF00]/5" : "border-[#232631] hover:border-[#334155]"
              }`}
            >
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              
              {images.length > 0 ? (
                <div className="w-full flex flex-row flex-wrap gap-3 justify-center">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg border border-[#334155] overflow-hidden group">
                      <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <X size={12} weight="bold" className="text-white" />
                      </button>
                    </div>
                  ))}
                  {images.length < MAX_IMAGES && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border border-dashed border-[#334155] flex flex-col items-center justify-center gap-1 hover:border-[#C8FF00] hover:bg-[#C8FF00]/5 transition-colors cursor-pointer text-[#94A3B8] hover:text-[#C8FF00]"
                    >
                      <Plus size={20} weight="bold" />
                      <span className="font-['Nimbus_Sans'] font-medium text-[12px]">Add More</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 bg-[#1E293B] border border-[#334155] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(200,255,0,0.1)]">
                    <ImageIcon size={28} weight="fill" className="text-[#C8FF00]" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] text-white">
                      Tap or drag photos here to upload
                    </h3>
                    <p className="font-['Nimbus_Sans'] font-normal text-[12px] text-[#94A3B8]">
                      Supports JPG, PNG, or WEBP up to 15MB each
                    </p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-row items-center justify-center px-4 py-2 gap-2 bg-[#1E293B] border border-[#334155] rounded-full hover:border-[#C8FF00] transition-colors cursor-pointer text-[#C8FF00] mt-2"
                  >
                    <UploadSimple size={16} weight="bold" />
                    <span className="font-['Nimbus_Sans'] font-bold text-[13px]">Upload Photo</span>
                  </button>
                </div>
              )}

              <div className="flex flex-row items-center justify-center pt-4 w-full border-t border-[#232631]/50">
                <div className="flex flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <span className="font-['Nimbus_Sans'] font-medium text-[12px] text-[#475569] mr-1 sm:mr-2 whitespace-nowrap">
                    Slots:
                  </span>
                  {Array.from({ length: MAX_IMAGES }).map((_, i) => {
                    const isFilled = i < images.length;
                    return (
                      <div 
                        key={i} 
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-['Nimbus_Sans'] font-bold text-[10px] transition-all shrink-0 ${
                          isFilled 
                            ? "bg-[#C8FF00]/10 border border-[#C8FF00] text-[#C8FF00] shadow-[0_0_8px_rgba(200,255,0,0.2)]" 
                            : "border border-dashed border-[#334155] text-[#475569]"
                        }`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-4 gap-3 sm:gap-4 w-full bg-[#1A1D24] border border-[#232631] rounded-xl shrink-0 text-center sm:text-left">
            <div className="w-10 h-10 bg-[#161920] border border-[#334155] rounded-lg flex items-center justify-center shrink-0">
              <Lightbulb size={20} weight="fill" className="text-[#C8FF00]" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] text-white">
                Tips
              </span>
              <p className="font-['Nimbus_Sans'] font-normal text-[11px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#94A3B8] break-words">
                Share your workouts, progress, meals or achievements with the community. Tag your PRs and stay respectful!
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
