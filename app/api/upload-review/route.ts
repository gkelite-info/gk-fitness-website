import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";

    if (!serviceRoleKey) {
      return NextResponse.json({ error: "Server configuration error: missing service role key" }, { status: 500 });
    }

    const storageClient = createClient(supabaseUrl, serviceRoleKey);
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const storagePath = `uploads/${Date.now()}_${cleanName}`;
    const arrayBuffer = await file.arrayBuffer();

    const { error: uploadError } = await storageClient.storage
      .from("reviews")
      .upload(storagePath, arrayBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = storageClient.storage
      .from("reviews")
      .getPublicUrl(storagePath);

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Upload failed" }, { status: 500 });
  }
}
