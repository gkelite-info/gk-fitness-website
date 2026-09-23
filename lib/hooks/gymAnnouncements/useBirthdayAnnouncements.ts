import { useQuery } from '@tanstack/react-query';
import { fetchBirthdayAnnouncementsForDate } from '@/lib/helpers/gymAnnouncements/birthdayAnnouncementsHelper';

export function useBirthdayAnnouncements(gymId?: string | null, targetDateStr?: string | null) {
  return useQuery({
    queryKey: ['birthdayAnnouncementsForDate', gymId, targetDateStr],
    queryFn: async () => {
      if (!gymId) return { birthdays: [], announcementText: null };
      return await fetchBirthdayAnnouncementsForDate(gymId, targetDateStr || undefined);
    },
    enabled: !!gymId,
    staleTime: 1000 * 60 * 15,
  });
}
