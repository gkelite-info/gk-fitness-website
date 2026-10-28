"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

interface LoginRoleParams {
  email: string;
  password: string;
  typeId?: string | null;
  gymId?: string | null;
}

interface LoginResult {
  success: boolean;
  role?: string;
  error?: string;
}

export async function loginWithRoleAction(params: LoginRoleParams): Promise<LoginResult> {
  const { email, password, typeId, gymId } = params;
  const targetEmail = email.trim().toLowerCase();

  if (!targetEmail) {
    return { success: false, error: "Email Address is required." };
  }
  if (!password) {
    return { success: false, error: "Password is required." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient = serviceKey
    ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
    : null;

  const serverClient = await createClient();
  const dbClient = adminClient || serverClient;

  let preIsOwner = false;
  let preIsCustomer = false;
  let preIsTrainer = false;
  let preIsGlobalTrainer = false;
  let preUserFound = false;

  const { data: uRec } = await dbClient
    .from("users")
    .select("userId, role, isEmailVerified")
    .eq("email", targetEmail)
    .maybeSingle();

  if (uRec) {
    preUserFound = true;
    if (uRec.role === "owner") preIsOwner = true;
    if (uRec.role === "customer") preIsCustomer = true;
    if (uRec.role === "trainer") preIsTrainer = true;
    if (uRec.role === "global_trainer" || uRec.role === "globaltrainer") preIsGlobalTrainer = true;
    if (uRec.role === "superadmin") preIsOwner = true;
  }

  const [oRes, cRes, tRes, gtRes] = await Promise.all([
    dbClient.from("gym_owners").select("gymOwnerId, gymId, is_deleted").eq("ownerEmail", targetEmail).maybeSingle(),
    dbClient.from("gym_customers").select("customerId, gymId, is_deleted").eq("email", targetEmail).maybeSingle(),
    dbClient.from("gym_trainers").select("gymTrainerId, gymId, is_deleted").eq("email", targetEmail).maybeSingle(),
    dbClient.from("global_trainers").select("globalTrainerId, is_deleted").eq("email", targetEmail).maybeSingle(),
  ]);

  if (oRes.data && oRes.data.is_deleted !== true) preIsOwner = true;
  if (cRes.data && cRes.data.is_deleted !== true) preIsCustomer = true;
  if (tRes.data && tRes.data.is_deleted !== true) preIsTrainer = true;
  if (gtRes.data && gtRes.data.is_deleted !== true) preIsGlobalTrainer = true;

  if (typeId) {
    if (preUserFound || preIsOwner || preIsCustomer || preIsTrainer || preIsGlobalTrainer) {
      let preRoleValid = false;
      if (typeId === "individual" || typeId === "customer" || typeId === "gym-customer") {
        if (preIsCustomer || (!preIsOwner && !preIsTrainer && !preIsGlobalTrainer)) {
          preRoleValid = true;
        }
      } else if (typeId === "owner" || typeId === "gym-owner") {
        if (preIsOwner || uRec?.role === "superadmin") preRoleValid = true;
      } else if (typeId === "gym_trainer" || typeId === "gym-trainer" || typeId === "trainer") {
        if (preIsTrainer) preRoleValid = true;
      } else if (typeId === "global_trainer" || typeId === "global-trainer" || typeId === "globaltrainer") {
        if (preIsGlobalTrainer) preRoleValid = true;
      } else {
        preRoleValid = true;
      }

      if (!preRoleValid) {
        return { success: false, error: "Invalid credentials or check role" };
      }
    }

    if (gymId) {
      let isAuthorizedForGym = false;
      let hasGymBoundRole = false;

      if (oRes.data && oRes.data.is_deleted !== true) {
        hasGymBoundRole = true;
        if (oRes.data.gymId === gymId) isAuthorizedForGym = true;
      }
      if (cRes.data && cRes.data.is_deleted !== true) {
        hasGymBoundRole = true;
        if (cRes.data.gymId === gymId) isAuthorizedForGym = true;
      }
      if (tRes.data && tRes.data.is_deleted !== true) {
        hasGymBoundRole = true;
        if (tRes.data.gymId === gymId) isAuthorizedForGym = true;
      }

      if (!hasGymBoundRole) {
        isAuthorizedForGym = true;
      }

      if (!isAuthorizedForGym) {
        return { success: false, error: "Invalid credentials or check gym" };
      }
    }
  }

  if (uRec && uRec.isEmailVerified === false) {
    return {
      success: false,
      error: "Please check your email and confirm your address before signing in.",
    };
  }

  const { data: authData, error: authError } = await serverClient.auth.signInWithPassword({
    email: targetEmail,
    password: password,
  });

  if (authError) {
    if (authError.message.toLowerCase().includes("email not confirmed")) {
      return {
        success: false,
        error: "Please check your email and confirm your address before signing in.",
      };
    }
    return { success: false, error: "Invalid credentials or check role" };
  }

  const userId = authData.user.id;
  const { data: profile } = await dbClient
    .from("users")
    .select("role, isEmailVerified")
    .eq("userId", userId)
    .maybeSingle();

  if (profile && profile.isEmailVerified === false) {
    await serverClient.auth.signOut();
    return {
      success: false,
      error: "Please check your email and confirm your address before signing in.",
    };
  }

  let finalRole = profile?.role || authData.user.user_metadata?.role || "customer";

  if (gymId) {
    const { data: gymDetails } = await dbClient
      .from("gyms")
      .select("isActive")
      .eq("gymId", gymId)
      .maybeSingle();

    if (gymDetails && gymDetails.isActive === false) {
      await serverClient.auth.signOut();
      return {
        success: false,
        error: "Your gym is inactive. Please contact support.",
      };
    }
  }

  return { success: true, role: finalRole };
}

export async function searchGymsAction(query: string) {
  try {
    const serverClient = await createClient();
    const cleanQuery = query.trim();

    let dbQuery = serverClient
      .from("gyms")
      .select("gymId, gymName, city, state, logo, isActive")
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false })
      .limit(20);

    if (cleanQuery) {
      dbQuery = dbQuery.ilike("gymName", `%${cleanQuery}%`);
    }

    const { data, error } = await dbQuery;
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to search gyms", data: [] };
  }
}

export async function checkLeadStatusAction(identifier: string) {
  try {
    const cleanId = identifier.trim();
    if (!cleanId) {
      return { success: false, error: "Please enter an email or phone number." };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const db = serviceKey
      ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
      : await createClient();

    const isEmail = cleanId.includes("@");
    let gymLead = null;
    let trainerLead = null;

    if (isEmail) {
      const email = cleanId.toLowerCase();
      const res = await db.from("gym_leads").select("*").eq("email", email).is("deletedAt", null).maybeSingle();
      gymLead = res.data;

      if (!gymLead) {
        const res2 = await db.from("global_trainer_leads").select("*").eq("email", email).is("deletedAt", null).maybeSingle();
        trainerLead = res2.data;
      }
    } else {
      const cleanMobile = cleanId.replace(/\D/g, "");
      const res = await db.from("gym_leads").select("*").eq("mobile", cleanMobile).is("deletedAt", null).maybeSingle();
      gymLead = res.data;

      if (!gymLead) {
        const res2 = await db.from("global_trainer_leads").select("*").eq("mobile", cleanMobile).is("deletedAt", null).maybeSingle();
        trainerLead = res2.data;
      }
    }

    if (gymLead) {
      return {
        success: true,
        type: "gym_lead",
        lead: {
          id: gymLead.gymLeadId,
          name: gymLead.fullName || gymLead.gymName,
          gymName: gymLead.gymName,
          status: gymLead.status || "submitted",
          createdAt: gymLead.createdAt,
        },
      };
    }

    if (trainerLead) {
      return {
        success: true,
        type: "trainer_lead",
        lead: {
          id: trainerLead.globalTrainerLeadId,
          name: trainerLead.fullName,
          status: trainerLead.status || "submitted",
          createdAt: trainerLead.createdAt,
        },
      };
    }

    return {
      success: false,
      error: `No application found for this ${isEmail ? "email address" : "mobile number"}.`,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to check status." };
  }
}
