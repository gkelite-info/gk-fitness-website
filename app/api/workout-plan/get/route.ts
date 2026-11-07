import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceKey) {
      return NextResponse.json({ error: 'Server misconfigured: missing service role key' }, { status: 500 });
    }

    const admin = createAdminClient(supabaseUrl, serviceKey);

    const { data: plans, error: planError } = await admin
      .from('customer_workout_plans')
      .select('*')
      .eq('userId', userId)
      .is('deletedAt', null)
      .order('createdAt', { ascending: false });

    if (planError) {
      console.error('[API workout-plan/get] Error:', planError);
      return NextResponse.json({ error: planError.message }, { status: 500 });
    }

    return NextResponse.json({ plans: plans || [] });
  } catch (err: any) {
    console.error('[API workout-plan/get] Unexpected error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

