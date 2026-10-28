import { createClient } from '@/app/api/supabase/client';
import { parseDurationMonths, toDateString, calculateEndDate } from './membershipPaymentLogic';
import type { SaveGymCustomerMembershipPlanParams } from './gymCustomerMembershipPlans';

const getSupabase = () => createClient();

export async function saveGymCustomerMembershipPlan(planData: SaveGymCustomerMembershipPlanParams) {
  const supabase = getSupabase();
  const now = new Date().toISOString();

  let targetPlanId = planData.GymCustomerMembershipPlanId;
  let isUpdate = false;
  let existingPlan: Record<string, unknown> | null = null;

  if (targetPlanId) {
    const { data } = await supabase
      .from('gym_customer_membership_plans')
      .select('*')
      .eq('GymCustomerMembershipPlanId', targetPlanId)
      .eq('is_deleted', false)
      .maybeSingle();

    if (data) {
      isUpdate = true;
      existingPlan = data;
    }
  }

  if (!isUpdate && planData.customerId) {
    let query = supabase
      .from('gym_customer_membership_plans')
      .select('*')
      .eq('customerId', planData.customerId)
      .eq('is_deleted', false);
    if (planData.gymId) query = query.eq('gymId', planData.gymId);
    const { data } = await query.order('createdAt', { ascending: false }).limit(1).maybeSingle();

    if (data) {
      targetPlanId = data.GymCustomerMembershipPlanId;
      isUpdate = true;
      existingPlan = data;
    }
  }

  let finalStartDate = planData.startDate;
  let finalEndDate = planData.endDate;

  if (!finalStartDate || !finalEndDate) {
    let durationMonths = 1;
    if (planData.planId) {
      const { data: planInfo } = await supabase
        .from('gym_membership_plans')
        .select('durationMonths')
        .eq('planId', planData.planId)
        .maybeSingle();
      durationMonths = parseDurationMonths(planInfo?.durationMonths);
    }
    const nowDate = new Date();
    finalStartDate = toDateString(nowDate);
    finalEndDate = calculateEndDate(nowDate, durationMonths);
  }

  const finalIsActive = planData.is_Active !== undefined ? planData.is_Active : true;

  if (isUpdate && targetPlanId) {
      const updatePayload: Record<string, unknown> = {
        customerId: planData.customerId,
        gymId: planData.gymId,
        planId: planData.planId,
          customAmount: planData.customAmount !== undefined ? (planData.customAmount !== null ? Math.round(Number(planData.customAmount)) : null) : ((existingPlan?.customAmount as number | undefined) || 0),
            startDate: finalStartDate,
              endDate: finalEndDate,
                is_Active: finalIsActive,
                  updatedAt: now,
    };
  if (planData.pendingPlanId !== undefined) {
    updatePayload.pendingPlanId = planData.pendingPlanId;
  }
  if (planData.pendingAmount !== undefined) {
    updatePayload.pendingAmount = planData.pendingAmount;
  }

  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update(updatePayload)
    .eq('GymCustomerMembershipPlanId', targetPlanId)
    .select();

  if (error) throw error;
  return data ? data[0] : null;
} else {
  let finalCreatedBy = planData.createdBy;
  if (finalCreatedBy) {
    const { data: ownerRows } = await supabase
      .from('gym_owners')
      .select('gymOwnerId')
      .or(`userId.eq.${finalCreatedBy},createdBy.eq.${finalCreatedBy},gymOwnerId.eq.${finalCreatedBy}`)
      .eq('is_deleted', false)
      .limit(1);

    if (ownerRows?.[0]?.gymOwnerId) {
      finalCreatedBy = ownerRows[0].gymOwnerId;
    } else if (planData.gymId) {
      const { data: ownerByGym } = await supabase
        .from('gym_owners')
        .select('gymOwnerId')
        .eq('gymId', planData.gymId)
        .eq('is_deleted', false)
        .limit(1);
      if (ownerByGym?.[0]?.gymOwnerId) finalCreatedBy = ownerByGym[0].gymOwnerId;
    }
  }

  const generatedId = targetPlanId || crypto.randomUUID();
  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .insert([{
      GymCustomerMembershipPlanId: generatedId,
      customerId: planData.customerId,
      gymId: planData.gymId,
      planId: planData.planId,
      pendingPlanId: planData.pendingPlanId !== undefined ? planData.pendingPlanId : null,
      pendingAmount: planData.pendingAmount !== undefined ? planData.pendingAmount : null,
      customAmount: planData.customAmount !== undefined && planData.customAmount !== null ? Math.round(Number(planData.customAmount)) : 0,
      startDate: finalStartDate,
      endDate: finalEndDate,
      createdBy: finalCreatedBy,
      is_Active: finalIsActive,
      is_deleted: false,
      createdAt: now,
      updatedAt: now,
    }])
    .select();

  if (error) throw error;
  return data ? data[0] : null;
}
}
