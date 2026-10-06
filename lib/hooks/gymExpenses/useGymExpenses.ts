import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchGymExpenses, 
  fetchGymExpenseById, 
  saveGymExpense, 
  deleteGymExpense,
  SaveGymExpenseParams
} from '@/lib/helpers/gymExpenses';

export function useGymExpenses(gymId?: string | null) {
  return useQuery({
    queryKey: ['gymExpenses', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      const data = await fetchGymExpenses(gymId);
      return data;
    },
    enabled: !!gymId,
  });
}

export function useGymExpense(gymExpenseId?: string | null) {
  return useQuery({
    queryKey: ['gymExpense', gymExpenseId],
    queryFn: async () => {
      if (!gymExpenseId) return null;
      const data = await fetchGymExpenseById(gymExpenseId);
      return data;
    },
    enabled: !!gymExpenseId,
  });
}

export function useSaveGymExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveGymExpenseParams) => saveGymExpense(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymExpenses'] });
      if (variables.gymExpenseId) {
        queryClient.invalidateQueries({ queryKey: ['gymExpense', variables.gymExpenseId] });
      }
    },
  });
}

export function useDeleteGymExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gymExpenseId: string) => deleteGymExpense(gymExpenseId),
    onSuccess: (_, gymExpenseId) => {
      queryClient.invalidateQueries({ queryKey: ['gymExpenses'] });
      queryClient.invalidateQueries({ queryKey: ['gymExpense', gymExpenseId] });
    },
  });
}
