import { useQuery } from '@tanstack/react-query';
import { fetchCustomerAttendance } from '@/lib/helpers/attendance/attendanceHelper';

export function useCustomerAttendance(customerId?: string) {
  return useQuery({
    queryKey: ['customerAttendance', customerId],
    queryFn: async () => {
      if (!customerId) return [];
      const data = await fetchCustomerAttendance(customerId);
      return data;
    },
    enabled: !!customerId,
  });
}
