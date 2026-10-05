"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, CaretLeft, CaretRight, DotsThree, Heart, PencilSimple, Trash } from "@phosphor-icons/react";
import { Story } from "./mockData";
import Avatar from "@/app/(screens)/components/reusable/Avatar";

type Props = {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
  onEdit?: (storyId: string, segmentIndex: number) => void;
  onDelete?: (storyId: string, segmentIndex: number) => void;
};

import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";

export default function ViewStoryModal({ stories, initialIndex, onClose, onEdit, onDelete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];
  const segments = currentStory?.segments || (currentStory ? [{ url: currentStory.avatar, type: "image" as const }] : []);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [miniHearts, setMiniHearts] = useState<{id: number, x: number, delay: number, size: number, rotation: number}[]>([]);
  const [likesMap, setLikesMap] = useState<Record<string, boolean>>({});

  const currentSegmentKey = `${currentStory?.id}-${currentSegmentIndex}`;
  const isLiked = likesMap[currentSegmentKey] || false;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    setLikesMap(prev => {
      const currentlyLiked = prev[currentSegmentKey];
      
      if (!currentlyLiked) {
        // Spawn hearts only when liking
        const generated = Array.from({ length: 8 }).map((_, i) => {
          const signX = Math.random() > 0.5 ? 1 : -1;
          return {
            id: Date.now() + i + Math.random(),
            x: signX * (10 + Math.random() * 30),
            delay: Math.random() * 0.2,
            size: 20 + Math.random() * 15,
            rotation: (Math.random() - 0.5) * 40
          };
        });
        setMiniHearts(hearts => [...hearts, ...generated]);

        setTimeout(() => {
          setMiniHearts(hearts => hearts.filter(h => !generated.find(g => g.id === h.id)));
        }, 1500);
      }
      
      return { ...prev, [currentSegmentKey]: !currentlyLiked };
    });
  };

  const isPaused = showDropdown || showDeleteConfirm;
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const goNext = useCallback(() => {
    if (currentSegmentIndex < segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1);
    } else if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSegmentIndex(0);
    } else {
      onClose();
    }
  }, [currentSegmentIndex, segments.length, currentIndex, stories.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentSegmentIndex > 0) {
      setCurrentSegmentIndex((prev) => prev - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setCurrentSegmentIndex(0);
    }
  }, [currentSegmentIndex, currentIndex]);

  const goNextUser = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSegmentIndex(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goPrevUser = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setCurrentSegmentIndex(0);
    }
  }, [currentIndex]);

  const goNextRef = useRef(goNext);

  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  const isTransitioningRef = useRef(false);
  const isVideoReady = useRef(false);

  useEffect(() => {
    isTransitioningRef.current = false;
    isVideoReady.current = false;
  }, [currentSegmentIndex, currentIndex]);

  const currentSegment = segments[currentSegmentIndex];
  const isVideo = currentSegment?.type === "video";

  useEffect(() => {
    setProgress(0);
    if (!currentSegment || currentSegment.type === "video") return;

    let startTime: number | null = null;
    let totalPausedTime = 0;
    let lastPauseStart: number | null = null;
    let animationFrameId: number;
    const DURATION = 5000;

    const updateProgress = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      if (isPausedRef.current) {
        if (lastPauseStart === null) lastPauseStart = timestamp;
      } else {
        if (lastPauseStart !== null) {
          totalPausedTime += timestamp - lastPauseStart;
          lastPauseStart = null;
        }
        
        const elapsed = timestamp - startTime - totalPausedTime;
        const p = (elapsed / DURATION) * 100;
        
        if (p >= 100) {
          setProgress(100);
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true;
            goNextRef.current();
          }
        } else {
          setProgress(p);
        }
      }
      
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, currentSegmentIndex, currentSegment?.type]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
    }
  }, [isPaused]);

  if (!currentStory) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden">
      
      <button 
        onClick={(e) => { e.stopPropagation(); goPrevUser(); }}
        className={`hidden md:flex absolute left-4 md:left-12 lg:left-24 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors cursor-pointer z-50 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <CaretLeft size={24} weight="bold" className="text-white" />
      </button>

      <motion.div
        key={currentStory.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full max-w-[450px] md:h-[85vh] md:rounded-[24px] overflow-hidden bg-[#161920] shadow-2xl flex flex-col"
      >
        {currentSegment?.type === "video" ? (
          <video 
            ref={videoRef}
            key={`vid-${currentStory.id}-${currentSegmentIndex}`}
            src={currentSegment.url} 
            autoPlay 
            muted 
            playsInline
            onLoadedMetadata={(e) => {
              if (currentSegment.trimStart !== undefined) {
                e.currentTarget.currentTime = currentSegment.trimStart;
              } else {
                isVideoReady.current = true;
              }
            }}
            onSeeked={() => {
              isVideoReady.current = true;
            }}
            onTimeUpdate={(e) => {
              if (!isVideoReady.current) return;
              const video = e.currentTarget;
              const tStart = currentSegment.trimStart || 0;
              const tEnd = currentSegment.trimEnd || video.duration || 60;
              
              if (video.currentTime >= tEnd && !isTransitioningRef.current) {
                isTransitioningRef.current = true;
                goNext();
              } else if (tEnd > tStart) {
                const p = ((video.currentTime - tStart) / (tEnd - tStart)) * 100;
                setProgress(Math.max(0, Math.min(100, p)));
              }
            }}
            onEnded={() => {
              if (!isTransitioningRef.current) {
                isTransitioningRef.current = true;
                goNext();
              }
            }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <img 
            key={`img-${currentStory.id}-${currentSegmentIndex}`}
            src={currentSegment?.url} 
            alt={currentStory.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}
        
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10" />

        <div className="relative z-20 flex flex-col w-full p-4 pt-12 md:pt-4 gap-4">
          
          <div className="flex flex-row w-full gap-1.5 h-1">
            {segments.map((_, idx) => (
              <div key={idx} className="flex-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-[#C8FF00] rounded-full ${isVideo ? 'transition-all duration-300 ease-linear' : ''} ${idx < currentSegmentIndex ? 'w-full' : idx === currentSegmentIndex ? '' : 'w-0'}`}
                  style={idx === currentSegmentIndex ? { width: `${progress}%` } : {}}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-3">
              <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-[#C8FF00] to-[#10B981]">
                <div className="absolute inset-0.5 bg-[#161920] rounded-full" />
                <Avatar 
                  src={currentStory.avatar} 
                  alt={currentStory.name}
                  className="relative w-full h-full rounded-full object-cover z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Nimbus_Sans'] font-bold text-[14px] text-white leading-tight drop-shadow-md">
                  {currentStory.name}
                </span>
                <span className="font-['Nimbus_Sans'] font-medium text-[11px] text-white/80 drop-shadow-md">
                  2h ago
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center gap-4">
              {currentStory.isUser && (
                <div className="relative">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
                    className="text-white hover:text-[#C8FF00] transition-colors cursor-pointer p-1"
                  >
                    <DotsThree size={24} weight="bold" />
                  </button>
                  {showDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowDropdown(false); }} />
                      <div className="absolute right-0 mt-2 w-36 bg-[#161920] border border-[#232730] rounded-xl shadow-xl z-50 flex flex-col py-1 overflow-hidden">
                        <button 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left cursor-pointer" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowDropdown(false); 
                            onEdit?.(currentStory.id, currentSegmentIndex); 
                          }}
                        >
                          <PencilSimple size={16} />
                          Edit
                        </button>
                        <button 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#F43F5E] hover:bg-white/5 transition-colors text-left cursor-pointer" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowDropdown(false); 
                            setShowDeleteConfirm(true); 
                          }}
                        >
                          <Trash size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              <button onClick={onClose} className="text-white hover:text-red-500 transition-colors cursor-pointer p-1">
                <X size={20} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-row mt-24 mb-24">
          <div className="flex-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); goPrev(); }} />
          <div className="flex-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); goNext(); }} />
        </div>

        <div className="absolute bottom-6 right-4 md:right-6 z-30 flex flex-col items-end">
          <div className="relative">
            {miniHearts.map(heart => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 0, x: 0, scale: 0.5, rotate: 0 }}
                animate={{ 
                  opacity: 0, 
                  y: -150 - Math.random() * 50, 
                  x: heart.x,
                  scale: 1,
                  rotate: heart.rotation 
                }}
                transition={{ duration: 1, delay: heart.delay, ease: "easeOut" }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <Heart size={heart.size} weight="fill" className="text-[#C8FF00] drop-shadow-[0_0_15px_rgba(200,255,0,0.4)]" />
              </motion.div>
            ))}
          </div>

          <button 
            onClick={handleLike}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#C8FF00] transition-colors cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
          >
            <Heart size={24} weight={isLiked ? "fill" : "regular"} className={isLiked ? "text-[#C8FF00]" : ""} />
          </button>
        </div>

      </motion.div>

      <button 
        onClick={(e) => { e.stopPropagation(); goNextUser(); }}
        className={`hidden md:flex absolute right-4 md:right-12 lg:right-24 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors cursor-pointer z-50`}
      >
        <CaretRight size={24} weight="bold" className="text-white" />
      </button>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete?.(currentStory.id, currentSegmentIndex);
        }}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );

  return createPortal(
    <AnimatePresence>
      {modalContent}
    </AnimatePresence>,
    document.body
  );
}
