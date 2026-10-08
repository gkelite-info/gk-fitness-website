"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CircleNotch, CaretUp, CaretDown } from "@phosphor-icons/react";
import CommunityHeader from "./CommunityHeader";
import StoriesRow from "./StoriesRow";
import PostCard from "./PostCard";
import CreatePostModal from "./CreatePostModal";
import AddStoryModal from "./AddStoryModal";
import ViewStoryModal from "./ViewStoryModal";
import PostCommentsModal from "./PostCommentsModal";
import { useUser } from "@/app/context/UserContext";
import { useOwnerGymId } from "@/lib/hooks/auth/useOwnerGymId";
import { useCommunityFeed, useCreatePost, useDeletePost, useEditPost } from "@/lib/hooks/community/useCommunityFeed";
import { useActiveStories, useCreateStory, useDeleteStory, useEditStory, useToggleStoryLike } from "@/lib/hooks/community/useStories";
import { useToggleLike, useToggleSave } from "@/lib/hooks/community/usePostInteractions";
import toast from "react-hot-toast";

const getTimeAgo = (dateString: string) => {
  const diff = Math.max(0, Date.now() - new Date(dateString).getTime());
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function CommunityClient() {
  const searchParams = useSearchParams();
  const { user, profile } = useUser();
  const { data: gymId } = useOwnerGymId(user?.id);

  const { data: feedData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isFeedLoading } = useCommunityFeed(gymId ?? null, user?.id ?? null);
  const { data: storiesData = [], isLoading: isStoriesLoading } = useActiveStories(gymId ?? null, user?.id ?? null);

  const { mutateAsync: createPostMutate } = useCreatePost();
  const { mutateAsync: deletePostMutate } = useDeletePost();
  const { mutateAsync: createStoryMutate } = useCreateStory();
  const { mutateAsync: editStoryMutate } = useEditStory();
  const { mutateAsync: toggleLikeMutate } = useToggleLike();
  const { mutateAsync: toggleSaveMutate } = useToggleSave();
  const { mutateAsync: editPostMutate } = useEditPost();
  const { mutateAsync: toggleStoryLikeMutate } = useToggleStoryLike();
  const { mutateAsync: deleteStoryMutate } = useDeleteStory();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [editingStoryData, setEditingStoryData] = useState<{
    storyId: string;
    segmentIndex: number;
    url: string;
    type: "image" | "video";
    trimStart?: number;
    trimEnd?: number;
  } | null>(null);

  const [editingPostData, setEditingPostData] = useState<{ id: string, content: string, media: { url: string }[] } | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    let scrollTop = 0;
    const scrollParent = scrollContainerRef.current?.closest('.overflow-y-auto');
    
    if (scrollParent) {
      scrollTop = scrollParent.scrollTop;
    } else if (typeof window !== 'undefined') {
      scrollTop = window.scrollY;
    }

    // Use hysteresis (dead-band) to prevent flickering when the layout shrinks and pulls the scroll position up
    if (scrollTop > 150) {
      setIsScrolled(true);
    } else if (scrollTop < 30) {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    setIsHeaderCollapsed(isScrolled);
  }, [isScrolled]);

  const scrollToTop = () => {
    const scrollParent = scrollContainerRef.current?.closest('.overflow-y-auto');
    if (scrollParent) {
      scrollParent.scrollTo({ top: 0, behavior: "smooth" });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollParent = scrollContainerRef.current?.closest('.overflow-y-auto');
    const target = scrollParent || window;
    
    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll as any);
  }, [handleScroll]);

  const loadMorePosts = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleCreatePost = async (content: string, images: string[]) => {
    if (!user || !gymId) return;
    try {
      await createPostMutate({ gymId: gymId ?? null, userId: user.id, caption: content, imageUri: images[0] });
      toast.success("Post added successfully!");
    } catch (e) {
      toast.error("Failed to add post");
    }
  };

  const handleEditPost = async (content: string, images: string[]) => {
    if (!user || !gymId || !editingPostData) return;
    try {
      await editPostMutate({ 
        postId: editingPostData.id, 
        gymId: gymId ?? null, 
        userId: user.id, 
        caption: content, 
        imageUri: images[0] 
      });
      toast.success("Post updated successfully!");
      setEditingPostData(null);
      setIsCreateModalOpen(false);
    } catch (e) {
      toast.error("Failed to update post");
    }
  };

  const handleCreateStory = async (mediaUrl: string, type: "image" | "video", trimStart?: number, trimEnd?: number) => {
    if (!user || !gymId) return;
    try {
      await createStoryMutate({ gymId: gymId ?? null, createdBy: user.id, mediaUri: mediaUrl });
      toast.success("Story added successfully!");
    } catch (e) {
      toast.error("Failed to add story");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMorePosts]);

  const mappedPosts = feedData?.pages.flat().map((p: any) => ({
    id: p.gymCommunityPostId,
    author: {
      name: p.users?.name || "Unknown",
      avatar: p.users?.profilePhoto || null,
      gender: p.users?.gender || null,
      role: (p.users?.role === 'superadmin' ? 'Owner' : (p.users?.role || "Member")) as any,
    },
    timeAgo: getTimeAgo(p.createdAt),
    content: p.caption,
    media: p.imagePath ? [{ url: p.imagePath }] : [],
    likes: p.likesCount || 0,
    comments: p.commentsCount || 0,
    shares: 0,
    isLiked: p.isLikedByMe,
    isBookmarked: p.isSavedByMe,
    isUser: p.createdBy === user?.id,
  })) || [];

  const mappedStories: any[] = [];
  
  if (user && !storiesData.some((s: any) => s.userId === user.id)) {
    mappedStories.push({
      id: user.id,
      name: "Your story",
      avatar: profile?.profilePhoto || null,
      gender: profile?.gender || null,
      isUser: true,
      hasUnseen: false,
      segments: []
    });
  }

  mappedStories.push(...storiesData.map((sGroup: any) => ({
    id: sGroup.userId,
    name: sGroup.userId === user?.id ? "Your story" : (sGroup.user?.name || "User"),
    avatar: sGroup.user?.profilePhoto || null,
    gender: sGroup.user?.gender || null,
    isUser: sGroup.userId === user?.id,
    hasUnseen: !sGroup.allViewed,
    segments: sGroup.stories.map((s: any) => ({
      url: s.mediaUrl,
      type: (s.mediaUrl?.toLowerCase().match(/\.(mp4|mov|m4v)$/) ? "video" : "image") as "image" | "video",
    }))
  })));

  return (
    <div 
      ref={scrollContainerRef}
      className="flex flex-col items-center w-full h-full bg-[#0E0F13] relative"
    >
      <div className="flex flex-col items-start w-full max-w-[976px] mx-auto pb-10">
        
        <div className={`sticky top-0 z-40 w-full bg-[#0E0F13]/95 backdrop-blur-md flex flex-col px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md border-b border-[#232730]' : 'pt-4 sm:pt-6 lg:pt-8 pb-2'}`}>
          <div className="flex flex-col w-full">
            <CommunityHeader 
              onOpenCreatePost={() => setIsCreateModalOpen(true)}
              onOpenAddStory={() => setIsAddStoryModalOpen(true)}
              isScrolled={isScrolled}
            />
            
            <div 
              className="grid transition-all duration-300 ease-out w-full"
              style={{
                gridTemplateRows: isHeaderCollapsed ? '0fr' : '1fr',
                opacity: isHeaderCollapsed ? 0 : 1,
              }}
            >
              <div className="overflow-hidden min-h-0">
                <div className="pt-4 sm:pt-6">
                  {isStoriesLoading ? (
                    <div className="flex px-4 gap-4 overflow-x-hidden">
                       <div className="w-[72px] h-[72px] rounded-full bg-[#1A1C22] animate-pulse shrink-0"></div>
                       <div className="w-[72px] h-[72px] rounded-full bg-[#1A1C22] animate-pulse shrink-0"></div>
                       <div className="w-[72px] h-[72px] rounded-full bg-[#1A1C22] animate-pulse shrink-0"></div>
                    </div>
                  ) : (
                    <StoriesRow 
                      stories={mappedStories} 
                      isScrolled={isScrolled}
                      onStoryClick={(index) => setActiveStoryIndex(index)}
                      onAddStoryClick={() => setIsAddStoryModalOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {isScrolled && (
            <button 
              onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
              className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[#161920] border border-[#232730] shadow-md rounded-full px-3 py-1 cursor-pointer z-50 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
            >
              {isHeaderCollapsed ? <CaretDown size={14} weight="bold" /> : <CaretUp size={14} weight="bold" />}
            </button>
          )}
        </div>
        
        <div className="flex flex-col items-start gap-6 w-full px-4 sm:px-6 lg:px-8 pt-4">
          {isFeedLoading && mappedPosts.length === 0 ? (
            <div className="flex flex-col gap-6 w-full">
               <div className="w-full h-64 bg-[#161920] rounded-2xl border border-[#232730] animate-pulse"></div>
               <div className="w-full h-64 bg-[#161920] rounded-2xl border border-[#232730] animate-pulse"></div>
            </div>
          ) : (
            mappedPosts.map((post: any) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onEdit={(postId) => {
                  const found = mappedPosts.find((p: any) => p.id === postId);
                  if (found) {
                    setEditingPostData({ id: found.id, content: found.content, media: found.media });
                    setIsCreateModalOpen(true);
                  }
                }}
                onDelete={async (postId) => {
                  if (!user) return;
                  try {
                    await deletePostMutate({ postId, userId: user.id, gymId: gymId ?? null, role: "owner" });
                    toast.success("Post deleted successfully!");
                  } catch (e) {
                    toast.error("Failed to delete post");
                  }
                }}
                onCommentClick={(postId) => {
                  setActiveCommentPostId(postId);
                }}
                onLike={async () => {
                  if (user && gymId) {
                    await toggleLikeMutate({ postId: post.id, userId: user.id, gymId: gymId ?? null });
                  }
                }}
                onBookmark={async () => {
                  if (user && gymId) {
                    await toggleSaveMutate({ postId: post.id, userId: user.id, gymId: gymId ?? null });
                  }
                }}
              />
            ))
          )}
        </div>

        {isFetchingNextPage && (
          <div className="flex flex-col items-center justify-center w-full py-8 gap-3">
            <CircleNotch size={32} weight="bold" className="text-[#C8FF00] animate-spin" />
            <span className="font-['Nimbus_Sans'] font-medium text-[14px] text-[#94A3B8]">
              Loading more posts...
            </span>
          </div>
        )}

        <div ref={observerTarget} className="w-full h-10" />

      </div>

      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#232730] hover:bg-[#333842] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 border border-[#334155] cursor-pointer"
          aria-label="Scroll to top"
        >
          <CaretUp size={24} weight="bold" />
        </button>
      )}

      {isCreateModalOpen && (
        <CreatePostModal 
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingPostData(null);
          }} 
          onPost={(content, images) => {
            if (editingPostData) {
              handleEditPost(content, images);
            } else {
              handleCreatePost(content, images);
            }
          }}
          initialContent={editingPostData?.content}
          initialImages={editingPostData?.media.map(m => m.url)}
          isEditing={!!editingPostData}
        />
      )}

      {isAddStoryModalOpen && (
        <AddStoryModal
          onClose={() => {
            setIsAddStoryModalOpen(false);
            setEditingStoryData(null);
          }}
          onShare={async (url, type, trimStart, trimEnd) => {
            if (editingStoryData && gymId && user) {
              try {
                await editStoryMutate({ gymId, storyId: editingStoryData.storyId, userId: user.id, mediaUri: url });
                toast.success("Story updated successfully!");
                setEditingStoryData(null);
                setIsAddStoryModalOpen(false);
              } catch (e) {
                toast.error("Failed to update story");
              }
            } else {
              handleCreateStory(url, type, trimStart, trimEnd);
            }
          }}
          initialMedia={editingStoryData ? { url: editingStoryData.url, type: editingStoryData.type } : undefined}
          initialTrimStart={editingStoryData?.trimStart}
          initialTrimEnd={editingStoryData?.trimEnd}
          isEditing={!!editingStoryData}
        />
      )}

      {activeStoryIndex !== null && (
        <ViewStoryModal
          stories={mappedStories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onEdit={(userId, segmentIndex) => {
            const userStories = mappedStories.find((s: any) => s.id === userId);
            if (userStories) {
              const storySegments = storiesData.find((s: any) => s.userId === userId)?.stories;
              if (storySegments && storySegments[segmentIndex]) {
                const dbStory = storySegments[segmentIndex];
                setEditingStoryData({
                  storyId: dbStory.gymCommunityStoryId,
                  segmentIndex,
                  url: dbStory.mediaUrl || "",
                  type: (dbStory.mediaUrl?.toLowerCase().match(/\.(mp4|mov|m4v)$/) ? "video" : "image") as "image" | "video"
                });
                setIsAddStoryModalOpen(true);
                setActiveStoryIndex(null);
              }
            }
          }}
          onLike={async (userId, segmentIndex, isCurrentlyLiked) => {
            if (!user || !gymId) return;
            const userStories = mappedStories.find((s: any) => s.id === userId);
            if (userStories) {
              const storySegments = storiesData.find((s: any) => s.userId === userId)?.stories;
              if (storySegments && storySegments[segmentIndex]) {
                const dbStory = storySegments[segmentIndex];
                await toggleStoryLikeMutate({
                  gymId,
                  storyId: dbStory.gymCommunityStoryId,
                  userId: user.id,
                  isCurrentlyLiked
                });
              }
            }
          }}
          onDelete={async (userId, segmentIndex) => {
            if (!user || !gymId) return;
            const userStories = mappedStories.find((s: any) => s.id === userId);
            if (userStories) {
              const storySegments = storiesData.find((s: any) => s.userId === userId)?.stories;
              if (storySegments && storySegments[segmentIndex]) {
                const dbStory = storySegments[segmentIndex];
                try {
                  await deleteStoryMutate({
                    gymId,
                    storyId: dbStory.gymCommunityStoryId,
                    userId: user.id
                  });
                  toast.success("Story deleted successfully");
                } catch (e) {
                  toast.error("Failed to delete story");
                }
              }
            }
          }}
        />
      )}

      {activeCommentPostId && (
        <PostCommentsModal 
          post={mappedPosts.find((p: any) => p.id === activeCommentPostId)!} 
          onClose={() => setActiveCommentPostId(null)} 
        />
      )}
    </div>
  );
}
