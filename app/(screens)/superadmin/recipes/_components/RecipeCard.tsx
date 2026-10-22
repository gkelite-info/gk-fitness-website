"use client";

import Link from "next/link";
import {
  Clock,
  Eye,
  PencilSimple,
  Copy,
  Trash,
  Fire,
  Heartbeat,
} from "@phosphor-icons/react";
import { GlobalMeal, MEAL_TYPES } from "@/lib/types/recipes";

interface RecipeCardProps {
  recipe: GlobalMeal;
  onPreview: (recipe: GlobalMeal) => void;
  onDuplicate: (recipe: GlobalMeal) => void;
  onDelete: (recipe: GlobalMeal) => void;
}

const DEFAULT_IMAGES: Record<string, string> = {
  breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
  lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  snack: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
  dinner: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
};

export function RecipeCard({
  recipe,
  onPreview,
  onDuplicate,
  onDelete,
}: RecipeCardProps) {
  const normalizedType = (recipe.mealType || "lunch").toLowerCase();
  const typeMeta = MEAL_TYPES.find((t) => t.value === normalizedType) || {
    label: recipe.mealType,
    color: "#D4FF32",
  };

  const calories = recipe.calories ?? recipe.baseCalories ?? 0;
  const protein = recipe.protein ?? recipe.baseProtein ?? 0;
  const carbs = recipe.carbs ?? recipe.baseCarbs ?? 0;
  const fat = recipe.fat ?? recipe.baseFat ?? 0;
  const fiber = recipe.fiber ?? Math.round(carbs * 0.15);

  const imgSrc =
    recipe.imageUrl?.trim() ||
    DEFAULT_IMAGES[normalizedType] ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#383E50] hover:shadow-xl group">
      <div>
        <div className="relative w-full h-44 bg-[#0A0B0E] overflow-hidden">
          <img
            src={imgSrc}
            alt={recipe.mealName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/10"
              style={{
                backgroundColor: `${typeMeta.color}25`,
                color: typeMeta.color,
              }}
            >
              {typeMeta.label}
            </span>
            {recipe.difficulty && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white border border-white/10 backdrop-blur-md">
                {recipe.difficulty}
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">
              <Clock size={12} className="text-[#D4FF32]" />
              <span>{recipe.prepTimeMinutes || 10}m prep</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md border border-white/10">
              <Fire size={12} weight="fill" className="text-[#FF453A]" />
              <span className="font-bold text-[#D4FF32]">{calories}</span>
              <span className="text-[10px] text-[#94A3B8]">kcal</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2.5">
          <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#D4FF32] transition-colors">
            {recipe.mealName}
          </h3>
          <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
            {recipe.description || "Fresh and balanced nutritional meal."}
          </p>

          <div className="grid grid-cols-4 gap-1.5 py-2 px-2.5 rounded-xl bg-[#181A20] border border-[#232733] text-center my-1">
            <div>
              <p className="text-[10px] font-semibold text-[#4ADE80]">P</p>
              <p className="text-xs font-bold text-white">{protein}g</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#FBBF24]">C</p>
              <p className="text-xs font-bold text-white">{carbs}g</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#A78BFA]">F</p>
              <p className="text-xs font-bold text-white">{fat}g</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-[#38BDF8]">Fiber</p>
              <p className="text-xs font-bold text-white">{fiber}g</p>
            </div>
          </div>

          {recipe.suitableFor && recipe.suitableFor.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Heartbeat size={13} weight="fill" className="text-[#4ADE80] shrink-0" />
              <span className="text-[10px] text-[#86EFAC] truncate">
                {recipe.suitableFor[0]}
                {recipe.suitableFor.length > 1 && ` +${recipe.suitableFor.length - 1} more`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[#1E212B] bg-[#0E1015]/60 flex items-center justify-between">
        <button
          onClick={() => onPreview(recipe)}
          className="text-xs font-medium text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Eye size={15} />
          <span>Preview</span>
        </button>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/superadmin/recipes/edit/${recipe.globalMealId}`}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1E222D] transition-colors"
            title="Edit Recipe"
          >
            <PencilSimple size={16} />
          </Link>
          <button
            onClick={() => onDuplicate(recipe)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#D4FF32] hover:bg-[#1E222D] transition-colors"
            title="Duplicate Recipe"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => onDelete(recipe)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#1E222D] transition-colors"
            title="Delete Recipe"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
