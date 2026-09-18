import { useQuery } from '@tanstack/react-query';
import { fetchGymOwners } from '@/lib/helpers/gymOwners/gymOwnersHelper';

export function useGymOwners() {
  return useQuery({
    queryKey: ['gymOwners'],
    queryFn: async () => {
      const data = await fetchGymOwners();
      return data;
    },
  });
}
