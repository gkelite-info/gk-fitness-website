"use client";

import { useBirthdayAnnouncements } from "@/lib/hooks/gymAnnouncements/useBirthdayAnnouncements";

interface BirthdayAnnouncementBannerProps {
  gymId?: string | null;
}

export default function BirthdayAnnouncementBanner({ gymId }: BirthdayAnnouncementBannerProps) {
  const { data, isLoading } = useBirthdayAnnouncements(gymId);

  if (isLoading || !data?.announcementText) {
    return null;
  }

  return (
    <div className="w-full bg-[#191B22] border border-[#222530] rounded-[12px] px-4 py-3 flex items-center gap-3">
      <p className="font-sans font-medium text-xs sm:text-sm text-white break-words">
        {data.announcementText}
      </p>
    </div>
  );
}
