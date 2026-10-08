import { createClient } from '@/app/api/supabase/client';
import { fetchBlockedUsers } from './blockCache';

export async function toggleLike(postId: string, userId: string) {
  const supabase = createClient();
  try {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from('gym_community_likes')
      .select('*')
      .eq('gymCommunityPostId', postId)
      .eq('likedBy', userId)
      .single();

    if (existingLike) {
      if (existingLike.is_deleted) {
        // Restore like
        await supabase
          .from('gym_community_likes')
          .update({ is_deleted: false, updatedAt: new Date().toISOString(), deletedAt: null })
          .eq('gymCommunityLikesId', existingLike.gymCommunityLikesId);
      } else {
        // Remove like
        await supabase
          .from('gym_community_likes')
          .update({ is_deleted: true, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
          .eq('gymCommunityLikesId', existingLike.gymCommunityLikesId);
      }
    } else {
      // Create new like
      await supabase
        .from('gym_community_likes')
        .insert([{
          gymCommunityLikesId: crypto.randomUUID(),
          gymCommunityPostId: postId,
          likedBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]);
    }
  } catch (error) {
    console.error('[interactionsHelper] toggleLike Error:', error);
    throw error;
  }
}

export async function toggleSave(postId: string, userId: string) {
  const supabase = createClient();
  try {
    const { data: existingSave } = await supabase
      .from('gym_community_saves')
      .select('*')
      .eq('gymCommunityPostId', postId)
      .eq('savedBy', userId)
      .single();

    if (existingSave) {
      if (existingSave.is_deleted) {
        await supabase
          .from('gym_community_saves')
          .update({ is_deleted: false, updatedAt: new Date().toISOString(), deletedAt: null })
          .eq('gymCommunitySaveId', existingSave.gymCommunitySaveId);
      } else {
        await supabase
          .from('gym_community_saves')
          .update({ is_deleted: true, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
          .eq('gymCommunitySaveId', existingSave.gymCommunitySaveId);
      }
    } else {
      await supabase
        .from('gym_community_saves')
        .insert([{
          gymCommunitySaveId: crypto.randomUUID(),
          gymCommunityPostId: postId,
          savedBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]);
    }
  } catch (error) {
    console.error('[interactionsHelper] toggleSave Error:', error);
    throw error;
  }
}

export async function fetchComments(postId: string, currentUserId: string, sortBy: 'newest' | 'oldest' = 'oldest') {
  const supabase = createClient();
  try {
    // 1. Fetch blocked users (both ways)
    const blockedUserIds = await fetchBlockedUsers(currentUserId);

    let query = supabase
      .from('gym_community_comments')
      .select(`
        *,
        users!gym_community_comments_authorId_fkey (name, role, profilePhoto)
      `)
      .eq('gymCommunityPostId', postId)
      .eq('is_deleted', false)
      .order('createdAt', { ascending: sortBy === 'oldest' });

    if (blockedUserIds.length > 0) {
      query = query.not('authorId', 'in', `(${blockedUserIds.join(',')})`);
    }

    const { data: comments, error: commentsError } = await query;
    if (commentsError) throw commentsError;

    if (!comments || comments.length === 0) return [];

    const commentIds = comments.map((c: any) => c.gymCommunityCommentId);
    
    // Fetch likes separately
    const { data: likesData, error: likesError } = await supabase
      .from('gym_community_comment_likes')
      .select('gymCommunityCommentId, likedBy')
      .in('gymCommunityCommentId', commentIds)
      .eq('is_deleted', false);

    if (likesError) {
      // If table doesn't exist or other error, just ignore likes for now
      console.warn('Could not fetch comment likes:', likesError);
    }

    const likesByComment = (likesData || []).reduce((acc: any, like: any) => {
      if (!acc[like.gymCommunityCommentId]) acc[like.gymCommunityCommentId] = [];
      acc[like.gymCommunityCommentId].push(like);
      return acc;
    }, {});

    return comments.map((comment: any) => {
      const likes = likesByComment[comment.gymCommunityCommentId] || [];
      return {
        ...comment,
        users: Array.isArray(comment.users) ? comment.users[0] : comment.users,
        likesCount: likes.length,
        isLikedByMe: likes.some((l: any) => l.likedBy === currentUserId)
      };
    });
  } catch (error) {
    console.error('[interactionsHelper] fetchComments Error:', error);
    throw error;
  }
}

export async function addComment(postId: string, userId: string, content: string, parentId?: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('gym_community_comments')
      .insert([{
        gymCommunityCommentId: crypto.randomUUID(),
        gymCommunityPostId: postId,
        authorId: userId,
        parentId: parentId || null,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select(`*, users!gym_community_comments_authorId_fkey (name, role)`)
      .single();

    if (error) throw error;
    return {
      ...data,
      users: Array.isArray(data.users) ? data.users[0] : data.users
    };
  } catch (error) {
    console.error('[interactionsHelper] addComment Error:', error);
    throw error;
  }
}

export async function deleteComment(commentId: string, userId: string, role?: string) {
  const supabase = createClient();
  try {
    let query = supabase
      .from('gym_community_comments')
      .update({ is_deleted: true, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
      .eq('gymCommunityCommentId', commentId);
      
    if (role !== 'superadmin') {
      query = query.eq('authorId', userId);
    }
    
    const { error } = await query;

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[interactionsHelper] deleteComment Error:', error);
    throw error;
  }
}

export async function editComment(commentId: string, content: string, userId: string) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from('gym_community_comments')
      .update({ content, updatedAt: new Date().toISOString() })
      .eq('gymCommunityCommentId', commentId)
      .eq('authorId', userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('editComment Error:', error);
    throw error;
  }
}


export async function toggleCommentLike(commentId: string, userId: string) {
  const supabase = createClient();
  try {
    const { data: existingLike, error: fetchError } = await supabase
      .from('gym_community_comment_likes')
      .select('*')
      .eq('gymCommunityCommentId', commentId)
      .eq('likedBy', userId)
      .maybeSingle();

    if (fetchError) {
      console.error('[toggleCommentLike] fetch error:', fetchError);
      throw fetchError;
    }

    if (existingLike) {
      if (existingLike.is_deleted) {
        const { error } = await supabase
          .from('gym_community_comment_likes')
          .update({ is_deleted: false, updatedAt: new Date().toISOString(), deletedAt: null })
          .eq('gymCommunityCommentLikeId', existingLike.gymCommunityCommentLikeId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gym_community_comment_likes')
          .update({ is_deleted: true, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
          .eq('gymCommunityCommentLikeId', existingLike.gymCommunityCommentLikeId);
        if (error) throw error;
      }
    } else {
      const { error } = await supabase
        .from('gym_community_comment_likes')
        .insert([{ 
          gymCommunityCommentLikeId: crypto.randomUUID(), 
          gymCommunityCommentId: commentId, 
          likedBy: userId, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString() 
        }]);
      if (error) throw error;
    }
    return true;
  } catch (error) {
    console.error('toggleCommentLike Error:', error);
    throw error;
  }
}

