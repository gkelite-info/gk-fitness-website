"use client";

import { Plus, Image as ImageIcon } from "@phosphor-icons/react";

type Props = {
  onOpenCreatePost: () => void;
  onOpenAddStory: () => void;
  isScrolled?: boolean;
};

export default function CommunityHeader({ onOpenCreatePost, onOpenAddStory, isScrolled = false }: Props) {
  return (
    <div className={`flex justify-between w-full shrink-0 transition-all duration-300 ${isScrolled ? 'flex-row items-center gap-2 h-10' : 'flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0'}`}>
      <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
        <h2 className={`font-['Nimbus_Sans'] font-black leading-8 tracking-[-0.6px] text-white flex items-center transition-all duration-300 truncate ${isScrolled ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
          Community
        </h2>
        
        <div className={`grid transition-all duration-300 w-full ${isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
          <div className="overflow-hidden">
            <span className="font-['Nimbus_Sans'] font-normal text-xs leading-4 text-[#94A3B8] block truncate w-full">
              Stay connected with gym member milestones, PRs, and stories.
            </span>
          </div>
        </div>
      </div>

      <div className={`flex items-center gap-2 shrink-0 ${isScrolled ? 'w-auto flex-row justify-end' : 'w-full sm:w-auto flex-col sm:flex-row'}`}>
        <button
          onClick={() => window.location.href = '/owner/community/my-posts'}
          className={`flex flex-row items-center justify-center gap-2 bg-transparent border border-[#C8FF00]/40 text-[#C8FF00] shadow-[0_0_8px_rgba(200,255,0,0.1)] rounded-lg hover:bg-[#C8FF00] hover:text-black hover:shadow-[0_0_15px_rgba(200,255,0,0.3)] transition-all duration-300 shrink-0 cursor-pointer group ${isScrolled ? 'py-1.5 px-2.5 sm:px-3 h-8 w-auto' : 'py-2 px-4 h-9 w-full sm:w-auto'}`}
        >
          <span className={`font-['Nimbus_Sans'] font-bold leading-4 text-center transition-colors duration-300 whitespace-nowrap ${isScrolled ? 'text-[10px]' : 'text-xs'}`}>
            My Posts
          </span>
        </button>

        <button 
          onClick={onOpenCreatePost}
          className={`flex flex-row items-center justify-center gap-2 bg-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.25)] rounded-lg hover:bg-[#d4ff33] transition-all duration-300 shrink-0 cursor-pointer ${isScrolled ? 'py-1.5 px-2 sm:px-3 h-8 w-auto' : 'py-2 px-4 h-9 w-full sm:w-auto'}`}
        >
          <Plus size={isScrolled ? 14 : 16} weight="bold" className="text-black shrink-0" />
          <span className={`font-['Nimbus_Sans'] font-bold leading-4 text-center tracking-[0.3px] uppercase text-black transition-all duration-300 whitespace-nowrap ${isScrolled ? 'hidden sm:block text-[10px]' : 'text-xs'}`}>
            CREATE POST
          </span>
        </button>

        <button 
          onClick={onOpenAddStory}
          className={`flex flex-row items-center justify-center gap-1.5 bg-[#C8FF00] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg hover:bg-[#d4ff33] transition-all duration-300 shrink-0 cursor-pointer ${isScrolled ? 'p-1.5 px-2 sm:px-3 h-8 w-auto' : 'p-2 h-9 w-full sm:w-auto'}`}
        >
          <Plus size={isScrolled ? 14 : 16} weight="bold" className="text-black shrink-0" />
          <span className={`font-['Nimbus_Sans'] font-bold leading-4 text-center text-black transition-all duration-300 whitespace-nowrap ${isScrolled ? 'hidden sm:block text-[10px]' : 'text-xs'}`}>
            Add Story
          </span>
        </button>
      </div>
    </div>
  );
}
