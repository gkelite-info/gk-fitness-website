"use client";

import Link from "next/link";
import { Plus, CookingPot } from "@phosphor-icons/react";

interface RecipesHeaderProps {
  totalCount: number;
}

export function RecipesHeader({ totalCount }: RecipesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center shrink-0">
          <CookingPot size={26} weight="fill" className="text-[#D4FF32]" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recipes & Meal Setup
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#181A20] border border-[#262A36] text-[#D4FF32]">
              {totalCount} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
            Curate verified recipes, macros, clinical medical tags, and high-res food photos.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/superadmin/recipes/upload"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF32] text-black font-semibold text-sm hover:bg-[#c2ed25] transition-all shadow-[0_4px_16px_rgba(212,255,50,0.25)] active:scale-[0.98]"
        >
          <Plus size={18} weight="bold" />
          <span>Upload Recipe</span>
        </Link>
      </div>
    </div>
  );
}
