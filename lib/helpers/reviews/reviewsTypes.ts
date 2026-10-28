export type ReviewRole = "owner" | "trainer" | "customer" | "globaltrainer" | "superadmin";

export type ReviewStatus = "visible" | "invisible" | "pending";

export interface ReviewRecord {
  reviewId: string;
  fullname: string;
  email: string;
  role: ReviewRole;
  ratings: number;
  review: string | null;
  attachmentUrl: string | null;
  status: ReviewStatus;
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
  status?: ReviewStatus | string;
}

export interface UpdateReviewInput {
  fullname?: string;
  email?: string;
  role?: ReviewRole | string;
  ratings?: number;
  review?: string | null;
  attachmentUrl?: string | null;
  status?: ReviewStatus | string;
}

export interface FetchReviewsFilters {
  role?: ReviewRole;
  status?: ReviewStatus | string;
  minRating?: number;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}
