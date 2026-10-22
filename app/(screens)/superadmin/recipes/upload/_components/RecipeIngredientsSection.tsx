"use client";

import { Plus, Trash, ListPlus } from "@phosphor-icons/react";
import { RecipeIngredient, COMMON_UNITS } from "@/lib/types/recipes";

interface RecipeIngredientsSectionProps {
  ingredients: RecipeIngredient[];
  onIngredientsChange: (ingredients: RecipeIngredient[]) => void;
}

export function RecipeIngredientsSection({
  ingredients,
  onIngredientsChange,
}: RecipeIngredientsSectionProps) {
  const handleAddIngredient = () => {
    onIngredientsChange([
      ...ingredients,
      {
        name: "",
        quantity: 100,
        unit: "g",
      },
    ]);
  };

  const handleUpdate = (index: number, field: keyof RecipeIngredient, value: any) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    onIngredientsChange(updated);
  };

  const handleRemove = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
            <ListPlus size={18} className="text-[#D4FF32]" />
            <span>Recipe Ingredients</span>
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Individual ingredients scaled automatically based on customer target calories.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddIngredient}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1A1D26] hover:bg-[#232733] border border-[#262A36] text-[#D4FF32] text-xs font-semibold transition-colors"
        >
          <Plus size={14} weight="bold" />
          <span>Add Item</span>
        </button>
      </div>

      {ingredients.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-[#232631] text-center flex flex-col items-center justify-center">
          <p className="text-xs text-[#94A3B8]">
            No ingredients added yet. Add ingredients to show in the customer recipe drawer.
          </p>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-3 text-xs text-[#D4FF32] hover:underline font-medium"
          >
            + Add First Ingredient
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-2.5 bg-[#181A20] border border-[#262A36] rounded-xl"
            >
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ingredient name (e.g. Soya Chunks, Oats, Spinach)"
                  value={ing.name}
                  onChange={(e) => handleUpdate(idx, "name", e.target.value)}
                  className="w-full h-9 px-3 bg-[#12141A] border border-[#232631] rounded-lg text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32]"
                />
              </div>

              <div className="w-24">
                <input
                  type="number"
                  min={0.1}
                  step="any"
                  placeholder="Qty"
                  value={ing.quantity || ""}
                  onChange={(e) => handleUpdate(idx, "quantity", Number(e.target.value))}
                  className="w-full h-9 px-2.5 bg-[#12141A] border border-[#232631] rounded-lg text-xs text-white focus:outline-none focus:border-[#D4FF32]"
                />
              </div>

              <div className="w-24">
                <select
                  value={ing.unit}
                  onChange={(e) => handleUpdate(idx, "unit", e.target.value)}
                  className="w-full h-9 px-2 bg-[#12141A] border border-[#232631] rounded-lg text-xs text-white focus:outline-none focus:border-[#D4FF32] cursor-pointer"
                >
                  {COMMON_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="w-8 h-8 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#202430] flex items-center justify-center transition-colors shrink-0"
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
