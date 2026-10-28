"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "@/lib/helpers/uuid";
import {
  parseDurationMonths,
  toDateString,
  computeUpgradeCalculation,
} from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

export interface ChangeCustomerPlanParams {
  customerId: string;
  gymId: string;
  newPlanId: string;
  notes?: string;
}

export async function changeCustomerPlan({
  customerId,
  gymId,
  newPlanId,
  notes,
}: ChangeCustomerPlanParams) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  const { data: ownerRecord } = await supabase
    .from("gym_owners")
    .select("gymOwnerId")
    .eq("gymId", gymId)
    .eq("is_deleted", false)
    .limit(1)
    .maybeSingle();

  const gymOwnerId = ownerRecord?.gymOwnerId || user.id;

  const { data: newPlan, error: planError } = await supabase
    .from("gym_membership_plans")
    .select("planId, planName, durationMonths, price")
    .eq("planId", newPlanId)
    .single();

  if (planError || !newPlan) {
    return { success: false, error: "Selected plan could not be found" };
  }

  const { data: existingPlans } = await supabase
    .from("gym_customer_membership_plans")
    .select("*, plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planId, planName, durationMonths, price), pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planId, planName, durationMonths, price)")
    .eq("customerId", customerId)
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  const activeCustomerPlan = existingPlans?.[0] || null;

  if (activeCustomerPlan && activeCustomerPlan.planId === newPlanId && activeCustomerPlan.is_Active) {
    return { success: false, error: "Member is already enrolled in this plan" };
  }

  const today = new Date();
  const todayStr = toDateString(today);
  const newPlanPrice = Number(newPlan.price || 0);

  const existingEndDateStr = activeCustomerPlan?.endDate ? toDateString(activeCustomerPlan.endDate) : null;
  const existingEndDate = existingEndDateStr ? new Date(existingEndDateStr) : null;

  const isCurrentPlanActive = Boolean(
    activeCustomerPlan &&
    activeCustomerPlan.is_Active !== false &&
    !activeCustomerPlan.is_deleted &&
    activeCustomerPlan.startDate &&
    existingEndDate &&
    existingEndDate.getTime() >= new Date(todayStr).getTime()
  );

  let remainingDays = 0;
  let unusedCredit = 0;
  let netPayable = newPlanPrice;

  if (isCurrentPlanActive && existingEndDate) {
    const currentPlanPrice = Number(activeCustomerPlan.plan?.price ?? activeCustomerPlan.customAmount ?? 0);
    if (newPlanPrice < currentPlanPrice) {
      return {
        success: false,
        error: "Plan downgrade is not permitted. Only upgrades to higher-priced plans are allowed.",
      };
    }
    const upgradeCalc = computeUpgradeCalculation(activeCustomerPlan, newPlan);
    if (upgradeCalc) {
      remainingDays = upgradeCalc.remainingDays;
      unusedCredit = upgradeCalc.unusedCredit;
      netPayable = upgradeCalc.payableAmount;
    }
  }

  const nowIso = today.toISOString();
  let targetPlanRecordId = activeCustomerPlan?.GymCustomerMembershipPlanId;

  if (targetPlanRecordId) {
    if (isCurrentPlanActive) {
      const { error: updateError } = await supabase
        .from("gym_customer_membership_plans")
        .update({
          pendingPlanId: newPlan.planId,
          pendingAmount: netPayable,
          updatedAt: nowIso,
        })
        .eq("GymCustomerMembershipPlanId", targetPlanRecordId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    } else {
      const { error: updateError } = await supabase
        .from("gym_customer_membership_plans")
        .update({
          planId: newPlan.planId,
          pendingPlanId: null,
          updatedAt: nowIso,
        })
        .eq("GymCustomerMembershipPlanId", targetPlanRecordId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }
    }
  } else {
    targetPlanRecordId = randomUUID();
    const { error: insertError } = await supabase
      .from("gym_customer_membership_plans")
      .insert([{
        GymCustomerMembershipPlanId: targetPlanRecordId,
        customerId,
        gymId,
        planId: newPlan.planId,
        pendingPlanId: null,
        customAmount: 0,
        startDate: null,
        endDate: null,
        createdBy: gymOwnerId,
        is_Active: false,
        is_deleted: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      }]);

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  const historyRecord = {
    customerMembershipHistoryId: randomUUID(),
    GymCustomerMembershipPlanId: targetPlanRecordId,
    customerId,
    gymId,
    planId: newPlan.planId,
    previousPlanId: activeCustomerPlan?.planId || null,
    actionType: isCurrentPlanActive ? 'UPGRADED' : 'ASSIGNED',
    paymentStatus: 'pending',
    notes: notes || `Plan changed to ${newPlan.planName} by owner`,
    createdBy: gymOwnerId,
    is_Active: false,
    is_deleted: false,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const { error: historyError } = await supabase
    .from("gym_customer_membership_histories")
    .insert([historyRecord]);

  if (historyError) {
    console.warn("[changeCustomerPlan] history tracking notice:", historyError);
  }

  revalidatePath("/owner/users");
  revalidatePath(`/owner/users/${customerId}`);
  revalidatePath(`/owner/users/${customerId}/membership-payments`);
  revalidatePath("/owner/finance");
  revalidatePath("/customer");

  return {
    success: true,
    planName: newPlan.planName,
    payableAmount: netPayable,
    unusedCredit,
    actionType: isCurrentPlanActive ? "UPGRADED" : "ASSIGNED",
  };
}

export async function revokeCustomerPendingPlan({
  GymCustomerMembershipPlanId,
  customerId,
}: {
  GymCustomerMembershipPlanId: string;
  customerId?: string;
}) {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();

  const { error } = await supabase
    .from("gym_customer_membership_plans")
    .update({
      pendingPlanId: null,
      pendingAmount: null,
      updatedAt: nowIso,
    })
    .eq("GymCustomerMembershipPlanId", GymCustomerMembershipPlanId);

  if (error) {
    return { success: false, error: error.message };
  }

  try {
    await supabase
      .from("gym_customer_membership_histories")
      .update({
        actionType: "CANCELLED",
        is_Active: false,
        is_deleted: true,
        updatedAt: nowIso,
      })
      .eq("GymCustomerMembershipPlanId", GymCustomerMembershipPlanId)
      .eq("paymentStatus", "pending");
  } catch (histErr) {
    console.warn("[revokeCustomerPendingPlan] history notice:", histErr);
  }

  revalidatePath("/owner/users");
  if (customerId) {
    revalidatePath(`/owner/users/${customerId}`);
  }
  revalidatePath("/customer");

  return { success: true };
}
