"use server";

import {
  fetchWebsiteVideos,
  fetchWebsiteVideoById,
  createWebsiteVideo,
  updateWebsiteVideo,
  toggleWebsiteVideoStatus,
  deleteWebsiteVideo,
  uploadWebsiteVideoFile,
  getWebVideosClient,
} from "@/lib/helpers/websiteVideos/websiteVideosHelper";
import { WebsiteVideo, CreateWebsiteVideoInput, VideoStatus } from "@/lib/types/websiteVideos";

async function broadcastUpdate() {
  try {
    const client = getWebVideosClient();
    const channel = client.channel("website_videos_realtime");
    await channel.send({
      type: "broadcast",
      event: "videos_updated",
      payload: { timestamp: Date.now() },
    });
  } catch {
    // ignore
  }
}

export async function getWebsiteVideosAction(filters?: {
  query?: string;
  status?: string;
  date?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data: WebsiteVideo[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error?: string;
}> {
  try {
    const res = await fetchWebsiteVideos(filters);
    return {
      success: true,
      data: res.list,
      total: res.total,
      page: res.page,
      pageSize: res.pageSize,
      totalPages: res.totalPages,
    };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: filters?.pageSize || 10,
      totalPages: 1,
      error: err?.message || "Failed to load website videos",
    };
  }
}

export async function getWebsiteVideoByIdAction(id: string): Promise<{
  success: boolean;
  data?: WebsiteVideo | null;
  error?: string;
}> {
  try {
    const item = await fetchWebsiteVideoById(id);
    return { success: true, data: item };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to find website video",
    };
  }
}

export async function saveWebsiteVideoAction(
  input: CreateWebsiteVideoInput,
  userId?: string | null
): Promise<{
  success: boolean;
  data?: WebsiteVideo;
  error?: string;
}> {
  try {
    if (!input.videoUrl) {
      return { success: false, error: "A video file or URL is required." };
    }
    const created = await createWebsiteVideo(input, userId);
    await broadcastUpdate();
    return { success: true, data: created };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to save website video",
    };
  }
}

export async function replaceWebsiteVideoAction(
  id: string,
  updates: Partial<CreateWebsiteVideoInput>
): Promise<{
  success: boolean;
  data?: WebsiteVideo | null;
  error?: string;
}> {
  try {
    const updated = await updateWebsiteVideo(id, updates);
    await broadcastUpdate();
    return { success: true, data: updated };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to update website video",
    };
  }
}

export async function toggleWebsiteVideoStatusAction(
  id: string,
  newStatus: VideoStatus
): Promise<{
  success: boolean;
  data?: WebsiteVideo | null;
  error?: string;
}> {
  try {
    const updated = await toggleWebsiteVideoStatus(id, newStatus);
    await broadcastUpdate();
    return { success: true, data: updated };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to update video status",
    };
  }
}

export async function deleteWebsiteVideoAction(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const ok = await deleteWebsiteVideo(id);
    if (ok) {
      await broadcastUpdate();
    }
    return { success: ok };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to delete website video",
    };
  }
}

export async function uploadWebsiteVideoFileAction(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No video file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const res = await uploadWebsiteVideoFile(arrayBuffer, file.name, file.type);

    if (res.error || !res.publicUrl) {
      return {
        success: false,
        error: res.error || "Failed to upload video to storage",
      };
    }

    return { success: true, url: res.publicUrl };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to upload attachment",
    };
  }
}
