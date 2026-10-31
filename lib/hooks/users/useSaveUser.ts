import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveUser, updateUserPassword, SaveUserParams } from '@/lib/helpers/user/userHelper';

export function useSaveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: SaveUserParams) => {
      const data = await saveUser(userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newPassword }: { userId: string; newPassword: string }) => {
      const data = await updateUserPassword(userId, newPassword);
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
