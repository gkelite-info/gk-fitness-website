"use client";

import Avatar from "@/app/(screens)/components/reusable/Avatar";

interface SuperAdminProfileHeroCardProps {
  name?: string;
  role?: string;
  joinedOn?: string;
  avatarUrl?: string | null;
  gender?: "male" | "female" | "other" | null;
}

export default function SuperAdminProfileHeroCard({
  name = "Amit Verma",
  role = "SUPER ADMIN",
  joinedOn = "20 May 2026",
  avatarUrl = null,
  gender = "male",
}: SuperAdminProfileHeroCardProps) {
  return (
    <div className="w-full bg-[#101217] border border-[#1E222D] rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 text-center sm:text-left min-w-0">
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1A1D24] border-2 border-[#2A303C] p-1 flex items-center justify-center overflow-hidden">
            <Avatar
              src={avatarUrl}
              gender={gender}
              className="w-full h-full rounded-full"
            />
          </div>
          <span
            className="absolute bottom-1 right-1 w-4 h-4 bg-[#D4FF32] rounded-full border-2 border-[#101217] shadow-[0_0_8px_#D4FF32]"
            aria-label="Online status"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight leading-tight break-words">
            {name}
          </h2>
          <span className="inline-flex items-center mt-2 px-3 py-0.5 rounded-full text-xs font-semibold text-[#D4FF32] border border-[#D4FF32]/40 bg-[rgba(212,255,50,0.08)] whitespace-nowrap">
            Super Admin
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[#1C202B] bg-[#0C0D10] border border-[#1C202B] rounded-xl p-3 sm:px-5 sm:py-4 w-full md:w-auto shrink-0">
        <div className="flex flex-col pr-3 sm:pr-6 text-center sm:text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#64748B] whitespace-nowrap">
            ACCOUNT ROLE
          </span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight mt-1 uppercase whitespace-nowrap">
            {role}
          </span>
        </div>

        <div className="flex flex-col pl-3 sm:pl-6 text-center sm:text-left">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#64748B] whitespace-nowrap">
            JOINED ON
          </span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight mt-1 whitespace-nowrap">
            {joinedOn}
          </span>
        </div>
      </div>
    </div>
  );
}
