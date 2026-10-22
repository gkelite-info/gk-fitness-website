"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getRecipeByIdAction } from "@/app/actions/recipes";
import { GlobalMeal } from "@/lib/types/recipes";
import { UploadRecipeHeader } from "../../upload/_components/UploadRecipeHeader";
import { RecipeFormContainer } from "../../upload/_components/RecipeFormContainer";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default function EditRecipePage({ params }: EditRecipePageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [recipe, setRecipe] = useState<GlobalMeal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipe() {
      if (!resolvedParams?.id) return;
      setLoading(true);
      const res = await getRecipeByIdAction(resolvedParams.id);
      if (res.success && res.data) {
        setRecipe(res.data);
      } else {
        toast.error(res.error || "Recipe not found");
        router.push("/superadmin/recipes");
      }
      setLoading(false);
    }
    loadRecipe();
  }, [resolvedParams?.id, router]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
        <div className="h-10 w-48 bg-[#12141A] rounded-xl animate-pulse" />
        <div className="w-full h-96 bg-[#12141A] border border-[#232631] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
      <UploadRecipeHeader isEditing />
      <RecipeFormContainer initialRecipe={recipe} />
    </div>
  );
}
