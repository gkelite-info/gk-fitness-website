"use client";

import { Suspense } from "react";
import { UploadRecipeHeader } from "./_components/UploadRecipeHeader";
import { RecipeFormContainer } from "./_components/RecipeFormContainer";

function UploadRecipeContent() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
      <UploadRecipeHeader />
      <RecipeFormContainer />
    </div>
  );
}

export default function UploadRecipePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center text-[#94A3B8]">
          Loading recipe upload screen...
        </div>
      }
    >
      <UploadRecipeContent />
    </Suspense>
  );
}
