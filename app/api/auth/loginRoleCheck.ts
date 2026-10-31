export interface RoleResolutionResult {
  userRole: string;
  isGymOwner: boolean;
  isGymTrainer: boolean;
  isGlobalTrainer: boolean;
  userRecord: { role?: string; isEmailVerified?: boolean; email?: string } | null;
}

export async function resolveUserRole(
  db: any,
  userId: string,
  cleanEmail: string,
  metadataRole?: string
): Promise<RoleResolutionResult> {
  let userRecord: { role?: string; isEmailVerified?: boolean; email?: string } | null = null;
  const { data: userData } = await db
    .from("users")
    .select("role, isEmailVerified, email")
    .eq("userId", userId)
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
    .or(`ownerEmail.eq.${cleanEmail},userId.eq.${userId}`)
    .eq("is_deleted", false)
    .maybeSingle();
  if (ownerRow) isGymOwner = true;

  let isGymTrainer = false;
  const { data: trainerRow } = await db
    .from("gym_trainers")
    .select("gymTrainerId, gymId, is_deleted")
    .or(`email.eq.${cleanEmail},userId.eq.${userId}`)
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

  let userRole = (userRecord?.role || metadataRole || "").toLowerCase().trim().replace(/[-_]/g, "");
  if (isGymOwner && userRole !== "superadmin") {
    userRole = "owner";
  } else if (isGlobalTrainer && userRole !== "superadmin") {
    userRole = "globaltrainer";
  } else if (isGymTrainer && userRole !== "superadmin" && userRole !== "owner") {
    userRole = "trainer";
  }

  return {
    userRole,
    isGymOwner,
    isGymTrainer,
    isGlobalTrainer,
    userRecord,
  };
}

export interface TypeValidationParams {
  db: any;
  effectiveType: string;
  userRole: string;
  isGymOwner: boolean;
  isGymTrainer: boolean;
  isGlobalTrainer: boolean;
  authUserId: string;
  cleanEmail: string;
  gymId?: string | null;
}

export async function validateUserType(params: TypeValidationParams): Promise<{ valid: boolean; error?: string }> {
  const {
    db,
    effectiveType,
    userRole,
    isGymOwner,
    isGymTrainer,
    isGlobalTrainer,
    authUserId,
    cleanEmail,
    gymId,
  } = params;

  if (effectiveType === "individual") {
    if (userRole !== "individual" && userRole !== "superadmin") {
      return { valid: false, error: "Invalid credentials or check role" };
    }
  } else if (effectiveType === "owner" || effectiveType === "gymowner") {
    if (userRole !== "owner" && !isGymOwner) {
      return { valid: false, error: "Invalid credentials or check role" };
    }
  } else if (effectiveType === "customer" || effectiveType === "gymcustomer") {
    if (userRole !== "customer") {
      return { valid: false, error: "Invalid credentials or check role" };
    }
    if (gymId) {
      const orCust = [`userId.eq.${authUserId}`, `customerId.eq.${authUserId}`];
      if (cleanEmail) orCust.push(`email.eq.${cleanEmail}`);
      const { data: custRows } = await db
        .from("gym_customers")
        .select("customerId, gymId, is_deleted")
        .or(orCust.join(","))
        .eq("is_deleted", false);
      const belongs = custRows && custRows.some((c: any) => c.gymId === gymId);
      if (!belongs) {
        return { valid: false, error: "You do not belong to the selected gym. Please select your registered gym." };
      }
    }
  } else if (effectiveType === "gymtrainer" || effectiveType === "trainer") {
    if (userRole !== "trainer" && !isGymTrainer) {
      return { valid: false, error: "Invalid credentials or check role" };
    }
    if (gymId) {
      const orTrn = [`userId.eq.${authUserId}`];
      if (cleanEmail) orTrn.push(`email.eq.${cleanEmail}`);
      const { data: trainerRows } = await db
        .from("gym_trainers")
        .select("gymTrainerId, gymId, is_deleted")
        .or(orTrn.join(","))
        .eq("is_deleted", false);
      const belongs = trainerRows && trainerRows.some((t: any) => t.gymId === gymId);
      if (!belongs) {
        return { valid: false, error: "You do not belong to the selected gym as a trainer." };
      }
    }
  } else if (effectiveType === "globaltrainer") {
    if (userRole !== "globaltrainer" && !isGlobalTrainer) {
      return { valid: false, error: "Invalid credentials or check role" };
    }
  } else {
    return { valid: false, error: "Invalid credentials or check role" };
  }

  if (gymId) {
    const { data: gymDetails } = await db
      .from("gyms")
      .select("isActive")
      .eq("gymId", gymId)
      .maybeSingle();
    if (gymDetails && gymDetails.isActive === false) {
      return { valid: false, error: "The selected gym is currently inactive. Please contact support." };
    }
  }

  return { valid: true };
}

