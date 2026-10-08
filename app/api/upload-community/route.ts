import { createClient } from '@supabase/supabase-js';
import { createClient as createServerSupabase } from '@/app/api/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const serverSupabase = await createServerSupabase();
    const { data: { user }, error: authError } = await serverSupabase.auth.getUser();
    const { data: { session } } = await serverSupabase.auth.getSession();

    if (authError || !user) {
      console.error('[upload-community API] Auth Error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string;
    const path = formData.get('path') as string;

    if (!file || !bucket || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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

    const arrayBuffer = await file.arrayBuffer();

    const { data, error } = await storageClient.storage
      .from(bucket)
      .upload(path, arrayBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      });

    if (error) {
      console.error(`[upload-community API] Storage Upload Error (${bucket}):`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = storageClient.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error('[upload-community API] Catch Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
