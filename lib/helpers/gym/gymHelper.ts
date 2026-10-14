import { supabase } from '@/lib/supabase';
export {
  base64ToArrayBuffer,
  getGymLogoUrl,
  uploadGymLogo,
  uploadGymQR,
} from './gymStorageHelper';

export type GymLabelType = 'basic' | 'silver' | 'white' | 'premiumwhite';

export interface GymAttributes {
  gymId?: string;
  gymName: string;
  gymEmail: string;
  phone: string;
  alternatePhone?: string | null;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  noOfBranches?: number | null;
  establishYear?: string | null;
  notes?: string | null;
  logo?: string | null;
  isActive?: boolean;
  is_deleted?: boolean;
  createdBy: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
  website?: string | null;
  qrPath?: string | null;
  label?: GymLabelType | string | null;
}

export interface SaveGymParams {
  gymId?: string;
  gymName: string;
  gymEmail: string;
  phone: string;
  alternatePhone?: string | null;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  noOfBranches?: number | null;
  establishYear?: string | null;
  notes?: string | null;
  logo?: string | null;
  isActive?: boolean;
  createdBy: string;
  website?: string | null;
  qrPath?: string | null;
  label?: GymLabelType | string | null;
}



export async function fetchGyms(createdBy?: string) {
  let query = supabase
    .from('gyms')
    .select('*')
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  if (createdBy) {
    query = query.eq('createdBy', createdBy);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[gymHelper] fetchGyms Error:', error);
    throw error;
  }

  return data ?? [];
}

export async function fetchGymsPaginated(
  page: number = 1,
  limit: number = 10,
  searchQuery?: string,
  statusFilter?: string,
  createdBy?: string,
  sortOrder: 'newest' | 'oldest' = 'newest'
) {
  let query = supabase
    .from('gyms')
    .select('*', { count: 'exact' })
    .eq('is_deleted', false);

  if (createdBy) {
    query = query.eq('createdBy', createdBy);
  }

  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('isActive', statusFilter === 'active');
  }

  if (searchQuery) {
    query = query.or(`gymName.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%,gymEmail.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
  }

  query = query.order('createdAt', { ascending: sortOrder === 'oldest' });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('[gymHelper] fetchGymsPaginated Error:', error);
    throw error;
  }

  return { data: data ?? [], total: count ?? 0 };
}

export async function fetchGymById(gymId: string) {
  const { data, error } = await supabase
    .from('gyms')
    .select('*')
    .eq('gymId', gymId)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[gymHelper] fetchGymById Error:', error);
    throw error;
  }

  return data;
}

export async function saveGym(gymData: SaveGymParams) {
  const now = new Date().toISOString();

  if (gymData.gymId) {
    const { data, error } = await supabase
      .from('gyms')
      .update({
        gymName: gymData.gymName,
        gymEmail: gymData.gymEmail,
        phone: gymData.phone,
        alternatePhone: gymData.alternatePhone,
        address: gymData.address,
        city: gymData.city,
        state: gymData.state,
        pinCode: gymData.pinCode,
        noOfBranches: gymData.noOfBranches,
        establishYear: gymData.establishYear,
        notes: gymData.notes,
        logo: gymData.logo,
        website: gymData.website,
        qrPath: gymData.qrPath,
        label: gymData.label !== undefined ? gymData.label : undefined,
        isActive: gymData.isActive ?? true,
        updatedAt: now,
      })
      .eq('gymId', gymData.gymId)
      .select();

    if (error) {
      console.error('[gymHelper] saveGym Update Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  } else {
    const generatedGymId = gymData.gymId || crypto.randomUUID();
    const { data, error } = await supabase
      .from('gyms')
      .insert([
        {
          gymId: generatedGymId,
          gymName: gymData.gymName,
          gymEmail: gymData.gymEmail,
          phone: gymData.phone,
          alternatePhone: gymData.alternatePhone || null,
          address: gymData.address,
          city: gymData.city,
          state: gymData.state,
          pinCode: gymData.pinCode,
          noOfBranches: gymData.noOfBranches || null,
          establishYear: gymData.establishYear || null,
          notes: gymData.notes || null,
          logo: gymData.logo || null,
          website: gymData.website || null,
          qrPath: gymData.qrPath || null,
          label: gymData.label || 'basic',
          isActive: gymData.isActive ?? true,
          is_deleted: false,
          createdBy: gymData.createdBy,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .select();

    if (error) {
      console.error('[gymHelper] saveGym Insert Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  }
}

export async function deleteGym(gymId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('gyms')
    .update({
      is_deleted: true,
      deletedAt: now,
      updatedAt: now,
    })
    .eq('gymId', gymId)
    .select();

  if (error) {
    console.error('[gymHelper] deleteGym Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}

export async function toggleGymActiveStatus(gymId: string, currentStatus: boolean) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('gyms')
    .update({
      isActive: !currentStatus,
      updatedAt: now,
    })
    .eq('gymId', gymId)
    .select();

  if (error) {
    console.error('[gymHelper] toggleGymActiveStatus Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}


