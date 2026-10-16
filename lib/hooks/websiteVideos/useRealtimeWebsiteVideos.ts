"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { getWebsiteVideosAction } from "@/app/actions/websiteVideos";
import { WebsiteVideo } from "@/lib/types/websiteVideos";

export function useRealtimeWebsiteVideos() {
  const [videos, setVideos] = useState<WebsiteVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await getWebsiteVideosAction({ status: "visible" });
      if (isMountedRef.current) {
        if (res.success && res.data) {
          setVideos(res.data);
        } else {
          setVideos([]);
        }
      }
    } catch {
      if (isMountedRef.current) {
        setVideos([]);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchVideos();

    const channel = supabase
      .channel("website_videos_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "web_videos" },
        () => {
          fetchVideos();
        }
      )
      .on(
        "broadcast",
        { event: "videos_updated" },
        () => {
          fetchVideos();
        }
      )
      .subscribe();

    return () => {
      isMountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [fetchVideos]);

  return { videos, isLoading, refetch: fetchVideos };
}
