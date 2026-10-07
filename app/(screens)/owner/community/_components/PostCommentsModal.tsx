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

type Props = {
  post: Post;
  onClose: () => void;
};

const MOCK_COMMENTS = [
  { id: 1, user: { name: "Sarah Lee", avatar: "https://i.pravatar.cc/150?u=sarah" }, timeAgo: "1h ago", text: "Amazing pump! Keep pushing 🔥", likes: 12, isLiked: false, isEdited: false },
  { id: 5, user: { name: "Gym Owner", avatar: "https://i.pravatar.cc/150?u=owner" }, timeAgo: "20m ago", text: "@Sarah Lee Sure, will share it in my next post! 💪", likes: 2, isLiked: false, parentId: 1, isEdited: false },
  { id: 2, user: { name: "Mike Turner", avatar: "https://i.pravatar.cc/150?u=mike" }, timeAgo: "56m ago", text: "That back is looking insane! 👏", likes: 8, isLiked: false, isEdited: false },
  { id: 3, user: { name: "Jessica Wilson", avatar: "https://i.pravatar.cc/150?u=jessica" }, timeAgo: "35m ago", text: "Beast mode! 🔥💪", likes: 5, isLiked: false, isEdited: false },
  { id: 4, user: { name: "David Miller", avatar: "https://i.pravatar.cc/150?u=david" }, timeAgo: "28m ago", text: "What a workout! Mind sharing the routine?", likes: 3, isLiked: false, isEdited: false },
  { id: 6, user: { name: "Emma Davis", avatar: "https://i.pravatar.cc/150?u=emma1" }, timeAgo: "15m ago", text: "You're an inspiration! Keep it up 🙌", likes: 1, isLiked: false, isEdited: false },
];

const BASIC_EMOJIS = ['🔥', '💪', '👏', '🙌', '💯', '😂', '😍', '❤️', '👍', '🙏', '😎', '🏆'];

export default function PostCommentsModal({ post, onClose }: Props) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [replyingTo, setReplyingTo] = useState<{ parentId: number, username: string } | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [dropdownConfig, setDropdownConfig] = useState<{ id: number, x: number, y: number } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLikeComment = (id: number) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c));
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      user: { name: "Gym Owner", avatar: "https://i.pravatar.cc/150?u=owner" },
      timeAgo: "Just now",
      text: commentText.trim(),
      likes: 0,
      isLiked: false,
      parentId: replyingTo?.parentId,
      isEdited: false
    };
    setComments(prev => [...prev, newComment]);
    setCommentText("");
    setReplyingTo(null);
  };

  const handleSaveEdit = (id: number) => {
    if (!editingText.trim()) return;
    setComments(prev => prev.map(c => c.id === id ? { ...c, text: editingText.trim(), isEdited: true } : c));
    setEditingCommentId(null);
  };

  const handleDeleteComment = () => {
    if (showDeleteConfirm) {
      setComments(prev => prev.filter(c => c.id !== showDeleteConfirm && c.parentId !== showDeleteConfirm));
      setShowDeleteConfirm(null);
      toast.success("Comment deleted");
    }
  };

  const handleDotsClick = (e: React.MouseEvent, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const showAbove = spaceBelow < 100;
    
    setDropdownConfig({
      id,
      x: Math.min(rect.right - 128, window.innerWidth - 140),
      y: showAbove ? rect.top - 80 : rect.bottom + 8
    });
  };

  const handleReply = (parentId: number, username: string) => {
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
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setComments(prev => [...prev, 
          { id: Date.now(), user: { name: "Sarah Lee", avatar: "https://i.pravatar.cc/150?u=sarah" }, timeAgo: "1m ago", text: "Such a great workout! 🔥", likes: 0, isLiked: false, isEdited: false },
          { id: Date.now()+1, user: { name: "Mike Turner", avatar: "https://i.pravatar.cc/150?u=mike" }, timeAgo: "Just now", text: "Need to try this!", likes: 0, isLiked: false, isEdited: false }
        ]);
        setIsLoadingMore(false);
        setHasMore(false);
      }, 1500);
    }
  };

  const CommentItem = ({ comment, onReply }: { comment: typeof comments[0], onReply: () => void }) => {
    const isUser = comment.user.name === "Gym Owner";
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
          <div className="flex flex-col items-center gap-1 min-w-[24px]">
            <button onClick={() => handleLikeComment(comment.id)} className="cursor-pointer group p-1">
              <Heart size={14} weight={comment.isLiked ? "fill" : "regular"} className={`${comment.isLiked ? "text-[#F43F5E]" : "text-[#475569] group-hover:text-white"} transition-colors`} />
            </button>
            {comment.likes > 0 && <span className="font-['Nimbus_Sans'] font-medium text-[10px] text-[#475569] leading-none">{comment.likes}</span>}
          </div>
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
              <div className="w-full h-fit"><PostCard post={post} hideCommentsClick /></div>
            </div>
            <div className="flex-1 md:flex-[1] lg:flex-[1] w-full h-full bg-[#161920] border-l md:border border-[#232730] md:rounded-2xl flex flex-col pointer-events-auto shadow-2xl relative">
              <div className="flex flex-row items-center justify-between p-5 sm:p-6 border-b border-[#232730] shrink-0 bg-[#161920]">
                <h2 className="font-['Nimbus_Sans'] font-bold text-[18px] sm:text-xl text-white">Comments <span className="text-[#94A3B8] font-medium text-[14px] ml-1">({comments.length})</span></h2>
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
                {comments.filter(c => !c.parentId).map((comment) => (
                  <div key={comment.id} className="flex flex-col gap-4 w-full">
                    <CommentItem comment={comment} onReply={() => handleReply(comment.id, comment.user.name)} />
                    {comments.filter(c => c.parentId === comment.id).map(reply => (
                      <div key={reply.id} className="ml-10">
                        <CommentItem comment={reply} onReply={() => handleReply(comment.id, reply.user.name)} />
                      </div>
                    ))}
                  </div>
                ))}
                {isLoadingMore && <div className="flex justify-center items-center py-2 w-full"><CircleNotch size={24} className="text-[#C8FF00] animate-spin" weight="bold" /></div>}
              </div>
              <div className="flex flex-row items-center p-4 sm:p-5 border-t border-[#232730] shrink-0 bg-[#161920]">
                <Avatar src="https://i.pravatar.cc/150?u=owner" alt="Your avatar" className="w-8 h-8 border border-[#334155] mr-3 hidden sm:block" />
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
            <button onClick={() => { setEditingText(comments.find(c => c.id === dropdownConfig.id)?.text || ""); setEditingCommentId(dropdownConfig.id); setDropdownConfig(null); }} className="flex items-center gap-2 px-3 py-2 text-xs text-white hover:bg-white/5 cursor-pointer"><PencilSimple size={14} /> Edit</button>
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
