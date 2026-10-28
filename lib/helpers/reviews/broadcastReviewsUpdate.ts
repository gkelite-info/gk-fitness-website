import { getAdminClient } from "./reviewsStorageHelper";

export async function broadcastReviewsUpdate(): Promise<void> {
  try {
    const client = getAdminClient();
    const channel = client.channel("website_reviews_realtime");
    await channel.send({
      type: "broadcast",
      event: "reviews_updated",
      payload: { timestamp: Date.now() },
    });
  } catch {
    // Broadcast is best-effort
  }
}

