"use client";

import { Plus } from "@phosphor-icons/react";

export default function CommunitySkeleton() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#0E0F13] relative overflow-hidden">
      <div className="flex flex-col items-start w-full max-w-[976px] mx-auto pb-10">
        
        {/* Header Skeleton */}
        <div className="sticky top-0 z-40 w-full bg-[#0E0F13]/95 backdrop-blur-md flex flex-col px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-2">
          
          <div className="flex justify-between w-full shrink-0 flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
            
            <div className="flex flex-col items-start gap-1 flex-1 min-w-0">
              <h2 className="font-['Nimbus_Sans'] font-black leading-8 tracking-[-0.6px] text-white flex items-center text-2xl truncate">
                Community
              </h2>
              <div className="grid w-full grid-rows-[1fr] opacity-100">
                <div className="overflow-hidden">
                  <span className="font-['Nimbus_Sans'] font-normal text-xs leading-4 text-[#94A3B8] block truncate w-full">
                    Stay connected with gym member milestones, PRs, and stories.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto flex-col sm:flex-row">
              <div className="flex flex-row items-center justify-center gap-2 bg-transparent border border-[#C8FF00]/40 text-[#C8FF00] shadow-[0_0_8px_rgba(200,255,0,0.1)] rounded-lg py-2 px-4 h-9 w-full sm:w-auto shrink-0 opacity-50">
                <span className="font-['Nimbus_Sans'] font-bold leading-4 text-center whitespace-nowrap text-xs">
                  My Posts
                </span>
              </div>

              <div className="flex flex-row items-center justify-center gap-2 bg-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.25)] rounded-lg py-2 px-4 h-9 w-full sm:w-auto shrink-0 opacity-50">
                <Plus size={16} weight="bold" className="text-black shrink-0" />
                <span className="font-['Nimbus_Sans'] font-bold leading-4 text-center tracking-[0.3px] uppercase text-black whitespace-nowrap text-xs">
                  CREATE POST
                </span>
              </div>

              <div className="flex flex-row items-center justify-center gap-1.5 bg-[#C8FF00] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-lg p-2 h-9 w-full sm:w-auto shrink-0 opacity-50">
                <Plus size={16} weight="bold" className="text-black shrink-0" />
                <span className="font-['Nimbus_Sans'] font-bold leading-4 text-center text-black whitespace-nowrap text-xs">
                  Add Story
                </span>
              </div>
            </div>

          </div>

          {/* Stories Skeleton */}
          <div className="pt-4 sm:pt-6 w-full">
            <div className="flex gap-4 overflow-x-hidden">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-[72px] h-[72px] rounded-full bg-[#1A1C22] animate-pulse shrink-0"></div>
                  <div className="w-12 h-2.5 bg-[#1A1C22] rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Skeleton */}
        <div className="flex flex-col gap-6 w-full pt-6 px-4 sm:px-6 lg:px-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full bg-[#15161C] border border-[#232730] rounded-2xl animate-pulse flex flex-col p-4 gap-4">
              {/* Post Header */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#1A1C22]"></div>
                  <div className="flex flex-col gap-2">
                    <div className="w-24 h-3 rounded bg-[#1A1C22]"></div>
                    <div className="w-16 h-2 rounded bg-[#1A1C22]"></div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1A1C22]"></div>
              </div>
              
              {/* Post Content */}
              <div className="flex flex-col gap-2">
                <div className="w-full h-3 rounded bg-[#1A1C22]"></div>
                <div className="w-3/4 h-3 rounded bg-[#1A1C22]"></div>
              </div>

              {/* Post Media */}
              <div className="w-full h-[300px] rounded-xl bg-[#1A1C22] mt-2"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
