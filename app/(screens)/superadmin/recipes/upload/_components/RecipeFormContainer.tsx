"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, CircleNotch } from "@phosphor-icons/react";
import { saveRecipeAction } from "@/app/actions/recipes";
import {
  GlobalMeal,
  CreateRecipeInput,
  RecipeIngredient,
  RecipeInstructionStep,
} from "@/lib/types/recipes";
import { RecipeBasicInfoSection } from "./RecipeBasicInfoSection";
import { RecipeImageSection } from "./RecipeImageSection";
import { RecipeMacrosSection } from "./RecipeMacrosSection";
import { RecipeDietarySection } from "./RecipeDietarySection";
import { RecipeIngredientsSection } from "./RecipeIngredientsSection";
import { RecipeInstructionsSection } from "./RecipeInstructionsSection";

interface RecipeFormContainerProps {
  initialRecipe?: GlobalMeal | null;
}

export function RecipeFormContainer({ initialRecipe }: RecipeFormContainerProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mealName, setMealName] = useState(initialRecipe?.mealName || "");
  const [mealType, setMealType] = useState(initialRecipe?.mealType?.toLowerCase() || "lunch");
  const [description, setDescription] = useState(initialRecipe?.description || "");
  const [difficulty, setDifficulty] = useState(initialRecipe?.difficulty || "Easy");
  const [isActive, setIsActive] = useState(initialRecipe?.isActive !== false);
  const [isGlobal, setIsGlobal] = useState(initialRecipe?.isGlobal !== false);

  const [imageUrl, setImageUrl] = useState(initialRecipe?.imageUrl || "");

  const [calories, setCalories] = useState(
    initialRecipe?.calories ?? initialRecipe?.baseCalories ?? 400
  );
  const [protein, setProtein] = useState(
    initialRecipe?.protein ?? initialRecipe?.baseProtein ?? 25
  );
  const [carbs, setCarbs] = useState(
    initialRecipe?.carbs ?? initialRecipe?.baseCarbs ?? 45
  );
  const [fat, setFat] = useState(
    initialRecipe?.fat ?? initialRecipe?.baseFat ?? 12
  );
  const [fiber, setFiber] = useState(initialRecipe?.fiber ?? 6);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(initialRecipe?.prepTimeMinutes ?? 10);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(initialRecipe?.cookTimeMinutes ?? 15);
  const [servings, setServings] = useState(initialRecipe?.servings ?? 1);
  const [servingUnit, setServingUnit] = useState(initialRecipe?.servingUnit || "1 serving");
  const [sodiumMg, setSodiumMg] = useState(initialRecipe?.sodiumMg ?? 300);
  const [sugarG, setSugarG] = useState(initialRecipe?.sugarG ?? 4);
  const [isScalable, setIsScalable] = useState(initialRecipe?.isScalable !== false);
  const [minScale, setMinScale] = useState(initialRecipe?.minScale ?? 0.5);
  const [maxScale, setMaxScale] = useState(initialRecipe?.maxScale ?? 2.5);

  const [dietTypes, setDietTypes] = useState<string[]>(initialRecipe?.dietTypes || ["Vegetarian"]);
  const [allergens, setAllergens] = useState<string[]>(initialRecipe?.allergens || []);
  const [cuisines, setCuisines] = useState<string[]>(initialRecipe?.cuisines || ["Indian"]);
  const [suitableFor, setSuitableFor] = useState<string[]>(initialRecipe?.suitableFor || []);
  const [contraindications, setContraindications] = useState<string[]>(
    initialRecipe?.contraindications || []
  );

  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    initialRecipe?.ingredients || []
  );
  const [steps, setSteps] = useState<RecipeInstructionStep[]>(
    Array.isArray(initialRecipe?.recipeInstructions)
      ? initialRecipe.recipeInstructions
      : []
  );

  useEffect(() => {
    if (initialRecipe) {
      setMealName(initialRecipe.mealName || "");
      setMealType(initialRecipe.mealType?.toLowerCase() || "lunch");
      setDescription(initialRecipe.description || "");
      setImageUrl(initialRecipe.imageUrl || "");
    }
  }, [initialRecipe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mealName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(initialRecipe ? "Updating recipe..." : "Publishing recipe...");

    try {
      const input: CreateRecipeInput = {
        mealName: mealName.trim(),
        mealType: mealType.toLowerCase().trim(),
        description: description.trim(),
        difficulty,
        imageUrl: imageUrl?.trim() || "",
        calories,
        protein,
        carbs,
        fat,
        fiber,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        servingUnit,
        sodiumMg,
        sugarG,
        isScalable,
        minScale,
        maxScale,
        dietTypes,
        allergens,
        cuisines,
        suitableFor,
        contraindications,
        ingredients,
        recipeInstructions: steps,
        isActive,
        isGlobal,
      };

      const res = await saveRecipeAction(input, initialRecipe?.globalMealId);

      if (res.success) {
        toast.success(
          initialRecipe ? "Recipe updated successfully!" : "Recipe published to database!",
          { id: toastId }
        );
        router.refresh();
        router.push("/superadmin/recipes");
      } else {
        toast.error(res.error || "Failed to save recipe", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 pb-12">
      <RecipeBasicInfoSection
        mealName={mealName}
        onMealNameChange={setMealName}
        mealType={mealType}
        onMealTypeChange={setMealType}
        description={description}
        onDescriptionChange={setDescription}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        isActive={isActive}
        onIsActiveChange={setIsActive}
        isGlobal={isGlobal}
        onIsGlobalChange={setIsGlobal}
      />

      <RecipeImageSection
        imageUrl={imageUrl}
        onImageChange={setImageUrl}
        recipeId={initialRecipe?.globalMealId}
      />

      <RecipeMacrosSection
        calories={calories}
        onCaloriesChange={setCalories}
        protein={protein}
        onProteinChange={setProtein}
        carbs={carbs}
        onCarbsChange={setCarbs}
        fat={fat}
        onFatChange={setFat}
        fiber={fiber}
        onFiberChange={setFiber}
        prepTimeMinutes={prepTimeMinutes}
        onPrepTimeChange={setPrepTimeMinutes}
        cookTimeMinutes={cookTimeMinutes}
        onCookTimeChange={setCookTimeMinutes}
        servings={servings}
        onServingsChange={setServings}
        servingUnit={servingUnit}
        onServingUnitChange={setServingUnit}
        sodiumMg={sodiumMg}
        onSodiumChange={setSodiumMg}
        sugarG={sugarG}
        onSugarChange={setSugarG}
        isScalable={isScalable}
        onIsScalableChange={setIsScalable}
        minScale={minScale}
        onMinScaleChange={setMinScale}
        maxScale={maxScale}
        onMaxScaleChange={setMaxScale}
      />

      <RecipeDietarySection
        dietTypes={dietTypes}
        onDietTypesChange={setDietTypes}
        allergens={allergens}
        onAllergensChange={setAllergens}
        cuisines={cuisines}
        onCuisinesChange={setCuisines}
        suitableFor={suitableFor}
        onSuitableForChange={setSuitableFor}
        contraindications={contraindications}
        onContraindicationsChange={setContraindications}
      />

      <RecipeIngredientsSection
        ingredients={ingredients}
        onIngredientsChange={setIngredients}
      />

      <RecipeInstructionsSection
        steps={steps}
        onStepsChange={setSteps}
      />

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#1C202B]">
        <button
          type="button"
          onClick={() => router.push("/superadmin/recipes")}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#181A20] hover:bg-[#20232B] text-white text-sm font-semibold transition-colors border border-[#262A36]"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4FF32] text-black font-semibold text-sm hover:bg-[#c2ed25] transition-all shadow-[0_4px_16px_rgba(212,255,50,0.25)] disabled:opacity-50 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <CircleNotch size={16} className="animate-spin" />
              <span>Saving Recipe...</span>
            </>
          ) : (
            <>
              <Check size={16} weight="bold" />
              <span>{initialRecipe ? "Update Recipe" : "Save & Publish Recipe"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
