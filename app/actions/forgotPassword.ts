"use server";

import { headers } from "next/headers";
import { createClient } from "@/app/api/supabase/server";
import { sendMailViaTransport } from "@/lib/helpers/mailTransport";

export type PasswordResetResult = {
  success: boolean;
  error?: string;
  retryAfter?: number;
};

export async function requestPasswordResetAction(email: string): Promise<PasswordResetResult> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return { success: false, error: "Please enter your email address." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const proto = headersList.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
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
      return {
        success: false,
        error: "Server configuration error: SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.",
      };
    }

    const { createClient: createAdminClient } = await import("@supabase/supabase-js");
    const admin = createAdminClient(supabaseUrl, adminKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const redirectTo = `${siteUrl.replace(/\/$/, "")}/reset-password`;
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "recovery",
      email: cleanEmail,
      options: {
        redirectTo,
      },
    });

    if (linkError) {
      if (linkError.message?.toLowerCase().includes("not found")) {
        return { success: false, error: "No account found with this email address." };
      }
      return { success: false, error: linkError.message || "Failed to generate reset link." };
    }

    if (!linkData?.properties) {
      return { success: false, error: "Failed to create password recovery link." };
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
      to: cleanEmail,
      subject: "Reset Your Password | GK Gym Life",
      html: emailHtml,
    });

    if (!sendRes.success) {
      return {
        success: false,
        error: sendRes.error || "Failed to deliver reset email. Please try again.",
      };
    }

    return { success: true };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to send reset email. Please try again.";
    return {
      success: false,
      error: errMsg,
    };
  }
}

export async function exchangeResetCodeAction(code: string) {
  if (!code) {
    return { success: false, error: "Missing authorization code." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to exchange reset code.";
    return {
      success: false,
      error: errMsg,
    };
  }
}

export async function validateRecoverySessionAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { success: false, error: "No active recovery session found." };
    }

    return { success: true, email: user.email || "" };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to validate session.";
    return {
      success: false,
      error: errMsg,
    };
  }
}

export async function updatePasswordAction(password: string) {
  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to update password. Please try again.";
    return {
      success: false,
      error: errMsg,
    };
  }
}

export async function verifyRecoveryTokenHashAction(tokenHash: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to verify recovery token";
    return {
      success: false,
      error: errMsg,
    };
  }
}
