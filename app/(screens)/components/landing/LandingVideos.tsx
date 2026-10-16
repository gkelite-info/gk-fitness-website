"use client";

import { useState, useMemo } from "react";
import { VideoCamera } from "@phosphor-icons/react";
import { useRealtimeWebsiteVideos } from "@/lib/hooks/websiteVideos/useRealtimeWebsiteVideos";
import { WebsiteVideo } from "@/lib/types/websiteVideos";
import LandingVideoCard from "./LandingVideoCard";
import LandingVideoModal from "./LandingVideoModal";

import LandingVideosShimmer from "./LandingVideosShimmer";

export default function LandingVideos() {
  const { videos, isLoading } = useRealtimeWebsiteVideos();
  const [activeVideo, setActiveVideo] = useState<WebsiteVideo | null>(null);

  const marqueeVideos = useMemo(() => {
    if (videos.length <= 1) return videos;
    if (videos.length >= 4) {
      return [...videos, ...videos];
    }
    let list = [...videos];
    while (list.length < 4) {
      list = [...list, ...videos];
    }
    return [...list, ...list];
  }, [videos]);

  if (!isLoading && videos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="w-full py-12 lg:py-16 bg-[#07080B] border-t border-white/10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15161C] border border-[#232631] text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-3">
          <VideoCamera size={14} weight="bold" />
          Inside GK-Gym Life
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic tracking-tight text-white leading-tight">
          See GK-Gym Life <span className="text-[#D4FF32] not-italic">In Action</span>
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
          Explore our facility walkthroughs, smart front-desk workflows, and member experience in action.
        </p>
      </div>

      {isLoading ? (
        <LandingVideosShimmer />
      ) : videos.length === 1 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LandingVideoCard
            video={videos[0]}
            isModalOpen={!!activeVideo}
            onPlay={(selected) => setActiveVideo(selected)}
          />
        </div>
      ) : (
        <div className="w-full overflow-hidden no-scrollbar select-none relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#07080B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#07080B] to-transparent z-10 pointer-events-none" />

          <div
            className="animate-marquee-continuous gap-4 sm:gap-6 py-2 px-4"
            style={{ animationPlayState: activeVideo ? "paused" : "running" }}
          >
            {marqueeVideos.map((vid, idx) => (
              <LandingVideoCard
                key={`${vid.id}-${idx}`}
                video={vid}
                isModalOpen={!!activeVideo}
                onPlay={(selected) => setActiveVideo(selected)}
              />
            ))}
          </div>
        </div>
      )}

      <LandingVideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}
