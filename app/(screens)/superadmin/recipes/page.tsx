"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getRecipesAction,
  deleteRecipeAction,
  duplicateRecipeAction,
  getRecipeStatsAction,
} from "@/app/actions/recipes";
import { GlobalMeal } from "@/lib/types/recipes";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { RecipesHeader } from "./_components/RecipesHeader";
import { RecipesStatsBar } from "./_components/RecipesStatsBar";
import { RecipesFilters } from "./_components/RecipesFilters";
import { RecipeCard } from "./_components/RecipeCard";
import { RecipePreviewModal } from "./_components/RecipePreviewModal";
import { RecipeDeleteModal } from "./_components/RecipeDeleteModal";
import { CookingPot } from "@phosphor-icons/react";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<GlobalMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [stats, setStats] = useState({
    total: 0,
    breakfast: 0,
    lunch: 0,
    snack: 0,
    dinner: 0,
  });

  const [previewRecipe, setPreviewRecipe] = useState<GlobalMeal | null>(null);
  const [deletingRecipe, setDeletingRecipe] = useState<GlobalMeal | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadStats = useCallback(async () => {
    const res = await getRecipeStatsAction();
    setStats(res);
  }, []);

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    const res = await getRecipesAction({
      query: searchQuery,
      mealType: selectedMealType,
      dietType: selectedDiet,
      condition: selectedCondition,
      page: currentPage,
      pageSize,
    });

    if (res.success) {
      setRecipes(res.data);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);
    } else {
      toast.error(res.error || "Failed to load recipes");
    }
    setLoading(false);
  }, [searchQuery, selectedMealType, selectedDiet, selectedCondition, currentPage, pageSize]);

  useEffect(() => {
    loadRecipes();
    loadStats();
  }, [loadRecipes, loadStats]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedMealType("all");
    setSelectedDiet("all");
    setSelectedCondition("all");
    setCurrentPage(1);
  };

  const handleDuplicate = async (recipe: GlobalMeal) => {
    const toastId = toast.loading("Duplicating recipe...");
    const res = await duplicateRecipeAction(recipe.globalMealId);
    if (res.success) {
      toast.success("Recipe duplicated successfully!", { id: toastId });
      loadRecipes();
      loadStats();
    } else {
      toast.error(res.error || "Failed to duplicate recipe", { id: toastId });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingRecipe) return;
    setIsDeleting(true);
    const res = await deleteRecipeAction(deletingRecipe.globalMealId);
    if (res.success) {
      toast.success("Recipe deleted successfully");
      setDeletingRecipe(null);
      loadRecipes();
      loadStats();
    } else {
      toast.error(res.error || "Failed to delete recipe");
    }
    setIsDeleting(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
      <RecipesHeader totalCount={totalCount} />
      <RecipesStatsBar stats={stats} />
      <RecipesFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedMealType={selectedMealType}
        onMealTypeChange={(t) => {
          setSelectedMealType(t);
          setCurrentPage(1);
        }}
        selectedDiet={selectedDiet}
        onDietChange={(d) => {
          setSelectedDiet(d);
          setCurrentPage(1);
        }}
        selectedCondition={selectedCondition}
        onConditionChange={(c) => {
          setSelectedCondition(c);
          setCurrentPage(1);
        }}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-80 bg-[#12141A] border border-[#232631] rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="w-full py-16 bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col items-center justify-center text-center p-6">
          <div className="w-14 h-14 rounded-2xl bg-[#181A20] border border-[#262A36] flex items-center justify-center text-[#64748B] mb-3">
            <CookingPot size={28} />
          </div>
          <h3 className="text-base font-bold text-white">No Recipes Found</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mt-1 mb-4 leading-relaxed">
            No recipes matched your search criteria or filter tags. Try resetting your filters or upload a new recipe.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-[#181A20] hover:bg-[#20232B] text-white text-xs font-semibold border border-[#262A36] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.globalMealId}
              recipe={recipe}
              onPreview={setPreviewRecipe}
              onDuplicate={handleDuplicate}
              onDelete={setDeletingRecipe}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <RecipePreviewModal
        recipe={previewRecipe}
        onClose={() => setPreviewRecipe(null)}
      />

      <RecipeDeleteModal
        recipe={deletingRecipe}
        isDeleting={isDeleting}
        onClose={() => setDeletingRecipe(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
