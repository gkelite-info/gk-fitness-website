"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, UploadSimple, Image as ImageIcon, Crop } from "@phosphor-icons/react";

type Props = {
  onClose: () => void;
  onShare: (mediaUrl: string, type: "image" | "video", trimStart?: number, trimEnd?: number) => void;
  initialMedia?: { url: string; type: "image" | "video" };
  initialTrimStart?: number;
  initialTrimEnd?: number;
  isEditing?: boolean;
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function AddStoryModal({ 
  onClose, 
  onShare, 
  initialMedia, 
  initialTrimStart, 
  initialTrimEnd,
  isEditing 
}: Props) {
  const [media, setMedia] = useState<{ url: string; type: "image" | "video" } | null>(initialMedia || null);
  const [isDragging, setIsDragging] = useState(false);
  const [fitMode, setFitMode] = useState<"cover" | "contain">("cover");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video trimming state
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [trimStart, setTrimStart] = useState<number>(initialTrimStart || 0);
  const [trimEnd, setTrimEnd] = useState<number>(initialTrimEnd || 60);
  const [isDraggingHandle, setIsDraggingHandle] = useState<"start" | "end" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoDuration) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= trimEnd) {
        video.currentTime = trimStart;
        video.play();
      } else if (video.currentTime < trimStart) {
        video.currentTime = trimStart;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [trimStart, trimEnd, videoDuration]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingHandle || !trackRef.current || !videoDuration) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const time = percentage * videoDuration;
    
    if (isDraggingHandle === "start") {
      const newStart = Math.min(time, trimEnd - 5); // 5 sec minimum
      if (trimEnd - newStart > 60) {
        setTrimEnd(newStart + 60);
      }
      setTrimStart(Math.max(0, newStart));
      if (videoRef.current) videoRef.current.currentTime = Math.max(0, newStart);
    } else {
      const newEnd = Math.max(time, trimStart + 5); // 5 sec minimum
      if (newEnd - trimStart > 60) {
        setTrimStart(newEnd - 60);
      }
      setTrimEnd(Math.min(videoDuration, newEnd));
      if (videoRef.current) videoRef.current.currentTime = Math.min(videoDuration, newEnd - 0.1);
    }
  };

  const handlePointerUp = () => {
    setIsDraggingHandle(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) return;

    const url = URL.createObjectURL(file);
    setMedia({ url, type: isVideo ? "video" : "image" });
    if (isVideo) {
      setVideoDuration(0);
      setTrimStart(0);
      setTrimEnd(60);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleShare = () => {
    if (media) {
      if (media.type === "video") {
        onShare(media.url, media.type, trimStart, trimEnd);
      } else {
        onShare(media.url, media.type);
      }
      onClose();
    }
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
        className="relative w-full max-w-[800px] max-h-[90vh] rounded-[22px] flex flex-col z-10 overflow-hidden"
        style={{
          boxShadow: "0px 34.34px 68.69px -16.48px rgba(0, 0, 0, 0.25)",
          background: "#161920"
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="flex flex-row justify-between items-start w-full p-5 sm:p-6 bg-[#161920] border-b border-[#232631] shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="font-['Nimbus_Sans'] font-bold text-[20px] sm:text-2xl text-white">
              {isEditing ? "Edit Story" : "Add Story"}
            </h2>
            <span className="font-['Nimbus_Sans'] font-medium text-[12px] sm:text-[13px] text-[#94A3B8]">
              {isEditing ? "Update your story settings." : "Upload an image or video to share with your community."}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1D24] hover:bg-[#232631] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col w-full p-6 sm:p-8 pt-6 overflow-y-auto scrollbar-themed flex-1">
          <div className="flex flex-col md:flex-row gap-6 w-full min-h-[300px] sm:min-h-[400px]">
            
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !media && fileInputRef.current?.click()}
              className={`flex-1 flex flex-col items-center justify-center p-6 gap-4 bg-[#12141A] rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                isDragging ? "border-[#C8FF00] bg-[#C8FF00]/5" : media ? "border-[#334155]" : "border-[#232631] hover:border-[#334155]"
              }`}
            >
              <input 
                type="file" 
                accept="image/*,video/mp4,video/quicktime" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              
              <div className="w-12 h-12 bg-[#1E293B] border border-[#334155] rounded-full flex items-center justify-center shadow-lg shrink-0">
                <UploadSimple size={24} weight="bold" className="text-white" />
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="font-['Nimbus_Sans'] font-bold text-[15px] sm:text-[16px] text-white">
                  Upload photo or video
                </h3>
                <p className="font-['Nimbus_Sans'] font-medium text-[12px] sm:text-[13px] text-[#94A3B8]">
                  Drag and drop or click to choose
                </p>
                <p className="font-['Nimbus_Sans'] font-medium text-[10px] sm:text-[11px] text-[#475569] mt-2">
                  Supports JPG, PNG, MP4
                </p>
              </div>

              {media && (
                <button 
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="mt-4 px-4 py-1.5 bg-[#1E293B] rounded-full text-xs font-bold text-white hover:bg-[#232631] border border-[#334155] transition-colors cursor-pointer"
                >
                  Change Media
                </button>
              )}
            </div>

            <div className="flex-1 flex flex-col bg-[#12141A] rounded-2xl border border-[#232631] overflow-hidden min-h-[250px]">
              <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-[#232631] bg-[#161920]">
                <span className="font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] text-[#94A3B8]">
                  Preview
                </span>
                
                {media && (
                  <button 
                    onClick={() => setFitMode(prev => prev === "cover" ? "contain" : "cover")}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1E293B] hover:bg-[#232631] border border-[#334155] text-xs font-medium text-[#94A3B8] transition-colors cursor-pointer"
                  >
                    <Crop size={14} weight="bold" />
                    {fitMode === "cover" ? "Fit Crop" : "Fill Crop"}
                  </button>
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-center p-4 bg-[#0E0F13] relative overflow-hidden min-h-[250px] sm:min-h-[300px]">
                {media ? (
                  <div className="w-full h-full max-w-[200px] sm:max-w-[250px] max-h-[444px] rounded-xl overflow-hidden relative shadow-2xl mx-auto border border-[#334155] bg-black group">
                    {media.type === "image" ? (
                      <img 
                        src={media.url} 
                        alt="Preview" 
                        className={`w-full h-full object-${fitMode} transition-all duration-300`} 
                      />
                    ) : (
                      <>
                        <video 
                          ref={videoRef}
                          src={media.url} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          onLoadedMetadata={(e) => {
                            const duration = e.currentTarget.duration;
                            setVideoDuration(duration);
                            // Do not blindly reset to 0/60 here! processFile already handles new uploads.
                            // Just ensure trimEnd doesn't exceed the actual duration of the video.
                            setTrimEnd(prev => Math.min(prev, duration));
                            
                            // Jump the preview directly to the trimmed start time!
                            e.currentTarget.currentTime = trimStart;
                          }}
                          className={`w-full h-full object-${fitMode} transition-all duration-300`} 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex justify-between w-full font-['Nimbus_Sans'] text-[9px] text-white">
                            <span>{formatTime(trimStart)}</span>
                            <span>{formatTime(trimEnd)} (Max 1:00)</span>
                          </div>
                          <div 
                            className="relative w-full h-8 bg-white/20 rounded-md overflow-hidden cursor-pointer touch-none"
                            ref={trackRef}
                          >
                            <div 
                              className="absolute h-full border-2 border-[#C8FF00] bg-[#C8FF00]/20 rounded-md flex items-center justify-between"
                              style={{
                                left: `${videoDuration ? (trimStart / videoDuration) * 100 : 0}%`,
                                width: `${videoDuration ? ((trimEnd - trimStart) / videoDuration) * 100 : 0}%`
                              }}
                            >
                               <div 
                                 className="w-4 h-full flex items-center justify-center cursor-ew-resize hover:bg-black/20"
                                 onPointerDown={(e) => { e.stopPropagation(); setIsDraggingHandle("start"); e.currentTarget.setPointerCapture(e.pointerId); }}
                               >
                                 <div className="w-1.5 h-3 bg-white rounded-full" />
                               </div>
                               <div 
                                 className="w-4 h-full flex items-center justify-center cursor-ew-resize hover:bg-black/20"
                                 onPointerDown={(e) => { e.stopPropagation(); setIsDraggingHandle("end"); e.currentTarget.setPointerCapture(e.pointerId); }}
                               >
                                 <div className="w-1.5 h-3 bg-white rounded-full" />
                               </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-[#475569]">
                    <ImageIcon size={40} weight="thin" className="sm:w-12 sm:h-12" />
                    <span className="font-['Nimbus_Sans'] font-medium text-[12px] sm:text-[13px] text-center max-w-[140px]">
                      Your story preview will appear here
                    </span>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          <div className="flex flex-row justify-end items-center w-full gap-3 mt-6 sm:mt-8 shrink-0">
            <button 
              onClick={onClose}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#334155] bg-transparent text-white font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] hover:bg-[#1E293B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleShare}
              disabled={!media}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.25)] text-black font-['Nimbus_Sans'] font-bold text-[13px] sm:text-[14px] hover:bg-[#d4ff33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isEditing ? "Update Story" : "Share Story"}
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {modalContent}
    </AnimatePresence>, 
    document.body
  );
}
