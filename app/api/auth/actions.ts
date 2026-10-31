"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { verifyPassword, hashPassword } from "@/lib/helpers/auth/passwordHelper";
import { resolveUserRole, validateUserType } from "@/app/api/auth/loginRoleCheck";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;
  return createSupabaseClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

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

export async function loginUser(
  email: string,
  password: string,
  selectedType?: string | null,
  gymId?: string | null
) {
  const supabase = await createClient();
  const cleanEmail = email.trim().toLowerCase();

  const rejectAuth = async (message: string) => {
    try {
      await supabase.auth.signOut();
    } catch { }
    await clearAuthCookies();
    return { error: message };
  };

  const adminClient = getAdminClient();
  const db = adminClient || supabase;

  let authUser: any = null;
  let fallbackUserData: any = null;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (!error && data?.user) {
    authUser = data.user;
  } else if (password.trim() !== password) {
    const secondAttempt = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: password.trim(),
    });
    if (!secondAttempt.error && secondAttempt.data?.user) {
      authUser = secondAttempt.data.user;
    }
  }

  if (!authUser) {
    let userQuery = db
      .from("users")
      .select("userId, name, email, phone, role, status, isEmailVerified, isPhoneVerified, password");

    if (cleanEmail.includes("@")) {
      userQuery = userQuery.ilike("email", cleanEmail);
    } else {
      const cleanDigits = cleanEmail.replace(/[^0-9]/g, "");
      const last10 = cleanDigits.slice(-10);
      userQuery = userQuery.or(`phone.ilike.%${last10}%,email.ilike.%${last10}%`);
    }

    const { data: dbUser } = await userQuery.maybeSingle();

    if (dbUser && dbUser.password) {
      const isMatch = await verifyPassword(password, dbUser.password);
      if (isMatch) {
        if (!dbUser.password.startsWith("$2")) {
          try {
            const upgradedHash = await hashPassword(password);
            await db.from("users").update({ password: upgradedHash }).eq("userId", dbUser.userId);
          } catch { }
        }

        if (!dbUser.isEmailVerified) {
          try {
            await db.from("users").update({ isEmailVerified: true }).eq("userId", dbUser.userId);
          } catch { }
        }

        if (adminClient) {
          try {
            await adminClient.auth.admin.updateUserById(dbUser.userId, {
              email_confirm: true,
              password: password.trim(),
            });
            const reAttempt = await supabase.auth.signInWithPassword({
              email: dbUser.email || cleanEmail,
              password: password.trim(),
            });
            if (reAttempt.data?.user) {
              authUser = reAttempt.data.user;
            }
          } catch { }
        }

        if (!authUser) {
          authUser = {
            id: dbUser.userId,
            email: dbUser.email,
            user_metadata: { role: dbUser.role, name: dbUser.name, phone: dbUser.phone },
          };
          fallbackUserData = { id: dbUser.userId, email: dbUser.email, role: dbUser.role, name: dbUser.name };
        }
      } else {
        return { error: "Invalid email or password. Please check your credentials." };
      }
    } else {
      const errorMsg = error?.message?.toLowerCase().includes("invalid login credentials")
        ? "Invalid email or password. Please check your credentials."
        : (error?.message || "Invalid credentials or check role");
      return { error: errorMsg };
    }
  }

  const roleInfo = await resolveUserRole(db, authUser.id, cleanEmail, authUser.user_metadata?.role);
  const effectiveType = (selectedType || "individual").toLowerCase().trim().replace(/[-_]/g, "");

  const validation = await validateUserType({
    db,
    effectiveType,
    userRole: roleInfo.userRole,
    isGymOwner: roleInfo.isGymOwner,
    isGymTrainer: roleInfo.isGymTrainer,
    isGlobalTrainer: roleInfo.isGlobalTrainer,
    authUserId: authUser.id,
    cleanEmail,
    gymId,
  });

  if (!validation.valid) {
    return rejectAuth(validation.error || "Invalid credentials or check role");
  }

  const { userRecord, userRole } = roleInfo;

  if (userRole === "globaltrainer" && userRecord && userRecord.isEmailVerified === false) {
    userRecord.isEmailVerified = true;
    await db.from("users").update({ isEmailVerified: true }).eq("userId", authUser.id);
  }

  if (authUser?.email_confirmed_at && userRecord && userRecord.isEmailVerified === false) {
    userRecord.isEmailVerified = true;
    await db.from("users").update({ isEmailVerified: true }).eq("userId", authUser.id);
  }

  if (userRole && authUser.user_metadata?.role !== userRole) {
    try {
      await supabase.auth.updateUser({ data: { role: userRole } });
    } catch { }
  }

  return { success: true, role: userRole, fallbackUser: fallbackUserData };
}

export async function logoutUser() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch { }
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

    const adminClient = getAdminClient();
    const db = adminClient || supabase;

    const { data: userData } = await db
      .from("users")
      .select("role, name, email, isEmailVerified")
      .eq("userId", user.id)
      .maybeSingle();

    if (userData && userData.isEmailVerified === false) {
      return { success: false, error: "Email not verified" };
    }

    let role = userData?.role || user.user_metadata?.role || "customer";

    const { data: ownerRow } = await db
      .from("gym_owners")
      .select("gymOwnerId")
      .or(`ownerEmail.eq.${user.email},userId.eq.${user.id}`)
      .eq("is_deleted", false)
      .maybeSingle();

    if (ownerRow && role !== "superadmin") {
      role = "owner";
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: userData?.name || user.user_metadata?.name || "",
        role: role,
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
