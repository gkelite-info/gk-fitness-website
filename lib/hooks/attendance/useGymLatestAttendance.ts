import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/app/api/supabase/client';

export function useGymLatestAttendance(gymId?: string) {
  return useQuery({
    queryKey: ['gymLatestAttendance', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('gym_attendance')
        .select('customerId, markedAt, date, attendanceId')
        .eq('gymId', gymId)
        .order('markedAt', { ascending: false });

      if (error) {
        console.error('Error fetching latest attendance', error);
        return [];
      }
      return data || [];
    },
    enabled: !!gymId,
  });
}
