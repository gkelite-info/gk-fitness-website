"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play, Pause, SpeakerHigh, SpeakerSlash, CornersOut } from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface WebsiteVideoPreviewModalProps {
  video: WebsiteVideo | null;
  onClose: () => void;
}

export function WebsiteVideoPreviewModal({ video, onClose }: WebsiteVideoPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0D111A] border border-[#222938] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E2538]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white m-0">
              {video.title || "Website Video Preview"}
            </h2>
            <span className="text-xs text-[#94A3B8]">({video.duration})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1A202E] transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="relative bg-black flex items-center justify-center aspect-video max-h-[60vh] overflow-hidden">
          <video
            ref={videoRef}
            src={video.videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
          />

          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/70 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:border-[#D4FF32] transition-transform"
            >
              <Play size={24} weight="fill" className="ml-1 text-white hover:text-[#D4FF32]" />
            </button>
          )}
        </div>

        <div className="p-4 bg-[#0E121A] border-t border-[#1E2538] flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#222938] rounded-lg appearance-none cursor-pointer accent-[#D4FF32]"
          />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="cursor-pointer p-2 rounded-lg text-white hover:bg-[#1A202E]"
              >
                {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="cursor-pointer p-2 rounded-lg text-white hover:bg-[#1A202E]"
              >
                {isMuted ? <SpeakerSlash size={18} /> : <SpeakerHigh size={18} />}
              </button>
              <span className="text-xs font-mono text-[#94A3B8]">
                {formatSeconds(currentTime)} / {formatSeconds(duration)}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="cursor-pointer p-2 rounded-lg text-white hover:bg-[#1A202E]"
            >
              <CornersOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
