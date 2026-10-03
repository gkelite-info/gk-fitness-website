import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchGymEnquiryFollowups,
  fetchGymEnquiryFollowupById,
  fetchAllFollowupsByGymId,
  saveGymEnquiryFollowup,
  deleteGymEnquiryFollowup,
  SaveGymEnquiryFollowupParams
} from '@/lib/helpers/gymEnquiries/gymEnquiryFollowupsHelper';

export function useGymEnquiryFollowups(gymEnquiryId?: string) {
  return useQuery({
    queryKey: ['gymEnquiryFollowups', gymEnquiryId],
    queryFn: async () => {
      if (!gymEnquiryId) return [];
      const data = await fetchGymEnquiryFollowups(gymEnquiryId);
      return data;
    },
    enabled: !!gymEnquiryId,
  });
}

export function useGymEnquiryFollowupById(followupId?: string) {
  return useQuery({
    queryKey: ['gymEnquiryFollowup', followupId],
    queryFn: async () => {
      if (!followupId) return null;
      const data = await fetchGymEnquiryFollowupById(followupId);
      return data;
    },
    enabled: !!followupId,
  });
}

export function useAllFollowupsByGymId(gymId?: string) {
  return useQuery({
    queryKey: ['gymEnquiryFollowupsAll', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      const data = await fetchAllFollowupsByGymId(gymId);
      return data;
    },
    enabled: !!gymId,
  });
}

export function useSaveGymEnquiryFollowup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveGymEnquiryFollowupParams) => saveGymEnquiryFollowup(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymEnquiryFollowups', variables.gymEnquiryId] });
      queryClient.invalidateQueries({ queryKey: ['gymEnquiry', variables.gymEnquiryId] });
      queryClient.invalidateQueries({ queryKey: ['gymEnquiries'] });
    },
  });
}

export function useDeleteGymEnquiryFollowup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ followupId }: { followupId: string, gymEnquiryId: string }) => deleteGymEnquiryFollowup(followupId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymEnquiryFollowups', variables.gymEnquiryId] });
    },
  });
}
