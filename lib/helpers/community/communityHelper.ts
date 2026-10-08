// @ts-nocheck
import { createClient } from '@/app/api/supabase/client';
// import * as FileSystem from 'expo-file-system/legacy';
// disabled import

export interface CommunityPost {
  gymCommunityPostId: string;
  gymId: string;
  caption: string;
  imagePath: string | null;
  createdBy: string;
  createdAt: string;
  users: {
    name: string;
    role: string;
    profilePhoto?: string | null;
    gender?: string | null;
  };
  likesCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
  isSavedByMe: boolean;
}

export async function fetchCommunityPosts(gymId: string | null, currentUserId: string, page = 0, limit = 10) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.rpc('get_community_feed', {
      p_gym_id: gymId,
      p_user_id: currentUserId,
      p_offset: page * limit,
      p_limit: limit
    });

    if (error) throw error;

    const formattedPosts: CommunityPost[] = (data || []).map((post: any) => ({
      gymCommunityPostId: post.gymCommunityPostId,
      gymId: post.gymId,
      caption: post.caption,
      imagePath: post.imagePath,
      createdBy: post.createdBy,
      createdAt: post.createdAt,
      users: {
        name: post.author_name,
        role: post.author_role,
        profilePhoto: post.author_photo,
        gender: post.author_gender
      },
      likesCount: Number(post.likes_count) || 0,
      commentsCount: Number(post.comments_count) || 0,
      isLikedByMe: post.is_liked_by_me || false,
      isSavedByMe: post.is_saved_by_me || false,
    }));

    return formattedPosts;
  } catch (error) {
    console.error('[communityHelper] fetchCommunityPosts Error:', error);
    throw error;
  }
}

export async function createCommunityPost(
  gymId: string | null, 
  createdBy: string, 
  caption: string, 
  imageUri?: string | null
) {
  const supabase = createClient();
  try {
    const postId = crypto.randomUUID();
    let imagePath = null;

    if (imageUri) {
      
      let fileBody = imageUri;
      if (imageUri.startsWith('blob:')) {
        const response = await fetch(imageUri);
        fileBody = await response.blob();
      }

      const ext = 'jpg';
      const baseFolder = gymId ? gymId : 'global';
      const fileName = `${baseFolder}/${postId}.${ext}`;
      
      
      const formData = new FormData();
      formData.append('file', fileBody);
      formData.append('bucket', 'community-posts');
      formData.append('path', fileName);
      
      const response = await fetch('/api/upload-community', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }
      
      const { url } = await response.json();
      imagePath = url;


    }

    const { data, error } = await supabase
      .from('gym_community_posts')
      .insert([{
        gymCommunityPostId: postId,
        gymId,
        createdBy,
        caption,
        imagePath,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[communityHelper] createCommunityPost Error:', error);
    throw error;
  }
}

export async function deleteCommunityPost(postId: string, userId: string, role?: string) {
  const supabase = createClient();
  try {
    let query = supabase
      .from('gym_community_posts')
      .update({ 
        is_deleted: true, 
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .eq('gymCommunityPostId', postId);
      
    if (role !== 'superadmin') {
      query = query.eq('createdBy', userId);
    }
    
    const { error } = await query;

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[communityHelper] deleteCommunityPost Error:', error);
    throw error;
  }
}
export async function editCommunityPost(
  postId: string, 
  gymId: string | null, 
  userId: string, 
  caption: string, 
  imageUri?: string | null
) {
  const supabase = createClient();
  try {
    let imagePath = undefined;
    if (imageUri) {
      if (imageUri.startsWith('http')) {
        imagePath = imageUri;
      } else {
        let fileBody: any = imageUri;
        if (imageUri.startsWith('blob:')) {
          const response = await fetch(imageUri);
          fileBody = await response.blob();
        }
        const ext = 'jpg';
        const baseFolder = gymId ? gymId : 'global';
        const fileName = `${baseFolder}/${postId}_edit_${Date.now()}.${ext}`;
        const formData = new FormData();
        formData.append('file', fileBody);
        formData.append('bucket', 'community-posts');
        formData.append('path', fileName);
        const response = await fetch('/api/upload-community', { method: 'POST', body: formData });
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Upload failed');
        }
        const { url } = await response.json();
        imagePath = url;
      }
    }
    const updateData: any = { caption, updatedAt: new Date().toISOString() };
    if (imagePath !== undefined) {
      updateData.imagePath = imagePath;
    }
    const { error } = await supabase.from('gym_community_posts').update(updateData).eq('gymCommunityPostId', postId).eq('createdBy', userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[communityHelper] editCommunityPost Error:', error);
    throw error;
  }
}
