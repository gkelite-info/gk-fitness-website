import { createClient } from '@/app/api/supabase/client';

export interface TrainerChangeLogAttributes {
  trainerChangeLogId?: string;
  gymId: string;
  customerId: string;
  oldTrainerId?: string | null;
  oldTrainerSince?: string | Date | null;
  newTrainerId: string;
  reason?: string | null;
  notes?: string | null;
  changedBy: string;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveTrainerChangeLogParams {
  gymId: string;
  customerId: string;
  oldTrainerId?: string | null;
  oldTrainerSince?: string | Date | null;
  newTrainerId: string;
  reason?: string | null;
  notes?: string | null;
  changedBy: string;
}

export async function fetchTrainerChangeLogsByGym(gymId?: string) {
  const supabase = createClient();
  let query = supabase
    .from('trainer_change_logs')
    .select('*, customer:gym_customers(fullName), oldTrainer:gym_trainers!oldTrainerId(fullName), newTrainer:gym_trainers!newTrainerId(fullName), changedByOwner:gym_owners(fullName)')
    .or('is_deleted.eq.false,is_deleted.is.null')
    .order('createdAt', { ascending: false });

  if (gymId) {
    query = query.eq('gymId', gymId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[trainerChangeLogsHelper] fetchTrainerChangeLogsByGym Error:', error);
    return [];
  }

  return data ?? [];
}

export async function fetchTrainerChangeLogsByCustomer(customerId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('trainer_change_logs')
    .select('*, customer:gym_customers(fullName), oldTrainer:gym_trainers!oldTrainerId(fullName), newTrainer:gym_trainers!newTrainerId(fullName), changedByOwner:gym_owners(fullName)')
    .eq('customerId', customerId)
    .or('is_deleted.eq.false,is_deleted.is.null')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('[trainerChangeLogsHelper] fetchTrainerChangeLogsByCustomer Error:', error);
    return [];
  }

  return data ?? [];
}

export async function saveTrainerChangeLog(params: SaveTrainerChangeLogParams) {
  const supabase = createClient();
  
  const now = new Date().toISOString();
  const payload = {
    ...params,
    trainerChangeLogId: crypto.randomUUID(),
    is_deleted: false,
    createdAt: now,
    updatedAt: now
  };

  const { data, error } = await supabase
    .from('trainer_change_logs')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[trainerChangeLogsHelper] saveTrainerChangeLog Error:', error);
    throw error;
  }

  return data;
}
