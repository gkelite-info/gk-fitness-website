import { useQuery } from '@tanstack/react-query';
import { getGlobalTrainersAction } from '@/app/actions/customer/getGlobalTrainersAction';

export function useGlobalTrainers(enabled: boolean = true, searchQuery?: string) {
  return useQuery({
    queryKey: ['globalTrainers', searchQuery],
    queryFn: async () => {
      const data = await getGlobalTrainersAction(searchQuery);
      return data;
    },
    enabled,
  });
}
