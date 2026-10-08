"use client";

import { useState } from "react";
import { CaretLeft, Plus, List, SquaresFour } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import MyPostCard, { Post } from "./MyPostCard";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import PostCommentsModal from "../../_components/PostCommentsModal";
import CreatePostModal from "../../_components/CreatePostModal";
import { useUser } from "@/app/context/UserContext";
import { useOwnerGymId } from "@/lib/hooks/auth/useOwnerGymId";
import { useCommunityFeed, useCreatePost, useDeletePost, useEditPost } from "@/lib/hooks/community/useCommunityFeed";
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

export default function MyPostsClient() {
  const router = useRouter();
  const { user } = useUser();
  const { data: gymId } = useOwnerGymId(user?.id);

  const { data: feedData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isFeedLoading } = useCommunityFeed(gymId ?? null, user?.id ?? null);
  const { mutateAsync: createPostMutate } = useCreatePost();
  const { mutateAsync: deletePostMutate } = useDeletePost();
  const { mutateAsync: toggleLikeMutate } = useToggleLike();
  const { mutateAsync: toggleSaveMutate } = useToggleSave();
  const { mutateAsync: editPostMutate } = useEditPost();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<any | null>(null);
  
  const [commentPost, setCommentPost] = useState<any | null>(null);

  const mappedPosts = feedData?.pages.flat().map((p: any) => ({
    id: p.gymCommunityPostId,
    author: {
      name: p.users?.name || "Unknown",
      avatar: p.users?.profilePhoto || null,
      gender: p.users?.gender || null,
      role: (p.users?.role === 'superadmin' ? 'Owner' : (p.users?.role || "Member")) as any,
    },
    title: p.caption?.substring(0, 50) + (p.caption?.length > 50 ? "..." : ""),
    description: p.caption,
    timeAgo: getTimeAgo(p.createdAt),
    image: p.imagePath || undefined,
    media: p.imagePath ? [{ url: p.imagePath }] : [],
    likes: p.likesCount || 0,
    comments: p.commentsCount || 0,
    isLiked: p.isLikedByMe,
    isSaved: p.isSavedByMe,
    isUser: p.createdBy === user?.id,
  })) || [];

  // For "My Posts", we only want posts created by the current user
  const userPosts = mappedPosts.filter((p: any) => p.isUser);

  const handleDeleteClick = (post: any) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete || !user) return;
    setIsDeleting(true);
    try {
      await deletePostMutate({ postId: postToDelete.id, userId: user.id, gymId: gymId ?? null, role: "owner" });
      toast.success("Post deleted successfully!");
    } catch (e) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleEditClick = (post: any) => {
    setPostToEdit(post);
    setCreateModalOpen(true);
  };
  
  const handleCommentClick = (post: any) => {
    setCommentPost(post);
  };

  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  const displayedPosts = activeTab === 'posts' ? userPosts : mappedPosts.filter((p: any) => p.isSaved);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex flex-row justify-center items-center w-8 h-8 bg-[#161B22] border border-[#232A35] rounded-lg cursor-pointer hover:bg-[#232A35] transition-colors shrink-0"
          >
            <CaretLeft size={16} className="text-[#D1D5DB]" weight="bold" />
          </button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="font-['Nimbus_Sans'] font-black text-2xl sm:text-[28px] leading-8 text-white tracking-[-0.6px]">
                My Posts
              </h1>
              <span className="bg-[#2B3512] text-[#C8FF00] font-['Nimbus_Sans'] font-bold text-[10px] px-2 py-0.5 rounded-[4px] uppercase tracking-wide">
                {userPosts.length} Published
              </span>
            </div>
            <p className="font-['Nimbus_Sans'] font-normal text-sm text-[#94A3B8]">
              All the posts you've shared with the community.
            </p>
          </div>
        </div>

        <button 
          onClick={() => { setPostToEdit(null); setCreateModalOpen(true); }}
          className="flex flex-row items-center justify-center gap-2 bg-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.25)] rounded-lg hover:bg-[#d4ff33] transition-all duration-300 shrink-0 cursor-pointer py-2 px-4 h-10 w-full sm:w-auto"
        >
          <Plus size={16} weight="bold" className="text-black shrink-0" />
          <span className="font-['Nimbus_Sans'] font-bold leading-4 text-center tracking-[0.3px] text-black">
            Create New Post
          </span>
        </button>
      </div>

      <div className="bg-[#14161A] border border-[#232631] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-4">
        <div className="flex items-center gap-6 px-2">
          <div 
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 cursor-pointer pb-1 border-b-2 transition-colors ${activeTab === 'posts' ? 'border-[#C8FF00]' : 'border-transparent hover:border-[#323842]'}`}
          >
            <span className={`font-['Nimbus_Sans'] font-medium text-[15px] ${activeTab === 'posts' ? 'text-[#C8FF00] font-bold' : 'text-[#94A3B8]'}`}>Posts</span>
            <span className={`${activeTab === 'posts' ? 'bg-[#2B3512] text-[#C8FF00]' : 'bg-[#1A1C22] text-[#94A3B8]'} font-['Nimbus_Sans'] font-bold text-[11px] px-1.5 rounded-[4px]`}>{userPosts.length}</span>
          </div>
          <div 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 cursor-pointer pb-1 border-b-2 transition-colors ${activeTab === 'saved' ? 'border-[#C8FF00]' : 'border-transparent hover:border-[#323842]'}`}
          >
            <span className={`font-['Nimbus_Sans'] font-medium text-[15px] ${activeTab === 'saved' ? 'text-[#C8FF00] font-bold' : 'text-[#94A3B8]'}`}>Saved</span>
            <span className={`${activeTab === 'saved' ? 'bg-[#2B3512] text-[#C8FF00]' : 'bg-[#1A1C22] text-[#94A3B8]'} font-['Nimbus_Sans'] font-bold text-[11px] px-1.5 rounded-[4px]`}>{mappedPosts.filter((p: any) => p.isSaved).length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto z-10">
          <Dropdown
            options={[
              { label: "Most Recent", value: "recent" },
              { label: "Most Liked", value: "liked" },
              { label: "Oldest", value: "oldest" }
            ]}
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            className="w-[140px]"
            triggerClassName="flex flex-row items-center px-3 justify-between w-[140px] bg-[#1A1C22] border border-[#232631] rounded-lg cursor-pointer h-9 hover:border-[#323842] transition-colors"
          />

          <div className="flex items-center bg-[#1A1C22] border border-[#232631] rounded-lg p-1 gap-1">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center justify-center w-7 h-7 rounded-[6px] transition-all duration-300 cursor-pointer ${viewMode === 'list' ? 'bg-[#C8FF00]/15 text-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.25)]' : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#232631]'}`}
            >
              <List size={16} weight={viewMode === 'list' ? 'fill' : 'bold'} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center justify-center w-7 h-7 rounded-[6px] transition-all duration-300 cursor-pointer ${viewMode === 'grid' ? 'bg-[#C8FF00]/15 text-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.25)]' : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#232631]'}`}
            >
              <SquaresFour size={16} weight={viewMode === 'grid' ? 'fill' : 'bold'} />
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full z-0 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5' : 'flex flex-col gap-4 sm:gap-5'}`}>
        {isFeedLoading && displayedPosts.length === 0 ? (
          <div className="flex flex-col gap-6 w-full col-span-full">
            <div className="w-full h-64 bg-[#161920] rounded-2xl border border-[#232730] animate-pulse"></div>
            <div className="w-full h-64 bg-[#161920] rounded-2xl border border-[#232730] animate-pulse"></div>
          </div>
        ) : (
          displayedPosts.map(post => (
            <MyPostCard 
              key={post.id} 
              post={post} 
              viewMode={viewMode}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onComment={handleCommentClick}
              onLike={async (p) => {
                if (user && gymId) {
                  await toggleLikeMutate({ postId: p.id, userId: user.id, gymId: gymId ?? null });
                }
              }}
              onBookmark={async (p) => {
                if (user && gymId) {
                  await toggleSaveMutate({ postId: p.id, userId: user.id, gymId: gymId ?? null });
                }
              }}
            />
          ))
        )}
        {!isFeedLoading && displayedPosts.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20 col-span-full">
            <p className="font-['Nimbus_Sans'] font-medium text-[#94A3B8]">No posts found.</p>
          </div>
        )}
      </div>

      {displayedPosts.length > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={3}
          totalItems={15}
          itemsPerPage={4}
          onPageChange={setCurrentPage}
        />
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete Post"
        isConfirming={isDeleting}
        isDestructive={true}
      />
      
      {createModalOpen && (
        <CreatePostModal
          isEditing={!!postToEdit}
          initialContent={postToEdit ? postToEdit.description : ""}
          initialImages={postToEdit ? [postToEdit.image] : []}
          onClose={() => { setCreateModalOpen(false); setPostToEdit(null); }}
          onPost={async (content, images) => {
            if (!user || !gymId) return;
            try {
              if (postToEdit) {
                await editPostMutate({ 
                  postId: postToEdit.id, 
                  gymId: gymId ?? null, 
                  userId: user.id, 
                  caption: content, 
                  imageUri: images[0] 
                });
                toast.success("Post updated successfully!");
                setCreateModalOpen(false);
                setPostToEdit(null);
              } else {
                await createPostMutate({ gymId: gymId ?? null, userId: user.id, caption: content, imageUri: images[0] });
                toast.success("Post created successfully!");
              }
            } catch (e) {
              toast.error("Failed to post");
            }
          }}
        />
      )}
      
      {commentPost && (
        <PostCommentsModal 
          post={{
            id: commentPost.id,
            author: commentPost.author || { name: 'Gym Owner', avatar: null, role: 'Owner' as const },
            timeAgo: commentPost.timeAgo,
            content: commentPost.description,
            media: [{ url: commentPost.image }],
            likes: commentPost.likes,
            comments: commentPost.comments,
            shares: 0
          }}
          onClose={() => setCommentPost(null)}
        />
      )}
    </div>
  );
}
