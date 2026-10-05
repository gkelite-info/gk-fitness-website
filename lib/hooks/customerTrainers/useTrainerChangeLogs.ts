import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTrainerChangeLogsByGym,
  fetchTrainerChangeLogsByCustomer,
  saveTrainerChangeLog,
  SaveTrainerChangeLogParams
} from '@/lib/helpers/customerTrainers/trainerChangeLogsHelper';

export function useTrainerChangeLogsByGym(gymId?: string) {
  return useQuery({
    queryKey: ['trainerChangeLogs', 'gym', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      const data = await fetchTrainerChangeLogsByGym(gymId);
      return data;
    },
    enabled: !!gymId,
  });
}

export function useTrainerChangeLogsByCustomer(customerId?: string) {
  return useQuery({
    queryKey: ['trainerChangeLogs', 'customer', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const data = await fetchTrainerChangeLogsByCustomer(customerId);
      return data;
    },
    enabled: !!customerId,
  });
}

export function useSaveTrainerChangeLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveTrainerChangeLogParams) => saveTrainerChangeLog(params),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainerChangeLogs', 'gym', variables.gymId] });
      queryClient.invalidateQueries({ queryKey: ['trainerChangeLogs', 'customer', variables.customerId] });
    },
  });
}
