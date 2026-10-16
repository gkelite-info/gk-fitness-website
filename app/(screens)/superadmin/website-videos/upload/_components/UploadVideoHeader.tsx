"use client";

import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";

interface UploadVideoHeaderProps {
  isReplacing?: boolean;
}

export function UploadVideoHeader({ isReplacing }: UploadVideoHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Link
        href="/superadmin/website-videos"
        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors w-fit"
      >
        <CaretLeft size={14} weight="bold" />
        <span>Back to Website Videos</span>
      </Link>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-white m-0">
          {isReplacing ? "Replace Video" : "Upload Video"}
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] m-0 font-normal">
          Upload a website video that will be displayed on the GK-Gym Life website.
        </p>
      </div>
    </div>
  );
}
