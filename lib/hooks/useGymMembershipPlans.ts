import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/app/api/supabase/client';
import { getOwnerGymId } from '@/lib/helpers/trainers/trainerHelper';

export function useGymMembershipPlans(userId: string | null) {
  return useQuery({
    queryKey: ['gymMembershipPlans', userId],
    queryFn: async () => {
      if (!userId) return [];

      const gymId = await getOwnerGymId(userId);
      
      if (!gymId) return [];

      const supabase = createClient();
      const { data, error } = await supabase
        .from('gym_membership_plans')
        .select(`
          *,
          gym_membership_plan_features (
            featureId,
            features ( featureName )
          )
        `)
        .eq('gymId', gymId)
        .order('createdAt', { ascending: true });

      if (error) {
        console.error('[useGymMembershipPlans] Error:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!userId,
  });
}
