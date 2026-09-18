import { useQuery } from '@tanstack/react-query';
import { fetchTrainerMealPlans, TrainerMealPlanAttributes } from '@/lib/helpers/trainerMealPlans/trainerMealPlans';
import { fetchTrainerMealPlanDays, TrainerMealPlanDayAttributes } from '@/lib/helpers/trainerMealPlans/mealPlanDays';
import { fetchTrainerMealPlanDayMeals, TrainerMealPlanDayMealAttributes } from '@/lib/helpers/trainerMealPlans/mealPlanDayMeals';

export interface FullTrainerMealPlanDay extends TrainerMealPlanDayAttributes {
  meals: TrainerMealPlanDayMealAttributes[];
}

export interface FullTrainerMealPlan extends TrainerMealPlanAttributes {
  days: FullTrainerMealPlanDay[];
}

export function useTrainerMealPlan(userId?: string) {
  return useQuery({
    queryKey: ['trainerMealPlan', userId],
    queryFn: async (): Promise<FullTrainerMealPlan | null> => {
      if (!userId) return null;

      const plans = await fetchTrainerMealPlans(userId);
      const activePlan = plans.find(p => p.isActive);

      if (!activePlan || !activePlan.trainerMealPlanId) {
        return null;
      }

      const days = await fetchTrainerMealPlanDays(activePlan.trainerMealPlanId);

      const daysWithMeals = await Promise.all(
        days.map(async (day: TrainerMealPlanDayAttributes) => {
          if (!day.trainerMealPlanDayId) return { ...day, meals: [] };
          const meals = await fetchTrainerMealPlanDayMeals(day.trainerMealPlanDayId);
          return { ...day, meals };
        })
      );

      return {
        ...activePlan,
        days: daysWithMeals,
      };
    },
    enabled: !!userId,
  });
}
