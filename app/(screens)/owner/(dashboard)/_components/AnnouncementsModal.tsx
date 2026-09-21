"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, CalendarBlank as Calendar, Plus, Megaphone } from "@phosphor-icons/react/dist/ssr";
import { useInfiniteGymAnnouncements, useSaveGymAnnouncement } from '@/lib/hooks/gymAnnouncements/useGymAnnouncements';
import { useUser } from '@/app/context/UserContext';

interface AnnouncementsModalProps {
  onClose: () => void;
  defaultCreate?: boolean;
}

export default function AnnouncementsModal({ onClose, defaultCreate = false }: AnnouncementsModalProps) {
  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || "";

  const [isCreating, setIsCreating] = useState(defaultCreate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const { mutateAsync: saveAnnouncement, isPending: isSaving } = useSaveGymAnnouncement();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteGymAnnouncements(userId, selectedDate, 10);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  const handleCreate = async () => {
    if (!message.trim()) return;
    try {
      const now = new Date();
      await saveAnnouncement({
        gymId,
        message,
        announcementDate: now.toISOString().split('T')[0],
        announcementTime: now.toLocaleTimeString(),
        createdBy: roleData?.[0]?.gymOwnerId || user?.id || "System",
      });
      setMessage("");
      setIsCreating(false);
    } catch (e) {
      console.error(e);
    }
  };

  const announcements = data ? data.pages.flatMap(page => page.data) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] w-full max-w-md max-h-[80vh] flex flex-col relative overflow-hidden shadow-2xl">
        <div className="flex flex-row items-center justify-between p-4 sm:p-5 border-b border-[#222530]">
          <h2 className="font-sans font-bold text-[18px] leading-[24px] tracking-[0.4px] text-white">
            {isCreating ? "Create Announcement" : "Announcements"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-[#222530] rounded-full transition-colors cursor-pointer">
            <X size={20} color="#94A3B8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 relative">
          {isCreating ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] text-[#94A3B8]">Message</label>
                <textarea
                  className="w-full bg-[#191B22] border border-[#222530] rounded-[12px] p-3 text-white focus:outline-none focus:border-[#D4FF32] min-h-[120px] resize-none"
                  placeholder="Type your announcement here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-3 mt-2">
                <button
                  className="flex-1 py-3 bg-[#222530] text-white font-semibold rounded-[12px] hover:bg-[#2a2e3b] transition-colors"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 bg-[#D4FF32] text-black font-semibold rounded-[12px] hover:bg-[#c5f020] transition-colors disabled:opacity-50 cursor-pointer"
                  onClick={handleCreate}
                  disabled={!message.trim() || isSaving}
                >
                  {isSaving ? "Saving..." : "Create"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-row items-center gap-3 w-full bg-[#191B22] border border-[#222530] rounded-[12px] p-2 px-3">
                <Calendar size={18} color="#D4FF32" />
                <input
                  type="date"
                  className="flex-1 bg-transparent text-white text-[14px] outline-none [color-scheme:dark] cursor-pointer"
                  value={selectedDate || ""}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={handleDateChange}
                />
                {selectedDate && (
                  <button onClick={clearDate} className="p-1 hover:bg-[#2a2e3b] rounded-full cursor-pointer">
                    <X size={14} color="#F43F5E" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3 pb-16">
                {!isLoading && announcements.length === 0 ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[rgba(212,255,50,0.1)] flex items-center justify-center mb-2">
                      <Megaphone size={24} color="#D4FF32" />
                    </div>
                    <span className="text-[#94A3B8] text-[14px]">No announcements for today</span>
                  </div>
                ) : (
                  announcements.map((ann, idx) => (
                    <div key={ann.gymAnnouncementId || idx} className="bg-[#191B22] border border-[#222530] rounded-[12px] p-4 flex flex-col gap-2">
                      <p className="text-white text-[14px] leading-relaxed break-words">{ann.message}</p>
                      <span className="text-[#94A3B8] text-[11px]">{ann.announcementDate} {ann.announcementTime}</span>
                    </div>
                  ))
                )}

                {isFetchingNextPage && <div className="text-center text-[#D4FF32] py-2 text-[12px]">Loading more...</div>}
                <div ref={observerTarget} className="h-4" />
              </div>

              <button
                onClick={() => setIsCreating(true)}
                className="absolute bottom-5 right-5 w-14 h-14 bg-[#D4FF32] rounded-full flex items-center justify-center shadow-[0px_4px_12px_rgba(212,255,50,0.3)] hover:scale-105 transition-transform cursor-pointer"
              >
                <Plus size={24} color="black" weight="bold" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
