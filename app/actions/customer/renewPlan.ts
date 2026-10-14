"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";

export interface RenewPlanParams {
  planId: string;
  customerId?: string;
  gymId?: string;
}

export async function renewPlan({ planId, customerId, gymId }: RenewPlanParams) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;

  if (!resolvedCustomerId || !resolvedGymId) {
    const { data: customer } = await supabase
      .from("gym_customers")
      .select("customerId, gymId")
      .or(`userId.eq.${user.id},email.eq.${user.email}`)
      .maybeSingle();

    if (customer) {
      resolvedCustomerId = resolvedCustomerId || customer.customerId;
      resolvedGymId = resolvedGymId || customer.gymId;
    }
  }

  if (!resolvedCustomerId || !resolvedGymId) {
    return { success: false, error: "Customer record not found" };
  }

  const { data: planInfo, error: planError } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, durationMonths, price")
    .eq("planId", planId)
    .single();

  if (planError || !planInfo) {
    return { success: false, error: "Plan details could not be found" };
  }

  let durationMonths = 1;
  if (planInfo.durationMonths) {
    const rawStr = String(planInfo.durationMonths).toLowerCase().trim();
    if (rawStr.includes("year")) {
      const yearMatch = rawStr.match(/\d+/);
      durationMonths = yearMatch ? parseInt(yearMatch[0], 10) * 12 : 12;
    } else {
      const numMatch = rawStr.match(/\d+/);
      durationMonths = numMatch ? parseInt(numMatch[0], 10) : 1;
    }
  }

  const { data: existingPlans } = await supabase
    .from("gym_customer_membership_plans")
    .select("*")
    .eq("customerId", resolvedCustomerId)
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  const latestExisting = existingPlans?.[0];
  const now = new Date();
  let startDate = now;

  if (latestExisting?.endDate) {
    const existingEndDate = new Date(latestExisting.endDate);
    if (existingEndDate > now && (latestExisting.is_Active ?? latestExisting.isActive)) {
      startDate = existingEndDate;
    }
  }

  const calculatedEnd = new Date(startDate);
  const targetDay = startDate.getDate();
  calculatedEnd.setMonth(calculatedEnd.getMonth() + durationMonths);
  if (calculatedEnd.getDate() !== targetDay) {
    calculatedEnd.setDate(0);
  }

  const finalStartDate = startDate.toISOString();
  const finalEndDate = calculatedEnd.toISOString();
  const nowIso = now.toISOString();

  if (latestExisting?.GymCustomerMembershipPlanId) {
    const { error: updateError } = await supabase
      .from("gym_customer_membership_plans")
      .update({
        planId: planInfo.planId,
        gymId: resolvedGymId,
        customAmount: planInfo.price || 0,
        startDate: finalStartDate,
        endDate: finalEndDate,
        is_Active: true,
        updatedAt: nowIso,
      })
      .eq("GymCustomerMembershipPlanId", latestExisting.GymCustomerMembershipPlanId);

    if (updateError) {
      return { success: false, error: updateError.message };
    }
  } else {
    const generatedId = crypto.randomUUID();
    const { error: insertError } = await supabase
      .from("gym_customer_membership_plans")
      .insert([{
        GymCustomerMembershipPlanId: generatedId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        planId: planInfo.planId,
        customAmount: planInfo.price || 0,
        startDate: finalStartDate,
        endDate: finalEndDate,
        createdBy: user.id,
        is_Active: true,
        is_deleted: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  revalidatePath("/customer");
  return { success: true, planName: planInfo.planName };
}
