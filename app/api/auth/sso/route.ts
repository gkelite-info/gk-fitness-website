import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const accessToken = requestUrl.searchParams.get('access_token');
  const refreshToken = requestUrl.searchParams.get('refresh_token');
  const returnTo = requestUrl.searchParams.get('returnTo') || '/customer';

  const redirectUrl = new URL(returnTo, request.url);

  requestUrl.searchParams.forEach((value, key) => {
    if (!['access_token', 'refresh_token', 'returnTo'].includes(key)) {
      redirectUrl.searchParams.set(key, value);
    }
  });

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = NextResponse.redirect(redirectUrl);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  try {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      console.error('SSO setSession error:', error?.message);
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
  } catch (err) {
    console.error('Unexpected error during SSO session exchange:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
