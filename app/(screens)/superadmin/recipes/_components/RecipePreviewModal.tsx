"use client";

import {
  X,
  Clock,
  Fire,
  CheckCircle,
  WarningCircle,
  CookingPot,
  Star,
} from "@phosphor-icons/react";
import { GlobalMeal, MEAL_TYPES } from "@/lib/types/recipes";

interface RecipePreviewModalProps {
  recipe: GlobalMeal | null;
  onClose: () => void;
}

export function RecipePreviewModal({ recipe, onClose }: RecipePreviewModalProps) {
  if (!recipe) return null;

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

  const steps = Array.isArray(recipe.recipeInstructions)
    ? recipe.recipeInstructions
    : [];

  const ingredients = recipe.ingredients || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#12141A] border border-[#232631] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="relative w-full h-56 bg-[#0A0B0E] shrink-0">
          <img
            src={recipe.imageUrl}
            alt={recipe.mealName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-black/40 to-black/60" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-all z-10"
          >
            <X size={18} weight="bold" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase border border-white/10"
                  style={{
                    backgroundColor: `${typeMeta.color}30`,
                    color: typeMeta.color,
                  }}
                >
                  {typeMeta.label}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#FBBF24] font-semibold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  <Star size={12} weight="fill" />
                  <span>4.8 (320)</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {recipe.mealName}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-black/70 border border-white/10 px-3 py-1.5 rounded-xl">
              <Fire size={18} weight="fill" className="text-[#FF453A]" />
              <div className="text-right">
                <p className="text-sm font-bold text-white leading-tight">{calories}</p>
                <p className="text-[9px] text-[#94A3B8]">kcal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-themed flex flex-col gap-6">
          <div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              {recipe.description || "Nutrient-balanced meal tailored for peak health and fitness goals."}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#D4FF32]" />
                <span>Prep: {recipe.prepTimeMinutes || 10} mins</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CookingPot size={14} className="text-[#38BDF8]" />
                <span>Cook: {recipe.cookTimeMinutes || 15} mins</span>
              </span>
              <span>•</span>
              <span>Servings: {recipe.servings || 1} ({recipe.servingUnit || "1 serving"})</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 p-3 bg-[#181A20] border border-[#232733] rounded-2xl text-center">
            <div>
              <p className="text-base font-bold text-white">{calories}</p>
              <p className="text-[10px] text-[#94A3B8] uppercase">Kcal</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#4ADE80]">{protein}g</p>
              <p className="text-[10px] text-[#94A3B8] uppercase">Protein</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#FBBF24]">{carbs}g</p>
              <p className="text-[10px] text-[#94A3B8] uppercase">Carbs</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#A78BFA]">{fat}g</p>
              <p className="text-[10px] text-[#94A3B8] uppercase">Fat</p>
            </div>
            <div>
              <p className="text-base font-bold text-[#38BDF8]">{fiber}g</p>
              <p className="text-[10px] text-[#94A3B8] uppercase">Fiber</p>
            </div>
          </div>

          {recipe.suitableFor && recipe.suitableFor.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                Clinically Suitable For
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {recipe.suitableFor.map((cond, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#16291C] border border-[#22543D] text-[#86EFAC]"
                  >
                    <CheckCircle size={13} weight="fill" />
                    <span>{cond}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {recipe.contraindications && recipe.contraindications.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EF4444] mb-2.5">
                Contraindications (Strict Exclusions)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {recipe.contraindications.map((cond, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#361717] border border-[#7F1D1D] text-[#FCA5A5]"
                  >
                    <WarningCircle size={13} weight="fill" />
                    <span>{cond}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                Ingredients ({ingredients.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-[#181A20] border border-[#232733] rounded-xl text-xs"
                  >
                    <span className="text-white font-medium">{ing.name}</span>
                    <span className="text-[#D4FF32] font-semibold">
                      {ing.quantity} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {steps.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2.5">
                Preparation Steps
              </h4>
              <div className="flex flex-col gap-2.5">
                {steps.map((st: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#232733] rounded-xl text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#D4FF32]/10 text-[#D4FF32] border border-[#D4FF32]/20 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {st.step || idx + 1}
                    </span>
                    <p className="text-[#CBD5E1] leading-relaxed">{st.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
