import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";
import {
  WebsiteVideo,
  CreateWebsiteVideoInput,
  VideoStatus,
  WebVideoRecord,
} from "@/lib/types/websiteVideos";

const VIDEOS_BUCKET = "reviews";

export function getWebVideosClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return anonSupabase;
}

import { mapRowToWebsiteVideo, parseDateSearch } from "./websiteVideosMapper";

export interface FetchWebsiteVideosFilters {
  query?: string;
  status?: string;
  date?: string;
  page?: number;
  pageSize?: number;
}

export interface FetchWebsiteVideosResult {
  list: WebsiteVideo[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function fetchWebsiteVideos(
  filters?: FetchWebsiteVideosFilters
): Promise<FetchWebsiteVideosResult> {
  const client = getWebVideosClient();

  let query = client
    .from("web_videos")
    .select("*, creator:createdBy(userId, name, role, city)", { count: "exact" })
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  if (filters?.status === "visible") {
    query = query.eq("webVisible", true);
  } else if (filters?.status === "hidden") {
    query = query.eq("webVisible", false);
  }

  const dateRange = parseDateSearch(filters?.date) || parseDateSearch(filters?.query);
  if (dateRange) {
    query = query
      .gte("createdAt", dateRange.start)
      .lte("createdAt", dateRange.end);
  }

  const page = Math.max(1, filters?.page || 1);
  const pageSize = filters?.pageSize || 10;

  if (filters?.page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  let { data, count, error } = await query;

  if (error || !data) {
    let fallbackQuery = client
      .from("web_videos")
      .select("*", { count: "exact" })
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false });

    if (filters?.status === "visible") {
      fallbackQuery = fallbackQuery.eq("webVisible", true);
    } else if (filters?.status === "hidden") {
      fallbackQuery = fallbackQuery.eq("webVisible", false);
    }

    if (dateRange) {
      fallbackQuery = fallbackQuery
        .gte("createdAt", dateRange.start)
        .lte("createdAt", dateRange.end);
    }

    if (filters?.page) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      fallbackQuery = fallbackQuery.range(from, to);
    }

    const fallbackRes = await fallbackQuery;
    data = fallbackRes.data || [];
    count = fallbackRes.count ?? data.length;
  }

  let list = (data as any[]).map(mapRowToWebsiteVideo);

  if (filters?.query?.trim()) {
    const q = filters.query.toLowerCase().trim();
    list = list.filter((v) => {
      const d = new Date(v.uploadedAt);
      const formattedDate = !isNaN(d.getTime())
        ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toLowerCase()
        : "";
      return (
        v.videoUrl.toLowerCase().includes(q) ||
        v.uploadedAt.toLowerCase().includes(q) ||
        formattedDate.includes(q) ||
        v.status.toLowerCase().includes(q) ||
        (v.title ? v.title.toLowerCase().includes(q) : false)
      );
    });
  }

  const total = count ?? list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    list,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function fetchWebsiteVideoById(
  id: string
): Promise<WebsiteVideo | null> {
  const client = getWebVideosClient();

  const { data, error } = await client
    .from("web_videos")
    .select("*")
    .eq("webVideoId", id)
    .eq("is_deleted", false)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapRowToWebsiteVideo(data as WebVideoRecord);
}

export async function createWebsiteVideo(
  input: CreateWebsiteVideoInput,
  userId?: string | null
): Promise<WebsiteVideo> {
  const client = getWebVideosClient();

  let finalUserId = userId || null;
  if (!finalUserId) {
    const { data: superadmin } = await client
      .from("users")
      .select("userId")
      .eq("role", "superadmin")
      .limit(1)
      .maybeSingle();
    finalUserId = superadmin?.userId || null;
  }

  if (!finalUserId) {
    throw new Error("Unable to determine creator user ID");
  }

  const webVideoId = input.id || crypto.randomUUID();
  const now = new Date().toISOString();
  const webVisible = input.status === "visible";

  const payload: WebVideoRecord = {
    webVideoId,
    videoUrl: input.videoUrl,
    webVisible,
    createdBy: finalUserId,
    is_deleted: false,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  const { data, error } = await client
    .from("web_videos")
    .insert(payload)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create web video");
  }

  return mapRowToWebsiteVideo(data as WebVideoRecord);
}

export async function updateWebsiteVideo(
  id: string,
  updates: Partial<CreateWebsiteVideoInput>
): Promise<WebsiteVideo | null> {
  const client = getWebVideosClient();
  const now = new Date().toISOString();

  const payload: Record<string, any> = {
    updatedAt: now,
  };

  if (updates.videoUrl !== undefined) {
    payload.videoUrl = updates.videoUrl;
  }

  if (updates.status !== undefined) {
    payload.webVisible = updates.status === "visible";
  }

  const { data, error } = await client
    .from("web_videos")
    .update(payload)
    .eq("webVideoId", id)
    .select()
    .single();

  if (error || !data) {
    return null;
  }

  return mapRowToWebsiteVideo(data as WebVideoRecord);
}

export async function toggleWebsiteVideoStatus(
  id: string,
  status: VideoStatus
): Promise<WebsiteVideo | null> {
  return updateWebsiteVideo(id, { status });
}

export async function deleteWebsiteVideo(id: string): Promise<boolean> {
  const client = getWebVideosClient();
  const now = new Date().toISOString();

  const { error } = await client
    .from("web_videos")
    .update({
      is_deleted: true,
      deletedAt: now,
      updatedAt: now,
    })
    .eq("webVideoId", id);

  return !error;
}

export async function uploadWebsiteVideoFile(
  fileData: ArrayBuffer | Blob | Buffer,
  fileName: string,
  contentType?: string
): Promise<{ publicUrl: string | null; error?: string }> {
  try {
    const adminClient = getWebVideosClient();
    const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const storagePath = `website-videos/${Date.now()}_${cleanName}`;

    const { error: uploadError } = await adminClient.storage
      .from(VIDEOS_BUCKET)
      .upload(storagePath, fileData, {
        contentType: contentType || "video/mp4",
        upsert: true,
      });

    if (uploadError) {
      return { publicUrl: null, error: uploadError.message };
    }

    const { data: publicUrlData } = adminClient.storage
      .from(VIDEOS_BUCKET)
      .getPublicUrl(storagePath);

    return { publicUrl: publicUrlData.publicUrl };
  } catch (err: any) {
    return { publicUrl: null, error: err?.message || "Storage upload failed" };
  }
}
