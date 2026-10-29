import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchIndividualCustomerPlanHistories,
  fetchIndividualCustomerPlanHistoryById,
  fetchIndividualCustomerPlanHistoriesPaginated,
  saveIndividualCustomerPlanHistory,
  updateIndividualCustomerPlanHistory,
  deleteIndividualCustomerPlanHistory,
  toggleIndividualCustomerPlanHistoryActiveStatus,
  SaveIndividualCustomerPlanHistoryParams,
  FetchIndividualCustomerPlanHistoriesPaginatedParams,
} from '@/lib/helpers/individual/membership/individualCustomerPlanHistories';

export function useIndividualCustomerPlanHistories(
  userId?: string,
  individualCustomerPlanId?: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ['individualCustomerPlanHistories', userId, individualCustomerPlanId],
    queryFn: async () => {
      return await fetchIndividualCustomerPlanHistories(userId, individualCustomerPlanId);
    },
    enabled: options?.enabled !== undefined ? options.enabled : (!!userId || !!individualCustomerPlanId),
    ...options,
  });
}

export function useIndividualCustomerPlanHistoryById(id?: string) {
  return useQuery({
    queryKey: ['individualCustomerPlanHistory', id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchIndividualCustomerPlanHistoryById(id);
    },
    enabled: !!id,
  });
}

export function useIndividualCustomerPlanHistoriesPaginated(
  params: FetchIndividualCustomerPlanHistoriesPaginatedParams
) {
  return useQuery({
    queryKey: [
      'individualCustomerPlanHistoriesPaginated',
      params.userId,
      params.individualCustomerPlanId,
      params.subscriptionPlanId,
      params.page,
      params.limit,
      params.searchQuery,
      params.sortOrder,
      params.actionType,
      params.paymentStatus,
    ],
    queryFn: async () => {
      return await fetchIndividualCustomerPlanHistoriesPaginated(params);
    },
    enabled: !!params.userId || !!params.individualCustomerPlanId,
  });
}

export function useSaveIndividualCustomerPlanHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SaveIndividualCustomerPlanHistoryParams) => {
      return await saveIndividualCustomerPlanHistory(params);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistories'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistoriesPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlans'] });
      queryClient.invalidateQueries({ queryKey: ['activeIndividualCustomerPlan'] });
      if (variables.userId) {
        queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistories', variables.userId] });
      }
    },
  });
}

export const useLogIndividualCustomerPlanHistory = useSaveIndividualCustomerPlanHistory;

export function useUpdateIndividualCustomerPlanHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<SaveIndividualCustomerPlanHistoryParams>;
    }) => {
      return await updateIndividualCustomerPlanHistory(id, updates);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistories'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistory', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistoriesPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlans'] });
    },
  });
}

export function useDeleteIndividualCustomerPlanHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteIndividualCustomerPlanHistory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistories'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistoriesPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlans'] });
    },
  });
}

export function useToggleIndividualCustomerPlanHistoryActiveStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, currentStatus }: { id: string; currentStatus: boolean }) => {
      return await toggleIndividualCustomerPlanHistoryActiveStatus(id, currentStatus);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistories'] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistory', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['individualCustomerPlanHistoriesPaginated'] });
    },
  });
}

