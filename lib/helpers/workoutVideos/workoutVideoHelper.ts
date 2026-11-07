import { supabase } from '@/lib/supabase';
import {
  WorkoutVideoItem,
  WorkoutVideoStats,
  WORKOUT_CATEGORIES,
  EQUIPMENT_OPTIONS,
  MUSCLE_OPTIONS,
  DIFFICULTY_OPTIONS,
  GENDER_ROLES,
} from '@/lib/types/workouts';

export interface WorkoutVideoAttributes {
  workoutVideoId?: string;
  workoutId: string;
  videoUrl: string;
  exerciseName?: string | null;
  equipment?: string[] | null;
  primaryMuscle?: string | null;
  secondaryMuscles?: string[] | null;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | string | null;
  defaultSets?: number | null;
  defaultReps?: string | null;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveWorkoutVideoParams {
  workoutVideoId?: string;
  workoutId: string;
  videoUrl: string;
  exerciseName?: string;
  equipment?: string[];
  primaryMuscle?: string | null;
  secondaryMuscles?: string[];
  difficulty?: string;
  defaultSets?: number;
  defaultReps?: string;
}

export interface FetchWorkoutVideosParams {
  page?: number;
  limit?: number;
  query?: string;
  workoutType?: string;
  role?: string;
  difficulty?: string;
  equipment?: string;
  isStretching?: string;
}

export {
  WORKOUT_CATEGORIES,
  EQUIPMENT_OPTIONS,
  MUSCLE_OPTIONS,
  DIFFICULTY_OPTIONS,
  GENDER_ROLES,
};

export function getWorkoutMediaUrl(videoUrl?: string | null): string {
  if (!videoUrl) return '';
  if (videoUrl.startsWith('http://') || videoUrl.startsWith('https://')) {
    return videoUrl;
  }
  const { data } = supabase.storage.from('workout-videos').getPublicUrl(videoUrl);
  return data?.publicUrl || videoUrl;
}

export async function fetchWorkoutVideos(params?: FetchWorkoutVideosParams | number, limitArg?: number, workoutTypeArg?: string, roleArg?: string, isStretchingArg?: string) {
  let page = 1;
  let limit = 12;
  let query = '';
  let workoutType = 'all';
  let role = 'all';
  let difficulty = 'all';
  let equipment = 'all';
  let isStretching = 'all';

  if (typeof params === 'object' && params !== null) {
    page = params.page ?? 1;
    limit = params.limit ?? 12;
    query = (params.query ?? '').trim();
    workoutType = params.workoutType ?? 'all';
    role = params.role ?? 'all';
    difficulty = params.difficulty ?? 'all';
    equipment = params.equipment ?? 'all';
    isStretching = params.isStretching ?? 'all';
  } else if (typeof params === 'number') {
    page = params;
    limit = limitArg ?? 10;
    workoutType = workoutTypeArg ?? 'all';
    role = roleArg ?? 'all';
    isStretching = isStretchingArg ?? 'all';
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let dbQuery = supabase
    .from('workout_videos')
    .select('*, workouts(*)', { count: 'exact' })
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike('exerciseName', `%${query}%`);
  }

  if (difficulty && difficulty !== 'all') {
    dbQuery = dbQuery.eq('difficulty', difficulty.toLowerCase());
  }

  if (equipment && equipment !== 'all') {
    dbQuery = dbQuery.contains('equipment', [equipment]);
  }

  if (workoutType !== 'all' || role !== 'all' || isStretching !== 'all') {
    let workoutsQuery = supabase.from('workouts').select('workoutId').eq('is_deleted', false);

    if (workoutType !== 'all') {
      workoutsQuery = workoutsQuery.eq('workoutType', workoutType);
    }
    if (role !== 'all') {
      workoutsQuery = workoutsQuery.eq('role', role);
    }
    if (isStretching !== 'all') {
      if (isStretching === 'stretching') {
        workoutsQuery = workoutsQuery.eq('isStretching', true);
      } else {
        workoutsQuery = workoutsQuery.or('isStretching.eq.false,isStretching.is.null');
      }
    }

    const { data: matchedWorkouts, error: matchError } = await workoutsQuery;

    if (matchError) {
      console.error('[workoutVideoHelper] matchedWorkouts Error:', matchError);
      throw matchError;
    }

    const workoutIds = matchedWorkouts?.map((w: any) => w.workoutId) || [];

    if (workoutIds.length > 0) {
      dbQuery = dbQuery.in('workoutId', workoutIds);
    } else {
      return { data: [], total: 0 };
    }
  }

  const { data, error, count } = await dbQuery.range(from, to);

  if (error) {
    if (error.code === 'PGRST103') {
      return { data: [], total: count ?? 0 };
    }
    console.error('[workoutVideoHelper] fetchWorkoutVideos Error:', error);
    throw error;
  }

  return {
    data: (data as WorkoutVideoItem[]) ?? [],
    total: count ?? 0,
  };
}

export async function fetchWorkoutVideosByWorkoutId(workoutId: string) {
  const { data, error } = await supabase
    .from('workout_videos')
    .select('*, workouts(*)')
    .eq('workoutId', workoutId)
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('[workoutVideoHelper] fetchWorkoutVideosByWorkoutId Error:', error);
    throw error;
  }

  return (data as WorkoutVideoItem[]) ?? [];
}

export async function fetchWorkoutVideoById(workoutVideoId: string) {
  const { data, error } = await supabase
    .from('workout_videos')
    .select('*, workouts(*)')
    .eq('workoutVideoId', workoutVideoId)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[workoutVideoHelper] fetchWorkoutVideoById Error:', error);
    throw error;
  }

  return (data as WorkoutVideoItem) ?? null;
}

export async function saveWorkoutVideo(videoData: SaveWorkoutVideoParams) {
  const now = new Date().toISOString();

  if (videoData.workoutVideoId) {
    const updatePayload: any = {
      workoutId: videoData.workoutId,
      videoUrl: videoData.videoUrl,
      exerciseName: videoData.exerciseName,
      updatedAt: now,
    };

    if (videoData.equipment !== undefined) updatePayload.equipment = videoData.equipment;
    if (videoData.primaryMuscle !== undefined) updatePayload.primaryMuscle = videoData.primaryMuscle;
    if (videoData.secondaryMuscles !== undefined) updatePayload.secondaryMuscles = videoData.secondaryMuscles;
    if (videoData.difficulty !== undefined) updatePayload.difficulty = videoData.difficulty;
    if (videoData.defaultSets !== undefined) updatePayload.defaultSets = videoData.defaultSets;
    if (videoData.defaultReps !== undefined) updatePayload.defaultReps = videoData.defaultReps;

    const { data, error } = await supabase
      .from('workout_videos')
      .update(updatePayload)
      .eq('workoutVideoId', videoData.workoutVideoId)
      .select();

    if (error) {
      console.error('[workoutVideoHelper] saveWorkoutVideo Update Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  } else {
    const generatedId = crypto.randomUUID();
    const { data, error } = await supabase
      .from('workout_videos')
      .insert([
        {
          workoutVideoId: generatedId,
          workoutId: videoData.workoutId,
          videoUrl: videoData.videoUrl,
          exerciseName: videoData.exerciseName || null,
          equipment: videoData.equipment || ['BODY_ONLY'],
          primaryMuscle: videoData.primaryMuscle || null,
          secondaryMuscles: videoData.secondaryMuscles || [],
          difficulty: videoData.difficulty || 'intermediate',
          defaultSets: videoData.defaultSets ?? 3,
          defaultReps: videoData.defaultReps || '10-12',
          is_deleted: false,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .select();

    if (error) {
      console.error('[workoutVideoHelper] saveWorkoutVideo Insert Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  }
}

export async function deleteWorkoutVideo(workoutVideoId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('workout_videos')
    .update({
      is_deleted: true,
      deletedAt: now,
      updatedAt: now,
    })
    .eq('workoutVideoId', workoutVideoId)
    .select();

  if (error) {
    console.error('[workoutVideoHelper] deleteWorkoutVideo Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}

export async function getWorkoutVideoStats(): Promise<WorkoutVideoStats> {
  const { data, error } = await supabase
    .from('workout_videos')
    .select('workoutVideoId, primaryMuscle, workouts(role, workoutType)')
    .eq('is_deleted', false);

  if (error || !data) {
    return {
      total: 0,
      male: 0,
      female: 0,
      chestUpper: 0,
      backArms: 0,
      legsCore: 0,
    };
  }

  let male = 0;
  let female = 0;
  let chestUpper = 0;
  let backArms = 0;
  let legsCore = 0;

  data.forEach((row: any) => {
    const role = row.workouts?.role;
    if (role === 'male') male++;
    if (role === 'female') female++;

    const muscle = (row.primaryMuscle || row.workouts?.workoutType || '').toUpperCase();
    if (['CHEST', 'SHOULDERS', 'TRAPS'].includes(muscle)) {
      chestUpper++;
    } else if (['BACK', 'BICEPS', 'TRICEPS', 'FOREARMS'].includes(muscle)) {
      backArms++;
    } else if (['ABS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'LEGS', 'HIPS'].includes(muscle)) {
      legsCore++;
    }
  });

  return {
    total: data.length,
    male,
    female,
    chestUpper,
    backArms,
    legsCore,
  };
}
