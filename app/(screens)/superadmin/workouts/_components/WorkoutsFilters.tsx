"use client";

import { MagnifyingGlass, X, Funnel } from "@phosphor-icons/react";
import {
  WORKOUT_CATEGORIES,
  EQUIPMENT_OPTIONS,
  DIFFICULTY_OPTIONS,
  GENDER_ROLES,
} from "@/lib/types/workouts";

interface WorkoutsFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedRole: string;
  onRoleChange: (val: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (val: string) => void;
  selectedEquipment: string;
  onEquipmentChange: (val: string) => void;
  onClearFilters: () => void;
}

export function WorkoutsFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRole,
  onRoleChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedEquipment,
  onEquipmentChange,
  onClearFilters,
}: WorkoutsFiltersProps) {
  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== "all" ||
    selectedRole !== "all" ||
    selectedDifficulty !== "all" ||
    selectedEquipment !== "all";

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
            placeholder="Search exercises by name (e.g. Incline Bench Press, Lateral Raise)..."
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-colors"
          >
            <X size={14} weight="bold" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#1F222C]">
        {/* Category / Muscle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1">
            <Funnel size={12} />
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            {WORKOUT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Gender / Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            Target Gender
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            {GENDER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="all">All Levels</option>
            {DIFFICULTY_OPTIONS.map((diff) => (
              <option key={diff.id} value={diff.id}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            Equipment
          </label>
          <select
            value={selectedEquipment}
            onChange={(e) => onEquipmentChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            <option value="all">All Equipment</option>
            {EQUIPMENT_OPTIONS.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
