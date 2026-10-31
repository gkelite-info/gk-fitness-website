import { supabase } from '@/lib/supabase';

export type UserRole =
  | 'customer'
  | 'owner'
  | 'superadmin'
  | 'trainer'
  | 'individual'
  | 'globaltrainer'
  | 'global_trainer';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserGender = 'male' | 'female' | 'other';

export interface UserAttributes {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: number | null;
  dob?: string | Date | null;
  gender?: UserGender;
  role?: UserRole;
  status?: UserStatus;
  profilePhoto?: string | null;
  password?: string | null;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SaveUserParams {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: number | null;
  dob?: string | Date | null;
  gender?: UserGender;
  role?: UserRole;
  status?: UserStatus;
  profilePhoto?: string | null;
  password?: string | null;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

export { hashPassword, verifyPassword } from '@/lib/helpers/auth/passwordHelper';
import { hashPassword } from '@/lib/helpers/auth/passwordHelper';

export async function fetchUsers(role?: UserRole, retryCount = 0): Promise<any[]> {
  let query = supabase.from('users').select('*').order('createdAt', { ascending: false });
  if (role) query = query.eq('role', role);
  const { data, error } = await query;
  if (error) {
    if (error.code === 'PGRST303' && retryCount < 3) {
      console.warn(`[userHelper] fetchUsers PGRST303 error, retrying (${retryCount + 1}/3) in 1s...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchUsers(role, retryCount + 1);
    }
    console.error('[userHelper] fetchUsers Error:', error);
    throw error;
  }
  return data ?? [];
}

export async function fetchUserById(userId: string, retryCount = 0): Promise<any> {
  const { data, error } = await supabase.from('users').select('*').eq('userId', userId).maybeSingle();
  if (error) {
    if (error.code === 'PGRST303' && retryCount < 3) {
      console.warn(`[userHelper] fetchUserById PGRST303 error, retrying (${retryCount + 1}/3) in 1s...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchUserById(userId, retryCount + 1);
    }
    console.error('[userHelper] fetchUserById Error:', error);
    throw error;
  }
  return data;
}

export async function fetchUserByEmail(email: string, retryCount = 0): Promise<any> {
  const cleanEmail = email.trim().toLowerCase();
  const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail).maybeSingle();
  if (error) {
    if (error.code === 'PGRST303' && retryCount < 3) {
      console.warn(`[userHelper] fetchUserByEmail PGRST303 error, retrying (${retryCount + 1}/3) in 1s...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchUserByEmail(cleanEmail, retryCount + 1);
    }
    console.error('[userHelper] fetchUserByEmail Error:', error);
    throw error;
  }
  return data;
}

export async function fetchUserByCredentials(email: string, password: string, retryCount = 0): Promise<any> {
  const hashedPassword = await hashPassword(password);
  const cleanEmail = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', cleanEmail)
    .eq('password', hashedPassword)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST303' && retryCount < 3) {
      console.warn(`[userHelper] fetchUserByCredentials PGRST303 error, retrying (${retryCount + 1}/3) in 1s...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetchUserByCredentials(cleanEmail, password, retryCount + 1);
    }
    console.error('[userHelper] fetchUserByCredentials Error:', error);
    throw error;
  }
  return data;
}

export async function saveUser(userData: SaveUserParams) {
  const now = new Date().toISOString();
  let hashedPassword: string | null = null;
  if (userData.password) hashedPassword = await hashPassword(userData.password);

  if (userData.userId) {
    const updatePayload: Record<string, any> = {
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone,
      address: userData.address ?? null,
      country: userData.country ?? null,
      state: userData.state ?? null,
      city: userData.city ?? null,
      pincode: userData.pincode ?? null,
      role: userData.role,
      status: userData.status,
      updatedAt: now,
    };
    if (userData.dob !== undefined) updatePayload.dob = userData.dob;
    if (userData.gender !== undefined) updatePayload.gender = userData.gender;
    if (userData.profilePhoto !== undefined) updatePayload.profilePhoto = userData.profilePhoto;
    if (userData.isEmailVerified !== undefined) updatePayload.isEmailVerified = userData.isEmailVerified;
    if (userData.isPhoneVerified !== undefined) updatePayload.isPhoneVerified = userData.isPhoneVerified;
    if (hashedPassword) updatePayload.password = hashedPassword;

    const { data, error } = await supabase.from('users').update(updatePayload).eq('userId', userData.userId).select();
    if (error) {
      console.error('[userHelper] saveUser Update Error:', error);
      throw error;
    }
    return data ? data[0] : null;
  } else {
    const generatedUserId = crypto.randomUUID();
    const insertPayload: Record<string, any> = {
      userId: generatedUserId,
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone,
      address: userData.address || null,
      country: userData.country || null,
      state: userData.state || null,
      city: userData.city || null,
      pincode: userData.pincode || null,
      dob: userData.dob || null,
      gender: userData.gender || 'male',
      role: userData.role || 'customer',
      status: userData.status || 'active',
      profilePhoto: userData.profilePhoto || null,
      password: hashedPassword || null,
      isEmailVerified: userData.isEmailVerified ?? false,
      isPhoneVerified: userData.isPhoneVerified ?? false,
      createdAt: now,
      updatedAt: now,
    };

    const { data, error } = await supabase.from('users').insert([insertPayload]).select();
    if (error) {
      console.error('[userHelper] saveUser Insert Error:', error);
      throw error;
    }
    return data ? data[0] : null;
  }
}

export async function updateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('users')
    .update({ password: hashedPassword, updatedAt: now })
    .eq('userId', userId)
    .select();
  if (error) {
    console.error('[userHelper] updateUserPassword Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}

export async function toggleUserStatus(userId: string, currentStatus: UserStatus) {
  const now = new Date().toISOString();
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  const { data, error } = await supabase
    .from('users')
    .update({ status: newStatus, updatedAt: now })
    .eq('userId', userId)
    .select();
  if (error) {
    console.error('[userHelper] toggleUserStatus Error:', error);
    throw error;
  }
  return data ? data[0] : null;
}
