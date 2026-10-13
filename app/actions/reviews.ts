"use server";

import {
  createReview,
  fetchReviews,
  fetchReviewById,
  deleteReview,
  uploadReviewAttachment,
  CreateReviewInput,
  FetchReviewsFilters,
  ReviewRecord,
} from "@/lib/helpers/reviews/reviewsHelper";

export async function submitReviewAction(input: CreateReviewInput): Promise<{
  success: boolean;
  data?: ReviewRecord | null;
  error?: string;
}> {
  try {
    const res = await createReview(input);
    if (res.error) {
      return { success: false, error: res.error };
    }
    return { success: true, data: res.data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to submit review.",
    };
  }
}

export async function uploadReviewFileAction(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const res = await uploadReviewAttachment(
      arrayBuffer,
      file.name,
      file.type
    );

    if (res.error || !res.publicUrl) {
      return { success: false, error: res.error || "Upload failed" };
    }

    return { success: true, url: res.publicUrl };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to upload attachment",
    };
  }
}

export async function getReviewsAction(filters?: FetchReviewsFilters): Promise<{
  success: boolean;
  data: ReviewRecord[];
  count?: number;
  error?: string;
}> {
  try {
    const res = await fetchReviews(filters);
    if (res.error) {
      return { success: false, data: [], error: res.error };
    }
    return { success: true, data: res.data, count: res.count };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      error: err?.message || "Failed to retrieve reviews",
    };
  }
}

export async function getReviewByIdAction(reviewId: string): Promise<{
  success: boolean;
  data?: ReviewRecord | null;
  error?: string;
}> {
  try {
    const res = await fetchReviewById(reviewId);
    if (res.error) {
      return { success: false, error: res.error };
    }
    return { success: true, data: res.data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to load review",
    };
  }
}

export async function removeReviewAction(reviewId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const res = await deleteReview(reviewId);
    return res;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to delete review",
    };
  }
}
