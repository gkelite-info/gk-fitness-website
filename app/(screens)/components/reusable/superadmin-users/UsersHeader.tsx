"use client";

import { CaretLeft, MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface UsersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function UsersHeader({
  searchQuery,
  onSearchChange,
}: UsersHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => router.push("/superadmin")}
          aria-label="Go back"
          className="w-10 h-10 rounded-xl bg-[#13151D] border border-[#222634] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={20} weight="bold" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Users
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Manage all users across the platform
          </p>
        </div>
      </div>

      <div className="relative w-full md:w-[320px] lg:w-[360px] shrink-0">
        <MagnifyingGlass
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#13151D] border border-[#222634] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] focus:ring-1 focus:ring-[#D4FF32] transition-colors"
        />
      </div>
    </div>
  );
}
