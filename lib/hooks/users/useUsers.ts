import { useQuery } from '@tanstack/react-query';
import {
  fetchUsers,
  fetchUserById,
  fetchUserByEmail,
  fetchUserByCredentials,
  UserRole,
} from '@/lib/helpers/user/userHelper';

export function useUsers(role?: UserRole) {
  return useQuery({
    queryKey: ['users', role],
    queryFn: async () => {
      const data = await fetchUsers(role);
      return data;
    },
  });
}

export function useUserById(userId?: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      return await fetchUserById(userId);
    },
    enabled: !!userId,
  });
}

export function useUserByEmail(email?: string) {
  return useQuery({
    queryKey: ['userByEmail', email],
    queryFn: async () => {
      if (!email) return null;
      return await fetchUserByEmail(email);
    },
    enabled: !!email,
  });
}

export function useUserByCredentials(email?: string, password?: string) {
  return useQuery({
    queryKey: ['userByCredentials', email],
    queryFn: async () => {
      if (!email || !password) return null;
      return await fetchUserByCredentials(email, password);
    },
    enabled: !!email && !!password,
  });
}
