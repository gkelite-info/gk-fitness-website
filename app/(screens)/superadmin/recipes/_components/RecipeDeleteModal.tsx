"use client";

import { Trash, Warning } from "@phosphor-icons/react";
import { GlobalMeal } from "@/lib/types/recipes";

interface RecipeDeleteModalProps {
  recipe: GlobalMeal | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RecipeDeleteModal({
  recipe,
  isDeleting,
  onClose,
  onConfirm,
}: RecipeDeleteModalProps) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-5">
        <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center text-[#EF4444]">
          <Warning size={24} weight="fill" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Delete Recipe
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
            Are you sure you want to delete <span className="text-white font-semibold">&quot;{recipe.mealName}&quot;</span>? This will remove the recipe from customer algorithmic meal plans and alternative swap lists.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-[#181A20] hover:bg-[#20232B] text-white text-xs sm:text-sm font-semibold transition-colors border border-[#262A36]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(239,68,68,0.25)] disabled:opacity-50"
          >
            <Trash size={16} weight="bold" />
            <span>{isDeleting ? "Deleting..." : "Delete Recipe"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
