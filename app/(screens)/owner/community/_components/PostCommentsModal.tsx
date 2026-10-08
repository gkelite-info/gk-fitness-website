"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Heart, Smiley, ArrowUp, CircleNotch, DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { Post } from "./mockData";
import PostCard from "./PostCard";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";

import { usePostComments, useAddComment, useDeleteComment, useEditComment, useToggleCommentLike, useToggleLike } from "@/lib/hooks/community/usePostInteractions";
import { useUser } from "@/app/context/UserContext";
import { useOwnerGymId } from "@/lib/hooks/auth/useOwnerGymId";

type Props = {
  post: any;
  onClose: () => void;
};

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

// Mock comments removed

const BASIC_EMOJIS = ['🔥', '💪', '👏', '🙌', '💯', '😂', '😍', '❤️', '👍', '🙏', '😎', '🏆'];

export default function PostCommentsModal({ post, onClose }: Props) {
  const { user, profile } = useUser();
  const { data: gymId } = useOwnerGymId(user?.id);
  
  const { data: commentsData = [], isLoading } = usePostComments(post.id, user?.id || null, 'oldest');
  const { mutateAsync: addCommentMutate } = useAddComment();
  const { mutateAsync: deleteCommentMutate } = useDeleteComment();
  const { mutateAsync: editCommentMutate } = useEditComment();
  const { mutateAsync: toggleCommentLikeMutate } = useToggleCommentLike();

  const { mutateAsync: toggleLikeMutate } = useToggleLike();

  const [commentText, setCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ parentId: string, username: string } | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [dropdownConfig, setDropdownConfig] = useState<{ id: string, x: number, y: number } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mappedComments = commentsData.map((c: any) => ({
    id: c.gymCommunityCommentId,
    user: {
      name: c.users?.name || "Unknown",
      avatar: c.users?.profilePhoto || null,
      gender: c.users?.gender || null,
    },
    timeAgo: getTimeAgo(c.createdAt),
    text: c.content,
    likes: c.likesCount || 0,
    isLiked: c.isLikedByMe,
    isEdited: false,
    parentId: c.parentId || null,
    isUser: c.authorId === user?.id,
  }));

  const handleLikeComment = async (id: string) => {
    if (!user) return;
    try {
      await toggleCommentLikeMutate({ commentId: id, userId: user.id });
    } catch (e) {
      toast.error("Failed to like comment");
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim() || !user) return;
    try {
      await addCommentMutate({ postId: post.id, userId: user.id, content: commentText.trim(), parentId: replyingTo?.parentId });
      setCommentText("");
      setReplyingTo(null);
      toast.success("Comment added");
    } catch (e) {
      toast.error("Failed to add comment");
    }
  };

  const handleSaveEdit = async (id: string) => {
    if (!user || !editingText.trim()) return;
    try {
      await editCommentMutate({ commentId: id, content: editingText.trim(), userId: user.id });
      setEditingCommentId(null);
      toast.success("Comment updated");
    } catch (e) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async () => {
    if (showDeleteConfirm && user) {
      try {
        await deleteCommentMutate({ commentId: showDeleteConfirm, userId: user.id, role: "owner" });
        setShowDeleteConfirm(null);
        toast.success("Comment deleted");
      } catch (e) {
        toast.error("Failed to delete comment");
      }
    }
  };

  const handleDotsClick = (e: React.MouseEvent, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const showAbove = spaceBelow < 100;
    
    setDropdownConfig({
      id,
      x: Math.min(rect.right - 128, window.innerWidth - 140),
      y: showAbove ? rect.top - 80 : rect.bottom + 8
    });
  };

  const handleReply = (parentId: string, username: string) => {
    setReplyingTo({ parentId, username });
    setCommentText(prev => prev ? `${prev} @${username} ` : `@${username} `);
    inputRef.current?.focus();
  };

  const handleEmojiClick = (emoji: string) => {
    setCommentText(prev => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Pagination for comments is currently handled by fetching all or sorting by oldest
  };

  const CommentItem = ({ comment, onReply }: { comment: any, onReply: () => void }) => {
    const isUser = comment.isUser;
    const isEditing = editingCommentId === comment.id;

    return (
      <div className="flex flex-row items-start gap-3 relative group w-full">
        <Avatar src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 shrink-0 border border-[#334155]" />
        <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
          <div className="flex flex-row items-center gap-2">
            <span className="font-['Nimbus_Sans'] font-bold text-[13px] text-white">{comment.user.name}</span>
            <span className="font-['Nimbus_Sans'] font-medium text-[11px] text-[#475569]">{comment.timeAgo}</span>
          </div>
          {isEditing ? (
            <div className="flex flex-col gap-2 w-full mt-1">
              <input autoFocus value={editingText} onChange={e => setEditingText(e.target.value)} className="bg-[#1A1D24] text-white text-[13px] p-2 rounded border border-[#334155] w-full" />
              <div className="flex gap-2">
                <button onClick={() => handleSaveEdit(comment.id)} className="text-xs bg-[#C8FF00] text-black px-3 py-1 rounded font-bold cursor-pointer">Save</button>
                <button onClick={() => setEditingCommentId(null)} className="text-xs text-white px-2 py-1 cursor-pointer">Cancel</button>
              </div>
            </div>
          ) : (
            <p className="font-['Nimbus_Sans'] font-normal text-[13px] leading-[18px] text-[#CBD5E1] break-words whitespace-pre-wrap w-full">
              {comment.text} {comment.isEdited && <span className="text-[10px] text-[#475569] ml-1">(edited)</span>}
            </p>
          )}
          {!isEditing && (
            <button onClick={onReply} className="font-['Nimbus_Sans'] font-medium text-[11px] text-[#94A3B8] hover:text-white transition-colors mt-0.5 cursor-pointer">Reply</button>
          )}
        </div>
        
        <div className="flex flex-row items-start gap-0 shrink-0 pt-0.5">
          {isUser && !isEditing && (
            <div className="relative">
              <button onClick={(e) => handleDotsClick(e, comment.id)} className="text-[#475569] hover:text-white p-1 cursor-pointer transition-colors">
                <DotsThree size={16} weight="bold" />
              </button>
            </div>
          )}
          {/* <div className="flex flex-col items-center gap-1 min-w-[24px]">
            <button onClick={() => handleLikeComment(comment.id)} className="cursor-pointer group p-1">
              <Heart size={14} weight={comment.isLiked ? "fill" : "regular"} className={`${comment.isLiked ? "text-[#F43F5E]" : "text-[#475569] group-hover:text-white"} transition-colors`} />
            </button>
            {comment.likes > 0 && <span className="font-['Nimbus_Sans'] font-medium text-[10px] text-[#475569] leading-none">{comment.likes}</span>}
          </div> */}
        </div>
      </div>
    );
  };

  return createPortal(
    <>
      <AnimatePresence>
        <div key="comments-modal" className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-6 overflow-hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-[#0C0D10]/90 backdrop-blur-sm cursor-pointer" onClick={onClose} />
          <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative w-full h-full md:h-[90vh] md:max-w-6xl flex flex-col md:flex-row gap-0 md:gap-6 z-10 pointer-events-none rounded-none md:rounded-2xl overflow-hidden">
            <div className="hidden md:flex flex-1 md:flex-[1.2] lg:flex-[1.5] w-full h-full overflow-y-auto overflow-x-hidden scrollbar-themed pointer-events-auto rounded-2xl bg-[#0E0F13] p-1 border border-[#232730]">
              <div className="w-full h-fit">
                <PostCard 
                  post={post} 
                  hideCommentsClick 
                  onLike={async () => {
                    if (user && gymId) {
                      await toggleLikeMutate({ postId: post.id, userId: user.id, gymId: gymId ?? null });
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1 md:flex-[1] lg:flex-[1] w-full h-full bg-[#161920] border-l md:border border-[#232730] md:rounded-2xl flex flex-col pointer-events-auto shadow-2xl relative">
              <div className="flex flex-row items-center justify-between p-5 sm:p-6 border-b border-[#232730] shrink-0 bg-[#161920]">
                <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-xl text-white">Comments <span className="text-[#94A3B8] font-medium text-[14px] ml-1">({mappedComments.length})</span></h2>
                <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors cursor-pointer bg-[#1A1D24] border border-[#334155] hover:border-[#475569]">
                  <X size={16} weight="bold" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-themed flex flex-col p-5 sm:p-6 gap-6 bg-[#12141A]" onScroll={handleScroll}>
                <div className="md:hidden flex flex-col gap-3 pb-6 border-b border-[#232730] mb-2">
                  <div className="flex flex-row items-center gap-3">
                    <Avatar src={post.author.avatar} alt={post.author.name} className="w-8 h-8 border border-[#334155]" />
                    <span className="font-['Nimbus_Sans'] font-bold text-[14px] text-white">{post.author.name}</span>
                    <span className="font-['Nimbus_Sans'] font-medium text-[12px] text-[#94A3B8]">{post.timeAgo}</span>
                  </div>
                  <p className="font-['Nimbus_Sans'] font-normal text-[13px] text-[#E2E8F0]">{post.content}</p>
                </div>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8 w-full"><CircleNotch size={24} className="text-[#C8FF00] animate-spin" weight="bold" /></div>
                ) : (
                  mappedComments.filter((c: any) => !c.parentId).map((comment: any) => (
                    <div key={comment.id} className="flex flex-col gap-4 w-full">
                      <CommentItem comment={comment} onReply={() => handleReply(comment.id, comment.user.name)} />
                      {mappedComments.filter((c: any) => c.parentId === comment.id).map((reply: any) => (
                        <div key={reply.id} className="ml-10">
                          <CommentItem comment={reply} onReply={() => handleReply(comment.id, reply.user.name)} />
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-row items-center p-4 sm:p-5 border-t border-[#232730] shrink-0 bg-[#161920]">
                <Avatar src={profile?.profilePhoto || null} gender={profile?.gender as any} alt="Your avatar" className="w-8 h-8 border border-[#334155] mr-3 hidden sm:block" />
                <div className="flex flex-row items-center flex-1 bg-[#1A1D24] border border-[#334155] rounded-full px-4 py-2 gap-3 focus-within:border-[#C8FF00] transition-colors relative">
                  <input ref={inputRef} type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handlePostComment()} placeholder="Write a comment..." className="flex-1 bg-transparent border-none outline-none font-['Nimbus_Sans'] text-[13px] sm:text-[14px] text-white placeholder:text-[#475569]" />
                  <div className="relative flex items-center">
                    <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-[#475569] hover:text-white transition-colors cursor-pointer shrink-0"><Smiley size={18} weight="bold" /></button>
                    {showEmojiPicker && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowEmojiPicker(false)} />
                        <div className="absolute bottom-full right-0 mb-3 bg-[#161920] border border-[#334155] rounded-xl shadow-xl p-2 grid grid-cols-4 gap-2 z-20 w-48">
                          {BASIC_EMOJIS.map(emoji => (
                            <button key={emoji} onClick={() => handleEmojiClick(emoji)} className="text-xl hover:bg-white/10 rounded-lg p-1.5 transition-colors cursor-pointer flex items-center justify-center">{emoji}</button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <button onClick={handlePostComment} disabled={!commentText.trim()} className="w-7 h-7 rounded-full bg-[#C8FF00] flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d4ff33] transition-colors cursor-pointer shrink-0">
                    <ArrowUp size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {dropdownConfig && (
        <div className="fixed inset-0 z-[10005]" onClick={() => setDropdownConfig(null)}>
          <div 
            className="fixed w-32 bg-[#161920] border border-[#232730] rounded-xl shadow-xl flex flex-col py-1 animate-in fade-in zoom-in-95 duration-100"
            style={{ left: dropdownConfig.x, top: dropdownConfig.y }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => { setEditingText(mappedComments.find((c: any) => c.id === dropdownConfig.id)?.text || ""); setEditingCommentId(dropdownConfig.id); setDropdownConfig(null); }} className="flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/5 cursor-pointer"><PencilSimple size={14} /> Edit</button>
            <button onClick={() => { setShowDeleteConfirm(dropdownConfig.id); setDropdownConfig(null); }} className="flex items-center gap-2 px-3 py-2 text-xs text-[#F43F5E] hover:bg-white/5 cursor-pointer"><Trash size={14} /> Delete</button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={showDeleteConfirm !== null}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={handleDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </>,
    document.body
  );
}
