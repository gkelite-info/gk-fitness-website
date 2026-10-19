import { createClient } from "@/app/api/supabase/client";

export async function setClientRecoverySession(accessToken: string, refreshToken?: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || "",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to set recovery session",
    };
  }
}

export async function checkClientSession() {
  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      return { success: true, email: session.user.email || "" };
    }

    return { success: false };
  } catch {
    return { success: false };
  }
}

export async function updateUserPasswordClient(password: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to update password",
    };
  }
}

export async function exchangeResetCodeClient(code: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, session: data.session };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to exchange reset code",
    };
  }
}

export async function verifyRecoveryTokenHashClient(tokenHash: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "recovery",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, session: data.session, user: data.user };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to verify token",
    };
  }
}
