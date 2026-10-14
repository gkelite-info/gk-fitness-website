import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/app/api/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin || "http://localhost:3000";

  if (!uid) {
    return NextResponse.redirect(`${siteUrl}/choose-account?error=invalid_verification`);
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceKey) {
      const adminClient = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });

      await adminClient
        .from("users")
        .update({
          isEmailVerified: true,
          updatedAt: new Date().toISOString(),
        })
        .eq("userId", uid);

      await adminClient.auth.admin.updateUserById(uid, {
        email_confirm: true,
      });
    } else {
      const serverClient = await createServerClient();
      await serverClient
        .from("users")
        .update({
          isEmailVerified: true,
          updatedAt: new Date().toISOString(),
        })
        .eq("userId", uid);
    }

    return NextResponse.redirect(`${siteUrl}/choose-account?verified=true`);
  } catch (err) {
    console.error("[verify-email] Verification error:", err);
    return NextResponse.redirect(`${siteUrl}/choose-account?error=verification_failed`);
  }
}
