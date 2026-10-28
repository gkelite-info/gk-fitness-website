"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function useRealtimeReviews(onUpdate: () => void) {
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    const channel = supabase
      .channel("website_reviews_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => {
          onUpdateRef.current();
        }
      )
      .on(
        "broadcast",
        { event: "reviews_updated" },
        () => {
          onUpdateRef.current();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}

