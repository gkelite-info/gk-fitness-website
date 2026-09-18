"use client";

import { useState } from "react";
import { Megaphone, CaretRight } from "@phosphor-icons/react/dist/ssr";
import AnnouncementsModal from "./AnnouncementsModal";

export default function AnnouncementsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultCreate, setDefaultCreate] = useState(false);

  return (
    <>
      <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-5 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
            Announcements
          </h3>
          <button 
            onClick={() => {
              setDefaultCreate(false);
              setIsModalOpen(true);
            }} 
            className="flex flex-row items-center gap-1 group cursor-pointer"
          >
            <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
              View All
            </span>
            <CaretRight size={12} color="#D4FF32" weight="bold" />
          </button>
        </div>

        <div className="w-full min-h-[78px] bg-[#191B22] border border-[#222530] rounded-[12px] p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
          <div className="flex flex-row items-center gap-[14px]">
            <div className="w-[44px] h-[44px] flex justify-center items-center rounded-[12px] bg-[rgba(212,255,50,0.1)] border border-[rgba(212,255,50,0.3)] flex-shrink-0">
              <Megaphone size={20} color="#D4FF32" weight="bold" />
            </div>
            <span className="font-sans font-normal text-[12px] leading-4 text-[#94A3B8] break-words">
              Share updates...
            </span>
          </div>
          <button 
            onClick={() => {
              setDefaultCreate(true);
              setIsModalOpen(true);
            }}
            className="h-[36px] px-4 bg-[#D4FF32] rounded-[12px] flex items-center justify-center cursor-pointer hover:bg-[#c5f020] transition-colors shadow-[0px_4px_6px_-1px_rgba(212,255,50,0.2),0px_2px_4px_-2px_rgba(212,255,50,0.2)] flex-shrink-0"
          >
            <span className="font-sans font-bold text-[12px] leading-4 text-black text-center">
              Create Announcement
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AnnouncementsModal 
          defaultCreate={defaultCreate} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
