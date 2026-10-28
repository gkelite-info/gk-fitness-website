import { createClient } from '@/app/api/supabase/client';
import { supabase as fallbackSupabase } from '@/lib/supabase';
import { randomUUID } from '@/lib/helpers/uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

export type GymCustomerMembershipHistoryActionType =
  'UPGRADED' | 'ASSIGNED' | 'RENEWED' | 'EXTENDED' | 'EXPIRED' | 'CANCELLED';

export type GymCustomerMembershipHistoryPaymentStatus =
  'pending' | 'paid' | 'failed' | 'refunded';

export interface GymCustomerMembershipHistoryAttributes {
  customerMembershipHistoryId?: string;
  GymCustomerMembershipPlanId?: string | null;
  customerId: string;
  gymId: string;
  planId: string;
  previousPlanId?: string | null;
  actionType: GymCustomerMembershipHistoryActionType;
  customAmount?: number | null;
  unusedCredit?: number | null;
  daysCarriedOver?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  paymentStatus?: GymCustomerMembershipHistoryPaymentStatus | null;
  transactionId?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
  createdBy: string;
  is_Active?: boolean;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  plan?: { planName: string; durationMonths: string | number; price: number };
  previousPlan?: { planName: string; durationMonths: string | number; price: number } | null;
  customer?: { fullName: string; email?: string | null; phone?: string | null; users?: { profilePhoto?: string | null } };
  creator?: { name?: string | null; email?: string | null };
}

export interface SaveGymCustomerMembershipHistoryParams {
  customerMembershipHistoryId?: string;
  historyId?: string;
  GymCustomerMembershipPlanId?: string | null;
  customerId: string;
  gymId: string;
  planId: string;
  previousPlanId?: string | null;
  actionType?: GymCustomerMembershipHistoryActionType;
  customAmount?: number | null;
  unusedCredit?: number | null;
  daysCarriedOver?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  paymentStatus?: GymCustomerMembershipHistoryPaymentStatus | null;
  transactionId?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
  createdBy: string;
  is_Active?: boolean;
}

export interface FetchGymCustomerMembershipHistoriesPaginatedParams {
  gymId?: string;
  customerId?: string;
  page?: number;
  limit?: number;
  searchQuery?: string;
  sortOrder?: 'newest' | 'oldest';
  actionType?: GymCustomerMembershipHistoryActionType;
  paymentStatus?: GymCustomerMembershipHistoryPaymentStatus;
}

const getSupabase = (client?: SupabaseClient) => {
  if (client) return client;
  try {
    return createClient();
  } catch {
    return fallbackSupabase;
  }
};

function toDateOnly(dateVal?: string | null): string | null {
  if (!dateVal) return null;
  return dateVal.includes('T') ? dateVal.split('T')[0] : dateVal;
}

const HISTORY_SELECT_QUERY = `
  *,
  plan:gym_membership_plans!planId(planName, durationMonths, price),
  previousPlan:gym_membership_plans!previousPlanId(planName, durationMonths, price),
  customer:gym_customers!customerId(fullName, email, phone, users!gym_customers_userId_fkey(profilePhoto)),
  creator:gym_owners!createdBy(name, email)
`;

export async function fetchGymCustomerMembershipHistories(
  gymId?: string,
  customerId?: string,
  supabaseClient?: SupabaseClient
): Promise<GymCustomerMembershipHistoryAttributes[]> {
  try {
    const supabase = getSupabase(supabaseClient);
    let query = supabase
      .from('gym_customer_membership_histories')
      .select(HISTORY_SELECT_QUERY)
      .eq('is_deleted', false)
      .order('createdAt', { ascending: false });

    if (gymId) query = query.eq('gymId', gymId);
    if (customerId) query = query.eq('customerId', customerId);

    const { data, error } = await query;
    if (error) {
      console.warn('[gymCustomerMembershipHistories] fetch Error:', error.message);
      return [];
    }
    return (data as GymCustomerMembershipHistoryAttributes[]) || [];
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] fetch Exception:', err);
    return [];
  }
}

export async function fetchGymCustomerMembershipHistoryById(
  id: string,
  supabaseClient?: SupabaseClient
): Promise<GymCustomerMembershipHistoryAttributes | null> {
  try {
    const supabase = getSupabase(supabaseClient);
    const { data, error } = await supabase
      .from('gym_customer_membership_histories')
      .select(HISTORY_SELECT_QUERY)
      .eq('customerMembershipHistoryId', id)
      .eq('is_deleted', false)
      .maybeSingle();

    if (error) {
      console.warn('[gymCustomerMembershipHistories] fetchById Error:', error.message);
      return null;
    }
    return data as GymCustomerMembershipHistoryAttributes | null;
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] fetchById Exception:', err);
    return null;
  }
}

export async function fetchGymCustomerMembershipHistoriesPaginated(
  params: FetchGymCustomerMembershipHistoriesPaginatedParams,
  supabaseClient?: SupabaseClient
) {
  try {
    const { gymId, customerId, page = 1, limit = 10, searchQuery, sortOrder = 'newest', actionType, paymentStatus } = params;
    const supabase = getSupabase(supabaseClient);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('gym_customer_membership_histories')
      .select(
        `*, plan:gym_membership_plans!planId(planName, durationMonths, price), previousPlan:gym_membership_plans!previousPlanId(planName, durationMonths, price), customer:gym_customers!customerId(fullName, email, phone, users!gym_customers_userId_fkey(profilePhoto))`,
        { count: 'exact' }
      )
      .eq('is_deleted', false)
      .order('createdAt', { ascending: sortOrder === 'oldest' });

    if (gymId) query = query.eq('gymId', gymId);
    if (customerId) query = query.eq('customerId', customerId);
    if (actionType) query = query.eq('actionType', actionType);
    if (paymentStatus) query = query.eq('paymentStatus', paymentStatus);
    if (searchQuery) query = query.ilike('customer.fullName', `%${searchQuery}%`);

    const { data, count, error } = await query.range(from, to);
    if (error) {
      console.error('[gymCustomerMembershipHistories] fetchPaginated Error:', error);
      throw error;
    }
    return { data: (data as GymCustomerMembershipHistoryAttributes[]) || [], total: count ?? 0 };
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] fetchPaginated Exception:', err);
    return { data: [], total: 0 };
  }
}

export async function saveGymCustomerMembershipHistory(
  historyData: SaveGymCustomerMembershipHistoryParams,
  supabaseClient?: SupabaseClient
): Promise<GymCustomerMembershipHistoryAttributes | null> {
  try {
    const supabase = getSupabase(supabaseClient);
    const historyId = historyData.customerMembershipHistoryId || historyData.historyId || randomUUID();
    const payload = {
      customerMembershipHistoryId: historyId,
      GymCustomerMembershipPlanId: historyData.GymCustomerMembershipPlanId || null,
      customerId: historyData.customerId,
      gymId: historyData.gymId,
      planId: historyData.planId,
      previousPlanId: historyData.previousPlanId || null,
      actionType: historyData.actionType || 'UPGRADED',
      customAmount: historyData.customAmount ?? 0,
      unusedCredit: historyData.unusedCredit ?? 0,
      daysCarriedOver: historyData.daysCarriedOver ?? 0,
      startDate: toDateOnly(historyData.startDate),
      endDate: toDateOnly(historyData.endDate),
      paymentStatus: historyData.paymentStatus || 'pending',
      transactionId: historyData.transactionId || null,
      paymentMethod: historyData.paymentMethod || null,
      notes: historyData.notes || null,
      createdBy: historyData.createdBy,
      is_Active: historyData.is_Active !== undefined ? historyData.is_Active : true,
      is_deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('gym_customer_membership_histories')
      .insert([payload])
      .select();

    if (error) {
      console.warn('[gymCustomerMembershipHistories] insert Notice:', error.message);
      return null;
    }
    return data ? (data[0] as GymCustomerMembershipHistoryAttributes) : null;
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] save Exception:', err);
    return null;
  }
}

export const logGymCustomerMembershipHistory = saveGymCustomerMembershipHistory;

export async function updateGymCustomerMembershipHistory(
  id: string,
  updates: Partial<SaveGymCustomerMembershipHistoryParams>,
  supabaseClient?: SupabaseClient
): Promise<GymCustomerMembershipHistoryAttributes | null> {
  try {
    const supabase = getSupabase(supabaseClient);
    const payload: Record<string, any> = { ...updates, updatedAt: new Date().toISOString() };
    if (updates.startDate !== undefined) payload.startDate = toDateOnly(updates.startDate);
    if (updates.endDate !== undefined) payload.endDate = toDateOnly(updates.endDate);
    delete payload.customerMembershipHistoryId;
    delete payload.historyId;

    const { data, error } = await supabase
      .from('gym_customer_membership_histories')
      .update(payload)
      .eq('customerMembershipHistoryId', id)
      .select();

    if (error) {
      console.warn('[gymCustomerMembershipHistories] update Error:', error.message);
      return null;
    }
    return data ? (data[0] as GymCustomerMembershipHistoryAttributes) : null;
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] update Exception:', err);
    return null;
  }
}

export async function deleteGymCustomerMembershipHistory(
  id: string,
  supabaseClient?: SupabaseClient
): Promise<boolean> {
  try {
    const supabase = getSupabase(supabaseClient);
    const { error } = await supabase
      .from('gym_customer_membership_histories')
      .update({ is_deleted: true, deletedAt: new Date().toISOString() })
      .eq('customerMembershipHistoryId', id);

    if (error) {
      console.warn('[gymCustomerMembershipHistories] delete Error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[gymCustomerMembershipHistories] delete Exception:', err);
    return false;
  }
}
