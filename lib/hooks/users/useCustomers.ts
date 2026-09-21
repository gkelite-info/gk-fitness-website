import { useInfiniteQuery } from '@tanstack/react-query';
import { createClient } from '@/app/api/supabase/client';

const PAGE_SIZE = 10;

export function useCustomers(gymId: string | null, filter: string, debouncedSearch: string, planFilter: string = 'All') {
  return useInfiniteQuery({
    queryKey: ['customers', gymId, filter, debouncedSearch, planFilter],
    queryFn: async ({ pageParam = 0 }) => {
      if (!gymId) throw new Error('Gym ID is required');

      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const supabase = createClient();
      let query = supabase
        .from('gym_customers')
        .select(
          planFilter !== 'All' 
            ? '*, gym_customer_membership_plans!inner(planId, endDate, is_Active, is_deleted, gym_membership_plans(planName))' 
            : '*, gym_customer_membership_plans(planId, endDate, is_Active, is_deleted, gym_membership_plans(planName))', 
          { count: 'exact' }
        )
        .eq('gymId', gymId);

      if (planFilter !== 'All') {
        query = query
          .eq('gym_customer_membership_plans.planId', planFilter)
          .eq('gym_customer_membership_plans.is_deleted', false);
      }

      if (filter === 'active') {
        query = query.eq('is_Active', true);
      } else if (filter === 'expired') {
        query = query.eq('is_Active', false);
      }

      if (debouncedSearch.trim()) {
        const q = debouncedSearch.trim();
        query = query.or(`fullName.ilike.%${q}%,phone.ilike.%${q}%`);
      }

      query = query.order('createdAt', { ascending: false }).range(from, to);

      const { data, count, error } = await query;
      
      if (error) throw error;

      return {
        data: data || [],
        count: count || 0,
        nextPage: (data && data.length === PAGE_SIZE) ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!gymId,
  });
}

