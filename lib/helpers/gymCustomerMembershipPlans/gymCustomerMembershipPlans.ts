import { createClient } from '@/app/api/supabase/client';
import { parseDurationMonths } from './membershipPaymentLogic';

const getSupabase = () => createClient();

export interface GymCustomerMembershipPlanAttributes {
  GymCustomerMembershipPlanId?: string;
  customerId: string;
  gymId: string;
  planId: string;
  pendingPlanId?: string | null;
  pendingAmount?: number | null;
  customAmount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  createdBy: string;
  is_Active?: boolean;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  plan?: {
    planName: string;
    durationMonths: string | number;
    price: number;
    [key: string]: any;
  } | null;
  gym_membership_plans?: {
    planName: string;
    durationMonths: string | number;
    price: number;
    [key: string]: any;
  } | null;
  pendingPlan?: {
    planName: string;
    durationMonths: string | number;
    price: number;
    [key: string]: any;
  } | null;
  gym_customers?: {
    fullName: string;
    email?: string | null;
    phone?: string | null;
    gymId?: string;
    is_Active?: boolean;
    creator?: any;
    userAccount?: any;
    [key: string]: any;
  } | null;
}

export interface SaveGymCustomerMembershipPlanParams {
  GymCustomerMembershipPlanId?: string;
  customerId: string;
  gymId: string;
  planId: string;
  pendingPlanId?: string | null;
  pendingAmount?: number | null;
  customAmount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  createdBy: string;
  is_Active?: boolean;
}

const PLAN_SELECT_QUERY = `
  *,
  plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price),
  gym_membership_plans:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price),
  pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planName, durationMonths, price),
  gym_customers(fullName, email, phone, gymId, is_Active, creator:users!gym_customers_createdBy_fkey(profilePhoto, status, createdAt))
`;

export async function fetchGymCustomerMembershipPlans(gymId?: string, customerId?: string) {
  const supabase = getSupabase();
  let query = supabase
    .from('gym_customer_membership_plans')
    .select(PLAN_SELECT_QUERY)
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false })
    .limit(50);

  if (gymId) query = query.eq('gymId', gymId);
  if (customerId) query = query.eq('customerId', customerId);

  const { data, error } = await query;
  if (error) throw error;

  if ((!data || data.length === 0) && customerId) {
    const { data: custRecord } = await supabase
      .from('gym_customers')
      .select('customerId')
      .or(`userId.eq.${customerId},email.eq.${customerId}`)
      .maybeSingle();

    if (custRecord?.customerId && custRecord.customerId !== customerId) {
      let fb = supabase
        .from('gym_customer_membership_plans')
        .select(PLAN_SELECT_QUERY)
        .eq('is_deleted', false)
        .eq('customerId', custRecord.customerId)
        .order('createdAt', { ascending: false })
        .limit(50);
      if (gymId) fb = fb.eq('gymId', gymId);
      const { data: fallbackData } = await fb;
      if (fallbackData && fallbackData.length > 0) return fallbackData;
    }
  }

  return data ?? [];
}

export async function fetchGymCustomerMembershipPlanById(id: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .select(`
      *,
      plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price),
      gym_membership_plans:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price),
      pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planName, durationMonths, price)
    `)
    .eq('GymCustomerMembershipPlanId', id)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[gymCustomerMembershipPlansHelper] fetchGymCustomerMembershipPlanById Error:', error);
    throw error;
  }
  return data;
}

export async function setGymCustomerPendingPlan(params: {
  GymCustomerMembershipPlanId: string;
  pendingPlanId: string | null;
  pendingAmount?: number | null;
}) {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const updateObj: Record<string, any> = { pendingPlanId: params.pendingPlanId, updatedAt: now };
  if (params.pendingAmount !== undefined) {
    updateObj.pendingAmount = params.pendingAmount;
  }
  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update(updateObj)
    .eq('GymCustomerMembershipPlanId', params.GymCustomerMembershipPlanId)
    .select();

  if (error) {
    console.error('[gymCustomerMembershipPlansHelper] setGymCustomerPendingPlan Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}

export async function revokeGymCustomerPendingPlan(params: {
  GymCustomerMembershipPlanId: string;
  customerId?: string;
  gymId?: string;
}) {
  const supabase = getSupabase();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update({ pendingPlanId: null, pendingAmount: null, updatedAt: now })
    .eq('GymCustomerMembershipPlanId', params.GymCustomerMembershipPlanId)
    .select();

  if (error) {
    console.error('[gymCustomerMembershipPlansHelper] revokeGymCustomerPendingPlan Error:', error);
    throw error;
  }

  try {
    await supabase
      .from('gym_customer_membership_histories')
      .update({ actionType: 'CANCELLED', is_Active: false, is_deleted: true, updatedAt: now })
      .eq('GymCustomerMembershipPlanId', params.GymCustomerMembershipPlanId)
      .eq('paymentStatus', 'pending');
  } catch (histErr) {
    console.warn('[gymCustomerMembershipPlansHelper] revoke history notice:', histErr);
  }

  return data ? data[0] : null;
}

export async function completeUpgradePayment({
  GymCustomerMembershipPlanId,
  pendingPlanId,
  durationMonths,
  amountPaid,
}: {
  GymCustomerMembershipPlanId: string;
  pendingPlanId: string;
  durationMonths: number | string;
  amountPaid: number;
}) {
  const supabase = getSupabase();
  const months = parseDurationMonths(durationMonths);
  const now = new Date();
  const startDateStr = now.toISOString().split('T')[0];
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + months);
  const endDateStr = endDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update({
      planId: pendingPlanId,
      pendingPlanId: null,
      pendingAmount: null,
      customAmount: amountPaid,
      startDate: startDateStr,
      endDate: endDateStr,
      is_Active: true,
      updatedAt: now.toISOString(),
    })
    .eq('GymCustomerMembershipPlanId', GymCustomerMembershipPlanId)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteGymCustomerMembershipPlan(id: string) {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update({ is_deleted: true, deletedAt: now, updatedAt: now })
    .eq('GymCustomerMembershipPlanId', id).select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function toggleGymCustomerMembershipPlanActiveStatus(id: string, currentStatus: boolean) {
  const supabase = getSupabase();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('gym_customer_membership_plans')
    .update({ is_Active: !currentStatus, updatedAt: now })
    .eq('GymCustomerMembershipPlanId', id).select();
  if (error) throw error;
  return data ? data[0] : null;
}

export async function fetchGymCustomerMembershipPlansPaginated(
  gymId: string,
  page: number,
  limit: number,
  searchQuery?: string,
  sortOrder: 'newest' | 'oldest' = 'newest',
  planId?: string,
  supabaseClient?: any
) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = supabaseClient || getSupabase();
  let query = supabase
    .from('gym_customer_membership_plans')
    .select(
      '*, gym_customers!inner(fullName, email, phone, is_Active, createdAt, userAccount:users!gym_customers_userId_fkey(profilePhoto, status)), plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price), gym_membership_plans:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price), pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planName, durationMonths, price)',
      { count: 'exact' }
    )
    .eq('gymId', gymId)
    .eq('is_deleted', false)
    .eq('gym_customers.is_Active', true)
    .eq('gym_customers.userAccount.status', 'active')
    .order('createdAt', { ascending: sortOrder === 'oldest' });

  if (searchQuery) query = query.ilike('gym_customers.fullName', `%${searchQuery}%`);
  if (planId) query = query.eq('planId', planId);

  const { data, count, error } = await query.range(from, to);
  if (error) {
    console.error('[gymCustomerMembershipPlansHelper] fetchGymCustomerMembershipPlansPaginated Error:', error);
    throw error;
  }

  return { data: data ?? [], total: count ?? 0 };
}

export * from './saveGymCustomerMembershipPlan';
export * from './gymCustomerMembershipHistories';
export * from './membershipPaymentLogic';
