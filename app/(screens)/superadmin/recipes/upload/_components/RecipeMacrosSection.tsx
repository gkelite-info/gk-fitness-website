"use client";

import { Fire, Scales, Clock } from "@phosphor-icons/react";

interface RecipeMacrosSectionProps {
  calories: number;
  onCaloriesChange: (val: number) => void;
  protein: number;
  onProteinChange: (val: number) => void;
  carbs: number;
  onCarbsChange: (val: number) => void;
  fat: number;
  onFatChange: (val: number) => void;
  fiber: number;
  onFiberChange: (val: number) => void;
  prepTimeMinutes: number;
  onPrepTimeChange: (val: number) => void;
  cookTimeMinutes: number;
  onCookTimeChange: (val: number) => void;
  servings: number;
  onServingsChange: (val: number) => void;
  servingUnit: string;
  onServingUnitChange: (val: string) => void;
  sodiumMg: number;
  onSodiumChange: (val: number) => void;
  sugarG: number;
  onSugarChange: (val: number) => void;
  isScalable: boolean;
  onIsScalableChange: (val: boolean) => void;
  minScale: number;
  onMinScaleChange: (val: number) => void;
  maxScale: number;
  onMaxScaleChange: (val: number) => void;
}

export function RecipeMacrosSection(props: RecipeMacrosSectionProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Fire size={18} className="text-[#FF453A]" />
          <span>Macronutrients & Timing</span>
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Calculates nutritional targets and algorithmic scaling for customers.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Calories (kcal) *</label>
          <input
            type="number"
            min={0}
            value={props.calories || ""}
            onChange={(e) => props.onCaloriesChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#4ADE80]">Protein (g) *</label>
          <input
            type="number"
            min={0}
            value={props.protein || ""}
            onChange={(e) => props.onProteinChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#FBBF24]">Carbs (g) *</label>
          <input
            type="number"
            min={0}
            value={props.carbs || ""}
            onChange={(e) => props.onCarbsChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#A78BFA]">Fat (g) *</label>
          <input
            type="number"
            min={0}
            value={props.fat || ""}
            onChange={(e) => props.onFatChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#38BDF8]">Fiber (g)</label>
          <input
            type="number"
            min={0}
            value={props.fiber || ""}
            onChange={(e) => props.onFiberChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#1C202B]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Prep Time (mins)</label>
          <input
            type="number"
            min={1}
            value={props.prepTimeMinutes || ""}
            onChange={(e) => props.onPrepTimeChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Cook Time (mins)</label>
          <input
            type="number"
            min={0}
            value={props.cookTimeMinutes || ""}
            onChange={(e) => props.onCookTimeChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Servings</label>
          <input
            type="number"
            min={1}
            value={props.servings || ""}
            onChange={(e) => props.onServingsChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Serving Unit Description</label>
          <input
            type="text"
            placeholder="e.g. 1 bowl (350g)"
            value={props.servingUnit}
            onChange={(e) => props.onServingUnitChange(e.target.value)}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#1C202B]">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Sodium (mg)</label>
          <input
            type="number"
            min={0}
            value={props.sodiumMg || ""}
            onChange={(e) => props.onSodiumChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Sugar (g)</label>
          <input
            type="number"
            min={0}
            value={props.sugarG || ""}
            onChange={(e) => props.onSugarChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Min Scaling Factor</label>
          <input
            type="number"
            step="0.1"
            min={0.1}
            value={props.minScale || 0.5}
            onChange={(e) => props.onMinScaleChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#CBD5E1]">Max Scaling Factor</label>
          <input
            type="number"
            step="0.1"
            min={1}
            value={props.maxScale || 2.5}
            onChange={(e) => props.onMaxScaleChange(Number(e.target.value))}
            className="w-full h-10 px-3 bg-[#181A20] border border-[#262A36] rounded-xl text-sm text-white focus:outline-none focus:border-[#D4FF32]"
          />
        </div>
      </div>
    </div>
  );
}
