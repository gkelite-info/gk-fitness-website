"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

async function clearAuthCookies() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    allCookies.forEach((c) => {
      if (c.name.startsWith("sb-") || c.name.includes("auth-token") || c.name.includes("supabase")) {
        cookieStore.delete(c.name);
        cookieStore.set(c.name, "", { maxAge: 0, path: "/" });
      }
    });
  } catch (err) {
    console.error("Error clearing auth cookies:", err);
  }
}

export async function loginUser(email: string, password: string, selectedType?: string | null) {
  const supabase = await createClient();
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      return { error: "Please verify your email address by clicking the confirmation link sent to your email before logging in." };
    }
    return { error: error.message };
  }

  // Fetch the user's role and verification status
  const { data: userData } = await supabase
    .from("users")
    .select("role, isEmailVerified, email")
    .eq("userId", data.user.id)
    .maybeSingle();

  let userRecord = userData;
  if (!userRecord && data.user.email) {
    const { data: emailUser } = await supabase
      .from("users")
      .select("role, isEmailVerified, email")
      .eq("email", data.user.email.toLowerCase().trim())
      .maybeSingle();
    userRecord = emailUser;
  }

  const rawRole = (userRecord?.role || data.user.user_metadata?.role || "").toLowerCase().trim();
  const cleanRole = rawRole.replace(/[-_]/g, "");

  if (userRecord && userRecord.role === "individual") {
    userRecord.role = "customer";
    await supabase
      .from("users")
      .update({ role: "customer" })
      .eq("userId", data.user.id);
  }

  if (userRecord && userRecord.role === "global_trainer") {
    userRecord.role = "globaltrainer";
    await supabase
      .from("users")
      .update({ role: "globaltrainer" })
      .eq("userId", data.user.id);
  }

  if (cleanRole === "globaltrainer" && userRecord && userRecord.isEmailVerified === false) {
    userRecord.isEmailVerified = true;
    await supabase
      .from("users")
      .update({ isEmailVerified: true })
      .eq("userId", data.user.id);
  }

  if (data?.user?.email_confirmed_at && userRecord && userRecord.isEmailVerified === false) {
    userRecord.isEmailVerified = true;
    await supabase
      .from("users")
      .update({ isEmailVerified: true })
      .eq("userId", data.user.id);
  }

  if (userRecord && userRecord.isEmailVerified === false && !data?.user?.email_confirmed_at && cleanRole !== "globaltrainer") {
    await clearAuthCookies();
    return { error: "Please check your email and click the confirmation link to activate your account before logging in." };
  }

  if (selectedType) {
    const normalizedType = selectedType.toLowerCase().trim().replace(/[-_]/g, "");
    let roleMatches = false;

    if (normalizedType === "globaltrainer") {
      roleMatches = cleanRole === "globaltrainer" || cleanRole === "trainer";
    } else if (normalizedType === "owner" || normalizedType === "gymowner") {
      roleMatches = cleanRole === "owner" || cleanRole === "superadmin";
    } else if (normalizedType === "individual" || normalizedType === "customer") {
      roleMatches = cleanRole === "customer" || cleanRole === "individual";
    } else if (normalizedType === "trainer") {
      roleMatches = cleanRole === "trainer" || cleanRole === "globaltrainer";
    } else {
      roleMatches = true;
    }

    if (!roleMatches) {
      await clearAuthCookies();
      return { error: "Invalid credentials or check role" };
    }
  }

  if (userRecord?.role && data.user.user_metadata?.role !== userRecord.role) {
    try {
      await supabase.auth.updateUser({
        data: { role: userRecord.role },
      });
    } catch {
      // Best-effort metadata update
    }
  }

  return { success: true, role: userRecord?.role || data.user.user_metadata?.role };
}

export async function logoutUser() {
  await clearAuthCookies();
  return { success: true };
}

export async function rollbackAuthUser(userId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY. Cannot delete user from Auth.");
    return { error: 'Missing service role key' };
  }

  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey);
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error(`Failed to delete user ${userId} from Auth:`, error.message);
    return { error: error.message };
  }

  return { success: true };
}

export async function getCurrentUserRole() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role, name, email, isEmailVerified")
      .eq("userId", user.id)
      .maybeSingle();

    if (userData && userData.isEmailVerified === false) {
      return { success: false, error: "Email not verified" };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: userData?.name || user.user_metadata?.name || "",
        role: userData?.role || user.user_metadata?.role || "customer",
        isEmailVerified: userData?.isEmailVerified === true,
      },
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to fetch user role",
    };
  }
}

