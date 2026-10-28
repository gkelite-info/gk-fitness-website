import { randomUUID } from '@/lib/helpers/uuid';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  determinePlanActionAndProration,
} from './membershipPaymentLogic';
import { mapToCustomerPaymentMethod } from '@/lib/helpers/customerGymPayments/customerGymPayments';

export interface ExecuteMembershipPaymentSuccessParams {
  supabase: SupabaseClient;
  customerId: string;
  gymId: string;
  planId: string;
  customerUserId: string;
  gatewayPaymentId: string;
  gatewayOrderId?: string | null;
  paymentMethod?: string | null;
  upiId?: string | null;
  amountPaidOverride?: number | null;
}

export async function executeMembershipPaymentSuccess({
  supabase,
  customerId,
  gymId,
  planId,
  customerUserId,
  gatewayPaymentId,
  gatewayOrderId,
  paymentMethod,
  upiId,
  amountPaidOverride,
}: ExecuteMembershipPaymentSuccessParams) {
  const { data: ownerRecord } = await supabase
    .from('gym_owners')
    .select('gymOwnerId')
    .eq('gymId', gymId)
    .eq('is_deleted', false)
    .limit(1)
    .maybeSingle();

  let gymOwnerId = ownerRecord?.gymOwnerId || null;
  if (!gymOwnerId) {
    const { data: fallbackOwner } = await supabase
      .from('gym_owners')
      .select('gymOwnerId')
      .eq('gymId', gymId)
      .limit(1)
      .maybeSingle();
    gymOwnerId = fallbackOwner?.gymOwnerId || null;
  }

  const { data: newPlan, error: planError } = await supabase
    .from('gym_membership_plans')
    .select('planId, planName, durationMonths, price')
    .eq('planId', planId)
    .single();

  if (planError || !newPlan) {
    throw new Error('New membership plan details not found');
  }

  const { data: existingPlans } = await supabase
    .from('gym_customer_membership_plans')
    .select('*, plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planId, planName, durationMonths, price), pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planId, planName, durationMonths, price)')
    .eq('customerId', customerId)
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  const existingCustomerPlan = existingPlans?.[0] || null;

  const { data: latestPaidHistory } = await supabase
    .from('gym_customer_membership_histories')
    .select('*, plan:gym_membership_plans!planId(planId, planName, durationMonths, price)')
    .eq('customerId', customerId)
    .eq('paymentStatus', 'paid')
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false })
    .limit(1)
    .maybeSingle();

  const proration = determinePlanActionAndProration({
    newPlan: {
      planId: newPlan.planId,
      planName: newPlan.planName,
      price: Number(newPlan.price) || 0,
      durationMonths: newPlan.durationMonths,
    },
    existingCustomerPlan,
    previousHistory: latestPaidHistory,
  });

  const effectivePayableAmount =
    typeof amountPaidOverride === 'number' && amountPaidOverride > 0
      ? amountPaidOverride
      : proration.payableAmount;

  const integerCustomAmount = Math.round(Number(effectivePayableAmount));

  const now = new Date();
  const nowIso = now.toISOString();
  let targetPlanRecordId = existingCustomerPlan?.GymCustomerMembershipPlanId;

  if (targetPlanRecordId) {
    const { error: updateError } = await supabase
      .from('gym_customer_membership_plans')
      .update({
        planId: newPlan.planId,
        pendingPlanId: null,
        pendingAmount: null,
        gymId,
        customAmount: integerCustomAmount,
        startDate: proration.finalStartDate,
        endDate: proration.finalEndDate,
        is_Active: true,
        updatedAt: nowIso,
      })
      .eq('GymCustomerMembershipPlanId', targetPlanRecordId);
    if (updateError) throw updateError;
  } else {
    targetPlanRecordId = randomUUID();
    const { error: insertError } = await supabase
      .from('gym_customer_membership_plans')
      .insert([{
        GymCustomerMembershipPlanId: targetPlanRecordId,
        customerId, gymId, planId: newPlan.planId,
        pendingPlanId: null,
        pendingAmount: null,
        customAmount: integerCustomAmount,
        startDate: proration.finalStartDate,
        endDate: proration.finalEndDate,
        createdBy: gymOwnerId || customerUserId,
        is_Active: true, is_deleted: false,
        createdAt: nowIso, updatedAt: nowIso,
      }]);
    if (insertError) throw insertError;
  }

  const historyNote = proration.actionType === 'ASSIGNED'
    ? 'First-time membership plan activation via Web Portal'
    : `Online Web Payment for ${newPlan.planName} (${proration.actionType})`;

  const { error: historyError } = await supabase
    .from('gym_customer_membership_histories')
    .insert([{
      customerMembershipHistoryId: randomUUID(),
      GymCustomerMembershipPlanId: targetPlanRecordId,
      customerId, gymId, planId: newPlan.planId,
      previousPlanId: proration.previousPlanId || null,
      actionType: proration.actionType,
      customAmount: effectivePayableAmount,
      unusedCredit: proration.unusedCredit || 0,
      daysCarriedOver: proration.daysCarriedOver || 0,
      startDate: proration.finalStartDate,
      endDate: proration.finalEndDate,
      paymentStatus: 'paid',
      transactionId: gatewayPaymentId,
      paymentMethod: paymentMethod?.toLowerCase() || 'other',
      notes: historyNote,
      createdBy: gymOwnerId || customerUserId,
      is_Active: true, is_deleted: false,
      createdAt: nowIso, updatedAt: nowIso,
    }]);

  if (historyError) {
    console.error('[executeMembershipPaymentSuccess] gym_customer_membership_histories insert error:', historyError);
  }

  if (gymOwnerId) {
    const { error: paymentError } = await supabase
      .from('gym_payments')
      .insert([{
        gymPaymentId: randomUUID(),
        customerId, gymId, planId: newPlan.planId,
        paymentMethod: 'qrscan',
        amountPaid: effectivePayableAmount,
        paymentDate: now.toISOString().split('T')[0],
        paymentTime: now.toTimeString().split(' ')[0],
        transactionId: gatewayPaymentId,
        notes: `Web payment - ${gatewayOrderId || ''}`,
        paymentTakenBy: gymOwnerId,
        paymentProof: null,
        is_deleted: false,
        createdAt: nowIso, updatedAt: nowIso,
      }]);

    if (paymentError) {
      console.error('[executeMembershipPaymentSuccess] gym_payments insert error:', paymentError);
    }
  }

  try {
    const custMethod = mapToCustomerPaymentMethod(paymentMethod);
    await supabase.from('customer_gym_payments').insert([{
      customerPaymentId: randomUUID(),
      customerId,
      gymId,
      planId: newPlan.planId,
      amountPaid: effectivePayableAmount,
      paymentMethod: custMethod,
      upiId: upiId || null,
      status: 'SUCCESSFUL',
      transactionId: gatewayPaymentId,
      notes: `Razorpay Order: ${gatewayOrderId || ''} | Payment: ${gatewayPaymentId}${paymentMethod ? ` | Method: ${paymentMethod}` : ''}`,
      is_deleted: false,
      createdAt: nowIso,
      updatedAt: nowIso,
    }]);
  } catch (custPayErr) {
    console.warn('[executeMembershipPaymentSuccess] customer_gym_payments log note:', custPayErr);
  }

  return {
    success: true,
    planName: newPlan.planName,
    paymentId: gatewayPaymentId,
    targetPlanRecordId,
    actionType: proration.actionType,
    payableAmount: effectivePayableAmount,
    startDate: proration.finalStartDate,
    endDate: proration.finalEndDate,
  };
}
