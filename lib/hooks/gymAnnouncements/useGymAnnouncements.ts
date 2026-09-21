import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { fetchGymAnnouncements, saveGymAnnouncement, deleteGymAnnouncement, SaveGymAnnouncementParams, fetchGymAnnouncementsPaginated } from '@/lib/helpers/gymAnnouncements/gymAnnouncementsHelper';
import { getOwnerGymId } from '@/lib/helpers/trainers/trainerHelper';

export function useGymAnnouncements(userId: string | null) {
  return useQuery({
    queryKey: ['gymAnnouncements', userId],
    queryFn: async () => {
      if (!userId) return [];
      const gymId = await getOwnerGymId(userId);
      if (!gymId) return [];
      return await fetchGymAnnouncements(gymId);
    },
    enabled: !!userId,
  });
}

export function useInfiniteGymAnnouncements(userId: string | null, dateStr?: string | null, limit = 10) {
  return useInfiniteQuery({
    queryKey: ['gymAnnouncementsPaginated', userId, dateStr],
    queryFn: async ({ pageParam = 1 }) => {
      if (!userId) return { data: [], total: 0 };
      const gymId = await getOwnerGymId(userId);
      if (!gymId) return { data: [], total: 0 };
      return await fetchGymAnnouncementsPaginated(gymId, pageParam as number, limit, dateStr);
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((acc, page) => acc + page.data.length, 0);
      if (loadedItems < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!userId,
    initialPageParam: 1,
  });
}

export function useSaveGymAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (announcementData: SaveGymAnnouncementParams) => saveGymAnnouncement(announcementData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymAnnouncements'] });
      queryClient.invalidateQueries({ queryKey: ['gymAnnouncementsPaginated'] });
    },
  });
}

export function useDeleteGymAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGymAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymAnnouncements'] });
      queryClient.invalidateQueries({ queryKey: ['gymAnnouncementsPaginated'] });
    },
  });
}
