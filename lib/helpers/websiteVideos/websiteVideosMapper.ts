import { WebsiteVideo } from "@/lib/types/websiteVideos";

export function parseDateSearch(raw?: string): { start: string; end: string } | null {
  if (!raw) return null;
  const q = raw.trim();
  if (q.length < 3) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
    return { start: `${q}T00:00:00.000Z`, end: `${q}T23:59:59.999Z` };
  }

  const dmy = q.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmy) {
    const day = dmy[1].padStart(2, "0");
    const month = dmy[2].padStart(2, "0");
    const year = dmy[3];
    return {
      start: `${year}-${month}-${day}T00:00:00.000Z`,
      end: `${year}-${month}-${day}T23:59:59.999Z`,
    };
  }

  const dt = new Date(q);
  if (!isNaN(dt.getTime()) && q.length >= 6) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return {
      start: `${y}-${m}-${d}T00:00:00.000Z`,
      end: `${y}-${m}-${d}T23:59:59.999Z`,
    };
  }

  return null;
}

export function mapRowToWebsiteVideo(row: any): WebsiteVideo {
  const creator = row.creator;
  const role = creator?.role || "owner";
  const name = creator?.name || "GK Gym Partner";
  const city = creator?.city || "GK- Gym Life";

  return {
    id: row.webVideoId,
    videoUrl: row.videoUrl,
    status: row.webVisible ? "visible" : "hidden",
    uploadedAt: row.createdAt,
    duration: "00:45",
    thumbnailUrl: null,
    title: `${name} · ${role === "owner" ? "Gym Owner" : role === "trainer" ? "Head Coach" : "Member"} Review`,
    fileSize: "15.0 MB",
    createdBy: row.createdBy,
    creatorName: name,
    creatorRole: role,
    creatorCity: city,
    rating: 5,
    quote:
      role === "owner"
        ? "GK Gym Life automated all billing, biometric check-ins & increased our renewal rate by 42% in 90 days."
        : role === "trainer"
        ? "Managing training schedules, client tracking, and workout splits has never been this seamless."
        : "The workout logs, attendance tracking & nutrition split in the GK Gym app keep me consistent every day.",
    isDeleted: row.is_deleted,
  };
}
