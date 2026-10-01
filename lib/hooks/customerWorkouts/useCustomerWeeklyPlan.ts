import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/app/api/supabase/client';

export function useCustomerWeeklyPlan(userId: string | null | undefined, referenceDate?: Date) {
  return useQuery({
    queryKey: ['customerWeeklyPlan', userId, referenceDate?.toISOString()],
    queryFn: async () => {
      if (!userId) return { loadedPlanDays: null, rawPlans: [] };

      const supabase = createClient();

      const { data: plans } = await supabase
        .from('customer_workout_plans')
        .select('*')
        .eq('userId', userId)
        .is('deletedAt', null)
        .order('createdAt', { ascending: false });

      const activePlan = plans?.find((p: any) => p.isActive);

      if (!activePlan) return { loadedPlanDays: null, rawPlans: plans || [] };

      const planCreatedAt = new Date(activePlan.createdAt);
      const targetDate = referenceDate || new Date();
      const diffTime = Math.abs(targetDate.getTime() - planCreatedAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const targetWeekNumber = Math.min(Math.ceil(diffDays / 7), 4) || 1;

      const { data: allDays } = await supabase
        .from('workout_plan_days')
        .select('*')
        .eq('planId', activePlan.planId)
        .is('deletedAt', null)
        .order('createdAt', { ascending: true });

      let days = (allDays || []).filter((d: any) => (d.weekNumber || 1) === targetWeekNumber);
      if (days.length === 0) {
        days = (allDays || []).filter((d: any) => (d.weekNumber || 1) === 1);
      }

      const loadedPlanDays: any = { [targetWeekNumber]: {} };

      for (const d of days) {
        const isRest = d.workoutType && d.workoutType.trim().toLowerCase() === 'rest';
        if (!isRest) {
          const { data: exs } = await supabase
            .from('workout_plan_day_exercises')
            .select('*')
            .eq('planDayId', d.planDayId)
            .is('deletedAt', null)
            .order('order', { ascending: true });

          loadedPlanDays[targetWeekNumber][d.dayOfWeek] = {
            dayOfWeek: d.dayOfWeek,
            workoutType: d.workoutType || 'Workout',
            workoutId: d.workoutId || null,
            durationMinutes: d.durationMinutes,
            exercises: exs || [],
            planDayId: d.planDayId
          };
        }
      }

      return { loadedPlanDays, rawPlans: plans || [] };
    },
    enabled: !!userId,
  });
}
