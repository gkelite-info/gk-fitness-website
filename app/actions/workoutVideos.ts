"use server";

import { revalidatePath } from 'next/cache';
import {
  fetchWorkoutVideos,
  fetchWorkoutVideoById,
  saveWorkoutVideo,
  deleteWorkoutVideo,
  getWorkoutVideoStats,
  FetchWorkoutVideosParams,
} from '@/lib/helpers/workoutVideos/workoutVideoHelper';
import { getOrCreateWorkoutByType } from '@/lib/helpers/workouts/workoutHelper';
import {
  WorkoutVideoItem,
  CreateWorkoutVideoInput,
  WorkoutVideoStats,
} from '@/lib/types/workouts';

export async function getWorkoutVideosAction(params?: FetchWorkoutVideosParams): Promise<{
  success: boolean;
  data: WorkoutVideoItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error?: string;
}> {
  try {
    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const res = await fetchWorkoutVideos(params);
    const totalPages = Math.max(1, Math.ceil(res.total / limit));

    return {
      success: true,
      data: res.data,
      total: res.total,
      page,
      pageSize: limit,
      totalPages,
    };
  } catch (err: any) {
    console.error('[workoutVideos] getWorkoutVideosAction Error:', err);
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: params?.limit || 12,
      totalPages: 1,
      error: err?.message || 'Failed to load workout exercises',
    };
  }
}

export async function getWorkoutVideoByIdAction(id: string): Promise<{
  success: boolean;
  data?: WorkoutVideoItem | null;
  error?: string;
}> {
  try {
    const video = await fetchWorkoutVideoById(id);
    return { success: true, data: video };
  } catch (err: any) {
    console.error('[workoutVideos] getWorkoutVideoByIdAction Error:', err);
    return { success: false, error: err?.message || 'Failed to load workout exercise' };
  }
}

export async function saveWorkoutVideoAction(input: CreateWorkoutVideoInput): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    if (!input.exerciseName?.trim()) {
      return { success: false, error: 'Exercise name is required.' };
    }
    if (!input.videoUrl?.trim()) {
      return { success: false, error: 'Video or animation file/URL is required.' };
    }
    if (!input.workoutType) {
      return { success: false, error: 'Target muscle category is required.' };
    }

    // Resolve or create parent workout record for (workoutType, role, isStretching)
    const workoutRecord = await getOrCreateWorkoutByType(
      input.workoutType as any,
      input.role || 'male',
      input.isStretching || false
    );

    if (!workoutRecord?.workoutId) {
      return { success: false, error: 'Failed to link exercise to category workout.' };
    }

    const saved = await saveWorkoutVideo({
      workoutVideoId: input.workoutVideoId,
      workoutId: workoutRecord.workoutId,
      exerciseName: input.exerciseName.trim(),
      videoUrl: input.videoUrl.trim(),
      equipment: input.equipment?.length ? input.equipment : ['BODY_ONLY'],
      primaryMuscle: input.primaryMuscle || null,
      secondaryMuscles: input.secondaryMuscles || [],
      difficulty: input.difficulty || 'intermediate',
      defaultSets: Number(input.defaultSets) || 3,
      defaultReps: String(input.defaultReps || '10-12').trim(),
    });

    revalidatePath('/superadmin/workouts');

    return { success: true, data: saved };
  } catch (err: any) {
    console.error('[workoutVideos] saveWorkoutVideoAction Error:', err);
    return { success: false, error: err?.message || 'Failed to save workout exercise' };
  }
}

export async function deleteWorkoutVideoAction(workoutVideoId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await deleteWorkoutVideo(workoutVideoId);
    revalidatePath('/superadmin/workouts');
    return { success: true };
  } catch (err: any) {
    console.error('[workoutVideos] deleteWorkoutVideoAction Error:', err);
    return { success: false, error: err?.message || 'Failed to delete workout exercise' };
  }
}

export async function getWorkoutVideoStatsAction(): Promise<WorkoutVideoStats> {
  try {
    return await getWorkoutVideoStats();
  } catch (err) {
    console.error('[workoutVideos] getWorkoutVideoStatsAction Error:', err);
    return {
      total: 0,
      male: 0,
      female: 0,
      chestUpper: 0,
      backArms: 0,
      legsCore: 0,
    };
  }
}
