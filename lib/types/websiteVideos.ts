export type VideoStatus = "visible" | "hidden";

export interface WebVideoRecord {
  webVideoId: string;
  videoUrl: string;
  webVisible: boolean;
  createdBy: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WebsiteVideo {
  id: string;
  videoUrl: string;
  status: VideoStatus;
  uploadedAt: string;
  duration: string;
  thumbnailUrl?: string | null;
  title?: string;
  fileSize?: string;
  createdBy?: string;
  creatorName?: string;
  creatorRole?: string;
  creatorCity?: string;
  rating?: number;
  quote?: string;
  isDeleted?: boolean;
}

export interface CreateWebsiteVideoInput {
  id?: string;
  videoUrl: string;
  status: VideoStatus;
  duration?: string;
  thumbnailUrl?: string | null;
  title?: string;
  fileSize?: string;
}
