"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

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

  const adminClient = getAdminClient();
  const db = adminClient || supabase;

  let userRecord: { role?: string; isEmailVerified?: boolean; email?: string } | null = null;
  const { data: userData } = await db
    .from("users")
    .select("role, isEmailVerified, email")
    .eq("userId", data.user.id)
    .maybeSingle();

    userRecord = userData;
    if (!userRecord && cleanEmail) {
      const { data: emailUser } = await db
        .from("users")
        .select("role, isEmailVerified, email")
        .eq("email", cleanEmail)
        .maybeSingle();
      userRecord = emailUser;
    }

    let isGymOwner = false;
    const { data: ownerRow } = await db
      .from("gym_owners")
      .select("gymOwnerId, gymId, is_deleted")
      .or(`ownerEmail.eq.${cleanEmail},userId.eq.${data.user.id}`)
      .eq("is_deleted", false)
      .maybeSingle();
    if (ownerRow) isGymOwner = true;

    let isGymTrainer = false;
    const { data: trainerRow } = await db
      .from("gym_trainers")
      .select("gymTrainerId, gymId, is_deleted")
      .or(`email.eq.${cleanEmail},userId.eq.${data.user.id}`)
      .eq("is_deleted", false)
      .maybeSingle();
    if (trainerRow) isGymTrainer = true;

    let isGlobalTrainer = false;
    const { data: globalTrainerRow } = await db
      .from("global_trainers")
      .select("globalTrainerId, is_deleted")
      .eq("email", cleanEmail)
      .eq("is_deleted", false)
      .maybeSingle();
    if (globalTrainerRow) isGlobalTrainer = true;

      let userRole = (userRecord?.role || data.user.user_metadata?.role || "").toLowerCase().trim().replace(/[-_]/g, "");
      if (isGymOwner && userRole !== "superadmin") {
        userRole = "owner";
      } else if (isGlobalTrainer && userRole !== "superadmin") {
        userRole = "globaltrainer";
      } else if (isGymTrainer && userRole !== "superadmin" && userRole !== "owner") {
        userRole = "trainer";
      }

        const effectiveType = (selectedType || "individual").toLowerCase().trim().replace(/[-_]/g, "");

            if (effectiveType === "individual") {
              if (userRole !== "individual" && userRole !== "superadmin") {
                return rejectAuth("Invalid credentials or check role");
              }
            } else if (effectiveType === "owner" || effectiveType === "gymowner") {
              if (userRole !== "owner" && !isGymOwner) {
                return rejectAuth("Invalid credentials or check role");
              }
            } else if (effectiveType === "customer" || effectiveType === "gymcustomer") {
              if (userRole !== "customer") {
                return rejectAuth("Invalid credentials or check role");
              }
              if (gymId) {
                const orCust = [`userId.eq.${data.user.id}`, `customerId.eq.${data.user.id}`];
                if (cleanEmail) orCust.push(`email.eq.${cleanEmail}`);
                const { data: custRows } = await db
                  .from("gym_customers")
                  .select("customerId, gymId, is_deleted")
                  .or(orCust.join(","))
                  .eq("is_deleted", false);
                const belongs = custRows && custRows.some((c: any) => c.gymId === gymId);
                if (!belongs) {
                  return rejectAuth("You do not belong to the selected gym. Please select your registered gym.");
                }
                }
              } else if (effectiveType === "gymtrainer" || effectiveType === "trainer") {
                if (userRole !== "trainer" && !isGymTrainer) {
                  return rejectAuth("Invalid credentials or check role");
                }
                if (gymId) {
                  const orTrn = [`userId.eq.${data.user.id}`];
                  if (cleanEmail) orTrn.push(`email.eq.${cleanEmail}`);
                  const { data: trainerRows } = await db
                    .from("gym_trainers")
                    .select("gymTrainerId, gymId, is_deleted")
                    .or(orTrn.join(","))
                    .eq("is_deleted", false);
                  const belongs = trainerRows && trainerRows.some((t: any) => t.gymId === gymId);
                  if (!belongs) {
                    return rejectAuth("You do not belong to the selected gym as a trainer.");
                  }
                }
              } else if (effectiveType === "globaltrainer") {
                if (userRole !== "globaltrainer" && !isGlobalTrainer) {
                  return rejectAuth("Invalid credentials or check role");
                }
              } else {
                return rejectAuth("Invalid credentials or check role");
              }

              if (gymId) {
                const { data: gymDetails } = await db
                  .from("gyms")
                  .select("isActive")
                  .eq("gymId", gymId)
                  .maybeSingle();
                if (gymDetails && gymDetails.isActive === false) {
                  return rejectAuth("The selected gym is currently inactive. Please contact support.");
                }
              }

                if (userRole === "globaltrainer" && userRecord && userRecord.isEmailVerified === false) {
                  userRecord.isEmailVerified = true;
                  await db.from("users").update({ isEmailVerified: true }).eq("userId", data.user.id);
                }

                if (data?.user?.email_confirmed_at && userRecord && userRecord.isEmailVerified === false) {
                  userRecord.isEmailVerified = true;
                  await db.from("users").update({ isEmailVerified: true }).eq("userId", data.user.id);
                }

                if (userRecord && userRecord.isEmailVerified === false && !data?.user?.email_confirmed_at && userRole !== "globaltrainer" && userRole !== "superadmin") {
                  return rejectAuth("Please check your email and click the confirmation link to activate your account before logging in.");
                }

                if (userRole && data.user.user_metadata?.role !== userRole) {
                  try {
                  await supabase.auth.updateUser({ data: { role: userRole } });
                } catch { }
              }

              return { success: true, role: userRole };
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
