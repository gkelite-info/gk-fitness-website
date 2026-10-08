import { useState } from "react";
import { Eye, PencilSimple, Trash, Heart, ChatCircle, BookmarkSimple } from "@phosphor-icons/react";
import Image from "next/image";

export interface Post {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  image: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  author?: { name: string; avatar: string; role: "Owner" | "Trainer" | "Member"; };
}

interface MyPostCardProps {
  post: Post;
  viewMode: 'list' | 'grid';
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onComment?: (post: Post) => void;
  onLike?: (post: Post) => Promise<void>;
  onBookmark?: (post: Post) => Promise<void>;
}

export default function MyPostCard({ post, viewMode, onEdit, onDelete, onComment, onLike, onBookmark }: MyPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    if (onLike) await onLike(post);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onBookmark) await onBookmark(post);
  };

  if (viewMode === 'grid') {
    return (
      <div 
        onClick={() => onComment?.(post)}
        className="w-full bg-[#16181D] border border-[#232631] rounded-xl overflow-hidden hover:border-[#323842] transition-colors group cursor-pointer flex flex-col"
      >
        <div className="relative w-full aspect-video sm:h-[180px] shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col flex-grow p-4 gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-['Nimbus_Sans'] font-medium text-xs text-[#94A3B8]">
              {post.timeAgo}
            </span>
            <h3 className="font-['Nimbus_Sans'] font-bold text-[17px] leading-[22px] text-white line-clamp-2">
              {post.title}
            </h3>
            <p className="font-['Nimbus_Sans'] font-normal text-[14px] leading-5 text-[#94A3B8] line-clamp-2">
              {post.description}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#232631]">
            <div className="flex items-center gap-4">
              <div onClick={handleLike} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <Heart size={16} weight={isLiked ? "fill" : "regular"} className={isLiked ? "text-[#C8FF00]" : "text-[#94A3B8]"} />
                <span className={`font-['Nimbus_Sans'] font-bold text-xs ${isLiked ? "text-[#C8FF00]" : "text-[#94A3B8]"}`}>
                  {likes}
                </span>
              </div>
              <div onClick={(e) => { e.stopPropagation(); onComment?.(post); }} className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <ChatCircle size={16} weight="regular" className="text-[#94A3B8]" />
                <span className="font-['Nimbus_Sans'] font-bold text-xs text-[#94A3B8]">
                  {post.comments}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(post); }} 
                className="text-[#94A3B8] hover:text-[#C8FF00] transition-colors cursor-pointer shrink-0"
              >
                <PencilSimple size={18} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(post); }} 
                className="text-[#94A3B8] hover:text-[#E11D48] transition-colors cursor-pointer shrink-0"
              >
                <Trash size={18} />
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0 ml-1">
                <BookmarkSimple size={16} weight={isSaved ? "fill" : "regular"} className={isSaved ? "text-[#C8FF00]" : ""} />
                <span className={`font-['Nimbus_Sans'] font-medium text-xs hidden sm:block ${isSaved ? "text-[#C8FF00]" : ""}`}>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onComment?.(post)}
      className="w-full bg-[#16181D] border border-[#232631] rounded-xl overflow-hidden hover:border-[#323842] transition-colors group cursor-pointer flex flex-row h-[120px] sm:h-[160px]"
    >
      <div className="relative w-[120px] sm:w-[240px] h-full shrink-0 p-2 sm:p-3">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="flex flex-col flex-grow p-2 sm:p-4 gap-0.5 sm:gap-1 relative justify-center min-w-0">
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(post); }} 
            className="text-[#94A3B8] hover:text-[#C8FF00] transition-colors cursor-pointer shrink-0"
          >
            <PencilSimple size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(post); }} 
            className="text-[#94A3B8] hover:text-[#E11D48] transition-colors cursor-pointer shrink-0"
          >
            <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        <span className="font-['Nimbus_Sans'] font-medium text-[10px] sm:text-xs text-[#94A3B8]">
          {post.timeAgo}
        </span>
        <h3 className="font-['Nimbus_Sans'] font-bold text-[14px] sm:text-[19px] leading-tight sm:leading-[24px] text-white mt-0.5 sm:mt-1 pr-16 sm:pr-24 line-clamp-2 sm:line-clamp-1">
          {post.title}
        </h3>
        <p className="font-['Nimbus_Sans'] font-normal text-[12px] sm:text-[15px] leading-snug sm:leading-6 text-[#94A3B8] mt-0.5 sm:mt-1 pr-2 sm:pr-4 line-clamp-1">
          {post.description}
        </p>

        <div className="mt-2 sm:mt-4 flex items-center justify-between sm:justify-start gap-4 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-5">
            <div onClick={handleLike} className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Heart size={14} weight={isLiked ? "fill" : "regular"} className={`${isLiked ? "text-[#C8FF00]" : "text-[#94A3B8]"} sm:w-4 sm:h-4`} />
              <span className={`font-['Nimbus_Sans'] font-bold text-[10px] sm:text-xs ${isLiked ? "text-[#C8FF00]" : "text-[#94A3B8]"}`}>
                {likes}
              </span>
            </div>
            <div onClick={(e) => { e.stopPropagation(); onComment?.(post); }} className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <ChatCircle size={14} weight="regular" className="text-[#94A3B8] sm:w-4 sm:h-4" />
              <span className="font-['Nimbus_Sans'] font-bold text-[10px] sm:text-xs text-[#94A3B8]">
                {post.comments}
              </span>
            </div>
          </div>
          
          <button onClick={handleSave} className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0 sm:ml-auto">
            <BookmarkSimple size={14} weight={isSaved ? "fill" : "regular"} className={`${isSaved ? "text-[#C8FF00]" : ""} sm:w-4 sm:h-4`} />
            <span className={`font-['Nimbus_Sans'] font-medium text-[10px] sm:text-xs hidden sm:block ${isSaved ? "text-[#C8FF00]" : ""}`}>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
