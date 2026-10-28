import {
  ReviewRole,
  ReviewStatus,
  ReviewRecord,
  CreateReviewInput,
  UpdateReviewInput,
  FetchReviewsFilters,
} from "./reviewsTypes";
import { getAdminClient } from "./reviewsStorageHelper";

export * from "./reviewsTypes";
export * from "./reviewsStorageHelper";

export function normalizeReviewRole(rawRole: string): ReviewRole {
  const lower = (rawRole || "").toLowerCase().trim();
  if (lower.includes("owner")) return "owner";
  if (lower.includes("global")) return "globaltrainer";
  if (lower.includes("trainer") || lower.includes("coach")) return "trainer";
  if (lower.includes("admin")) return "superadmin";
  return "customer";
}

export function normalizeReviewStatus(rawStatus?: string | null): ReviewStatus {
  const lower = (rawStatus || "").toLowerCase().trim();
  if (lower === "visible" || lower === "approved") return "visible";
  if (lower === "invisible" || lower === "deleted" || lower === "hidden" || lower === "rejected") return "invisible";
  return "pending";
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
    const validStatus = normalizeReviewStatus(input.status);
    const reviewId = input.reviewId || crypto.randomUUID();

    const insertPayload: ReviewRecord = {
      reviewId,
      fullname: input.fullname.trim().slice(0, 255),
      email: input.email.trim().slice(0, 255),
      role: validRole,
      ratings: Number(input.ratings) || 5,
      review: input.review ? input.review.trim().slice(0, 255) : null,
      attachmentUrl: input.attachmentUrl ? input.attachmentUrl.trim().slice(0, 255) : null,
      status: validStatus,
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

    if (filters?.role && filters.role !== ("all" as any)) {
      query = query.eq("role", filters.role);
    }

    if (filters?.status && filters.status !== "all") {
      const normalized = normalizeReviewStatus(filters.status);
      query = query.eq("status", normalized);
    }

    if (typeof filters?.minRating === "number") {
      query = query.gte("ratings", filters.minRating);
    }

    if (filters?.searchQuery?.trim()) {
      const q = filters.searchQuery.trim();
      query = query.or(`fullname.ilike.%${q}%,email.ilike.%${q}%,review.ilike.%${q}%`);
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

export async function updateReviewStatus(
  reviewId: string,
  status: ReviewStatus | string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getAdminClient();
    const { error } = await client
      .from("reviews")
      .update({
        status: normalizeReviewStatus(status),
        updatedAt: new Date().toISOString(),
      })
      .eq("reviewId", reviewId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update review status." };
  }
}

export async function batchUpdateReviewStatus(
  reviewIds: string[],
  status: ReviewStatus | string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!reviewIds || reviewIds.length === 0) return { success: true };
    const client = getAdminClient();
    const { error } = await client
      .from("reviews")
      .update({
        status: normalizeReviewStatus(status),
        updatedAt: new Date().toISOString(),
      })
      .in("reviewId", reviewIds);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to batch update reviews." };
  }
}

export async function updateReview(
  reviewId: string,
  updates: UpdateReviewInput
): Promise<{ data: ReviewRecord | null; error?: string }> {
  try {
    const client = getAdminClient();
    const payload: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (updates.fullname !== undefined) payload.fullname = updates.fullname.trim().slice(0, 255);
    if (updates.email !== undefined) payload.email = updates.email.trim().slice(0, 255);
    if (updates.role !== undefined) payload.role = normalizeReviewRole(updates.role);
    if (updates.ratings !== undefined) payload.ratings = Number(updates.ratings) || 5;
    if (updates.review !== undefined) payload.review = updates.review ? updates.review.trim().slice(0, 255) : null;
    if (updates.attachmentUrl !== undefined) payload.attachmentUrl = updates.attachmentUrl ? updates.attachmentUrl.trim().slice(0, 255) : null;
    if (updates.status !== undefined) payload.status = normalizeReviewStatus(updates.status);

    const { data, error } = await client
      .from("reviews")
      .update(payload)
      .eq("reviewId", reviewId)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data };
  } catch (err: any) {
    return { data: null, error: err?.message || "Failed to update review." };
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
