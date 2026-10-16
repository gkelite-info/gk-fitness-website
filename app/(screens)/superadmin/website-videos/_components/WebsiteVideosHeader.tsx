"use client";

import { useRouter } from "next/navigation";
import { Plus } from "@phosphor-icons/react";

export function WebsiteVideosHeader() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-white m-0">
          Website Videos
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] m-0 font-normal">
          Manage videos that are displayed on the GK-Gym website.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/superadmin/website-videos/upload")}
        className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF32] text-black font-semibold text-sm hover:bg-[#CEFE00] active:scale-95 transition-all shadow-[0_0_20px_rgba(212,255,50,0.35)] shrink-0 self-start sm:self-auto"
      >
        <Plus size={18} weight="bold" />
        <span>Upload Video</span>
      </button>
    </div>
  );
}
