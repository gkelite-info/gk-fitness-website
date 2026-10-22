"use client";

import { Leaf, ShieldCheck, WarningOctagon, Globe } from "@phosphor-icons/react";
import {
  DIET_TYPES,
  ALLERGENS,
  CUISINES,
  CLINICAL_CONDITIONS,
} from "@/lib/types/recipes";

interface RecipeDietarySectionProps {
  dietTypes: string[];
  onDietTypesChange: (val: string[]) => void;
  allergens: string[];
  onAllergensChange: (val: string[]) => void;
  cuisines: string[];
  onCuisinesChange: (val: string[]) => void;
  suitableFor: string[];
  onSuitableForChange: (val: string[]) => void;
  contraindications: string[];
  onContraindicationsChange: (val: string[]) => void;
}

export function RecipeDietarySection({
  dietTypes,
  onDietTypesChange,
  allergens,
  onAllergensChange,
  cuisines,
  onCuisinesChange,
  suitableFor,
  onSuitableForChange,
  contraindications,
  onContraindicationsChange,
}: RecipeDietarySectionProps) {
  const toggleItem = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-6">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Leaf size={18} className="text-[#4ADE80]" />
          <span>Dietary, Allergens & Clinical Medical Tags</span>
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Powers precision clinical filtering and algorithmic meal plan generation in customer role.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-[#CBD5E1] flex items-center justify-between">
          <span>Dietary Classification (Select all that apply)</span>
          <span className="text-[10px] text-[#94A3B8] font-normal">{dietTypes.length} selected</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DIET_TYPES.map((d) => {
            const isSelected = dietTypes.includes(d);
            return (
              <button
                type="button"
                key={d}
                onClick={() => toggleItem(dietTypes, d, onDietTypesChange)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#D4FF32] text-black font-semibold shadow-[0_2px_8px_rgba(212,255,50,0.25)]"
                    : "bg-[#181A20] text-[#94A3B8] hover:text-white border border-[#262A36]"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-[#CBD5E1] flex items-center justify-between">
          <span>Allergens Contained (Customer safety exclusion)</span>
          <span className="text-[10px] text-[#94A3B8] font-normal">{allergens.length} selected</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => {
            const isSelected = allergens.includes(a);
            return (
              <button
                type="button"
                key={a}
                onClick={() => toggleItem(allergens, a, onAllergensChange)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#EF4444] text-white font-semibold shadow-[0_2px_8px_rgba(239,68,68,0.25)]"
                    : "bg-[#181A20] text-[#94A3B8] hover:text-white border border-[#262A36]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-[#CBD5E1] flex items-center justify-between">
          <span>Cuisine Origin</span>
          <span className="text-[10px] text-[#94A3B8] font-normal">{cuisines.length} selected</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((c) => {
            const isSelected = cuisines.includes(c);
            return (
              <button
                type="button"
                key={c}
                onClick={() => toggleItem(cuisines, c, onCuisinesChange)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#38BDF8] text-black font-semibold shadow-[0_2px_8px_rgba(56,189,248,0.25)]"
                    : "bg-[#181A20] text-[#94A3B8] hover:text-white border border-[#262A36]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-[#1C202B] flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-[#86EFAC] flex items-center gap-1.5">
          <ShieldCheck size={16} weight="fill" className="text-[#4ADE80]" />
          <span>Clinically Suitable / Recommended For</span>
          <span className="text-[10px] text-[#94A3B8] font-normal ml-auto">
            {suitableFor.length} conditions prioritized
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CLINICAL_CONDITIONS.map((cond) => {
            const isSelected = suitableFor.includes(cond);
            return (
              <button
                type="button"
                key={cond}
                onClick={() => toggleItem(suitableFor, cond, onSuitableForChange)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  isSelected
                    ? "bg-[#16291C] border border-[#22543D] text-[#86EFAC] font-semibold"
                    : "bg-[#181A20] border border-[#262A36] text-[#64748B] hover:text-white"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2 border-t border-[#1C202B] flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-[#FCA5A5] flex items-center gap-1.5">
          <WarningOctagon size={16} weight="fill" className="text-[#EF4444]" />
          <span>Contraindications (Strict Exclusion Warnings)</span>
          <span className="text-[10px] text-[#94A3B8] font-normal ml-auto">
            {contraindications.length} conditions excluded
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CLINICAL_CONDITIONS.map((cond) => {
            const isSelected = contraindications.includes(cond);
            return (
              <button
                type="button"
                key={cond}
                onClick={() => toggleItem(contraindications, cond, onContraindicationsChange)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  isSelected
                    ? "bg-[#361717] border border-[#7F1D1D] text-[#FCA5A5] font-semibold"
                    : "bg-[#181A20] border border-[#262A36] text-[#64748B] hover:text-white"
                }`}
              >
                {isSelected ? "✕ " : "- "}
                {cond}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
