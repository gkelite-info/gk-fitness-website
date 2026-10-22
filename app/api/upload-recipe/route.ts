import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
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
    const ext = cleanName.split('.').pop() || 'jpg';
    const storagePath = `covers/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await storageClient.storage
      .from("recipes")
      .upload(storagePath, arrayBuffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = storageClient.storage
      .from("recipes")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: storagePath,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to process recipe image upload" },
      { status: 500 }
    );
  }
}
