import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTrainerSessionsByCustomerTrainerId,
  fetchTrainerSessionsByGymTrainerId,
  fetchTrainerSessionsByDateRange,
  fetchTrainerSessionsForDate,
  saveTrainerSession,
  updateTrainerSessionStatus,
  deleteTrainerSession,
  SaveTrainerSessionParams,
  SessionStatus
} from '@/lib/helpers/trainerSessions/trainerSessionsHelper';

const getLocalDateString = (d: Date) => {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
};

export function useTrainerSessionsByCustomerTrainerId(customerTrainerId?: string) {
  return useQuery({
    queryKey: ['trainerSessions', 'customerTrainer', customerTrainerId],
    queryFn: async () => {
      if (!customerTrainerId) return [];
      const data = await fetchTrainerSessionsByCustomerTrainerId(customerTrainerId);
      return data;
    },
    enabled: !!customerTrainerId,
  });
}

export function useTrainerSessionsByGymTrainerId(gymTrainerId?: string) {
  return useQuery({
    queryKey: ['trainerSessions', 'gymTrainer', gymTrainerId],
    queryFn: async () => {
      if (!gymTrainerId) return [];
      const data = await fetchTrainerSessionsByGymTrainerId(gymTrainerId);
      return data;
    },
    enabled: !!gymTrainerId,
  });
}

export function useTrainerSessionsByDateRange(customerTrainerId?: string, startDate?: string | Date, endDate?: string | Date) {
  return useQuery({
    queryKey: ['trainerSessions', 'customerTrainer', customerTrainerId, 'range', startDate, endDate],
    queryFn: async () => {
      if (!customerTrainerId || !startDate || !endDate) return [];
      const data = await fetchTrainerSessionsByDateRange(customerTrainerId, startDate, endDate);
      return data;
    },
    enabled: !!customerTrainerId && !!startDate && !!endDate,
  });
}

export function useTrainerSessionsForDate(customerTrainerIds: string[], sessionDate: Date) {
  return useQuery({
    queryKey: ['trainerSessions', 'date', getLocalDateString(sessionDate), customerTrainerIds],
    queryFn: async () => {
      if (!customerTrainerIds || customerTrainerIds.length === 0) return [];
      const data = await fetchTrainerSessionsForDate(customerTrainerIds, sessionDate);
      return data;
    },
    enabled: customerTrainerIds.length > 0 && !!sessionDate,
  });
}

export function useSaveTrainerSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveTrainerSessionParams) => saveTrainerSession(params),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainerSessions', 'customerTrainer', variables.customerTrainerId] });
      queryClient.invalidateQueries({ queryKey: ['trainerSessions', 'date'] }); // Invalidate date queries too
    },
  });
}

export function useUpdateTrainerSessionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ trainerSessionId, status }: { trainerSessionId: string; status: SessionStatus }) => 
      updateTrainerSessionStatus(trainerSessionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerSessions'] });
    },
  });
}

export function useDeleteTrainerSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trainerSessionId: string) => deleteTrainerSession(trainerSessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainerSessions'] });
    },
  });
}
