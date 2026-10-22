"use client";

import { Plus, Trash, CookingPot, CaretUp, CaretDown } from "@phosphor-icons/react";
import { RecipeInstructionStep } from "@/lib/types/recipes";

interface RecipeInstructionsSectionProps {
  steps: RecipeInstructionStep[];
  onStepsChange: (steps: RecipeInstructionStep[]) => void;
}

export function RecipeInstructionsSection({
  steps,
  onStepsChange,
}: RecipeInstructionsSectionProps) {
  const handleAddStep = () => {
    onStepsChange([
      ...steps,
      {
        step: steps.length + 1,
        text: "",
      },
    ]);
  };

  const handleUpdate = (index: number, text: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], text };
    onStepsChange(updated);
  };

  const handleRemove = (index: number) => {
    const filtered = steps.filter((_, i) => i !== index);
    const reindexed = filtered.map((st, i) => ({ ...st, step: i + 1 }));
    onStepsChange(reindexed);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    ) {
      return;
    }
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    const reindexed = updated.map((st, i) => ({ ...st, step: i + 1 }));
    onStepsChange(reindexed);
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
            <CookingPot size={18} className="text-[#38BDF8]" />
            <span>Step-by-Step Cooking Instructions</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Clear cooking guide displayed in customer recipe detail view.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddStep}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#262A36] text-[#38BDF8] text-xs font-semibold transition-colors"
        >
          <Plus size={14} weight="bold" />
          <span>Add Step</span>
        </button>
      </div>

      {steps.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-[#232631] text-center flex flex-col items-center justify-center">
          <p className="text-xs text-[#94A3B8]">
            No cooking steps added yet. Add step instructions to guide customers.
          </p>
          <button
            type="button"
            onClick={handleAddStep}
            className="mt-3 text-xs text-[#38BDF8] hover:underline font-medium"
          >
            + Add First Step
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-[#181A20] border border-[#262A36] rounded-xl"
            >
              <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                <span className="w-6 h-6 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </span>
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-0.5 text-[#64748B] hover:text-white disabled:opacity-30"
                  >
                    <CaretUp size={12} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === steps.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-0.5 text-[#64748B] hover:text-white disabled:opacity-30"
                  >
                    <CaretDown size={12} />
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <textarea
                  rows={2}
                  placeholder={`Step ${idx + 1}: describe preparation, heat level, timing...`}
                  value={st.text}
                  onChange={(e) => handleUpdate(idx, e.target.value)}
                  className="w-full p-2.5 bg-[#12141A] border border-[#232631] rounded-lg text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] resize-none"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="w-8 h-8 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#202430] flex items-center justify-center transition-colors shrink-0 mt-1"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
