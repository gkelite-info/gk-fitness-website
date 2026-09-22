import { useQuery } from '@tanstack/react-query';
import { fetchTodayBirthdayAnnouncements } from '@/lib/helpers/gymAnnouncements/birthdayAnnouncementsHelper';

export function useBirthdayAnnouncements(gymId?: string | null) {
  return useQuery({
    queryKey: ['todayBirthdayAnnouncements', gymId],
    queryFn: async () => {
      if (!gymId) return { birthdays: [], announcementText: null };
      return await fetchTodayBirthdayAnnouncements(gymId);
    },
    enabled: !!gymId,
    staleTime: 1000 * 60 * 15,
  });
}
