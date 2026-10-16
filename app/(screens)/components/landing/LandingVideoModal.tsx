"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Pause,
  SpeakerHigh,
  SpeakerSlash,
  CornersOut,
} from "@phosphor-icons/react";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

interface LandingVideoModalProps {
  video: WebsiteVideo | null;
  onClose: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function LandingVideoModal({ video, onClose }: LandingVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeUpdateRef = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(0);
      setPlaybackSpeed(1);
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.0;
        videoRef.current.defaultPlaybackRate = 1.0;
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [video, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const now = Date.now();
    if (now - lastTimeUpdateRef.current > 200) {
      lastTimeUpdateRef.current = now;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  if (!video) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className="relative h-[90vh] sm:h-[94vh] max-h-[94vh] max-w-[95vw] inline-flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/20 select-none group"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer border border-white/30 backdrop-blur-md shadow-xl hover:scale-110 active:scale-95"
        >
          <X size={20} weight="bold" />
        </button>

        <video
          ref={videoRef}
          src={video.videoUrl}
          autoPlay
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.playbackRate = playbackSpeed;
              videoRef.current.defaultPlaybackRate = 1.0;
              setDuration(videoRef.current.duration);
              videoRef.current.play().catch(() => setIsPlaying(false));
            }
          }}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="h-full w-auto max-h-[94vh] max-w-[92vw] object-contain cursor-pointer block rounded-2xl sm:rounded-3xl"
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4FF32] text-black flex items-center justify-center shadow-[0_0_40px_rgba(212,255,50,0.6)] transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
          >
            <Play size={30} weight="fill" className="ml-1 text-black" />
          </button>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-5 pt-10 flex flex-col gap-2.5 transition-opacity duration-200 z-20 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4FF32]"
            style={{
              background: `linear-gradient(to right, #D4FF32 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
            }}
          />

          <div className="flex items-center justify-between text-xs sm:text-sm text-white">
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-[#D4FF32] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-[#D4FF32] transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <SpeakerSlash size={20} weight="bold" />
                ) : (
                  <SpeakerHigh size={20} weight="bold" />
                )}
              </button>

              <button
                type="button"
                onClick={cyclePlaybackSpeed}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#D4FF32] hover:text-black text-xs font-mono font-bold text-white transition-all cursor-pointer"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>

              <span className="text-xs font-mono text-[#94A3B8]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="hover:text-[#D4FF32] transition-colors cursor-pointer"
            >
              <CornersOut size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
