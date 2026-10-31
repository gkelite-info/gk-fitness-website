import { supabase } from '@/lib/supabase';
import { hashPassword } from '@/lib/helpers/auth/passwordHelper';

export interface SaveGymTrainerWebParams {
  gymTrainerId?: string;
  fullName: string;
  phone: string;
  email: string;
  gender?: string;
  dateOfBirth?: string;
  specialization?: string;
  experienceYears?: number | string;
  dateOfJoining?: string;
  qualification?: string;
  bio?: string | null;
  languagesSpeaks?: string[];
  gymId?: string;
  createdBy: string;
  shiftPreference?: string;
  workingDays?: string[];
  personalTrainingFee?: number | string;
  groupTrainingFee?: number | string;
}

export async function saveGymTrainerWeb(params: SaveGymTrainerWebParams) {
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
  const temporaryPassword = `TR-${uuid.substring(0, 5).toUpperCase()}-${uuid.substring(9, 10).toUpperCase()}`;
  const hashedPassword = await hashPassword(temporaryPassword);

  const { data: sessionData } = await supabase.auth.getSession();
  const originalSession = sessionData?.session;
  let targetUserId: string | null = params.gymTrainerId || null;
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
            role: 'trainer',
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
          role: 'trainer',
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
          role: 'trainer',
          status: 'active',
          password: hashedPassword,
          isEmailVerified: false,
          isPhoneVerified: false,
          createdAt: now,
          updatedAt: now,
        }]);
      if (userInsErr) throw new Error(`Users insertion failed: ${userInsErr.message}`);
    }

    const trainerPayload = {
      gymTrainerId: targetUserId,
      userId: targetUserId,
      gymId: resolvedGymId,
      fullName: params.fullName.trim(),
      dateOfBirth: params.dateOfBirth || null,
      gender: params.gender ? params.gender.toLowerCase() : 'male',
      phone: cleanPhone,
      email: cleanEmail,
      specialization: params.specialization || 'General Fitness',
      experienceYears: params.experienceYears ? Number(params.experienceYears) : 1,
      dateOfJoining: params.dateOfJoining || now.split('T')[0],
      qualification: params.qualification || 'Certified Trainer',
      bio: params.bio || null,
      languagesSpeaks: params.languagesSpeaks || ['English'],
      createdBy: params.createdBy,
      personalTrainingFee: params.personalTrainingFee ? Number(params.personalTrainingFee) : null,
      groupTrainingFee: params.groupTrainingFee ? Number(params.groupTrainingFee) : null,
      is_Active: true,
      updatedAt: now,
    };

    const { data: existingTrainer } = await supabase
      .from('gym_trainers')
      .select('gymTrainerId')
      .eq('gymTrainerId', targetUserId)
      .maybeSingle();

    let savedTrainer = null;
    if (existingTrainer) {
      const { data, error: trainUpErr } = await supabase
        .from('gym_trainers')
        .update(trainerPayload)
        .eq('gymTrainerId', targetUserId)
        .select()
        .single();
      if (trainUpErr) throw new Error(`gym_trainers update failed: ${trainUpErr.message}`);
      savedTrainer = data;
    } else {
      const { data, error: trainErr } = await supabase
        .from('gym_trainers')
        .insert([{ ...trainerPayload, createdAt: now }])
        .select()
        .single();
      if (trainErr) throw new Error(`gym_trainers insertion failed: ${trainErr.message}`);
      savedTrainer = data;
    }

    if (params.shiftPreference || (params.workingDays && params.workingDays.length > 0)) {
      const days = params.workingDays && params.workingDays.length > 0 ? params.workingDays : ['MON', 'WED', 'FRI'];
      await supabase.from('gym_trainer_schedules').delete().eq('gymTrainerId', targetUserId);
      const isMorning = params.shiftPreference === 'morning' || params.shiftPreference === 'both';
      const isEvening = params.shiftPreference === 'evening' || params.shiftPreference === 'both';

      const scheduleRows = days.map((day) => ({
        gymTrainerScheduleId: crypto.randomUUID(),
        gymTrainerId: targetUserId,
        dayOfWeek: day.toUpperCase(),
        morningShift: isMorning,
        eveningShift: isEvening,
        is_Active: true,
        createdAt: now,
        updatedAt: now,
      }));

      await supabase.from('gym_trainer_schedules').insert(scheduleRows);
    }

    return {
      success: true,
      trainerId: targetUserId,
      gymId: resolvedGymId,
      trainer: savedTrainer,
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

