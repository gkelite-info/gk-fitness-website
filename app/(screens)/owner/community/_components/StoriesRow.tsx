"use client";

import { Plus } from "@phosphor-icons/react";
import { Story } from "./mockData";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useUser } from "@/app/context/UserContext";

type Props = {
  stories: any[];
  isScrolled?: boolean;
  onStoryClick?: (index: number) => void;
  onAddStoryClick?: () => void;
};

export default function StoriesRow({ stories, isScrolled = false, onStoryClick, onAddStoryClick }: Props) {
  const { profile } = useUser();

  return (
    <div className={`flex flex-col items-start w-full bg-[#161920] border border-[#232730] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl shrink-0 overflow-hidden transition-all duration-300 ${isScrolled ? 'p-2' : 'p-4'}`}>
      <div className={`flex flex-row items-center w-full overflow-x-auto scrollbar-hide transition-all duration-300 ${isScrolled ? 'py-0.5 gap-3' : 'py-1 gap-5'}`}>

        {stories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => {
              if (story.segments && story.segments.length === 0) {
                onAddStoryClick?.();
              } else {
                onStoryClick?.(index);
              }
            }}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >

            <div className={`relative rounded-full flex items-center justify-center p-0.5 z-0 transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'w-10 h-10' : 'w-16 h-16'}`}>

              {story.isUser ? (
                <div className="absolute inset-0 rounded-full border-2 border-[#334155] z-0" />
              ) : story.hasUnseen ? (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8FF00] to-[#10B981] z-0" />
              ) : (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F97316] to-[#E11D48] z-0" />
              )}

              <div className="absolute inset-0.5 rounded-full bg-[#161920] z-0" />

              <Avatar
                src={story.isUser ? (profile?.profilePhoto || null) : story.avatar}
                gender={story.isUser ? (profile?.gender as any) : undefined}
                alt={story.isUser ? (profile?.name || story.name) : story.name}
                className={`relative rounded-full object-cover z-10 transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-14 h-14'}`}
              />

              {story.isUser && (
                <div className={`absolute right-0 bottom-0 bg-[#C8FF00] border-2 border-[#161920] rounded-full flex items-center justify-center shadow-md z-20 transition-all duration-300 ${isScrolled ? 'w-3.5 h-3.5' : 'w-5 h-5'}`}>
                  <Plus size={isScrolled ? 8 : 12} weight="bold" className="text-black" />
                </div>
              )}
            </div>

            <span className={`font-['Nimbus_Sans'] font-medium text-center text-[#CBD5E1] truncate transition-all duration-300 ${isScrolled ? 'text-[10px] leading-3 max-w-[48px]' : 'text-xs leading-4 max-w-[64px]'}`}>
              {story.name}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}
