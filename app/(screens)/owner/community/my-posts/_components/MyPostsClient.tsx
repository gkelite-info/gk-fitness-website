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

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Back & Biceps session complete! 💪",
    description: "Progress is built one rep at a time.",
    timeAgo: "2h ago",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
    likes: 128,
    comments: 24,
    isLiked: true,
  },
  {
    id: "2",
    title: "Day 30 update! Down 3.5 kg and feeling stronger every day. 🔥",
    description: "Consistency is key. Here's a quick comparison.",
    timeAgo: "1d ago",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
    likes: 156,
    comments: 38
  },
  {
    id: "3",
    title: "Post workout meal ✅",
    description: "Fuel your body, fuel your goals.",
    timeAgo: "3d ago",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",
    likes: 97,
    comments: 15
  },
  {
    id: "4",
    title: "Morning run to clear the mind. 🏃‍♂️",
    description: "5K done! Great start to the weekend.",
    timeAgo: "5d ago",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop",
    likes: 82,
    comments: 12,
    isSaved: true
  }
];

export default function MyPostsClient() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [sortBy, setSortBy] = useState("recent");
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  
  const [commentPost, setCommentPost] = useState<Post | null>(null);

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleEditClick = (post: Post) => {
    setPostToEdit(post);
    setCreateModalOpen(true);
  };
  
  const handleCommentClick = (post: Post) => {
    setCommentPost(post);
  };

  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  const displayedPosts = activeTab === 'posts' ? posts : posts.filter(p => p.isSaved);

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
                {posts.length} Published
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
            <span className={`${activeTab === 'posts' ? 'bg-[#2B3512] text-[#C8FF00]' : 'bg-[#1A1C22] text-[#94A3B8]'} font-['Nimbus_Sans'] font-bold text-[11px] px-1.5 rounded-[4px]`}>{posts.length}</span>
          </div>
          <div 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 cursor-pointer pb-1 border-b-2 transition-colors ${activeTab === 'saved' ? 'border-[#C8FF00]' : 'border-transparent hover:border-[#323842]'}`}
          >
            <span className={`font-['Nimbus_Sans'] font-medium text-[15px] ${activeTab === 'saved' ? 'text-[#C8FF00] font-bold' : 'text-[#94A3B8]'}`}>Saved</span>
            <span className={`${activeTab === 'saved' ? 'bg-[#2B3512] text-[#C8FF00]' : 'bg-[#1A1C22] text-[#94A3B8]'} font-['Nimbus_Sans'] font-bold text-[11px] px-1.5 rounded-[4px]`}>{posts.filter(p => p.isSaved).length}</span>
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
        {displayedPosts.map(post => (
          <MyPostCard 
            key={post.id} 
            post={post} 
            viewMode={viewMode}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onComment={handleCommentClick}
          />
        ))}
        {displayedPosts.length === 0 && (
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
          onPost={(content, images) => {
            if (postToEdit) {
              setPosts(prev => prev.map(p => p.id === postToEdit.id ? { ...p, description: content, image: images[0] || p.image } : p));
            } else {
              setPosts([{
                id: Date.now().toString(),
                title: "New Post",
                description: content,
                timeAgo: "Just now",
                image: images[0] || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
                likes: 0,
                comments: 0
              }, ...posts]);
            }
          }}
        />
      )}
      
      {commentPost && (
        <PostCommentsModal 
          post={{
            id: commentPost.id,
            author: commentPost.author || { name: 'Gym Owner', avatar: 'https://i.pravatar.cc/150?u=owner', role: 'Owner' as const },
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
