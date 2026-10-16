"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface LandingVideoCardProps {
  video: WebsiteVideo;
  isModalOpen?: boolean;
  onPlay: (video: WebsiteVideo) => void;
}

export default function LandingVideoCard({
  video,
  isModalOpen = false,
  onPlay,
}: LandingVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isModalOpen) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isModalOpen, video.videoUrl]);

  return (
    <div
      onClick={() => onPlay(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-80 sm:h-96 w-56 sm:w-64 shrink-0 rounded-2xl overflow-hidden bg-[#11131A] border border-white/10 hover:border-[#D4FF32] shadow-xl hover:shadow-[0_0_35px_rgba(212,255,50,0.35)] transition-all duration-300 cursor-pointer select-none"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
      />

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D4FF32] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,255,50,0.5)] transition-all duration-300 ${
            isHovered ? "scale-110 bg-[#CEFE00]" : "scale-100 opacity-90"
          }`}
        >
          <Play size={24} weight="fill" className="ml-1 text-black" />
        </div>
      </div>

      {video.duration && (
        <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded-md bg-black/80 border border-white/10 text-[11px] font-mono font-semibold text-white/90 pointer-events-none backdrop-blur-sm">
          {video.duration}
        </div>
      )}
    </div>
  );
}
