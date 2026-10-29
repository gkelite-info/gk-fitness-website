import { createClient } from '@/app/api/supabase/client';
import { supabase as fallbackSupabase } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface IndividualCustomerPlanAttributes {
  individualCustomerPlanId: string;
  subscriptionPlanId: string;
  userId?: string | null;
  customAmount?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  isActive?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  transactionId?: string | null;
  status?: 'pending' | 'successful' | 'failed' | string;
  user?: {
    userId: string;
    name: string;
    email?: string;
    phone?: string;
    profilePhoto?: string;
    status?: string;
    createdAt?: string;
  } | null;
  subscription?: {
    subscriptionPlanId: string;
    planName: string;
    label: string;
    price: number;
    planFor: string;
  } | null;
}

export interface SaveIndividualCustomerPlanParams {
  individualCustomerPlanId?: string;
  subscriptionPlanId?: string;
  userId?: string | null;
  customAmount?: number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isActive?: boolean;
  status?: 'pending' | 'successful' | 'failed' | string;
  transactionId?: string | null;
}

export const BASE_PLAN_SELECT = `
  *,
  user:users (userId, name, email, phone, profilePhoto, status, createdAt),
  subscription:subscriptions (subscriptionPlanId, planName, label, price, planFor)
`;

const getSupabase = (client?: SupabaseClient) => {
  if (client) return client;
  try {
    return createClient();
  } catch {
    return fallbackSupabase;
  }
};

  export async function fetchIndividualCustomerPlans(
    userId?: string,
    subscriptionPlanId?: string,
    client?: SupabaseClient
  ) {
    const supabase = getSupabase(client);
    let query = supabase
      .from('individual_customer_plans')
      .select(BASE_PLAN_SELECT)
      .is('deletedAt', null)
      .order('createdAt', { ascending: false });

    if (userId) query = query.eq('userId', userId);
    if (subscriptionPlanId) query = query.eq('subscriptionPlanId', subscriptionPlanId);

    const { data, error } = await query;
    if (error) {
      console.error('[individualCustomerPlanHelper] fetchIndividualCustomerPlans Error:', error);
      throw error;
    }
    return (data as IndividualCustomerPlanAttributes[]) ?? [];
  }

    export async function fetchIndividualCustomerPlanById(id: string, client?: SupabaseClient) {
      const supabase = getSupabase(client);
      const { data, error } = await supabase
        .from('individual_customer_plans')
        .select(BASE_PLAN_SELECT)
        .eq('individualCustomerPlanId', id)
        .is('deletedAt', null)
        .maybeSingle();

    if (error) {
      console.error('[individualCustomerPlanHelper] fetchIndividualCustomerPlanById Error:', error);
      throw error;
    }
    return (data as IndividualCustomerPlanAttributes) ?? null;
  }

    export async function fetchActiveIndividualCustomerPlan(userId: string, client?: SupabaseClient) {
      const supabase = getSupabase(client);
      const { data, error } = await supabase
        .from('individual_customer_plans')
        .select(BASE_PLAN_SELECT)
        .eq('userId', userId)
        .eq('isActive', true)
        .is('deletedAt', null)
        .order('createdAt', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
      console.error('[individualCustomerPlanHelper] fetchActiveIndividualCustomerPlan Error:', error);
      throw error;
    }
    return (data as IndividualCustomerPlanAttributes) ?? null;
  }

    export async function saveIndividualCustomerPlan(
      planData: SaveIndividualCustomerPlanParams,
      client?: SupabaseClient
    ) {
      const supabase = getSupabase(client);
      const now = new Date().toISOString();
      let targetPlanId = planData.individualCustomerPlanId;
      let isUpdate = false;

      if (targetPlanId) {
        const { data } = await supabase
          .from('individual_customer_plans')
          .select('individualCustomerPlanId')
          .eq('individualCustomerPlanId', targetPlanId)
          .is('deletedAt', null)
          .maybeSingle();
        if (data) isUpdate = true;
      }

      if (!isUpdate && planData.userId) {
        const { data } = await supabase
          .from('individual_customer_plans')
          .select('individualCustomerPlanId')
          .eq('userId', planData.userId)
          .is('deletedAt', null)
          .order('createdAt', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data) {
          targetPlanId = data.individualCustomerPlanId;
          isUpdate = true;
        }
      }

      const finalStartDate = planData.startDate ? new Date(planData.startDate).toISOString() : null;
      const finalEndDate = planData.endDate ? new Date(planData.endDate).toISOString() : null;

      let finalAmount = planData.customAmount;
      if (finalAmount === undefined || finalAmount === null) {
        if (planData.subscriptionPlanId) {
          const { data: subData } = await supabase
            .from('subscriptions')
            .select('price')
            .eq('subscriptionPlanId', planData.subscriptionPlanId)
            .maybeSingle();
          if (subData?.price !== undefined && subData?.price !== null) {
            finalAmount = Number(subData.price);
          }
        }
      }

      const finalIsActive = planData.isActive !== undefined ? planData.isActive : true;

      if (isUpdate && targetPlanId) {
        const updatePayload: Record<string, any> = {
          subscriptionPlanId: planData.subscriptionPlanId,
          userId: planData.userId || null,
          customAmount: finalAmount ?? null,
          startDate: finalStartDate,
          endDate: finalEndDate,
          isActive: finalIsActive,
          updatedAt: now,
        };
        if (planData.status) updatePayload.status = planData.status;
        if (planData.transactionId !== undefined) updatePayload.transactionId = planData.transactionId;

          const { data, error } = await supabase
            .from('individual_customer_plans')
      .update(updatePayload)
            .eq('individualCustomerPlanId', targetPlanId)
            .select(BASE_PLAN_SELECT);

          if (error) {
            console.error('[individualCustomerPlanHelper] saveIndividualCustomerPlan update Error:', error);
            throw error;
          }
          return (data ? data[0] : null) as IndividualCustomerPlanAttributes | null;
        } else {
          const generatedId = targetPlanId || crypto.randomUUID();
          const insertPayload = {
            individualCustomerPlanId: generatedId,
            subscriptionPlanId: planData.subscriptionPlanId,
            userId: planData.userId || null,
            customAmount: finalAmount ?? null,
            startDate: finalStartDate,
            endDate: finalEndDate,
            isActive: finalIsActive,
            status: planData.status || (finalStartDate && finalEndDate ? 'successful' : 'pending'),
            transactionId: planData.transactionId || null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
          };

          const { data, error } = await supabase
            .from('individual_customer_plans')
      .insert([insertPayload])
            .select(BASE_PLAN_SELECT);

      if (error) {
        console.error('[individualCustomerPlanHelper] saveIndividualCustomerPlan insert Error:', error);
        throw error;
      }
      return (data ? data[0] : null) as IndividualCustomerPlanAttributes | null;
    }
  }

  export async function deleteIndividualCustomerPlan(id: string, client?: SupabaseClient) {
    const supabase = getSupabase(client);
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('individual_customer_plans')
      .update({ isActive: false, deletedAt: now, updatedAt: now })
      .eq('individualCustomerPlanId', id)
      .select();
    if (error) throw error;
    return (data ? data[0] : null) as IndividualCustomerPlanAttributes | null;
  }

  export async function toggleIndividualCustomerPlanActiveStatus(
    id: string,
    currentStatus: boolean,
    client?: SupabaseClient
  ) {
    const supabase = getSupabase(client);
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('individual_customer_plans')
      .update({ isActive: !currentStatus, updatedAt: now })
      .eq('individualCustomerPlanId', id)
      .select();
    if (error) throw error;
    return (data ? data[0] : null) as IndividualCustomerPlanAttributes | null;
  }

    export async function fetchIndividualCustomerPlansPaginated(
      page: number = 1,
    limit: number = 10,
      searchQuery ?: string,
      sortOrder: 'newest' | 'oldest' = 'newest',
        subscriptionPlanId ?: string,
        isActive ?: boolean,
        client ?: SupabaseClient
) {
      const supabase = getSupabase(client);
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      let query = supabase
        .from('individual_customer_plans')
        .select(BASE_PLAN_SELECT, { count: 'exact' })
        .is('deletedAt', null)
        .order('createdAt', { ascending: sortOrder === 'oldest' });

      if (searchQuery) query = query.ilike('user.name', `%${searchQuery}%`);
      if (subscriptionPlanId) query = query.eq('subscriptionPlanId', subscriptionPlanId);
      if (isActive !== undefined) query = query.eq('isActive', isActive);

      const { data, count, error } = await query.range(from, to);
      if (error) throw error;

    return { data: (data as IndividualCustomerPlanAttributes[]) ?? [], total: count ?? 0 };
  }
