import { createClient } from '@supabase/supabase-js';
import { createClient as createServerSupabase } from '@/app/api/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const serverSupabase = await createServerSupabase();
    const { data: { user }, error: authError } = await serverSupabase.auth.getUser();
    const { data: { session } } = await serverSupabase.auth.getSession();

    if (authError || !user) {
      console.error('[upload-receipt API] Auth Error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: userProfile, error: profileError } = await serverSupabase
      .from('users')
      .select('role, status')
      .eq('userId', user.id)
      .single();

    if (profileError || !userProfile || !['owner', 'superadmin'].includes(userProfile.role) || userProfile.status !== 'active') {
      console.error('[upload-receipt API] Permission Error:', profileError, userProfile);
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swzhxokkrolnxvhekrmj.supabase.co';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_qlfFxPx4u30D8Oww_o9nsA_2JEnZJWW';

    const storageClient = serviceRoleKey
      ? createClient(supabaseUrl, serviceRoleKey)
      : createClient(supabaseUrl, anonKey, {
          global: {
            headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {},
          },
        });

    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const arrayBuffer = await file.arrayBuffer();

    const { data, error } = await storageClient.storage
      .from('gym-expenses')
      .upload(fileName, arrayBuffer, {
        contentType: file.type || 'image/png',
        upsert: true,
      });

    if (error) {
      console.error('[upload-receipt API] Storage Upload Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return just the file path (fileName) instead of full public URL
    return NextResponse.json({ url: data.path });
  } catch (error: any) {
    console.error('[upload-receipt API] Catch Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
