import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGymCustomerWeb, SaveGymCustomerWebParams } from '@/lib/helpers/customers/saveGymCustomerWeb';

export function useMutateGymCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymCustomerWebParams | any) => saveGymCustomerWeb(params),
    onSuccess: (_data, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customersPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlansPaginated'] });

      if (variables.customerId) {
        queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId] });
      }
    },
  });
}

export function useMutateGymCustomerWeb() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymCustomerWebParams) => saveGymCustomerWeb(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customersPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlansPaginated'] });

      if (variables.customerId) {
        queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId] });
      }
    },
  });
}
