import { createClient } from '@/app/api/supabase/client';

export interface GymEnquiryAttributes {
  gymEnquiryId?: string;
  fullName: string;
  mobile: string;
  email: string;
  gender: 'male' | 'female' | 'others';
  interestedIn: 'membership' | 'personaltraining' | 'groupclass' | 'others';
  planId?: string | null;
  addedThrough: 'socialmedia' | 'walkin' | 'owner';
  enquirySource: 'google' | 'instagram' | 'facebook' | 'referral' | 'walkin' | 'owner' | 'others';
  notes?: string | null;
  enquiryCategory: 'hot' | 'warm' | 'cold';
  followUpDate: string | Date;
  gymId: string;
  createdBy?: string | null;
  status: 'new' | 'followup' | 'converted' | 'notinterested';
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveGymEnquiryParams {
  gymEnquiryId?: string;
  fullName: string;
  mobile: string;
  email: string;
  gender?: 'male' | 'female' | 'others';
  interestedIn?: 'membership' | 'personaltraining' | 'groupclass' | 'others';
  planId?: string | null;
  addedThrough?: 'socialmedia' | 'walkin' | 'owner';
  enquirySource?: 'google' | 'instagram' | 'facebook' | 'referral' | 'walkin' | 'owner' | 'others';
  notes?: string | null;
  enquiryCategory?: 'hot' | 'warm' | 'cold';
  followUpDate: string | Date;
  gymId: string;
  createdBy?: string | null;
  status?: 'new' | 'followup' | 'converted' | 'notinterested';
}

export async function fetchGymEnquiries(gymId?: string) {
  const supabase = createClient();
  let query = supabase
    .from('gym_enquiries')
    .select('*, plan:gym_membership_plans(planName, durationMonths), user:users!gym_enquiries_createdBy_fkey(name)')
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  if (gymId) {
    query = query.eq('gymId', gymId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[gymEnquiriesHelper] fetchGymEnquiries Error:', error);
    throw error;
  }

  return data ?? [];
}

export async function fetchGymEnquiryById(gymEnquiryId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gym_enquiries')
    .select('*, plan:gym_membership_plans(planName, durationMonths), user:users!gym_enquiries_createdBy_fkey(name)')
    .eq('gymEnquiryId', gymEnquiryId)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[gymEnquiriesHelper] fetchGymEnquiryById Error:', error);
    throw error;
  }

  return data;
}

export async function saveGymEnquiry(enquiryData: SaveGymEnquiryParams) {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (enquiryData.gymEnquiryId) {
    const { data, error } = await supabase
      .from('gym_enquiries')
      .update({
        fullName: enquiryData.fullName,
        mobile: enquiryData.mobile,
        email: enquiryData.email,
        gender: enquiryData.gender ?? 'male',
        interestedIn: enquiryData.interestedIn ?? 'membership',
        planId: enquiryData.planId ?? null,
        addedThrough: enquiryData.addedThrough ?? 'owner',
        enquirySource: enquiryData.enquirySource ?? 'owner',
        notes: enquiryData.notes ?? null,
        enquiryCategory: enquiryData.enquiryCategory ?? 'cold',
        followUpDate: enquiryData.followUpDate,
        gymId: enquiryData.gymId,
        status: enquiryData.status ?? 'new',
        updatedAt: now,
      })
      .eq('gymEnquiryId', enquiryData.gymEnquiryId)
      .select();

    if (error) {
      console.error('[gymEnquiriesHelper] saveGymEnquiry Update Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  } else {
    const generatedGymEnquiryId = enquiryData.gymEnquiryId || crypto.randomUUID();
    const { data, error } = await supabase
      .from('gym_enquiries')
      .insert([
        {
          gymEnquiryId: generatedGymEnquiryId,
          fullName: enquiryData.fullName,
          mobile: enquiryData.mobile,
          email: enquiryData.email,
          gender: enquiryData.gender ?? 'male',
          interestedIn: enquiryData.interestedIn ?? 'membership',
          planId: enquiryData.planId ?? null,
          addedThrough: enquiryData.addedThrough ?? 'owner',
          enquirySource: enquiryData.enquirySource ?? 'owner',
          notes: enquiryData.notes ?? null,
          enquiryCategory: enquiryData.enquiryCategory ?? 'cold',
          followUpDate: enquiryData.followUpDate,
          gymId: enquiryData.gymId,
          createdBy: enquiryData.createdBy,
          status: enquiryData.status ?? 'new',
          is_deleted: false,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .select();

    if (error) {
      console.error('[gymEnquiriesHelper] saveGymEnquiry Insert Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  }
}

export async function deleteGymEnquiry(gymEnquiryId: string) {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('gym_enquiries')
    .update({
      is_deleted: true,
      deletedAt: now,
      updatedAt: now,
    })
    .eq('gymEnquiryId', gymEnquiryId)
    .select();

  if (error) {
    console.error('[gymEnquiriesHelper] deleteGymEnquiry Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}

export async function updateGymEnquiryStatus(gymEnquiryId: string, status: 'new' | 'followup' | 'converted' | 'notinterested', category?: 'hot' | 'warm' | 'cold') {
  const supabase = createClient();
  const now = new Date().toISOString();
  
  const updateData: any = {
    status: status,
    updatedAt: now,
  };
  
  if (category) {
    updateData.enquiryCategory = category;
  }

  const { data, error } = await supabase
    .from('gym_enquiries')
    .update(updateData)
    .eq('gymEnquiryId', gymEnquiryId)
    .select();

  if (error) {
    console.error('[gymEnquiriesHelper] updateGymEnquiryStatus Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}
