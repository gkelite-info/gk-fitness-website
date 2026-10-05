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
import { MOCK_STORIES, MOCK_POSTS } from "./mockData";
import toast from "react-hot-toast";

export default function CommunityClient() {
  const searchParams = useSearchParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [stories, setStories] = useState(MOCK_STORIES);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setPosts(prev => [...prev, ...MOCK_POSTS.map(p => ({...p, id: p.id + '-' + prev.length}))]);
      setIsLoadingMore(false);
      if (posts.length > 15) {
        setHasMore(false);
      }
    }, 1500);
  }, [isLoadingMore, hasMore, posts.length]);

  const handleCreatePost = (content: string, images: string[]) => {
    const newPost = {
      id: `new-${Date.now()}`,
      author: {
        name: "Gym Owner",
        avatar: "https://i.pravatar.cc/150?u=owner",
        role: "Owner" as const,
      },
      timeAgo: "Just now",
      content,
      media: images.map(img => ({ url: img })),
      likes: 0,
      comments: 0,
      shares: 0,
      isUser: true,
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  const handleCreateStory = (mediaUrl: string, type: "image" | "video", trimStart?: number, trimEnd?: number) => {
    setStories(prev => {
      const existingUserStoryIndex = prev.findIndex(s => s.isUser);
      if (existingUserStoryIndex !== -1) {
        const updated = [...prev];
        const userStory = updated[existingUserStoryIndex];
        const currentSegments = userStory.segments || [{ url: userStory.avatar, type: "image" }];
        updated[existingUserStoryIndex] = {
          ...userStory,
          segments: [...currentSegments, { url: mediaUrl, type, trimStart, trimEnd }]
        };
        return updated;
      }
      
      const newStory = {
        id: `story-${Date.now()}`,
        name: "Your story",
        avatar: mediaUrl,
        segments: [{ url: mediaUrl, type, trimStart, trimEnd }],
        isUser: true,
        hasUnseen: false,
      };
      return [newStory, ...prev];
    });
    
    toast.success("Story added successfully!");
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
                  <StoriesRow 
                    stories={stories} 
                    isScrolled={isScrolled}
                    onStoryClick={(index) => setActiveStoryIndex(index)}
                  />
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
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onEdit={(postId) => {
                const found = posts.find(p => p.id === postId);
                if (found) {
                  setEditingPostData({ id: found.id, content: found.content, media: found.media });
                  setIsCreateModalOpen(true);
                }
              }}
              onDelete={(postId) => {
                setPosts(prev => prev.filter(p => p.id !== postId));
                toast.success("Post deleted successfully!");
              }}
            />
          ))}
        </div>

        {isLoadingMore && (
          <div className="flex flex-col items-center justify-center w-full py-8 gap-3">
            <CircleNotch size={32} weight="bold" className="text-[#C8FF00] animate-spin" />
            <span className="font-['Nimbus_Sans'] font-medium text-[14px] text-[#94A3B8]">
              Loading more stories...
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
              setPosts(prev => prev.map(p => {
                if (p.id === editingPostData.id) {
                  return {
                    ...p,
                    content,
                    media: images.map(url => ({ url }))
                  };
                }
                return p;
              }));
              toast.success("Post updated successfully!");
              setEditingPostData(null);
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
          onShare={(url, type, trimStart, trimEnd) => {
            if (editingStoryData) {
              setStories(prev => prev.map(s => {
                if (s.id === editingStoryData.storyId) {
                  const updatedSegments = [...(s.segments || [])];
                  updatedSegments[editingStoryData.segmentIndex] = { url, type, trimStart, trimEnd };
                  return { ...s, segments: updatedSegments };
                }
                return s;
              }));
              toast.success("Story updated successfully!");
              setEditingStoryData(null);
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
          stories={stories}
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          onEdit={(storyId, segmentIndex) => {
            const story = stories.find(s => s.id === storyId);
            if (story) {
              const seg = story.segments ? story.segments[segmentIndex] : { url: story.avatar, type: "image" as const };
              if (seg) {
                setEditingStoryData({
                  storyId,
                  segmentIndex,
                  url: seg.url,
                  type: seg.type,
                  trimStart: seg.trimStart,
                  trimEnd: seg.trimEnd
                });
                setIsAddStoryModalOpen(true);
                setActiveStoryIndex(null);
              }
            }
          }}
          onDelete={(storyId, segmentIndex) => {
            setStories(prev => {
              const updated = [...prev];
              const storyIndex = updated.findIndex(s => s.id === storyId);
              if (storyIndex !== -1) {
                const story = { ...updated[storyIndex] };
                if (story.segments && story.segments.length > 1) {
                  story.segments = story.segments.filter((_, i) => i !== segmentIndex);
                  updated[storyIndex] = story;
                } else {
                  // If it's the last segment, remove the story entirely
                  updated.splice(storyIndex, 1);
                }
              }
              return updated;
            });
            toast.success("Story deleted successfully!");
            setActiveStoryIndex(null);
          }}
        />
      )}
    </div>
  );
}
