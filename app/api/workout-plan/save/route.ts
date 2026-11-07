import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';

const ALL_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, planMode = 'repeat', selectedDays = [], planDays, days: rawDays, exercises: rawExercises } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceKey) {
      return NextResponse.json({ error: 'Server misconfigured: missing service role key' }, { status: 500 });
    }

    const admin = createAdminClient(supabaseUrl, serviceKey);
    const now = new Date().toISOString();

    // 1. Deactivate existing active plans for this user
    await admin
      .from('customer_workout_plans')
      .update({ isActive: false, updatedAt: now })
      .eq('userId', userId)
      .eq('isActive', true);

    // 2. Create the new customer workout plan
    const planId = crypto.randomUUID();
    const { data: newPlan, error: planError } = await admin
      .from('customer_workout_plans')
      .insert({
        planId,
        userId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      })
      .select()
      .single();

    if (planError) {
      console.error('[API workout-plan/save] Plan insert error:', planError);
      return NextResponse.json({ error: planError.message }, { status: 500 });
    }

    // Pre-fetch valid workout IDs and workout video IDs to avoid foreign key violations
    const [{ data: validWorkouts }, { data: validVideos }] = await Promise.all([
      admin.from('workouts').select('workoutId').eq('is_deleted', false),
      admin.from('workout_videos').select('workoutVideoId').eq('is_deleted', false),
    ]);

    const validWorkoutIdSet = new Set((validWorkouts || []).map((w: any) => w.workoutId));
    const validVideoIdSet = new Set((validVideos || []).map((v: any) => v.workoutVideoId));

    const daysToInsert: any[] = [];
    const exercisesToInsert: any[] = [];

    if (rawDays && Array.isArray(rawDays) && rawDays.length > 0) {
      // Direct raw days mode
      for (const d of rawDays) {
        const safeWorkoutId = d.workoutId && validWorkoutIdSet.has(d.workoutId) ? d.workoutId : null;
        daysToInsert.push({
          planDayId: d.planDayId || crypto.randomUUID(),
          planId,
          dayOfWeek: d.dayOfWeek,
          workoutType: d.workoutType || 'Rest',
          workoutId: safeWorkoutId,
          durationMinutes: d.durationMinutes || (d.workoutType !== 'Rest' ? 45 : null),
          weekNumber: d.weekNumber || 1,
          createdAt: d.createdAt || now,
          updatedAt: d.updatedAt || now,
        });
      }

      if (rawExercises && Array.isArray(rawExercises)) {
        for (const ex of rawExercises) {
          const safeVideoId = ex.workoutVideoId && validVideoIdSet.has(ex.workoutVideoId) ? ex.workoutVideoId : null;
          exercisesToInsert.push({
            dayExerciseId: ex.dayExerciseId || crypto.randomUUID(),
            planDayId: ex.planDayId,
            workoutVideoId: safeVideoId,
            exerciseName: ex.exerciseName || 'Exercise',
            category: ex.category || 'General',
            sets: Number(ex.sets) > 0 ? Number(ex.sets) : 3,
            reps: ex.reps?.toString().trim() || '10-12',
            order: ex.order ?? 0,
            image: ex.image || null,
            videoUrl: ex.videoUrl || null,
            createdAt: ex.createdAt || now,
            updatedAt: ex.updatedAt || now,
          });
        }
      }
    } else if (planDays) {
      // Structured planDays mode
      const weeksToSave = [1, 2, 3, 4];
      const templateWeek = planDays[1] && Object.keys(planDays[1]).length > 0
        ? planDays[1]
        : (planDays[2] || planDays[3] || planDays[4] || {});

      for (const week of weeksToSave) {
        const weekData = planMode === 'repeat' ? templateWeek : (planDays[week] || templateWeek);

        for (const day of ALL_DAYS) {
          const isWorkoutDay = selectedDays.includes(day);
          const dayPlan = weekData[day];

          const workoutType = isWorkoutDay && dayPlan?.workoutType ? dayPlan.workoutType : 'Rest';
          const durationMinutes = isWorkoutDay ? (dayPlan?.durationMinutes || 45) : null;

          const rawWorkoutId = isWorkoutDay ? dayPlan?.workoutId : null;
          const safeWorkoutId = rawWorkoutId && validWorkoutIdSet.has(rawWorkoutId) ? rawWorkoutId : null;

          const planDayId = crypto.randomUUID();

          daysToInsert.push({
            planDayId,
            planId,
            dayOfWeek: day,
            workoutType,
            workoutId: safeWorkoutId,
            durationMinutes,
            weekNumber: week,
            createdAt: now,
            updatedAt: now,
          });

          if (isWorkoutDay && dayPlan?.exercises && dayPlan.exercises.length > 0) {
            for (let idx = 0; idx < dayPlan.exercises.length; idx++) {
              const ex = dayPlan.exercises[idx];
              const rawVideoId = ex.workoutVideoId;
              const safeVideoId = rawVideoId && validVideoIdSet.has(rawVideoId) ? rawVideoId : null;

              exercisesToInsert.push({
                dayExerciseId: crypto.randomUUID(),
                planDayId,
                workoutVideoId: safeVideoId,
                exerciseName: ex.exerciseName || 'Exercise',
                category: ex.category || 'General',
                sets: Number(ex.sets) > 0 ? Number(ex.sets) : 3,
                reps: ex.reps?.toString().trim() || '10-12',
                order: idx,
                image: ex.image || null,
                videoUrl: ex.videoUrl || null,
                createdAt: now,
                updatedAt: now,
              });
            }
          }
        }
      }
    }

    // 3. Batch insert days
    if (daysToInsert.length > 0) {
      const { error: daysError } = await admin
        .from('workout_plan_days')
        .insert(daysToInsert);

      if (daysError) {
        console.error('[API workout-plan/save] Days insert error:', daysError);
        return NextResponse.json({ error: daysError.message }, { status: 500 });
      }
    }

    // 4. Batch insert exercises
    if (exercisesToInsert.length > 0) {
      const { error: exError } = await admin
        .from('workout_plan_day_exercises')
        .insert(exercisesToInsert);

      if (exError) {
        console.error('[API workout-plan/save] Exercises insert error:', exError);
        return NextResponse.json({ error: exError.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      planId,
      daysCount: daysToInsert.length,
      exercisesCount: exercisesToInsert.length,
    });
  } catch (err: any) {
    console.error('[API workout-plan/save] Unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

