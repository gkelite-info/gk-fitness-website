"use client";

import { Info, Sparkle } from "@phosphor-icons/react";
import { MEAL_TYPES, DIFFICULTY_LEVELS, MealType, DifficultyLevel } from "@/lib/types/recipes";

interface RecipeBasicInfoSectionProps {
  mealName: string;
  onMealNameChange: (val: string) => void;
  mealType: string;
  onMealTypeChange: (val: string) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  difficulty: string;
  onDifficultyChange: (val: string) => void;
  isActive: boolean;
  onIsActiveChange: (val: boolean) => void;
  isGlobal: boolean;
  onIsGlobalChange: (val: boolean) => void;
}

export function RecipeBasicInfoSection({
  mealName,
  onMealNameChange,
  mealType,
  onMealTypeChange,
  description,
  onDescriptionChange,
  difficulty,
  onDifficultyChange,
  isActive,
  onIsActiveChange,
  isGlobal,
  onIsGlobalChange,
}: RecipeBasicInfoSectionProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Info size={18} className="text-[#D4FF32]" />
          <span>General Information</span>
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Define recipe title, meal category slot, and description.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Recipe Name <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Yellow Dal Tadka with Steamed Brown Rice"
            value={mealName}
            onChange={(e) => onMealNameChange(e.target.value)}
            className="w-full h-11 px-3.5 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Meal Category Slot <span className="text-[#EF4444]">*</span>
          </label>
          <select
            value={mealType}
            onChange={(e) => onMealTypeChange(e.target.value)}
            className="w-full h-11 px-3.5 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            {MEAL_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Cooking Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full h-11 px-3.5 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            {DIFFICULTY_LEVELS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Description & Culinary Summary
          </label>
          <textarea
            rows={3}
            placeholder="A short, appetizing description outlining ingredients and health benefits..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full p-3.5 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#1C202B]">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => onIsActiveChange(e.target.checked)}
            className="w-4 h-4 rounded accent-[#D4FF32] cursor-pointer"
          />
          <span className="text-xs font-medium text-white">
            Active in Customer Catalog
          </span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isGlobal}
            onChange={(e) => onIsGlobalChange(e.target.checked)}
            className="w-4 h-4 rounded accent-[#D4FF32] cursor-pointer"
          />
          <span className="text-xs font-medium text-white">
            Available across all Gyms (Global)
          </span>
        </label>
      </div>
    </div>
  );
}
