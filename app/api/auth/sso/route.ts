import { createServerClient } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const accessToken = requestUrl.searchParams.get('access_token');
  const refreshToken = requestUrl.searchParams.get('refresh_token');
  const rawReturnTo = requestUrl.searchParams.get('returnTo') || '/customer';
  const returnTo = rawReturnTo.startsWith('/individual')
    ? rawReturnTo.replace(/^\/individual/, '/customer')
    : rawReturnTo;

  const redirectUrl = new URL(returnTo, request.url);

  requestUrl.searchParams.forEach((value, key) => {
    if (!['access_token', 'refresh_token', 'returnTo'].includes(key)) {
      redirectUrl.searchParams.set(key, value);
    }
  });

  if (!accessToken) {
    console.warn('[SSO] No access_token provided, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.redirect(redirectUrl);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const createSSR = () =>
    createServerClient(supabaseUrl, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              ...options,
              path: '/',
              sameSite: 'lax',
              maxAge: 60 * 60 * 24 * 7,
            })
          );
        },
      },
    });

  // Strategy 1: Isolated session via admin generateLink (immune to refresh token rotation and multi-device signout)
  if (serviceKey) {
    try {
      const admin = createAdminClient(supabaseUrl, serviceKey);
      const { data: { user }, error: userError } = await admin.auth.getUser(accessToken);

      if (!userError && user?.email) {
        const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
          type: 'magiclink',
          email: user.email,
        });

        if (!linkError && linkData.properties?.hashed_token) {
          const supabaseSSR = createSSR();
          const { data: verifyData, error: verifyError } = await supabaseSSR.auth.verifyOtp({
            token_hash: linkData.properties.hashed_token,
            type: 'magiclink',
          });

          if (!verifyError && verifyData.session) {
            return response;
          }
        }
      }
    } catch (e) {
      console.error('[SSO] Strategy 1 error:', e);
    }
  }

  // Strategy 2: Fallback to setSession if refreshToken is provided
  if (refreshToken) {
    try {
      const supabaseSSR = createSSR();
      const { data, error } = await supabaseSSR.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!error && data.session) {
        return response;
      }
    } catch (e) {
      console.error('[SSO] Strategy 2 error:', e);
    }
  }

  console.warn('[SSO] Authentication strategies failed, redirecting to login');
  return NextResponse.redirect(new URL('/login', request.url));
}
