"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function GymDetailOverviewHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3.5 w-full">
      <button
        type="button"
        onClick={() => router.push("/superadmin/gyms")}
        aria-label="Go back to gyms"
        className="w-10 h-10 rounded-xl bg-[#13151D] border border-[#222634] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer shrink-0"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Gym Details
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View and manage gym information.
        </p>
      </div>
    </div>
  );
}
