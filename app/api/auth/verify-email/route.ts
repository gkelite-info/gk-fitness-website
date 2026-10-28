import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/app/api/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid");
  const email = searchParams.get("email");

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const isLocal = host?.includes("localhost") || host?.includes("127.0.0.1");
  const proto = request.headers.get("x-forwarded-proto") || (isLocal ? "http" : "https");
  const siteUrl = host ? `${proto}://${host}` : (request.nextUrl.origin || "https://www.gkgymlife.com");

  if (!uid && !email) {
    return NextResponse.redirect(`${siteUrl}/login?type=individual&error=invalid_verification`);
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceKey) {
      const adminClient = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });

      if (uid && email) {
        await adminClient
          .from("users")
          .update({ isEmailVerified: true, updatedAt: new Date().toISOString() })
          .or(`userId.eq.${uid},email.eq.${email.trim().toLowerCase()}`);
      } else if (uid) {
        await adminClient
          .from("users")
          .update({ isEmailVerified: true, updatedAt: new Date().toISOString() })
          .eq("userId", uid);
      } else if (email) {
        await adminClient
          .from("users")
          .update({ isEmailVerified: true, updatedAt: new Date().toISOString() })
          .eq("email", email.trim().toLowerCase());
      }

      if (uid) {
        await adminClient.auth.admin.updateUserById(uid, {
          email_confirm: true,
        });
      }
    } else {
      const serverClient = await createServerClient();
      if (uid) {
        await serverClient
          .from("users")
          .update({ isEmailVerified: true, updatedAt: new Date().toISOString() })
          .eq("userId", uid);
      }
    }

    return NextResponse.redirect(`${siteUrl}/login?type=individual&verified=true`);
  } catch (err) {
    console.error("[verify-email] Verification error:", err);
    return NextResponse.redirect(`${siteUrl}/login?type=individual&error=verification_failed`);
  }
}
