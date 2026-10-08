"use client";

import { Heart, ChatCircle, ShareNetwork, BookmarkSimple, DotsThree, PencilSimple, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Post } from "./mockData";
import PostMediaGrid from "./PostMediaGrid";
import ShareModal from "./ShareModal";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import Avatar from "@/app/(screens)/components/reusable/Avatar";

type Props = {
  post: Post;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onCommentClick?: (postId: string) => void;
  onLike?: () => Promise<void>;
  onBookmark?: () => Promise<void>;
  hideCommentsClick?: boolean;
};

export default function PostCard({ post, onEdit, onDelete, onCommentClick, onLike, onBookmark, hideCommentsClick }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [miniHearts, setMiniHearts] = useState<{id: number, xOffset: number, yOffset: number, delay: number, size: number, rotation: number}[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleLike = async () => {
    if (onLike) {
      try {
        await onLike();
      } catch (e) {
        console.error(e);
        return; // Early return on error, do not update local state
      }
    }

    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
      setShowHeartAnim(true);
      
      // Generate a cluster of 8 mini floating hearts peeking out around the main heart
      const generated = Array.from({ length: 8 }).map((_, i) => {
        // Ensure they spawn slightly outside the dead center so they are visible
        const signX = Math.random() > 0.5 ? 1 : -1;
        const signY = Math.random() > 0.5 ? 1 : -1;
        const xOffset = signX * (45 + Math.random() * 35); // +/- 45px to 80px horizontally
        const yOffset = signY * (35 + Math.random() * 35); // +/- 35px to 70px vertically
        
        return {
          id: Date.now() + i,
          xOffset,
          yOffset,
          delay: Math.random() * 0.2,    // 0 to 0.2s slight delay
          size: 30 + Math.random() * 25, // 30px to 55px
          rotation: (Math.random() - 0.5) * 40 // -20deg to +20deg slight tilt
        };
      });
      setMiniHearts(generated);

      setTimeout(() => {
        setShowHeartAnim(false);
        setMiniHearts([]);
      }, 1500); // Wait for the longest possible animation (1.2s + 0.2s)
    }
  };

  const handleBookmark = async () => {
    if (onBookmark) {
      try {
        await onBookmark();
      } catch (e) {
        console.error(e);
        return;
      }
    }

    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (newState) {
      toast.success("Saved successfully");
    } else {
      toast.success("Removed from saved");
    }
  };

  // Mock URL for sharing
  const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/community/post/${post.id}` : `https://gkfitness.com/community/post/${post.id}`;

  return (
    <div className="relative flex flex-col items-start p-4 sm:p-5 gap-3 sm:gap-4 w-full bg-[#161920] border border-[#232730] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl shrink-0">
      
      {/* Heart Animation Overlay */}
      {showHeartAnim && (
        <div className="fixed top-1/2 left-1/2 z-[100] pointer-events-none animate-heart-bounce">
          <Heart 
            size={140} 
            weight="fill" 
            className="text-[#F43F5E] drop-shadow-[0_0_40px_rgba(244,63,94,0.6)]" 
          />
        </div>
      )}

      {/* Mini Floating Hearts Burst */}
      {miniHearts.map(heart => (
        <div 
          key={heart.id}
          className="fixed top-1/2 left-1/2 z-[99] pointer-events-none animate-heart-bounce"
          style={{
            marginLeft: `${heart.xOffset}px`,
            marginTop: `${heart.yOffset}px`,
            animationDelay: `${heart.delay}s`
          }}
        >
          <Heart 
            size={heart.size} 
            weight="fill" 
            className="text-[#F43F5E] opacity-90 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" 
            style={{ transform: `rotate(${heart.rotation}deg)` }}
          />
        </div>
      ))}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        url={postUrl} 
      />

      {/* Post Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row items-center gap-3">
          <Avatar 
            src={post.author.avatar} 
            gender={post.author.gender} 
            alt={post.author.name}
            className="w-10 h-10 border border-[#334155]"
          />
          
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-2">
              <span className="font-['Nimbus_Sans'] font-bold text-sm leading-5 text-white truncate max-w-[100px] sm:max-w-[200px] md:max-w-[300px]">
                {post.author.name}
              </span>
              
              {post.author.role === "Trainer" && (
                <div className="flex items-center px-1.5 py-0.5 bg-[rgba(200,255,0,0.15)] border border-[rgba(200,255,0,0.2)] rounded">
                  <span className="font-['Nimbus_Sans'] font-semibold text-[10px] leading-[15px] text-[#C8FF00] uppercase">
                    Trainer
                  </span>
                </div>
              )}
              {post.author.role === "Owner" && (
                <div className="flex items-center px-1.5 py-0.5 bg-[rgba(244,63,94,0.15)] border border-[rgba(244,63,94,0.2)] rounded">
                  <span className="font-['Nimbus_Sans'] font-semibold text-[10px] leading-[15px] text-[#F43F5E] uppercase">
                    Owner
                  </span>
                </div>
              )}
              {post.author.role === "Member" && (
                <div className="flex items-center px-1.5 py-0.5 bg-[#1E293B] border border-[#334155] rounded">
                  <span className="font-['Nimbus_Sans'] font-medium text-[10px] leading-[15px] text-[#CBD5E1] uppercase">
                    Member
                  </span>
                </div>
              )}
            </div>

            <span className="font-['Nimbus_Sans'] font-normal text-xs leading-4 text-[#94A3B8]">
              {post.timeAgo} {post.tag && `• ${post.tag}`}
            </span>
          </div>
        </div>

        {post.isUser && (
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
              className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer p-1"
            >
              <DotsThree size={24} weight="bold" />
            </button>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowDropdown(false); }} />
                <div className="absolute right-0 mt-2 w-36 bg-[#161920] border border-[#232730] rounded-xl shadow-xl z-50 flex flex-col py-1 overflow-hidden">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors text-left cursor-pointer" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setShowDropdown(false); 
                      onEdit?.(post.id); 
                    }}
                  >
                    <PencilSimple size={16} />
                    Edit
                  </button>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#F43F5E] hover:bg-white/5 transition-colors text-left cursor-pointer" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setShowDropdown(false); 
                      setShowDeleteConfirm(true); 
                    }}
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="w-full">
        <p className="font-['Nimbus_Sans'] font-normal text-sm leading-6 text-[#E2E8F0] whitespace-pre-wrap break-words">
          {post.content}
        </p>
      </div>

      {/* Media Grid */}
      <PostMediaGrid media={post.media} />

      {/* Post Actions */}
      <div className="flex flex-row justify-between items-center w-full pt-3 mt-1 border-t border-[#232730]">
        <div className="flex flex-row items-center gap-6">
          <button onClick={handleLike} className="flex flex-row items-center gap-2 group cursor-pointer">
            <Heart 
              size={16} 
              weight={isLiked ? "fill" : "regular"} 
              className={`${isLiked ? "text-[#F43F5E]" : "text-[#94A3B8] group-hover:text-[#F43F5E]"} transition-all ${showHeartAnim ? 'scale-125' : 'scale-100'} duration-200`} 
            />
            <span className="font-['Nimbus_Sans'] font-medium text-xs leading-4 text-center text-[#CBD5E1] group-hover:text-white transition-colors">
              {likesCount >= 1000 ? `${(likesCount / 1000).toFixed(1)}k` : likesCount}
            </span>
          </button>
          
          <button 
            onClick={() => {
              if (!hideCommentsClick) onCommentClick?.(post.id);
            }} 
            className={`flex flex-row items-center gap-2 group ${hideCommentsClick ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <ChatCircle size={16} weight="regular" className="text-[#94A3B8] group-hover:text-white transition-colors" />
            <span className="font-['Nimbus_Sans'] font-medium text-xs leading-4 text-center text-[#CBD5E1] group-hover:text-white transition-colors">
              {post.comments}
            </span>
          </button>
          
          <button onClick={() => setShowShareModal(true)} className="flex flex-row items-center gap-2 group cursor-pointer">
            <ShareNetwork size={16} weight="regular" className="text-[#94A3B8] group-hover:text-white transition-colors" />
            <span className="font-['Nimbus_Sans'] font-medium text-xs leading-4 text-center text-[#CBD5E1] group-hover:text-white transition-colors">
              {post.shares}
            </span>
          </button>
        </div>

        <button onClick={handleBookmark} className="group cursor-pointer transition-transform active:scale-90">
          <BookmarkSimple 
            size={16} 
            weight={isBookmarked ? "fill" : "regular"} 
            className={isBookmarked ? "text-[#D4FF32]" : "text-[#94A3B8] group-hover:text-white transition-colors"} 
          />
        </button>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete?.(post.id);
        }}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
}
