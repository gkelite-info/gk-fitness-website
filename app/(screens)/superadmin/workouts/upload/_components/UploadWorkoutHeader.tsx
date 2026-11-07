"use client";

import Link from "next/link";
import { ArrowLeft, Barbell } from "@phosphor-icons/react";

interface UploadWorkoutHeaderProps {
  isEditing?: boolean;
}

export function UploadWorkoutHeader({ isEditing }: UploadWorkoutHeaderProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Link
        href="/superadmin/workouts"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#D4FF32] transition-colors w-fit"
      >
        <ArrowLeft size={16} weight="bold" />
        <span>Back to Workouts Library</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center shrink-0">
          <Barbell size={26} weight="fill" className="text-[#D4FF32]" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isEditing ? "Edit Exercise Demonstration" : "Upload Exercise Demonstration"}
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
            Configure custom workout builder metadata, equipment tags, and video/GIF demonstrations.
          </p>
        </div>
      </div>
    </div>
  );
}
