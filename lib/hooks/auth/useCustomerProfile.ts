import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCustomerProfile(userId: string | null | undefined) {
  return useQuery({
    queryKey: ['customerProfile', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');

      const [customerRes, onboardingRes] = await Promise.all([
        supabase
          .from('gym_customers')
          .select('*, users!gym_customers_userId_fkey(email, profilePhoto)')
          .eq('customerId', userId)
          .maybeSingle(),
        supabase
          .from('customer_onboarding')
          .select('*')
          .eq('createdBy', userId)
          .maybeSingle()
      ]);

      if (customerRes.error && customerRes.error.code !== 'PGRST116') throw customerRes.error;
      if (onboardingRes.error && onboardingRes.error.code !== 'PGRST116') {
        throw onboardingRes.error;
      }

      return {
        customerData: customerRes.data,
        onboardingData: onboardingRes.data,
      };
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}
