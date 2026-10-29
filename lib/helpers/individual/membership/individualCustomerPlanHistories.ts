import { createClient } from '@/app/api/supabase/client';
import { supabase as fallbackSupabase } from '@/lib/supabase';
import { randomUUID } from '@/lib/helpers/uuid';
import type { SupabaseClient } from '@supabase/supabase-js';

export type IndividualCustomerPlanHistoryActionType =
  | 'UPGRADED' | 'ASSIGNED' | 'RENEWED' | 'EXTENDED' | 'EXPIRED' | 'CANCELLED';

export type IndividualCustomerPlanHistoryPaymentStatus =
  | 'pending' | 'paid' | 'failed' | 'refunded';

export interface IndividualCustomerPlanHistoryAttributes {
  individualCustomerPlanHistoryId: string;
  individualCustomerPlanId?: string | null;
  subscriptionPlanId: string;
  previousSubscriptionPlanId?: string | null;
  userId?: string | null;
  actionType: IndividualCustomerPlanHistoryActionType;
  customAmount?: number | null;
  unusedCredit?: number | null;
  daysCarriedOver?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  paymentStatus?: IndividualCustomerPlanHistoryPaymentStatus | null;
  transactionId?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
  createdBy?: string | null;
  isActive?: boolean | null;
  is_deleted?: boolean | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: { userId: string; name?: string | null; email?: string | null; phone?: string | null; profilePhoto?: string | null; status?: string | null; createdAt?: string | null } | null;
  creator?: { userId: string; name?: string | null; email?: string | null } | null;
  subscription?: { subscriptionPlanId: string; planName: string; label?: string | null; price?: number | null; planFor?: string | null } | null;
  previousSubscription?: { subscriptionPlanId: string; planName: string; label?: string | null; price?: number | null; planFor?: string | null } | null;
  plan?: { individualCustomerPlanId: string; subscriptionPlanId: string; userId?: string | null; customAmount?: number | null; startDate?: string | null; endDate?: string | null; isActive?: boolean | null } | null;
}

export interface SaveIndividualCustomerPlanHistoryParams {
  individualCustomerPlanHistoryId?: string;
  individualCustomerPlanId?: string | null;
  subscriptionPlanId: string;
  previousSubscriptionPlanId?: string | null;
  userId?: string | null;
  actionType?: IndividualCustomerPlanHistoryActionType;
  customAmount?: number | null;
  unusedCredit?: number | null;
  daysCarriedOver?: number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  paymentStatus?: IndividualCustomerPlanHistoryPaymentStatus | null;
  transactionId?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
  createdBy?: string | null;
  isActive?: boolean;
}

export interface FetchIndividualCustomerPlanHistoriesPaginatedParams {
  userId?: string;
  individualCustomerPlanId?: string;
  subscriptionPlanId?: string;
  page?: number;
  limit?: number;
  searchQuery?: string;
  sortOrder?: 'newest' | 'oldest';
  actionType?: IndividualCustomerPlanHistoryActionType;
  paymentStatus?: IndividualCustomerPlanHistoryPaymentStatus;
}

const getSupabase = (client?: SupabaseClient) => {
  if (client) return client;
  try {
    return createClient();
  } catch {
    return fallbackSupabase;
  }
};

export const BASE_INDIVIDUAL_HISTORY_SELECT = `
  *,
  user:users!userId (userId, name, email, phone, profilePhoto, status, createdAt),
  creator:users!createdBy (userId, name, email),
  subscription:subscriptions!subscriptionPlanId (subscriptionPlanId, planName, label, price, planFor),
  previousSubscription:subscriptions!previousSubscriptionPlanId (subscriptionPlanId, planName, label, price, planFor),
  plan:individual_customer_plans!individualCustomerPlanId (individualCustomerPlanId, subscriptionPlanId, userId, customAmount, startDate, endDate, isActive)
`;

export async function fetchIndividualCustomerPlanHistories(
  userId?: string,
  individualCustomerPlanId?: string,
  supabaseClient?: SupabaseClient
): Promise<IndividualCustomerPlanHistoryAttributes[]> {
  const supabase = getSupabase(supabaseClient);
  let query = supabase
    .from('individual_customer_plan_histories')
    .select(BASE_INDIVIDUAL_HISTORY_SELECT)
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  if (userId) query = query.eq('userId', userId);
  if (individualCustomerPlanId) query = query.eq('individualCustomerPlanId', individualCustomerPlanId);

  const { data, error } = await query;
  if (error) {
    console.error('[individualCustomerPlanHistories] fetch error:', error);
    throw error;
  }
  return (data as IndividualCustomerPlanHistoryAttributes[]) ?? [];
}

export async function fetchIndividualCustomerPlanHistoryById(
  id: string,
  supabaseClient?: SupabaseClient
): Promise<IndividualCustomerPlanHistoryAttributes | null> {
  const supabase = getSupabase(supabaseClient);
  const { data, error } = await supabase
    .from('individual_customer_plan_histories')
    .select(BASE_INDIVIDUAL_HISTORY_SELECT)
    .eq('individualCustomerPlanHistoryId', id)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[individualCustomerPlanHistories] fetchById error:', error);
    throw error;
  }
  return (data as IndividualCustomerPlanHistoryAttributes) ?? null;
}

export async function fetchIndividualCustomerPlanHistoriesPaginated(
  params: FetchIndividualCustomerPlanHistoriesPaginatedParams,
  supabaseClient?: SupabaseClient
): Promise<{ data: IndividualCustomerPlanHistoryAttributes[]; total: number }> {
  const {
    userId, individualCustomerPlanId, subscriptionPlanId,
    page = 1, limit = 10, searchQuery, sortOrder = 'newest', actionType, paymentStatus,
  } = params;
  const supabase = getSupabase(supabaseClient);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('individual_customer_plan_histories')
    .select(BASE_INDIVIDUAL_HISTORY_SELECT, { count: 'exact' })
    .eq('is_deleted', false)
    .order('createdAt', { ascending: sortOrder === 'oldest' });

  if (userId) query = query.eq('userId', userId);
  if (individualCustomerPlanId) query = query.eq('individualCustomerPlanId', individualCustomerPlanId);
  if (subscriptionPlanId) query = query.eq('subscriptionPlanId', subscriptionPlanId);
  if (actionType) query = query.eq('actionType', actionType);
  if (paymentStatus) query = query.eq('paymentStatus', paymentStatus);
  if (searchQuery) query = query.or(`notes.ilike.%${searchQuery}%,transactionId.ilike.%${searchQuery}%`);

  const { data, count, error } = await query.range(from, to);
  if (error) {
    console.error('[individualCustomerPlanHistories] fetchPaginated error:', error);
    throw error;
  }
  return { data: (data as IndividualCustomerPlanHistoryAttributes[]) ?? [], total: count ?? 0 };
}

export async function saveIndividualCustomerPlanHistory(
  historyData: SaveIndividualCustomerPlanHistoryParams,
  supabaseClient?: SupabaseClient
): Promise<IndividualCustomerPlanHistoryAttributes> {
  const supabase = getSupabase(supabaseClient);
  const now = new Date().toISOString();
  const historyId = historyData.individualCustomerPlanHistoryId || randomUUID();

  const payload = {
    individualCustomerPlanHistoryId: historyId,
    individualCustomerPlanId: historyData.individualCustomerPlanId || null,
    subscriptionPlanId: historyData.subscriptionPlanId,
    previousSubscriptionPlanId: historyData.previousSubscriptionPlanId || null,
    userId: historyData.userId || null,
    actionType: historyData.actionType || 'UPGRADED',
    customAmount: historyData.customAmount !== undefined ? historyData.customAmount : 0,
    unusedCredit: historyData.unusedCredit !== undefined ? historyData.unusedCredit : 0,
    daysCarriedOver: historyData.daysCarriedOver !== undefined ? historyData.daysCarriedOver : 0,
    startDate: historyData.startDate ? new Date(historyData.startDate).toISOString() : null,
    endDate: historyData.endDate ? new Date(historyData.endDate).toISOString() : null,
    paymentStatus: historyData.paymentStatus || 'pending',
    transactionId: historyData.transactionId || null,
    paymentMethod: historyData.paymentMethod || null,
    notes: historyData.notes || null,
    createdBy: historyData.createdBy || null,
    isActive: historyData.isActive !== undefined ? historyData.isActive : true,
    is_deleted: false,
    updatedAt: now,
  };

  const { data: existing } = await supabase
    .from('individual_customer_plan_histories')
    .select('individualCustomerPlanHistoryId')
    .eq('individualCustomerPlanHistoryId', historyId)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('individual_customer_plan_histories')
      .update(payload)
      .eq('individualCustomerPlanHistoryId', historyId)
      .select(BASE_INDIVIDUAL_HISTORY_SELECT)
      .single();

    if (error) {
      console.error('[individualCustomerPlanHistories] update error:', error);
      throw error;
    }
    return data as IndividualCustomerPlanHistoryAttributes;
  }

  const { data, error } = await supabase
    .from('individual_customer_plan_histories')
    .insert([{ ...payload, createdAt: now }])
    .select(BASE_INDIVIDUAL_HISTORY_SELECT)
    .single();

  if (error) {
    console.error('[individualCustomerPlanHistories] insert error:', error);
    throw error;
  }
  return data as IndividualCustomerPlanHistoryAttributes;
}

export async function updateIndividualCustomerPlanHistory(
  id: string,
  updates: Partial<SaveIndividualCustomerPlanHistoryParams>,
  supabaseClient?: SupabaseClient
): Promise<IndividualCustomerPlanHistoryAttributes> {
  const supabase = getSupabase(supabaseClient);
  const now = new Date().toISOString();

  const payload: Record<string, any> = { updatedAt: now };
  if (updates.individualCustomerPlanId !== undefined) payload.individualCustomerPlanId = updates.individualCustomerPlanId;
  if (updates.subscriptionPlanId !== undefined) payload.subscriptionPlanId = updates.subscriptionPlanId;
  if (updates.previousSubscriptionPlanId !== undefined) payload.previousSubscriptionPlanId = updates.previousSubscriptionPlanId;
  if (updates.userId !== undefined) payload.userId = updates.userId;
  if (updates.actionType !== undefined) payload.actionType = updates.actionType;
  if (updates.customAmount !== undefined) payload.customAmount = updates.customAmount;
  if (updates.unusedCredit !== undefined) payload.unusedCredit = updates.unusedCredit;
  if (updates.daysCarriedOver !== undefined) payload.daysCarriedOver = updates.daysCarriedOver;
  if (updates.startDate !== undefined) payload.startDate = updates.startDate ? new Date(updates.startDate).toISOString() : null;
  if (updates.endDate !== undefined) payload.endDate = updates.endDate ? new Date(updates.endDate).toISOString() : null;
  if (updates.paymentStatus !== undefined) payload.paymentStatus = updates.paymentStatus;
  if (updates.transactionId !== undefined) payload.transactionId = updates.transactionId;
  if (updates.paymentMethod !== undefined) payload.paymentMethod = updates.paymentMethod;
  if (updates.notes !== undefined) payload.notes = updates.notes;
  if (updates.createdBy !== undefined) payload.createdBy = updates.createdBy;
  if (updates.isActive !== undefined) payload.isActive = updates.isActive;

  const { data, error } = await supabase
    .from('individual_customer_plan_histories')
    .update(payload)
    .eq('individualCustomerPlanHistoryId', id)
    .select(BASE_INDIVIDUAL_HISTORY_SELECT)
    .single();

  if (error) {
    console.error('[individualCustomerPlanHistories] update partial error:', error);
    throw error;
  }
  return data as IndividualCustomerPlanHistoryAttributes;
}

export async function deleteIndividualCustomerPlanHistory(
  id: string,
  supabaseClient?: SupabaseClient
): Promise<boolean> {
  const supabase = getSupabase(supabaseClient);
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('individual_customer_plan_histories')
    .update({ is_deleted: true, deletedAt: now, updatedAt: now })
    .eq('individualCustomerPlanHistoryId', id);

  if (error) {
    console.error('[individualCustomerPlanHistories] delete error:', error);
    throw error;
  }
  return true;
}

export async function toggleIndividualCustomerPlanHistoryActiveStatus(
  id: string,
  currentStatus: boolean,
  supabaseClient?: SupabaseClient
): Promise<IndividualCustomerPlanHistoryAttributes> {
  return updateIndividualCustomerPlanHistory(id, { isActive: !currentStatus }, supabaseClient);
}
