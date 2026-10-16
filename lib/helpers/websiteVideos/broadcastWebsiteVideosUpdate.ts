import { supabase } from "@/lib/supabase";

export async function broadcastWebsiteVideosUpdate(): Promise<void> {
  try {
    const channel = supabase.channel("website_videos_realtime");
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.send({
          type: "broadcast",
          event: "videos_updated",
          payload: { timestamp: Date.now() },
        });
        setTimeout(() => {
          supabase.removeChannel(channel);
        }, 1500);
      }
    });
  } catch (err) {
    console.error("[broadcastWebsiteVideosUpdate] Error:", err);
  }
}
