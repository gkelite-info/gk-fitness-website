import { useQuery } from '@tanstack/react-query';
import {
  getGymCustomers,
  getGymAttendanceToday,
  getGymPayments,
  getGymCustomerMembershipPlans,
  getCustomerTrainersByGym,
  getGymTrainers
} from '@/lib/helpers/ownerDashboard';

export function useGymCustomers(gymId?: string) {
  return useQuery({
    queryKey: ['customers', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      return await getGymCustomers(gymId);
    },
    enabled: !!gymId,
  });
}

export function useGymAttendanceToday(gymId?: string, dateStr?: string) {
  return useQuery({
    queryKey: ['attendanceToday', gymId, dateStr],
    queryFn: async () => {
      if (!gymId || !dateStr) return [];
      return await getGymAttendanceToday(gymId, dateStr);
    },
    enabled: !!gymId && !!dateStr,
  });
}

export function useGymPayments(userId?: string | null) {
  return useQuery({
    queryKey: ['gymPayments', userId],
    queryFn: async () => {
      if (!userId) return [];
      return await getGymPayments(userId);
    },
    enabled: !!userId,
  });
}

export function useGymCustomerMembershipPlans(userId?: string | null) {
  return useQuery({
    queryKey: ['gymCustomerMembershipPlans', userId],
    queryFn: async () => {
      if (!userId) return [];
      return await getGymCustomerMembershipPlans(userId);
    },
    enabled: !!userId,
  });
}

export function useCustomerTrainersByGym(gymId?: string) {
  return useQuery({
    queryKey: ['customerTrainers', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      return await getCustomerTrainersByGym(gymId);
    },
    enabled: !!gymId,
  });
}

export function useGymTrainers(gymId?: string) {
  return useQuery({
    queryKey: ['gymTrainers', gymId],
    queryFn: async () => {
      if (!gymId) return [];
      return await getGymTrainers(gymId);
    },
    enabled: !!gymId,
  });
}
