// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import { fetchFeatures, MembershipFeatureItem } from '@/lib/helpers/membershipHelper';

export function useMembershipFeatures() {
  return useQuery<MembershipFeatureItem[]>({
    queryKey: ['membershipFeatures'],
    queryFn: async () => {
      const data = await fetchFeatures();
      return data;
    },
  });
}
