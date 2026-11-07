"use client";

import {
  EQUIPMENT_OPTIONS,
  MUSCLE_OPTIONS,
} from "@/lib/types/workouts";
import { Check, Plus, Minus } from "@phosphor-icons/react";

interface WorkoutCustomTargetSectionProps {
  equipment: string[];
  onToggleEquipment: (eqId: string) => void;
  primaryMuscle: string;
  onPrimaryMuscleChange: (val: string) => void;
  secondaryMuscles: string[];
  onToggleSecondaryMuscle: (muscle: string) => void;
  defaultSets: number;
  onDefaultSetsChange: (val: number) => void;
  defaultReps: string;
  onDefaultRepsChange: (val: string) => void;
}

const REP_PRESETS = ["8-10", "10-12", "12-15", "15-20", "To Failure", "30-45 sec"];

export function WorkoutCustomTargetSection({
  equipment,
  onToggleEquipment,
  primaryMuscle,
  onPrimaryMuscleChange,
  secondaryMuscles,
  onToggleSecondaryMuscle,
  defaultSets,
  onDefaultSetsChange,
  defaultReps,
  onDefaultRepsChange,
}: WorkoutCustomTargetSectionProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white">
          2. Custom Workout Builder Targets & Equipment
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          These fields power the dynamic custom workout builder and equipment filter in the mobile app.
        </p>
      </div>

      {/* Equipment Required (Multi-Select) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Equipment Required <span className="text-[#D4FF32]">*</span>
          </label>
          <span className="text-[11px] text-[#94A3B8]">
            {equipment.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {EQUIPMENT_OPTIONS.map((eq) => {
            const isSelected = equipment.includes(eq.id);
            return (
              <button
                key={eq.id}
                type="button"
                onClick={() => onToggleEquipment(eq.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                  isSelected
                    ? "bg-[#D4FF32]/10 border-[#D4FF32] text-[#D4FF32] shadow-[0_0_12px_rgba(212,255,50,0.15)]"
                    : "bg-[#181A20] border-[#262A36] text-[#CBD5E1] hover:border-[#383E50]"
                }`}
              >
                <span className="truncate">{eq.label}</span>
                {isSelected && (
                  <Check size={14} weight="bold" className="text-[#D4FF32] shrink-0 ml-1.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary & Secondary Muscle targets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#1F222C]">
        {/* Primary Muscle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Primary Muscle Target <span className="text-[#D4FF32]">*</span>
          </label>
          <select
            value={primaryMuscle}
            onChange={(e) => onPrimaryMuscleChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            {MUSCLE_OPTIONS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} ({m.id})
              </option>
            ))}
          </select>
        </div>

        {/* Secondary Muscles */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Secondary Muscles (Synergists)
          </label>
          <div className="flex flex-wrap gap-1.5 p-2 bg-[#181A20] border border-[#262A36] rounded-xl min-h-[44px] max-h-36 overflow-y-auto">
            {MUSCLE_OPTIONS.filter((m) => m.id !== primaryMuscle).map((m) => {
              const active = secondaryMuscles.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onToggleSecondaryMuscle(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                    active
                      ? "bg-[#C4EF00]/20 border-[#C4EF00] text-[#D4FF32]"
                      : "bg-[#13151B] border-[#222631] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sets and Reps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1F222C]">
        {/* Default Sets */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Default Sets
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDefaultSetsChange(Math.max(1, defaultSets - 1))}
              className="w-10 h-10 rounded-xl bg-[#181A20] border border-[#262A36] text-white flex items-center justify-center hover:bg-[#20232B] transition-colors shrink-0"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              min={1}
              max={10}
              value={defaultSets}
              onChange={(e) => onDefaultSetsChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center bg-[#181A20] border border-[#262A36] rounded-xl py-2 text-sm font-bold text-white focus:outline-none focus:border-[#D4FF32]"
            />
            <button
              type="button"
              onClick={() => onDefaultSetsChange(Math.min(10, defaultSets + 1))}
              className="w-10 h-10 rounded-xl bg-[#181A20] border border-[#262A36] text-white flex items-center justify-center hover:bg-[#20232B] transition-colors shrink-0"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Default Reps */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Default Reps / Target
          </label>
          <input
            type="text"
            value={defaultReps}
            onChange={(e) => onDefaultRepsChange(e.target.value)}
            placeholder="e.g. 10-12"
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-4 py-2 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32]"
          />
          <div className="flex flex-wrap gap-1 mt-1">
            {REP_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onDefaultRepsChange(preset)}
                className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                  defaultReps === preset
                    ? "bg-[#D4FF32]/20 border-[#D4FF32] text-[#D4FF32]"
                    : "bg-[#181A20] border-[#262A36] text-[#94A3B8] hover:text-white"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
