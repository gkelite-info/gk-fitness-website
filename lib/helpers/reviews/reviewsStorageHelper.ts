import { createClient } from "@supabase/supabase-js";
import { supabase as anonSupabase } from "@/lib/supabase";

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

