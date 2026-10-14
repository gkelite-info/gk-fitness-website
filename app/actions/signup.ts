"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { SignupFormValues, validateSignupForm } from "@/lib/validations/signupValidation";
import { capitalizeWords } from "@/lib/validations/demoValidation";
import { sendSignupConfirmationEmail } from "@/lib/helpers/emailService";

export interface SignupResponse {
  success: boolean;
  loggedIn?: boolean;
  redirectUrl?: string;
  message?: string;
  error?: string;
}

export async function signupCustomerAction(data: SignupFormValues): Promise<SignupResponse> {
  try {
    const validationErrors = validateSignupForm(data);
    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      return { success: false, error: firstError };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.replace(/\D/g, "");
    const cleanName = capitalizeWords(data.name.trim());

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://swzhxokkrolnxvhekrmj.supabase.co";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminClient = serviceKey
      ? createAdminClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
      : null;

    const serverClient = await createClient();
    const checkClient = adminClient || serverClient;

    const { data: existingUser } = await checkClient
      .from("users")
      .select("userId, email, phone")
      .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
      .maybeSingle();

    if (existingUser) {
      if (existingUser.email?.toLowerCase() === cleanEmail) {
        return { success: false, error: "An account with this email address already exists. Please login." };
      }
      return { success: false, error: "An account with this phone number already exists. Please login." };
    }

    let authUserId: string | null = null;

    if (adminClient) {
      const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
        email: cleanEmail,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          name: cleanName,
          phone: cleanPhone,
          role: "customer",
        },
      });

      if (authError) {
        return { success: false, error: authError.message };
      }
      authUserId = authData?.user?.id || null;
    } else {
      const { data: authData, error: authError } = await serverClient.auth.signUp({
        email: cleanEmail,
        password: data.password,
        options: {
          data: {
            name: cleanName,
            phone: cleanPhone,
            role: "customer",
          },
        },
      });

      if (authError) {
        return { success: false, error: authError.message };
      }
      authUserId = authData?.user?.id || null;
    }

    if (!authUserId) {
      authUserId = crypto.randomUUID();
    }

    const now = new Date().toISOString();
    const userPayload = {
      userId: authUserId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      address: data.address?.trim() || null,
      role: "customer",
      status: "active",
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: now,
      updatedAt: now,
      profilePhoto: null,
      country: data.country?.trim() || "India",
      state: data.state?.trim() || null,
      city: data.city?.trim() || null,
      pincode: data.pincode && !isNaN(Number(data.pincode)) ? Number(data.pincode) : null,
      dob: data.dob ? data.dob : null,
      gender: data.gender || "male",
    };

    const { error: dbError } = await checkClient.from("users").insert(userPayload);

    if (dbError) {
      if (adminClient && authUserId) {
        await adminClient.auth.admin.deleteUser(authUserId).catch(() => {});
      }
      return { success: false, error: `Account registration failed: ${dbError.message}` };
    }

    const emailRes = await sendSignupConfirmationEmail({
      email: cleanEmail,
      name: cleanName,
      userId: authUserId,
      role: "Customer",
    });
    if (!emailRes.success) {
      console.warn("[signupCustomerAction] Resend email warning:", emailRes.error);
    }

    return {
      success: true,
      loggedIn: false,
      redirectUrl: "/login?type=individual",
      message: "Account created! Please check your email to verify before signing in.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "An unexpected error occurred during signup.",
    };
  }
}
