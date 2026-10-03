import { createClient } from '@/app/api/supabase/client';

export type EnquiryActionType = 'interested' | 'calllater' | 'notinterested' | 'noresponse' | 'visitedgym' | 'converted';

export interface GymEnquiryFollowupAttributes {
  followupId?: string;
  gymEnquiryId: string;
  gymId: string;
  actionType: EnquiryActionType;
  followUpnotes?: string | null;
  nextFollowUpDate?: string | Date | null;
  nextFollowUpTime?: string | null;
  createdBy?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveGymEnquiryFollowupParams {
  followupId?: string;
  gymEnquiryId: string;
  gymId: string;
  actionType: EnquiryActionType;
  followUpnotes?: string | null;
  nextFollowUpDate?: string | Date | null;
  nextFollowUpTime?: string | null;
  createdBy?: string | null;
}

export async function fetchGymEnquiryFollowups(gymEnquiryId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gym_enquiry_followups')
    .select('*, user:users!gym_enquiry_followups_createdBy_fkey(name)')
    .eq('gymEnquiryId', gymEnquiryId)
    .is('deletedAt', null)
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('[gymEnquiryFollowupsHelper] fetchGymEnquiryFollowups Error:', error);
    throw error;
  }

  return data ?? [];
}

export async function fetchGymEnquiryFollowupById(followupId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gym_enquiry_followups')
    .select('*, user:users!gym_enquiry_followups_createdBy_fkey(name), enquiry:gym_enquiries(fullName)')
    .eq('followupId', followupId)
    .is('deletedAt', null)
    .maybeSingle();

  if (error) {
    console.error('[gymEnquiryFollowupsHelper] fetchGymEnquiryFollowupById Error:', error);
    throw error;
  }

  return data;
}

export async function fetchAllFollowupsByGymId(gymId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gym_enquiry_followups')
    .select('*, user:users!gym_enquiry_followups_createdBy_fkey(name), enquiry:gym_enquiries(fullName)')
    .eq('gymId', gymId)
    .is('deletedAt', null)
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('[gymEnquiryFollowupsHelper] fetchAllFollowupsByGymId Error:', error);
    throw error;
  }

  return data ?? [];
}

export async function saveGymEnquiryFollowup(followupData: SaveGymEnquiryFollowupParams) {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (followupData.followupId) {
    const { data, error } = await supabase
      .from('gym_enquiry_followups')
      .update({
        actionType: followupData.actionType,
        followUpnotes: followupData.followUpnotes ?? null,
        nextFollowUpDate: followupData.nextFollowUpDate ?? null,
        nextFollowUpTime: followupData.nextFollowUpTime ?? null,
        updatedAt: now,
      })
      .eq('followupId', followupData.followupId)
      .select();

    if (error) {
      console.error('[gymEnquiryFollowupsHelper] saveGymEnquiryFollowup Update Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  } else {
    const generatedFollowupId = crypto.randomUUID();
    const { data, error } = await supabase
      .from('gym_enquiry_followups')
      .insert([
        {
          followupId: generatedFollowupId,
          gymEnquiryId: followupData.gymEnquiryId,
          gymId: followupData.gymId,
          actionType: followupData.actionType,
          followUpnotes: followupData.followUpnotes ?? null,
          nextFollowUpDate: followupData.nextFollowUpDate ?? null,
          nextFollowUpTime: followupData.nextFollowUpTime ?? null,
          createdBy: followupData.createdBy ?? null,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .select();

    if (error) {
      console.error('[gymEnquiryFollowupsHelper] saveGymEnquiryFollowup Insert Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  }
}

export async function deleteGymEnquiryFollowup(followupId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('gym_enquiry_followups')
    .update({ deletedAt: new Date().toISOString() })
    .eq('followupId', followupId);

  if (error) {
    console.error('[gymEnquiryFollowupsHelper] deleteGymEnquiryFollowup Error:', error);
    throw error;
  }

  return true;
}
