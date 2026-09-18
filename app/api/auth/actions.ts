"use server";

import { createClient } from "@/app/api/supabase/server";

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

