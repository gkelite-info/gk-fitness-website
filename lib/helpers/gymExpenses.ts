import { createClient } from '@/app/api/supabase/client';

export interface GymExpenseAttributes {
  gymExpenseId?: string;
  expenseTitle: string;
  category: "rent" | "salaries" | "maintenance" | "utilities" | "marketing" | "equipment" | "supplies" | "others";
  amount: number;
  date: string;
  paymentMethod: "upi" | "bank" | "cash" | "creditcard" | "debitcard";
  notes?: string | null;
  receiptUrl?: string | null;
  gymId: string;
  createdBy: string;
  is_deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface SaveGymExpenseParams {
  gymExpenseId?: string;
  expenseTitle: string;
  category: "rent" | "salaries" | "maintenance" | "utilities" | "marketing" | "equipment" | "supplies" | "others";
  amount: number;
  date: string;
  paymentMethod: "upi" | "bank" | "cash" | "creditcard" | "debitcard";
  notes?: string | null;
  receiptUrl?: string | null;
  gymId: string;
  createdBy: string;
}

export async function fetchGymExpenses(gymId: string) {
  const supabase = createClient();
  let query = supabase
    .from('gym_expenses')
    .select('*, createdBy_user:users!createdBy(name)')
    .eq('gymId', gymId)
    .eq('is_deleted', false)
    .order('createdAt', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('[gymExpensesHelper] fetchGymExpenses Error:', error);
    throw error;
  }

  return data ?? [];
}

export async function fetchGymExpenseById(gymExpenseId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gym_expenses')
    .select('*')
    .eq('gymExpenseId', gymExpenseId)
    .eq('is_deleted', false)
    .maybeSingle();

  if (error) {
    console.error('[gymExpensesHelper] fetchGymExpenseById Error:', error);
    throw error;
  }

  return data;
}

export async function saveGymExpense(expenseData: SaveGymExpenseParams) {
  const supabase = createClient();
  const now = new Date().toISOString();

  if (expenseData.gymExpenseId) {
    const { data, error } = await supabase
      .from('gym_expenses')
      .update({
        expenseTitle: expenseData.expenseTitle,
        category: expenseData.category,
        amount: expenseData.amount,
        date: expenseData.date,
        paymentMethod: expenseData.paymentMethod,
        notes: expenseData.notes,
        receiptUrl: expenseData.receiptUrl,
        updatedAt: now,
      })
      .eq('gymExpenseId', expenseData.gymExpenseId)
      .select();

    if (error) {
      console.error('[gymExpensesHelper] saveGymExpense Update Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  } else {
    const generatedId = crypto.randomUUID();
    const { data, error } = await supabase
      .from('gym_expenses')
      .insert([
        {
          gymExpenseId: generatedId,
          expenseTitle: expenseData.expenseTitle,
          category: expenseData.category,
          amount: expenseData.amount,
          date: expenseData.date,
          paymentMethod: expenseData.paymentMethod,
          notes: expenseData.notes || null,
          receiptUrl: expenseData.receiptUrl || null,
          gymId: expenseData.gymId,
          createdBy: expenseData.createdBy,
          is_deleted: false,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .select();

    if (error) {
      console.error('[gymExpensesHelper] saveGymExpense Insert Error:', error);
      throw error;
    }

    return data ? data[0] : null;
  }
}

export async function deleteGymExpense(gymExpenseId: string) {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('gym_expenses')
    .update({
      is_deleted: true,
      deletedAt: now,
      updatedAt: now,
    })
    .eq('gymExpenseId', gymExpenseId)
    .select();

  if (error) {
    console.error('[gymExpensesHelper] deleteGymExpense Error:', error);
    throw error;
  }

  return data ? data[0] : null;
}

export async function uploadGymExpenseReceipt(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-receipt', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[gymExpensesHelper] uploadGymExpenseReceipt Error:', result.error);
      throw new Error(result.error || 'Upload failed');
    }

    console.log('[gymExpensesHelper] uploadGymExpenseReceipt Success:', result.url);
    return result.url;
  } catch (error: any) {
    console.error('[gymExpensesHelper] uploadGymExpenseReceipt Catch Error:', error);
    throw error;
  }
}

export async function deleteGymExpenseReceipt(fileName: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .storage
    .from('gym-expenses')
    .remove([fileName]);

  if (error) {
    console.error('[gymExpensesHelper] deleteGymExpenseReceipt Error:', error);
    throw error;
  }

  return data;
}
