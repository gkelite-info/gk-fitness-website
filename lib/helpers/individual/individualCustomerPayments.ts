import { createClient } from '@/app/api/supabase/client';
import { supabase as fallbackSupabase } from '@/lib/supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

export type IndividualCustomerPaymentType = 'membership';
export type IndividualCustomerPaymentMode = 'upi' | 'cash' | 'card' | 'netbanking' | 'wallet';

export function normalizeIndividualPaymentMode(
  rawMethod?: string | null,
  rzpDetails?: {
    method?: string | null;
    bank?: string | null;
    vpa?: string | null;
    card_id?: string | null;
    wallet?: string | null;
  }
): IndividualCustomerPaymentMode {
  if (rzpDetails?.bank) return 'netbanking';
  if (rzpDetails?.card_id) return 'card';
  if (rzpDetails?.wallet) return 'wallet';
  if (rzpDetails?.vpa) return 'upi';

  const m = (rawMethod || rzpDetails?.method || '').trim().toLowerCase();
  if (
    m.includes('net') ||
    m.includes('bank') ||
    m.includes('internet') ||
    m.includes('nb') ||
    m.includes('neft') ||
    m.includes('rtgs') ||
    m.includes('imps')
  ) {
    return 'netbanking';
  }

  if (
    m.includes('card') ||
    m.includes('credit') ||
    m.includes('debit') ||
    m.includes('visa') ||
    m.includes('master') ||
    m.includes('rupay') ||
    m.includes('amex')
  ) {
    return 'card';
  }

  if (
    m.includes('wallet') ||
    m.includes('paytm') ||
    m.includes('mobikwik') ||
    m.includes('freecharge')
  ) {
    return 'wallet';
  }

  if (m.includes('cash') || m.includes('offline')) {
    return 'cash';
  }

  if (
    m.includes('upi') ||
    m.includes('qr') ||
    m.includes('vpa') ||
    m.includes('gpay') ||
    m.includes('phonepe')
  ) {
    return 'upi';
  }

  return 'netbanking';
}

export interface IndividualCustomerPaymentAttributes {
  individualCustomerPaymentId: string;
  userId: string;
  subscriptionPlanId?: string | null;
  paymentType: IndividualCustomerPaymentType;
  paymentMode: IndividualCustomerPaymentMode;
  amountPaid: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: {
    userId: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    profilePhoto?: string | null;
  } | null;
  subscription?: {
    subscriptionPlanId: string;
    planName: string;
    label?: string | null;
    price?: number | null;
    planFor?: string | null;
  } | null;
}

export interface SaveIndividualCustomerPaymentParams {
  individualCustomerPaymentId?: string;
  userId: string;
  subscriptionPlanId?: string | null;
  paymentType?: IndividualCustomerPaymentType;
  paymentMode?: IndividualCustomerPaymentMode;
  amountPaid: number;
}

export const BASE_INDIVIDUAL_PAYMENT_SELECT = `
  *,
  user:users!userId (userId, name, email, phone, profilePhoto),
  subscription:subscriptions!subscriptionPlanId (subscriptionPlanId, planName, label, price, planFor)
`;

const getSupabase = (client?: SupabaseClient) => {
  if (client) return client;
  try {
    return createClient();
  } catch {
    return fallbackSupabase;
  }
};

export async function fetchIndividualCustomerPayments(
  userId?: string,
  subscriptionPlanId?: string,
  client?: SupabaseClient
): Promise<IndividualCustomerPaymentAttributes[]> {
  const supabase = getSupabase(client);
  let query = supabase
    .from('individual_customer_payments')
    .select(BASE_INDIVIDUAL_PAYMENT_SELECT)
    .is('deletedAt', null)
    .order('createdAt', { ascending: false });

  if (userId) query = query.eq('userId', userId);
  if (subscriptionPlanId) query = query.eq('subscriptionPlanId', subscriptionPlanId);

  const { data, error } = await query;
  if (error) {
    console.error('[individualCustomerPayments] fetch error:', error);
    throw error;
  }
  return (data as IndividualCustomerPaymentAttributes[]) ?? [];
}

export async function fetchIndividualCustomerPaymentById(
  id: string,
  client?: SupabaseClient
): Promise<IndividualCustomerPaymentAttributes | null> {
  const supabase = getSupabase(client);
  const { data, error } = await supabase
    .from('individual_customer_payments')
    .select(BASE_INDIVIDUAL_PAYMENT_SELECT)
    .eq('individualCustomerPaymentId', id)
    .is('deletedAt', null)
    .maybeSingle();

  if (error) {
    console.error('[individualCustomerPayments] fetchById error:', error);
    throw error;
  }
  return (data as IndividualCustomerPaymentAttributes) ?? null;
}

export async function saveIndividualCustomerPayment(
  params: SaveIndividualCustomerPaymentParams,
  client?: SupabaseClient
): Promise<IndividualCustomerPaymentAttributes> {
  const supabase = getSupabase(client);
  const now = new Date().toISOString();
  const paymentId = params.individualCustomerPaymentId || crypto.randomUUID();

  const payload = {
    individualCustomerPaymentId: paymentId,
    userId: params.userId,
    subscriptionPlanId: params.subscriptionPlanId || null,
    paymentType: params.paymentType || 'membership',
    paymentMode: normalizeIndividualPaymentMode(params.paymentMode),
    amountPaid: Number(params.amountPaid) || 0,
    updatedAt: now,
  };

  const { data: existing } = await supabase
    .from('individual_customer_payments')
    .select('individualCustomerPaymentId')
    .eq('individualCustomerPaymentId', paymentId)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('individual_customer_payments')
      .update(payload)
      .eq('individualCustomerPaymentId', paymentId)
      .select(BASE_INDIVIDUAL_PAYMENT_SELECT)
      .single();

    if (error) {
      console.error('[individualCustomerPayments] update error:', error);
      throw error;
    }
    return data as IndividualCustomerPaymentAttributes;
  }

  const { data, error } = await supabase
    .from('individual_customer_payments')
    .insert([{ ...payload, createdAt: now, deletedAt: null }])
    .select(BASE_INDIVIDUAL_PAYMENT_SELECT)
    .single();

  if (error) {
    console.error('[individualCustomerPayments] insert error:', error);
    throw error;
  }
  return data as IndividualCustomerPaymentAttributes;
}

export async function deleteIndividualCustomerPayment(
  id: string,
  client?: SupabaseClient
): Promise<boolean> {
  const supabase = getSupabase(client);
  const now = new Date().toISOString();
  const { error } = await supabase
    .from('individual_customer_payments')
    .update({ deletedAt: now, updatedAt: now })
    .eq('individualCustomerPaymentId', id);

  if (error) {
    console.error('[individualCustomerPayments] delete error:', error);
    throw error;
  }
  return true;
}

