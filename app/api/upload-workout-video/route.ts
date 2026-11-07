import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No video/animation file provided" }, { status: 400 });
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: "Server configuration error: missing service role key" },
        { status: 500 }
      );
    }

    const storageClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-_]/g, "");
    const ext = cleanName.split('.').pop()?.toLowerCase() || 'mp4';
    const fileName = `${Date.now()}_video.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const contentType = ext === 'gif' ? 'image/gif' : (file.type || `video/${ext}`);

    const { error: uploadError } = await storageClient.storage
      .from("workout-videos")
      .upload(fileName, arrayBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("[upload-workout-video] Storage upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = storageClient.storage
      .from("workout-videos")
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      fileName,
      publicUrl: publicUrlData?.publicUrl || "",
    });
  } catch (error: any) {
    console.error("[upload-workout-video] Unexpected route error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload workout video" },
      { status: 500 }
    );
  }
}
