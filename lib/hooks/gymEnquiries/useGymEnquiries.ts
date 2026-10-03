import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchGymEnquiries, 
  fetchGymEnquiryById, 
  saveGymEnquiry, 
  deleteGymEnquiry,
  updateGymEnquiryStatus,
  SaveGymEnquiryParams
} from '@/lib/helpers/gymEnquiries/gymEnquiriesHelper';

export function useGymEnquiries(gymId?: string) {
  return useQuery({
    queryKey: ['gymEnquiries', gymId],
    queryFn: async () => {
      const data = await fetchGymEnquiries(gymId);
      return data;
    },
    enabled: !!gymId,
  });
}

export function useGymEnquiryById(gymEnquiryId?: string) {
  return useQuery({
    queryKey: ['gymEnquiry', gymEnquiryId],
    queryFn: async () => {
      if (!gymEnquiryId) return null;
      const data = await fetchGymEnquiryById(gymEnquiryId);
      return data;
    },
    enabled: !!gymEnquiryId,
  });
}

export function useSaveGymEnquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveGymEnquiryParams) => saveGymEnquiry(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymEnquiries'] });
      if (variables.gymEnquiryId) {
        queryClient.invalidateQueries({ queryKey: ['gymEnquiry', variables.gymEnquiryId] });
      }
    },
  });
}

export function useDeleteGymEnquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gymEnquiryId: string) => deleteGymEnquiry(gymEnquiryId),
    onSuccess: (_, gymEnquiryId) => {
      queryClient.invalidateQueries({ queryKey: ['gymEnquiries'] });
      queryClient.invalidateQueries({ queryKey: ['gymEnquiry', gymEnquiryId] });
    },
  });
}

export function useUpdateGymEnquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      gymEnquiryId, 
      status, 
      category 
    }: { 
      gymEnquiryId: string, 
      status: 'new' | 'followup' | 'converted' | 'notinterested', 
      category?: 'hot' | 'warm' | 'cold' 
    }) => updateGymEnquiryStatus(gymEnquiryId, status, category),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymEnquiries'] });
      queryClient.invalidateQueries({ queryKey: ['gymEnquiry', variables.gymEnquiryId] });
    },
  });
}
