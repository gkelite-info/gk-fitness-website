"use client";

import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react";
import { DIET_TYPES, CLINICAL_CONDITIONS } from "@/lib/types/recipes";

interface RecipesFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedMealType: string;
  onMealTypeChange: (val: string) => void;
  selectedDiet: string;
  onDietChange: (val: string) => void;
  selectedCondition: string;
  onConditionChange: (val: string) => void;
  onClearFilters: () => void;
}

const MEAL_TABS = [
  { id: "all", label: "All Meals" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "snack", label: "Snack" },
  { id: "dinner", label: "Dinner" },
];

export function RecipesFilters({
  searchQuery,
  onSearchChange,
  selectedMealType,
  onMealTypeChange,
  selectedDiet,
  onDietChange,
  selectedCondition,
  onConditionChange,
  onClearFilters,
}: RecipesFiltersProps) {
  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedMealType !== "all" ||
    selectedDiet !== "all" ||
    selectedCondition !== "all";

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 flex flex-col gap-4 w-full">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search recipes by title or description..."
            className="w-full h-10 pl-10 pr-9 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="relative flex-1 sm:w-44">
            <select
              value={selectedDiet}
              onChange={(e) => onDietChange(e.target.value)}
              className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer appearance-none"
            >
              <option value="all">Diet: All</option>
              {DIET_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Funnel
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
            />
          </div>

          <div className="relative flex-1 sm:w-48">
            <select
              value={selectedCondition}
              onChange={(e) => onConditionChange(e.target.value)}
              className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer appearance-none truncate"
            >
              <option value="all">Clinical: All</option>
              {CLINICAL_CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Funnel
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="h-10 px-3 rounded-xl bg-[#1A1D26] hover:bg-[#232733] text-[#94A3B8] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <X size={14} weight="bold" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-themed pt-1 border-t border-[#1C202B]">
        {MEAL_TABS.map((tab) => {
          const isActive = selectedMealType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onMealTypeChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-[#D4FF32] text-black font-semibold shadow-[0_2px_8px_rgba(212,255,50,0.25)]"
                  : "bg-[#181A20] text-[#94A3B8] hover:text-white hover:bg-[#20232B] border border-[#262A36]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
