// @ts-nocheck
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upsertMembershipPlans, deleteMembershipPlan, DraftPlan } from '@/lib/helpers/membershipHelper';

export function useUpsertMembershipPlans() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ gymId, userId, plans }: { gymId: string; userId: string; plans: DraftPlan[] }) => {
      await upsertMembershipPlans(gymId, userId, plans);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymMembershipPlans', variables.userId] });
    },
  });
}

export function useDeleteMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      await deleteMembershipPlan(planId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymMembershipPlans'] });
    },
  });
}

export function useRestoreMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { restoreMembershipPlan } = await import('@/lib/helpers/membershipHelper');
      await restoreMembershipPlan(planId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymMembershipPlans'] });
    },
  });
}
