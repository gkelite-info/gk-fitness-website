"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export async function loginUser(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Fetch the user's role
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("userId", data.user.id)
    .single();

  if (userData?.role && data.user.user_metadata?.role !== userData.role) {
    await supabase.auth.updateUser({
      data: { role: userData.role },
    });
  }

  return { success: true, role: userData?.role };
}

export async function logoutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Error signing out on server:", err);
  }
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

