import { useQuery } from '@tanstack/react-query';
import { fetchGymTimings } from '@/lib/helpers/gymTimings/gymTimingsHelper';

export function useGymTimings(gymId?: string) {
  return useQuery({
    queryKey: ['gymTimings', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      const data = await fetchGymTimings(gymId);
      return data;
    },
    enabled: !!gymId,
  });
}
