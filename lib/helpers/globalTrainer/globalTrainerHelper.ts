import { supabase } from '@/lib/supabase';

export type GlobalTrainerGender = 'male' | 'female' | 'others' | string;
export type GlobalTrainerSpecialization = 'strength' | 'fatloss' | 'crossfit' | string;

export interface GlobalTrainerAttributes {
  globalTrainerId?: string;
  userId?: string | null;
  fullName: string;
  dateOfBirth: string;
  gender: GlobalTrainerGender;
  mobile: string;
  alternateMobile?: string | null;
  email: string;
  specialization: GlobalTrainerSpecialization;
  experience: number;
  joiningDate: string;
  qualification: string;
  bio?: string | null;
  languagesSpoken: string[];
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
  isActive?: boolean;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveGlobalTrainerParams {
  globalTrainerId?: string;
  userId?: string | null;
  fullName: string;
  dateOfBirth: string;
  gender: GlobalTrainerGender;
  mobile: string;
  alternateMobile?: string | null;
  email: string;
  specialization: GlobalTrainerSpecialization;
  experience: number | string;
  joiningDate: string;
  qualification: string;
  bio?: string | null;
  languagesSpoken: string[] | string;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: number | string;
  isActive?: boolean;
}

export async function fetchGlobalTrainers(searchQuery?: string) {
  try {
    const { getGlobalTrainersAction } = await import('@/app/actions/customer/getGlobalTrainersAction');
    const serverData = await getGlobalTrainersAction(searchQuery);
    if (serverData && serverData.length > 0) {
      return serverData;
    }
  } catch (err) {
    console.warn('[globalTrainerHelper] Server action fetch fallback:', err);
  }

  let query = supabase.from('global_trainers').select('*').eq('is_deleted', false).order('createdAt', { ascending: false });
  if (searchQuery?.trim()) {
    const q = searchQuery.trim();
    query = query.or(`fullName.ilike.%${q}%,email.ilike.%${q}%,mobile.ilike.%${q}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainers Error:', error);
    throw error;
  }
  return data ?? [];
}

export async function fetchGlobalTrainersPaginated(
  page: number = 1,
  limit: number = 10,
  searchQuery?: string,
  statusFilter?: string,
  sortOrder: 'newest' | 'oldest' = 'newest'
) {
  let query = supabase.from('global_trainers').select('*', { count: 'exact' }).eq('is_deleted', false);
  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('isActive', statusFilter === 'active');
  }
  if (searchQuery?.trim()) {
    const q = searchQuery.trim();
    query = query.or(`fullName.ilike.%${q}%,email.ilike.%${q}%,mobile.ilike.%${q}%,city.ilike.%${q}%,state.ilike.%${q}%`);
  }
  query = query.order('createdAt', { ascending: sortOrder === 'oldest' });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, count, error } = await query.range(from, to);

  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainersPaginated Error:', error);
    throw error;
  }
  return { data: data ?? [], total: count ?? 0 };
}

export async function fetchGlobalTrainerById(globalTrainerId: string) {
  const { data, error } = await supabase.from('global_trainers').select('*').eq('globalTrainerId', globalTrainerId).eq('is_deleted', false).maybeSingle();
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainerById Error:', error);
    throw error;
  }
  return data;
}

export async function fetchGlobalTrainerByUserId(userId: string) {
  const { data, error } = await supabase.from('global_trainers').select('*').eq('userId', userId).eq('is_deleted', false).maybeSingle();
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainerByUserId Error:', error);
    throw error;
  }
  return data;
}

export async function fetchGlobalTrainerByEmail(email: string) {
  const { data, error } = await supabase.from('global_trainers').select('*').eq('email', email.trim().toLowerCase()).eq('is_deleted', false).maybeSingle();
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainerByEmail Error:', error);
    throw error;
  }
  return data;
}

export async function fetchGlobalTrainerByMobile(mobile: string) {
  const { data, error } = await supabase.from('global_trainers').select('*').eq('mobile', mobile.trim()).eq('is_deleted', false).maybeSingle();
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainerByMobile Error:', error);
    throw error;
  }
  return data;
}

export async function fetchGlobalTrainerByIdentifier(identifier: string) {
  const clean = identifier.trim();
  const isEmail = clean.includes('@');
  const column = isEmail ? 'email' : 'mobile';
  const { data, error } = await supabase.from('global_trainers').select('*').eq(column, isEmail ? clean.toLowerCase() : clean).eq('is_deleted', false).maybeSingle();
  if (error) {
    console.error('[globalTrainerHelper] fetchGlobalTrainerByIdentifier Error:', error);
    throw error;
  }
  return data;
}

export async function saveGlobalTrainer(trainerData: SaveGlobalTrainerParams) {
  const now = new Date().toISOString();
  const parsedLanguages = Array.isArray(trainerData.languagesSpoken)
    ? trainerData.languagesSpoken
    : typeof trainerData.languagesSpoken === 'string'
      ? (trainerData.languagesSpoken as string).split(',').map((s) => s.trim()).filter(Boolean)
      : [];

  const commonPayload = {
    fullName: trainerData.fullName,
    dateOfBirth: trainerData.dateOfBirth,
    gender: trainerData.gender,
    mobile: trainerData.mobile.trim(),
    alternateMobile: trainerData.alternateMobile ? trainerData.alternateMobile.trim() : null,
    email: trainerData.email.trim().toLowerCase(),
    specialization: trainerData.specialization,
    experience: Number(trainerData.experience) || 0,
    joiningDate: trainerData.joiningDate,
    qualification: trainerData.qualification,
    bio: trainerData.bio ? trainerData.bio.trim() : null,
    languagesSpoken: parsedLanguages,
    address: trainerData.address,
    country: trainerData.country,
    state: trainerData.state,
    city: trainerData.city,
    pincode: Number(trainerData.pincode) || 0,
    isActive: trainerData.isActive ?? true,
    updatedAt: now,
  };

  if (trainerData.globalTrainerId) {
    const updatePayload: Record<string, any> = { ...commonPayload };
    if (trainerData.userId !== undefined) {
      updatePayload.userId = trainerData.userId || null;
    }
    const { data, error } = await supabase.from('global_trainers').update(updatePayload).eq('globalTrainerId', trainerData.globalTrainerId).select();
    if (error) {
      console.error('[globalTrainerHelper] saveGlobalTrainer Update Error:', error);
      throw error;
    }
    return data ? data[0] : null;
  }

  const generatedId = trainerData.globalTrainerId || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined);
  const insertPayload: Record<string, any> = {
    ...commonPayload,
    is_deleted: false,
    userId: trainerData.userId || null,
    createdAt: now,
  };
  if (generatedId) insertPayload.globalTrainerId = generatedId;

  const { data, error } = await supabase.from('global_trainers').insert([insertPayload]).select();
  if (error) {
    console.error('[globalTrainerHelper] saveGlobalTrainer Insert Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}

export async function deleteGlobalTrainer(globalTrainerId: string) {
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('global_trainers').update({ is_deleted: true, deletedAt: now, updatedAt: now }).eq('globalTrainerId', globalTrainerId).select();
  if (error) {
    console.error('[globalTrainerHelper] deleteGlobalTrainer Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}

export async function toggleGlobalTrainerActiveStatus(globalTrainerId: string, currentStatus: boolean) {
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('global_trainers').update({ isActive: !currentStatus, updatedAt: now }).eq('globalTrainerId', globalTrainerId).select();
  if (error) {
    console.error('[globalTrainerHelper] toggleGlobalTrainerActiveStatus Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}

export async function linkGlobalTrainerUser(globalTrainerId: string, userId: string) {
  const now = new Date().toISOString();
  const { data, error } = await supabase.from('global_trainers').update({ userId, updatedAt: now }).eq('globalTrainerId', globalTrainerId).select();
  if (error) {
    console.error('[globalTrainerHelper] linkGlobalTrainerUser Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}
