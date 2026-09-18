import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let attempts = 3;
  while (attempts > 0) {
    const response = await fetch(input, init);
    if (response.status === 400 || response.status === 401) {
      try {
        const clonedResponse = response.clone();
        const body = await clonedResponse.json();
        if (body && (body.code === 'PGRST303' || (body.message && body.message.includes('JWT issued at future')))) {
          attempts--;
          if (attempts > 0) {
            console.warn('[Supabase Fetch] Got PGRST303 (JWT issued at future), retrying in 1s...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
        }
      } catch (e) {
        // Ignore json parse error
      }
    }
    return response;
  }
  return fetch(input, init);
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: customFetch as any,
  },
});

export const supabaseAdminAuth = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
  global: {
    fetch: customFetch as any,
  },
});
