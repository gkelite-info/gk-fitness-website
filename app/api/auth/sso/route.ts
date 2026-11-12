import { createServerClient } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const accessToken = requestUrl.searchParams.get('access_token');
  const refreshToken = requestUrl.searchParams.get('refresh_token');
  const userIdParam = requestUrl.searchParams.get('userId');
  const emailParam = requestUrl.searchParams.get('email');
  const rawReturnTo = requestUrl.searchParams.get('returnTo') || '/customer';
  const safeReturnTo =
    rawReturnTo.startsWith('/') && !rawReturnTo.startsWith('//') && !rawReturnTo.startsWith('/login')
      ? rawReturnTo
      : '/customer';
  const returnTo = safeReturnTo.startsWith('/individual')
    ? safeReturnTo.replace(/^\/individual/, '/customer')
    : safeReturnTo;

  const redirectUrl = new URL(returnTo, request.url);

  // Strip SSO transport/identity params so destination routes never trigger SSO/auth middleware loops
  const ssoInternalParams = new Set([
    'access_token',
    'refresh_token',
    'returnTo',
    'userId',
    'role',
    'email',
    'phone',
    'customerId',
    'gymId',
  ]);
  requestUrl.searchParams.forEach((value, key) => {
    if (!ssoInternalParams.has(key)) {
      redirectUrl.searchParams.set(key, value);
    }
  });

  if (!accessToken && !userIdParam && !emailParam) {
    console.warn('[SSO] No access_token, userId, or email provided, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const response = NextResponse.redirect(redirectUrl);

  let cookieStore: any = null;
  try {
    cookieStore = await cookies();
  } catch (cErr) {
    console.warn('[SSO] Could not access cookieStore:', cErr);
  }

  const isSecure = process.env.NODE_ENV === 'production' || request.url.startsWith('https:');

  const createSSR = () =>
    createServerClient(supabaseUrl, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            const cookieOpts = {
              ...options,
              path: '/',
              sameSite: 'lax' as const,
              maxAge: 60 * 60 * 24 * 7,
              secure: isSecure,
            };
            if (cookieStore) {
              try {
                cookieStore.set(name, value, cookieOpts);
              } catch {}
            }
            response.cookies.set(name, value, cookieOpts);
          });
        },
      },
    });

  let adminClient: any = null;
  if (serviceKey) {
    try {
      adminClient = createAdminClient(supabaseUrl, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    } catch (adminErr) {
      console.error('[SSO] Failed to initialize admin client:', adminErr);
    }
  }

  // Strategy 0: Check if the client already has an active session for this user
  try {
    const existingSSR = createSSR();
    const { data: { user: existingUser } } = await existingSSR.auth.getUser();
    if (existingUser) {
      const isIdMatch = !userIdParam || existingUser.id === userIdParam;
      const isEmailMatch = !emailParam || existingUser.email?.toLowerCase() === emailParam.toLowerCase();
      if (isIdMatch && isEmailMatch) {
        console.log('[SSO] Existing session is valid for:', existingUser.email);
        return response;
      }
    }
  } catch (existingCheckErr) {
    console.warn('[SSO] Existing session check notice:', existingCheckErr);
  }

  let resolvedEmail: string | null = null;

  // Strategy 1: Validate provided access_token with admin client
  if (accessToken && adminClient) {
    try {
      const { data: { user }, error: userError } = await adminClient.auth.getUser(accessToken);
      if (!userError && user?.email) {
        resolvedEmail = user.email;
        console.log('[SSO] Strategy 1 validated access_token for:', resolvedEmail);
      } else if (userError) {
        console.warn('[SSO] Strategy 1 token validation warning:', userError.message);
      }
    } catch (e) {
      console.error('[SSO] Strategy 1 error:', e);
    }
  }

  // Strategy 2: Resilient Identity Bridge using service role (handles expired token or fallback login)
  if (!resolvedEmail && adminClient && (userIdParam || emailParam)) {
    try {
      if (userIdParam) {
        const { data: dbUser } = await adminClient
          .from('users')
          .select('userId, email, is_deleted')
          .eq('userId', userIdParam)
          .maybeSingle();

        if (dbUser && dbUser.is_deleted !== true) {
          const { data: authUserData, error: authUserErr } = await adminClient.auth.admin.getUserById(userIdParam);
          if (!authUserErr && authUserData?.user) {
            if (!authUserData.user.email_confirmed_at) {
              await adminClient.auth.admin.updateUserById(authUserData.user.id, {
                email_confirm: true,
              });
            }
            resolvedEmail = authUserData.user.email || dbUser?.email || emailParam || null;
            console.log('[SSO] Strategy 2 resolved email from auth.users by userId:', resolvedEmail);
          } else if (dbUser?.email) {
            resolvedEmail = dbUser.email;
            console.log('[SSO] Strategy 2 resolved email from public.users by userId:', resolvedEmail);
          }
        }
      }

      if (!resolvedEmail && emailParam) {
        const { data: dbUser } = await adminClient
          .from('users')
          .select('userId, email, is_deleted')
          .ilike('email', emailParam.trim().toLowerCase())
          .maybeSingle();

        if (dbUser?.email && dbUser.is_deleted !== true) {
          resolvedEmail = dbUser.email;
          console.log('[SSO] Strategy 2 verified email from public.users:', resolvedEmail);
        }
      }
    } catch (e) {
      console.error('[SSO] Strategy 2 identity resolution error:', e);
    }
  }

  // If user email was identified (via Strategy 1 or 2), generate a magic link session
  if (resolvedEmail && adminClient) {
    try {
      const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
        type: 'magiclink',
        email: resolvedEmail,
      });

      if (!linkError && linkData.properties?.hashed_token) {
        const supabaseSSR = createSSR();
        const { data: verifyData, error: verifyError } = await supabaseSSR.auth.verifyOtp({
          token_hash: linkData.properties.hashed_token,
          type: 'magiclink',
        });

        if (!verifyError && verifyData.session) {
          console.log('[SSO] Pre-authenticated session established for:', resolvedEmail);
          return response;
        } else {
          console.warn('[SSO] verifyOtp failed:', verifyError?.message);
        }
      } else {
        console.warn('[SSO] generateLink failed:', linkError?.message);
      }
    } catch (e) {
      console.error('[SSO] MagicLink generation/verification error:', e);
    }
  }

  // Strategy 3: Fallback to setSession if refreshToken and accessToken are provided
  if (accessToken && refreshToken) {
    try {
      const supabaseSSR = createSSR();
      const { data, error } = await supabaseSSR.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!error && data.session) {
        console.log('[SSO] Strategy 3 setSession succeeded');
        return response;
      } else if (error) {
        console.warn('[SSO] Strategy 3 setSession warning:', error.message);
      }
    } catch (e) {
      console.error('[SSO] Strategy 3 error:', e);
    }
  }

  // Fallback: If all strategies fail, redirect to /login with full target returnTo
  console.warn('[SSO] All authentication strategies failed, redirecting to login');
  const loginUrl = new URL('/login', request.url);
  const fullTarget = redirectUrl.pathname + redirectUrl.search;
  loginUrl.searchParams.set('returnTo', fullTarget);
  return NextResponse.redirect(loginUrl);
}
