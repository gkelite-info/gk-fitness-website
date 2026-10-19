import { NextRequest, NextResponse } from "next/server";
import { sendMailViaTransport } from "@/lib/helpers/mailTransport";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Please enter your email address." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const host = request.headers.get("host") || "";
    const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const siteUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || "https://gkgymlife.com");

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://swzhxokkrolnxvhekrmj.supabase.co";

    const adminKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_KEY ||
      process.env.SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

    if (!adminKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error: SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.",
        },
        { status: 500 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const admin = createClient(supabaseUrl, adminKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const redirectTo = `${siteUrl.replace(/\/$/, "")}/reset-password`;
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo,
      },
    });

    if (linkError) {
      if (linkError.message?.toLowerCase().includes("not found")) {
        return NextResponse.json(
          { success: false, error: "No account found with this email address." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, error: linkError.message || "Failed to generate reset link." },
        { status: 400 }
      );
    }

    if (!linkData?.properties) {
      return NextResponse.json(
        { success: false, error: "Failed to create password recovery link." },
        { status: 500 }
      );
    }

    const tokenHash = linkData.properties.hashed_token;
    const resetLink = tokenHash
      ? `${siteUrl.replace(/\/$/, "")}/reset-password?token_hash=${tokenHash}`
      : linkData.properties.action_link;

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Reset Your Password</title></head>
<body style="margin:0;padding:0;background-color:#0C0D10;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0C0D10;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:480px;background-color:#14161C;border:1px solid #232631;border-radius:20px;padding:36px 28px;text-align:center;">
        <tr><td style="padding-bottom:20px;">
          <span style="font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;">GK<span style="color:#D4FF32;">-GYM LIFE</span></span>
        </td></tr>
        <tr><td style="padding-bottom:12px;">
          <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;">Reset Your Password</h1>
        </td></tr>
        <tr><td style="padding-bottom:28px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#94A3B8;">We received a request to reset your password. Click the button below to choose a new password.</p>
        </td></tr>
        <tr><td style="padding-bottom:28px;">
          <a href="${resetLink}" target="_blank" style="display:inline-block;background-color:#D4FF32;color:#000000;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:12px;">Reset Password &rarr;</a>
        </td></tr>
        <tr><td style="padding-bottom:16px;">
          <p style="margin:0;font-size:12px;color:#64748B;">If you didn't request this, you can safely ignore this email. This link expires in 1 hour.</p>
        </td></tr>
        <tr><td style="border-top:1px solid #1F222E;padding-top:16px;">
          <p style="margin:0;font-size:11px;color:#475569;">&copy; ${new Date().getFullYear()} GK-Gym Life. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

    const sendRes = await sendMailViaTransport({
      to: email,
      subject: "Reset Your Password | GK Gym Life",
      html: emailHtml,
    });

    if (!sendRes.success) {
      return NextResponse.json(
        {
          success: false,
          error: sendRes.error || "Failed to deliver reset email. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to process password reset";
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
