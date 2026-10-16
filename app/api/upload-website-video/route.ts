import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const status = (formData.get("status") as string) || "visible";
    const replaceId = formData.get("replaceId") as string | null;
    const userIdInput = formData.get("userId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
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

    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const storagePath = `website-videos/${Date.now()}_${cleanName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await storageClient.storage
      .from("reviews")
      .upload(storagePath, arrayBuffer, {
        contentType: file.type || "video/mp4",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = storageClient.storage
      .from("reviews")
      .getPublicUrl(storagePath);

    const videoUrl = publicUrlData.publicUrl;
    const now = new Date().toISOString();
    const isVisible = status === "visible";

    if (replaceId) {
      const { error: updateError } = await storageClient
        .from("web_videos")
        .update({
          videoUrl,
          webVisible: isVisible,
          updatedAt: now,
        })
        .eq("webVideoId", replaceId);

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message || "Failed to update web video record" },
          { status: 500 }
        );
      }
    } else {
      let finalUserId = userIdInput;
      if (!finalUserId) {
        const { data: superadmin } = await storageClient
          .from("users")
          .select("userId")
          .eq("role", "superadmin")
          .limit(1)
          .maybeSingle();
        finalUserId = superadmin?.userId || null;
      }

      if (!finalUserId) {
        return NextResponse.json(
          { error: "Unable to find creator user" },
          { status: 500 }
        );
      }

      const { error: insertError } = await storageClient.from("web_videos").insert({
        webVideoId: crypto.randomUUID(),
        videoUrl,
        webVisible: isVisible,
        createdBy: finalUserId,
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      });

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message || "Failed to save web video record" },
          { status: 500 }
        );
      }
    }

    try {
      const realtimeChannel = storageClient.channel("website_videos_realtime");
      await realtimeChannel.send({
        type: "broadcast",
        event: "videos_updated",
        payload: { timestamp: Date.now() },
      });
    } catch {
      // ignore broadcast error
    }

    return NextResponse.json({ success: true, url: videoUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to process video upload" },
      { status: 500 }
    );
  }
}
