"use server";

import { createClient } from "@/app/api/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { SignupFormValues, validateSignupForm } from "@/lib/validations/signupValidation";
import { capitalizeWords } from "@/lib/validations/demoValidation";
import { sendUserRegistrationEmails } from "@/lib/helpers/registrationEmailService";

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
        email_confirm: false,
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
        await adminClient.auth.admin.deleteUser(authUserId).catch(() => { });
      }
      return { success: false, error: `Account registration failed: ${dbError.message}` };
    }

    let finalPlanId: string | null = data.subscriptionPlanId?.trim() || (data as any).planId?.trim() || null;
    const isUuid = !!finalPlanId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(finalPlanId);

    if (!isUuid) {
      if (finalPlanId) {
        const { data: matchedPlan } = await checkClient
          .from("subscriptions")
          .select("subscriptionPlanId")
          .ilike("planName", `%${finalPlanId}%`)
          .eq("isActive", true)
          .eq("is_deleted", false)
          .is("deletedAt", null)
          .limit(1)
          .maybeSingle();
        if (matchedPlan?.subscriptionPlanId) {
          finalPlanId = matchedPlan.subscriptionPlanId;
        } else {
          finalPlanId = null;
        }
      }

      if (!finalPlanId) {
        const { data: defaultPlan } = await checkClient
          .from("subscriptions")
          .select("subscriptionPlanId")
          .eq("isActive", true)
          .eq("is_deleted", false)
          .is("deletedAt", null)
          .eq("planFor", "customer")
          .order("price", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (defaultPlan?.subscriptionPlanId) {
          finalPlanId = defaultPlan.subscriptionPlanId;
        }
      }
    }

    const demoBookingId = crypto.randomUUID();
    const demoPayload = {
      demoBookingId,
      name: cleanName,
      gymName: data.gymName?.trim() || (data.city ? `${data.city.trim()} Fitness` : "Individual Customer"),
      gymCity: data.city?.trim() || "Hyderabad",
      mobile: cleanPhone,
      memberCount: data.memberCount?.trim() || "1",
      requirement: `Direct Signup - ${cleanEmail}`,
      subscriptionPlanId: finalPlanId,
      status: "pending" as const,
      createdAt: now,
      updatedAt: now,
    };

    const { error: demoError } = await checkClient.from("demo_bookings").insert(demoPayload);
    if (demoError) {
      console.warn("[signupCustomerAction] demo_bookings table sync warning:", demoError.message);
    }

    let planLabel = "Customer Membership";
    if (finalPlanId) {
      const { data: planInfo } = await checkClient
        .from("subscriptions")
        .select("label, planName")
        .eq("subscriptionPlanId", finalPlanId)
        .maybeSingle();
      if (planInfo) {
        planLabel = planInfo.label || planInfo.planName || planLabel;
      }
    }

    let confirmationUrl: string | undefined;
    try {
      const headerList = await headers();
      const forwardedHost = headerList.get("x-forwarded-host");
      const host = forwardedHost || headerList.get("host");
      const isLocal = host?.includes("localhost") || host?.includes("127.0.0.1");
      const proto = headerList.get("x-forwarded-proto") || (isLocal ? "http" : "https");
      const currentOrigin = host
        ? `${proto}://${host}`
        : (process.env.NODE_ENV === "production" ? "https://www.gkgymlife.com" : (process.env.NEXT_PUBLIC_SITE_URL || "https://www.gkgymlife.com"));
      confirmationUrl = `${currentOrigin}/api/auth/verify-email?uid=${encodeURIComponent(authUserId)}&email=${encodeURIComponent(cleanEmail)}`;
    } catch {
      const siteUrl = process.env.NODE_ENV === "production" ? "https://www.gkgymlife.com" : (process.env.NEXT_PUBLIC_SITE_URL || "https://www.gkgymlife.com");
      confirmationUrl = `${siteUrl}/api/auth/verify-email?uid=${encodeURIComponent(authUserId)}&email=${encodeURIComponent(cleanEmail)}`;
    }

    const emailRes = await sendUserRegistrationEmails({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role: "Customer",
      userId: authUserId,
      gymName: data.gymName?.trim() || (data.city ? `${data.city.trim()} Fitness` : "Individual Customer"),
      gender: data.gender,
      dob: data.dob,
      address: data.address?.trim(),
      city: data.city?.trim(),
      state: data.state?.trim(),
      country: data.country?.trim() || "India",
      pincode: data.pincode ? String(data.pincode) : undefined,
      memberCount: data.memberCount?.trim(),
      planId: finalPlanId,
      planName: planLabel,
      isSignup: true,
      confirmationUrl,
    });
    if (!emailRes.success) {
      console.warn("[signupCustomerAction] Registration email warning:", emailRes.errors);
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
