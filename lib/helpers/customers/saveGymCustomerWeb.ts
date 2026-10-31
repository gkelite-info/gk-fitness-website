import { supabase } from '@/lib/supabase';
import { hashPassword } from '@/lib/helpers/auth/passwordHelper';

export interface SaveGymCustomerWebParams {
  customerId?: string;
  fullName: string;
  phone: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  relationship?: string;
  emergencyContactNumber?: string;
  gymId?: string;
  createdBy: string;
  membershipPlanId?: string;
  planStartDate?: string;
  planExpiryDate?: string;
  languagesSpeaks?: string[];
}

export async function saveGymCustomerWeb(params: SaveGymCustomerWebParams) {
  const now = new Date().toISOString();
  const cleanEmail = params.email.trim().toLowerCase();
  const cleanPhone = params.phone.trim();

  let resolvedGymId = params.gymId;
  if (!resolvedGymId && params.createdBy) {
    const { data: owner } = await supabase
      .from('gym_owners')
      .select('gymId')
      .or(`gymOwnerId.eq.${params.createdBy},userId.eq.${params.createdBy}`)
      .maybeSingle();
    resolvedGymId = owner?.gymId;
  }

  const uuid = crypto.randomUUID();
  const temporaryPassword = `CS-${uuid.substring(0, 5).toUpperCase()}-${uuid.substring(9, 10).toUpperCase()}`;
  const hashedPassword = await hashPassword(temporaryPassword);

  const { data: sessionData } = await supabase.auth.getSession();
  const originalSession = sessionData?.session;
  let targetUserId: string | null = params.customerId || null;
  let isNewUser = false;

  try {
    if (!targetUserId) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: temporaryPassword,
        options: {
          data: {
            name: params.fullName.trim(),
            phone: cleanPhone,
            role: 'customer',
          },
        },
      });

      if (originalSession) {
        await supabase.auth.setSession({
          access_token: originalSession.access_token,
          refresh_token: originalSession.refresh_token,
        });
      }

      if (authError && !authError.message?.toLowerCase().includes('already registered')) {
        throw authError;
      }

      targetUserId = authData?.user?.id || null;

      if (!targetUserId) {
        const { data: existingUser } = await supabase
          .from('users')
          .select('userId')
          .or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`)
          .maybeSingle();
        targetUserId = existingUser ? existingUser.userId : crypto.randomUUID();
      }
    }

    const { data: existingUserRecord } = await supabase
      .from('users')
      .select('userId')
      .eq('userId', targetUserId)
      .maybeSingle();

    if (existingUserRecord) {
      const { error: userUpErr } = await supabase
        .from('users')
        .update({
          name: params.fullName.trim(),
          phone: cleanPhone,
          role: 'customer',
          password: hashedPassword,
          updatedAt: now,
          gender: params.gender ? params.gender.toLowerCase() : 'male',
          dob: params.dateOfBirth || null,
        })
        .eq('userId', targetUserId);
      if (userUpErr) throw new Error(`Users update failed: ${userUpErr.message}`);
    } else {
      isNewUser = true;
      const { error: userInsErr } = await supabase
        .from('users')
        .insert([{
          userId: targetUserId,
          name: params.fullName.trim(),
          email: cleanEmail,
          phone: cleanPhone,
          gender: params.gender ? params.gender.toLowerCase() : 'male',
          dob: params.dateOfBirth || null,
          role: 'customer',
          status: 'active',
          password: hashedPassword,
          isEmailVerified: false,
          isPhoneVerified: false,
          createdAt: now,
          updatedAt: now,
        }]);
      if (userInsErr) throw new Error(`Users insertion failed: ${userInsErr.message}`);
    }

    const customerPayload = {
      customerId: targetUserId,
      gymId: resolvedGymId,
      fullName: params.fullName.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      dateOfBirth: params.dateOfBirth || null,
      gender: params.gender ? params.gender.toLowerCase() : 'male',
      emergencyContactName: params.emergencyContactName || null,
      relationship: params.relationship || null,
      emergencyContactNumber: params.emergencyContactNumber || null,
      createdBy: params.createdBy,
      is_Active: true,
      updatedAt: now,
    };

    const { data: existingCust } = await supabase
      .from('gym_customers')
      .select('customerId')
      .eq('customerId', targetUserId)
      .maybeSingle();

    let savedCustomer = null;
    if (existingCust) {
      const { data, error: custUpErr } = await supabase
        .from('gym_customers')
        .update(customerPayload)
        .eq('customerId', targetUserId)
        .select()
        .single();
      if (custUpErr) throw new Error(`gym_customers update failed: ${custUpErr.message}`);
      savedCustomer = data;
    } else {
      const { data, error: custErr } = await supabase
        .from('gym_customers')
        .insert([{ ...customerPayload, createdAt: now }])
        .select()
        .single();
      if (custErr) throw new Error(`gym_customers insertion failed: ${custErr.message}`);
      savedCustomer = data;
    }

    if (!existingCust && params.membershipPlanId && params.planStartDate && params.planExpiryDate && resolvedGymId) {
      await supabase.from('gym_customer_membership_plans').insert([{
        GymCustomerMembershipPlanId: crypto.randomUUID(),
        customerId: targetUserId,
        gymId: resolvedGymId,
        planId: params.membershipPlanId,
        startDate: params.planStartDate,
        endDate: params.planExpiryDate,
        createdBy: params.createdBy,
        is_Active: true,
        is_deleted: false,
        createdAt: now,
        updatedAt: now,
      }]);
    }

    return {
      success: true,
      customerId: targetUserId,
      gymId: resolvedGymId,
      customer: savedCustomer,
      temporaryPassword,
    };
  } catch (error: any) {
    if (isNewUser && targetUserId) {
      try {
        await supabase.from('users').delete().eq('userId', targetUserId);
      } catch {}
    }
    throw error;
  }
}

