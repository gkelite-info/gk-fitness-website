import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGymCustomer, SaveGymCustomerParams } from '@/lib/helpers/customers/customerHelper';

export function useMutateGymCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymCustomerParams) => saveGymCustomer(params),
    onSuccess: (data, variables) => {
      // Invalidate customers lists
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customersPaginated'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlans'] });
      queryClient.invalidateQueries({ queryKey: ['gymCustomerMembershipPlansPaginated'] });
      
      // If updating an existing customer, invalidate that specific query
      if (variables.customerId) {
        queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId] });
      }
    },
  });
}
