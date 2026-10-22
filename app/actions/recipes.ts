"use server";

import { revalidatePath } from 'next/cache';
import {
  fetchRecipes,
  fetchRecipeById,
  createRecipe,
  updateRecipe,
  updateRecipePhoto,
  deleteRecipe,
  duplicateRecipe,
  FetchRecipesParams,
  getRecipesClient,
} from '@/lib/helpers/recipes/recipesHelper';
import { CreateRecipeInput, GlobalMeal } from '@/lib/types/recipes';

export async function getRecipesAction(params?: FetchRecipesParams): Promise<{
  success: boolean;
  data: GlobalMeal[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error?: string;
}> {
  try {
    const res = await fetchRecipes(params);
    return {
      success: true,
      data: res.list,
      total: res.total,
      page: res.page,
      pageSize: res.pageSize,
      totalPages: res.totalPages,
    };
  } catch (err: any) {
    return {
      success: false,
      data: [],
      total: 0,
      page: 1,
      pageSize: params?.pageSize || 12,
      totalPages: 1,
      error: err?.message || 'Failed to load recipes',
    };
  }
}

export async function getRecipeByIdAction(id: string): Promise<{
  success: boolean;
  data?: GlobalMeal | null;
  error?: string;
}> {
  try {
    const recipe = await fetchRecipeById(id);
    return { success: true, data: recipe };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to load recipe' };
  }
}

export async function saveRecipeAction(
  input: CreateRecipeInput,
  id?: string
): Promise<{
  success: boolean;
  data?: GlobalMeal;
  error?: string;
}> {
  try {
    if (!input.mealName?.trim()) {
      return { success: false, error: 'Recipe name is required' };
    }
    if (!input.mealType) {
      return { success: false, error: 'Meal category (Breakfast/Lunch/Snack/Dinner) is required' };
    }

    let result: GlobalMeal;
    if (id) {
      result = await updateRecipe(id, input);
    } else {
      result = await createRecipe(input);
    }

    revalidatePath('/superadmin/recipes');
    if (id) {
      revalidatePath(`/superadmin/recipes/edit/${id}`);
    }

    return { success: true, data: result };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save recipe' };
  }
}

export async function updateRecipePhotoAction(
  id: string,
  imageUrl: string | null
): Promise<{
  success: boolean;
  data?: GlobalMeal;
  error?: string;
}> {
  try {
    const updated = await updateRecipePhoto(id, imageUrl);
    revalidatePath('/superadmin/recipes');
    revalidatePath(`/superadmin/recipes/edit/${id}`);
    return { success: true, data: updated };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update photo' };
  }
}

export async function deleteRecipeAction(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await deleteRecipe(id);
    revalidatePath('/superadmin/recipes');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete recipe' };
  }
}

export async function duplicateRecipeAction(id: string): Promise<{
  success: boolean;
  data?: GlobalMeal;
  error?: string;
}> {
  try {
    const recipe = await duplicateRecipe(id);
    revalidatePath('/superadmin/recipes');
    return { success: true, data: recipe };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to duplicate recipe' };
  }
}

export async function getRecipeStatsAction(): Promise<{
  total: number;
  breakfast: number;
  lunch: number;
  snack: number;
  dinner: number;
  active: number;
}> {
  try {
    const client = getRecipesClient();
    const { count: total } = await client
      .from('global_meals')
      .select('*', { count: 'exact', head: true });

    const { count: breakfast } = await client
      .from('global_meals')
      .select('*', { count: 'exact', head: true })
      .eq('mealType', 'breakfast');

    const { count: lunch } = await client
      .from('global_meals')
      .select('*', { count: 'exact', head: true })
      .eq('mealType', 'lunch');

    const { count: snack } = await client
      .from('global_meals')
      .select('*', { count: 'exact', head: true })
      .eq('mealType', 'snack');

    const { count: dinner } = await client
      .from('global_meals')
      .select('*', { count: 'exact', head: true })
      .eq('mealType', 'dinner');

    return {
      total: total || 0,
      breakfast: breakfast || 0,
      lunch: lunch || 0,
      snack: snack || 0,
      dinner: dinner || 0,
      active: total || 0,
    };
  } catch {
    return { total: 0, breakfast: 0, lunch: 0, snack: 0, dinner: 0, active: 0 };
  }
}
