import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import {
  GlobalMeal,
  CreateRecipeInput,
} from '@/lib/types/recipes';
import {
  fetchIngredientsForMeal,
  syncIngredientsForMeal,
} from './recipeIngredientsHelper';

export function getRecipesClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (serviceRoleKey && supabaseUrl) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

export interface FetchRecipesParams {
  query?: string;
  mealType?: string;
  dietType?: string;
  condition?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function fetchRecipes(params: FetchRecipesParams = {}) {
  const client = getRecipesClient();
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.max(1, params.pageSize || 12);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let queryBuilder = client
    .from('global_meals')
    .select('*', { count: 'exact' });

  if (params.query?.trim()) {
    const q = params.query.trim();
    queryBuilder = queryBuilder.or(`mealName.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (params.mealType && params.mealType !== 'all') {
    queryBuilder = queryBuilder.eq('mealType', params.mealType.toLowerCase().trim());
  }

  if (params.dietType && params.dietType !== 'all') {
    queryBuilder = queryBuilder.contains('dietTypes', [params.dietType]);
  }

  if (params.condition && params.condition !== 'all') {
    queryBuilder = queryBuilder.contains('suitableFor', [params.condition]);
  }

  const { data, count, error } = await queryBuilder
    .order('createdAt', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[recipesHelper] fetchRecipes error:', error);
    throw error;
  }

  const list: GlobalMeal[] = (data || []).map((m: any) => ({
    ...m,
    mealType: (m.mealType || 'lunch').toLowerCase(),
    calories: Number(m.calories ?? m.baseCalories ?? 0),
    baseCalories: Number(m.baseCalories ?? m.calories ?? 0),
    protein: Number(m.protein ?? m.baseProtein ?? 0),
    baseProtein: Number(m.baseProtein ?? m.protein ?? 0),
    carbs: Number(m.carbs ?? m.baseCarbs ?? 0),
    baseCarbs: Number(m.baseCarbs ?? m.carbs ?? 0),
    fat: Number(m.fat ?? m.baseFat ?? 0),
    baseFat: Number(m.baseFat ?? m.fat ?? 0),
    fiber: Number(m.fiber ?? Math.round((m.baseCarbs || 0) * 0.15)),
    cookTimeMinutes: Number(m.cookTimeMinutes ?? 15),
    servings: Number(m.servings ?? 1),
    servingUnit: m.servingUnit || '1 serving',
    difficulty: m.difficulty || 'Easy',
    sodiumMg: Number(m.sodiumMg ?? 300),
    sugarG: Number(m.sugarG ?? 4),
    isActive: m.isActive !== false,
    isGlobal: m.isGlobal !== false,
  }));

  const total = count || 0;
  return {
    list,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function fetchRecipeById(id: string): Promise<GlobalMeal | null> {
  const client = getRecipesClient();
  const { data, error } = await client
    .from('global_meals')
    .select('*')
    .eq('globalMealId', id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const ingredients = await fetchIngredientsForMeal(client, id);

  return {
    ...data,
    mealType: (data.mealType || 'lunch').toLowerCase(),
    calories: Number(data.calories ?? data.baseCalories ?? 0),
    baseCalories: Number(data.baseCalories ?? data.calories ?? 0),
    protein: Number(data.protein ?? data.baseProtein ?? 0),
    baseProtein: Number(data.baseProtein ?? data.protein ?? 0),
    carbs: Number(data.carbs ?? data.baseCarbs ?? 0),
    baseCarbs: Number(data.baseCarbs ?? data.carbs ?? 0),
    fat: Number(data.fat ?? data.baseFat ?? 0),
    baseFat: Number(data.baseFat ?? data.fat ?? 0),
    fiber: Number(data.fiber ?? Math.round((data.baseCarbs || 0) * 0.15)),
    cookTimeMinutes: Number(data.cookTimeMinutes ?? 15),
    servings: Number(data.servings ?? 1),
    servingUnit: data.servingUnit || '1 serving',
    difficulty: data.difficulty || 'Easy',
    sodiumMg: Number(data.sodiumMg ?? 300),
    sugarG: Number(data.sugarG ?? 4),
    isActive: data.isActive !== false,
    isGlobal: data.isGlobal !== false,
    ingredients,
  };
}

function sanitizeImageUrl(raw?: string | null): string | null {
  if (!raw || !raw.trim()) return null;
  const trimmed = raw.trim();
  if (trimmed.length <= 255) return trimmed;
  try {
    const parsed = new URL(trimmed);
    const cleaned = `${parsed.origin}${parsed.pathname}`;
    if (cleaned.length <= 255) return cleaned;
  } catch {}
  return trimmed.slice(0, 255);
}

function buildMealPayload(input: CreateRecipeInput) {
  const now = new Date().toISOString();
  return {
    mealName: input.mealName.trim(),
    mealType: String(input.mealType || 'lunch').toLowerCase().trim(),
    description: input.description?.trim() || '',
    baseCalories: Math.round(Number(input.calories ?? input.baseCalories ?? 0)),
    baseProtein: Math.round(Number(input.protein ?? input.baseProtein ?? 0)),
    baseCarbs: Math.round(Number(input.carbs ?? input.baseCarbs ?? 0)),
    baseFat: Math.round(Number(input.fat ?? input.baseFat ?? 0)),
    prepTimeMinutes: Math.round(Number(input.prepTimeMinutes || 10)),
    isScalable: input.isScalable !== false,
    minScale: Number(input.minScale) || 0.5,
    maxScale: Number(input.maxScale) || 2.5,
    dietTypes: input.dietTypes || [],
    allergens: input.allergens || [],
    cuisines: input.cuisines || [],
    suitableFor: input.suitableFor || [],
    contraindications: input.contraindications || [],
    recipeInstructions: Array.isArray(input.recipeInstructions) ? input.recipeInstructions : [],
    imageUrl: sanitizeImageUrl(input.imageUrl),
    updatedAt: now,
  };
}

export async function createRecipe(input: CreateRecipeInput): Promise<GlobalMeal> {
  const client = getRecipesClient();
  const payload: any = buildMealPayload(input);
  payload.globalMealId = crypto.randomUUID();
  payload.createdAt = new Date().toISOString();

  const { data, error } = await client.from('global_meals').insert(payload).select('*').single();

  if (error) {
    console.error('[recipesHelper] createRecipe error:', error);
    throw error;
  }

  const createdId = data.globalMealId;
  if (input.ingredients && input.ingredients.length > 0) {
    await syncIngredientsForMeal(client, createdId, input.ingredients);
  }

  const full = await fetchRecipeById(createdId);
  return full || data;
}

export async function updateRecipe(id: string, input: Partial<CreateRecipeInput>): Promise<GlobalMeal> {
  const client = getRecipesClient();
  const existing = await fetchRecipeById(id);
  if (!existing) throw new Error('Recipe not found');

  const mergedInput: CreateRecipeInput = {
    mealName: input.mealName ?? existing.mealName,
    mealType: input.mealType ?? existing.mealType,
    description: input.description ?? existing.description,
    calories: input.calories ?? existing.calories ?? existing.baseCalories,
    protein: input.protein ?? existing.protein ?? existing.baseProtein,
    carbs: input.carbs ?? existing.carbs ?? existing.baseCarbs,
    fat: input.fat ?? existing.fat ?? existing.baseFat,
    prepTimeMinutes: input.prepTimeMinutes ?? existing.prepTimeMinutes,
    isScalable: input.isScalable ?? existing.isScalable,
    minScale: input.minScale ?? existing.minScale,
    maxScale: input.maxScale ?? existing.maxScale,
    dietTypes: input.dietTypes ?? existing.dietTypes,
    allergens: input.allergens ?? existing.allergens,
    cuisines: input.cuisines ?? existing.cuisines,
    suitableFor: input.suitableFor ?? existing.suitableFor,
    contraindications: input.contraindications ?? existing.contraindications,
    recipeInstructions: input.recipeInstructions ?? existing.recipeInstructions,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl : existing.imageUrl,
    ingredients: input.ingredients ?? existing.ingredients,
  };

  const payload = buildMealPayload(mergedInput);

  const { data, error } = await client
    .from('global_meals')
    .update(payload)
    .eq('globalMealId', id)
    .select('*')
    .single();

  if (error) {
    console.error('[recipesHelper] updateRecipe error:', error);
    throw error;
  }

  if (input.ingredients) {
    await syncIngredientsForMeal(client, id, input.ingredients);
  }

  const updated = await fetchRecipeById(id);
  return updated || data;
}

export async function updateRecipePhoto(id: string, imageUrl: string | null): Promise<GlobalMeal> {
  const client = getRecipesClient();
  const sanitized = sanitizeImageUrl(imageUrl);
  const now = new Date().toISOString();

  const { data, error } = await client
    .from('global_meals')
    .update({ imageUrl: sanitized, updatedAt: now })
    .eq('globalMealId', id)
    .select('*')
    .single();

  if (error) {
    console.error('[recipesHelper] updateRecipePhoto error:', error);
    throw error;
  }

  const updated = await fetchRecipeById(id);
  return updated || data;
}

export async function deleteRecipe(id: string): Promise<boolean> {
  const client = getRecipesClient();
  await client.from('global_meal_ingredients').delete().eq('globalMealId', id);
  const { error } = await client.from('global_meals').delete().eq('globalMealId', id);
  if (error) {
    console.error('[recipesHelper] deleteRecipe error:', error);
    throw error;
  }
  return true;
}

export async function duplicateRecipe(id: string): Promise<GlobalMeal> {
  const existing = await fetchRecipeById(id);
  if (!existing) throw new Error('Recipe not found to duplicate');

  const copyInput: CreateRecipeInput = {
    ...existing,
    mealName: `${existing.mealName} (Copy)`,
    calories: existing.calories || existing.baseCalories,
    protein: existing.protein || existing.baseProtein,
    carbs: existing.carbs || existing.baseCarbs,
    fat: existing.fat || existing.baseFat,
    ingredients: existing.ingredients || [],
  };

  return createRecipe(copyInput);
}
