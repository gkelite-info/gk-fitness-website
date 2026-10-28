export type ReviewStatus = "all" | "visible" | "invisible" | "pending" | "approved" | "deleted";

export interface AdminReviewItem {
  id: string;
  fullname: string;
  email: string;
  role: "owner" | "trainer" | "customer" | "globaltrainer" | "superadmin";
  gymName?: string;
  ratings: number;
  review: string;
  photos?: string[];
  attachmentUrl?: string | null;
  attachmentType?: "photo" | "video" | null;
  status: "visible" | "invisible" | "pending";
  createdAt: string;
  verifiedUser?: boolean;
}

export interface ReviewFiltersState {
  searchQuery: string;
  status: string;
  role: string;
  rating: string;
  sortBy: "newest" | "oldest" | "highest_rated" | "lowest_rated";
}

export interface ReviewsStats {
  total: number;
  approved: number;
  pending: number;
  deleted: number;
  averageRating: number;
}
