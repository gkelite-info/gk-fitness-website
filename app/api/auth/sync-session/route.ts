import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, password } = body;

    if (!userId && !email) {
      return NextResponse.json({ error: 'userId or email is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceKey) {
      return NextResponse.json({ error: 'Server misconfigured: missing service role key' }, { status: 500 });
    }

    const admin = createAdminClient(supabaseUrl, serviceKey);

    // 1. Resolve user from public.users to ensure authenticity
    let resolvedEmail = email ? email.trim().toLowerCase() : null;
    let resolvedUserId = userId;

    if (!resolvedEmail && userId) {
      const { data: dbUser } = await admin
        .from('users')
        .select('userId, email')
        .eq('userId', userId)
        .maybeSingle();

      if (dbUser?.email) {
        resolvedEmail = dbUser.email.trim().toLowerCase();
        resolvedUserId = dbUser.userId;
      }
    }

    if (!resolvedEmail) {
      return NextResponse.json({ error: 'User email could not be resolved' }, { status: 404 });
    }

    // 2. Find or create user in auth.users
    let authUser: any = null;
    if (resolvedUserId) {
      try {
        const { data: uData } = await admin.auth.admin.getUserById(resolvedUserId);
        if (uData?.user) authUser = uData.user;
      } catch {}
    }

    if (!authUser) {
      const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 });
      authUser = users.find(u => (u.email || '').toLowerCase() === resolvedEmail);
    }

    if (!authUser) {
      // Create user in auth.users
      const { data: newAuth, error: createErr } = await admin.auth.admin.createUser({
        id: resolvedUserId,
        email: resolvedEmail,
        password: password || undefined,
        email_confirm: true,
      });

      if (createErr) {
        console.error('[sync-session] Error creating auth user:', createErr);
        return NextResponse.json({ error: createErr.message }, { status: 500 });
      }
      authUser = newAuth.user;
    } else {
      // User exists, update password and confirm email if provided
      const updatePayload: any = { email_confirm: true };
      if (password && typeof password === 'string' && password.length >= 6) {
        updatePayload.password = password;
      }
      await admin.auth.admin.updateUserById(authUser.id, updatePayload);
    }

    // 3. Generate magic link token hash for direct client verifyOtp
    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email: resolvedEmail,
    });

    if (linkErr || !linkData?.properties?.hashed_token) {
      console.error('[sync-session] Error generating magic link:', linkErr);
      return NextResponse.json({ error: linkErr?.message || 'Failed to generate token' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      tokenHash: linkData.properties.hashed_token,
      email: resolvedEmail,
      userId: authUser.id,
    });
  } catch (err: any) {
    console.error('[sync-session] Unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

