import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/app/api/supabase/client';

export async function fetchBlockedUsers(userId: string): Promise<string[]> {
  const supabase = createClient();
  if (!userId) return [];

  const [blockedByMe, blockedMe] = await Promise.all([
    supabase.from('gym_community_blocks').select('blockedId').eq('blockerId', userId).eq('is_deleted', false),
    supabase.from('gym_community_blocks').select('blockerId').eq('blockedId', userId).eq('is_deleted', false)
  ]);

  const blockedUserIds = [
    ...(blockedByMe.data?.map(d => d.blockedId) || []),
    ...(blockedMe.data?.map(d => d.blockerId) || [])
  ];

  return Array.from(new Set(blockedUserIds));
}

export function useBlockedUsers(userId: string | null) {
  const supabase = createClient();
  return useQuery({
    queryKey: ['blockedUsers', userId],
    queryFn: () => fetchBlockedUsers(userId as string),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
