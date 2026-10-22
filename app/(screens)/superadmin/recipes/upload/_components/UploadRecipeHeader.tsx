"use client";

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

interface UploadRecipeHeaderProps {
  isEditing?: boolean;
}

export function UploadRecipeHeader({ isEditing }: UploadRecipeHeaderProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      <Link
        href="/superadmin/recipes"
        className="w-10 h-10 rounded-xl bg-[#12141A] border border-[#232631] text-[#94A3B8] hover:text-white hover:border-[#383E50] flex items-center justify-center transition-all shrink-0"
      >
        <ArrowLeft size={18} weight="bold" />
      </Link>
      <div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-1">
          <Link href="/superadmin/recipes" className="hover:text-white transition-colors">
            Recipes
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditing ? "Edit Recipe" : "Upload Recipe"}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {isEditing ? "Edit Recipe Setup" : "Upload & Configure Recipe"}
        </h1>
      </div>
    </div>
  );
}
