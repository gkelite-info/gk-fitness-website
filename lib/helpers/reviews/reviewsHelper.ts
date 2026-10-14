import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";

export type ReviewRole = "owner" | "trainer" | "customer" | "globaltrainer" | "individual" | "superadmin";

export interface ReviewRecord {
  reviewId: string;
  fullname: string;
  email: string;
  role: ReviewRole;
  ratings: number;
  review: string | null;
  attachmentUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewInput {
  reviewId?: string;
  fullname: string;
  email: string;
  role: ReviewRole | string;
  ratings: number;
  review?: string | null;
  attachmentUrl?: string | null;
}

export interface FetchReviewsFilters {
  role?: ReviewRole;
  minRating?: number;
  limit?: number;
  offset?: number;
}

export const REVIEWS_BUCKET = "reviews";

export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return anonSupabase;
}

export function normalizeReviewRole(rawRole: string): ReviewRole {
  const lower = (rawRole || "").toLowerCase().trim();
  if (lower.includes("owner")) return "owner";
  if (lower.includes("trainer") || lower.includes("coach")) return "trainer";
  if (lower.includes("global")) return "globaltrainer";
  if (lower.includes("admin")) return "superadmin";
  return "customer";
}

export async function ensureReviewsBucket(): Promise<boolean> {
  try {
    const adminClient = getAdminClient();
    const { data: buckets } = await adminClient.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === REVIEWS_BUCKET);

    if (!exists) {
      const { error } = await adminClient.storage.createBucket(REVIEWS_BUCKET, {
        public: true,
        fileSizeLimit: 52428800,
      });
      return !error;
    }
    return true;
  } catch {
    return false;
  }
}

export async function uploadReviewAttachment(
  fileData: ArrayBuffer | Blob | Buffer,
  fileName: string,
  contentType?: string
): Promise<{ publicUrl: string | null; error?: string }> {
  try {
    const adminClient = getAdminClient();
    const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const storagePath = `uploads/${Date.now()}_${cleanName}`;

    const { error: uploadError } = await adminClient.storage
      .from(REVIEWS_BUCKET)
      .upload(storagePath, fileData, {
        contentType: contentType || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      return { publicUrl: null, error: uploadError.message };
    }

    const { data: publicUrlData } = adminClient.storage
      .from(REVIEWS_BUCKET)
      .getPublicUrl(storagePath);

    return { publicUrl: publicUrlData.publicUrl };
  } catch (err: any) {
    return { publicUrl: null, error: err?.message || "Storage upload failed" };
  }
}

export async function createReview(
  input: CreateReviewInput
): Promise<{ data: ReviewRecord | null; error?: string }> {
  try {
    if (!input.fullname?.trim() || !input.email?.trim()) {
      return { data: null, error: "Fullname and email are required." };
    }

    if (input.ratings === undefined || input.ratings === null || Number(input.ratings) < 1) {
      return { data: null, error: "Rating is required and must be between 1 and 5." };
    }

    const client = getAdminClient();
    const now = new Date().toISOString();
    const validRole = normalizeReviewRole(input.role);
    const reviewId = input.reviewId || crypto.randomUUID();

    const insertPayload: ReviewRecord = {
      reviewId,
      fullname: input.fullname.trim(),
      email: input.email.trim(),
      role: validRole,
      ratings: Number(input.ratings) || 5,
      review: input.review?.trim() || null,
      attachmentUrl: input.attachmentUrl?.trim() || null,
      createdAt: now,
      updatedAt: now,
    };

    const { data, error } = await client
      .from("reviews")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data };
  } catch (err: any) {
    return { data: null, error: err?.message || "Failed to create review." };
  }
}

export async function fetchReviews(
  filters?: FetchReviewsFilters
): Promise<{ data: ReviewRecord[]; error?: string; count?: number }> {
  try {
    const client = getAdminClient();
    let query = client
      .from("reviews")
      .select("*", { count: "exact" })
      .order("createdAt", { ascending: false });

    if (filters?.role) {
      query = query.eq("role", filters.role);
    }

    if (typeof filters?.minRating === "number") {
      query = query.gte("ratings", filters.minRating);
    }

    if (typeof filters?.limit === "number") {
      const offset = filters?.offset || 0;
      query = query.range(offset, offset + filters.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: data || [], count: count || 0 };
  } catch (err: any) {
    return { data: [], error: err?.message || "Failed to fetch reviews." };
  }
}

export async function fetchReviewById(
  reviewId: string
): Promise<{ data: ReviewRecord | null; error?: string }> {
  try {
    const client = getAdminClient();
    const { data, error } = await client
      .from("reviews")
      .select("*")
      .eq("reviewId", reviewId)
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data };
  } catch (err: any) {
    return { data: null, error: err?.message || "Failed to fetch review." };
  }
}

export async function deleteReview(
  reviewId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getAdminClient();
    const { error } = await client
      .from("reviews")
      .delete()
      .eq("reviewId", reviewId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete review." };
  }
}
