import { createClient } from '@/app/api/supabase/client';

export interface BirthdayPerson {
  userId: string;
  name: string;
  role: 'Customer' | 'Trainer' | 'Owner';
  dateOfBirth: string;
}

export function isBirthdayOnDate(dateStr?: string | null, targetDate?: Date): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const clean = dateStr.trim();
  if (!clean) return false;

  const target = targetDate || new Date();
  const targetMonth = target.getMonth() + 1;
  const targetDay = target.getDate();

  if (/^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/.test(clean)) {
    const parts = clean.split('T')[0].split(/[-\/]/);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    if (m === targetMonth && d === targetDay) return true;
  }

  if (/^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}/.test(clean)) {
    const parts = clean.split(/[-\/]/);
    const p1 = parseInt(parts[0], 10);
    const p2 = parseInt(parts[1], 10);
    if ((p1 === targetMonth && p2 === targetDay) || (p2 === targetMonth && p1 === targetDay)) {
      return true;
    }
  }

  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const mLocal = parsed.getMonth() + 1;
    const dLocal = parsed.getDate();
    const mUTC = parsed.getUTCMonth() + 1;
    const dUTC = parsed.getUTCDate();
    if ((mLocal === targetMonth && dLocal === targetDay) || (mUTC === targetMonth && dUTC === targetDay)) {
      return true;
    }
  }

  return false;
}

export function normalizeDateStr(dateStr?: string | null): string {
  if (!dateStr || !dateStr.trim()) return '';
  const clean = dateStr.trim().split('T')[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) return clean;
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  return clean;
}

export async function fetchBirthdayAnnouncementsForDate(gymId: string, targetDateStr?: string) {
  if (!gymId) return { birthdays: [], announcementText: null };

  const supabase = createClient();

  const [ownersRes, trainersRes, customersRes] = await Promise.all([
    supabase.from('gym_owners').select('*').eq('gymId', gymId).eq('is_deleted', false),
    supabase.from('gym_trainers').select('*').eq('gymId', gymId).eq('is_deleted', false),
    supabase.from('gym_customers').select('*').eq('gymId', gymId).eq('is_deleted', false),
  ]);

  if (ownersRes.error) console.error('[birthdayHelper] fetch gym_owners error:', ownersRes.error);
  if (trainersRes.error) console.error('[birthdayHelper] fetch gym_trainers error:', trainersRes.error);
  if (customersRes.error) console.error('[birthdayHelper] fetch gym_customers error:', customersRes.error);

  const ownerUserIds = (ownersRes.data || []).map((o: any) => o.userId).filter(Boolean);
  const trainerMap = new Map<string, string | null>();
  (trainersRes.data || []).forEach((t: any) => {
    const uid = t.userId || t.gymTrainerId;
    if (uid) trainerMap.set(uid, t.dateOfBirth || null);
  });

  const customerMap = new Map<string, string | null>();
  (customersRes.data || []).forEach((c: any) => {
    if (c.customerId) customerMap.set(c.customerId, c.dateOfBirth || null);
  });

  const allUserIds = Array.from(new Set([...ownerUserIds, ...Array.from(trainerMap.keys()), ...Array.from(customerMap.keys())]));

  if (allUserIds.length === 0) return { birthdays: [], announcementText: null };

  const { data: users, error: usersErr } = await supabase
    .from('users')
    .select('*')
    .in('userId', allUserIds);

  if (usersErr) {
    console.error('[birthdayHelper] fetch users error:', usersErr.message || usersErr);
    return { birthdays: [], announcementText: null };
  }

  const birthdayList: BirthdayPerson[] = [];

  (users || []).forEach((u: any) => {
    if (u.status !== 'active' && u.status !== 'Active' && u.status !== null) {
      return;
    }

    const userDob = u.dob || u.dateOfBirth || u.dateofbirth || u.date_of_birth || null;
    const uid = u.userId;
    const userName = u.name || 'User';

    let role: 'Owner' | 'Trainer' | 'Customer' | null = null;
    let roleTableDob: string | null = null;

    if (ownerUserIds.includes(uid)) {
      role = 'Owner';
    } else if (trainerMap.has(uid)) {
      role = 'Trainer';
      roleTableDob = trainerMap.get(uid) || null;
    } else if (customerMap.has(uid)) {
      role = 'Customer';
      roleTableDob = customerMap.get(uid) || null;
    }

    if (!role) {
      return;
    }

    const targetDateObj = targetDateStr ? new Date(targetDateStr) : new Date();
    if (isBirthdayOnDate(userDob, targetDateObj)) {
      birthdayList.push({
        userId: uid,
        name: userName,
        role,
        dateOfBirth: userDob,
      });
    }
  });

  if (birthdayList.length === 0) {
    return { birthdays: [], announcementText: null };
  }

  const namesWithRoles = birthdayList.map((b) => `${b.name}`).join(', ');
  const announcementText = `💐 Happy Birthday to ${namesWithRoles}`;

  return { birthdays: birthdayList, announcementText };
}
