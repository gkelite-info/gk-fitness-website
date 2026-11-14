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
    '_ts',
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

  // Set strict cache-control so iOS Safari and Android Chrome never cache the SSO redirect
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

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

  // Helper to completely purge any existing session cookies from the browser
  const purgeExistingSession = async () => {
    try {
      const ssr = createSSR();
      await ssr.auth.signOut({ scope: 'local' }).catch(() => {});
    } catch {}

    request.cookies.getAll().forEach((c) => {
      if (c.name.includes('auth-token') || c.name.startsWith('sb-')) {
        response.cookies.delete(c.name);
        if (cookieStore) {
          try {
            cookieStore.delete(c.name);
          } catch {}
        }
      }
    });
  };

  // Strategy 0: Check if the browser already has an active session
  try {
    const existingSSR = createSSR();
    const { data: { user: existingUser } } = await existingSSR.auth.getUser();
    if (existingUser) {
      const isIdMatch = Boolean(userIdParam && existingUser.id === userIdParam);
      const isEmailMatch = Boolean(emailParam && existingUser.email?.toLowerCase() === emailParam.toLowerCase());

      // If the existing browser session strictly matches the requested user, we can keep it
      if (isIdMatch || isEmailMatch) {
        console.log('[SSO] Existing browser session is valid for requested user:', existingUser.email);
        return response;
      }

      // Existing browser session belongs to an old/different user (e.g. 'kogot' vs current 'sajadid').
      // Purge it immediately so old credentials/cookies never leak into the active session!
      console.log(
        `[SSO] Existing session (${existingUser.email} / ${existingUser.id}) does not match requested user (${userIdParam || emailParam}). Purging old session.`
      );
      await purgeExistingSession();
    }
  } catch (existingCheckErr) {
    console.warn('[SSO] Existing session check notice:', existingCheckErr);
  }

  let resolvedEmail: string | null = null;
  let isTokenForTargetUser = false;

  // Strategy 1: Validate provided access_token with admin client (guarding against mismatched user tokens)
  if (accessToken && adminClient) {
    try {
      const { data: { user }, error: userError } = await adminClient.auth.getUser(accessToken);
      if (!userError && user?.email) {
        if (userIdParam && user.id !== userIdParam) {
          console.warn(`[SSO] Provided access_token user (${user.id}) does not match requested userIdParam (${userIdParam}). Discarding token.`);
        } else if (emailParam && user.email.toLowerCase() !== emailParam.trim().toLowerCase()) {
          console.warn(`[SSO] Provided access_token email (${user.email}) does not match requested emailParam (${emailParam}). Discarding token.`);
        } else {
          resolvedEmail = user.email;
          isTokenForTargetUser = true;
          console.log('[SSO] Strategy 1 validated access_token for requested user:', resolvedEmail);
        }
      } else if (userError) {
        console.warn('[SSO] Strategy 1 token validation warning:', userError.message);
      }
    } catch (e) {
      console.error('[SSO] Strategy 1 error:', e);
    }
  }

  // Strategy 2: Resilient Identity Bridge using service role (handles expired token or manual password-table login)
  const ensureAuthEmailForDbUser = async (
    dbUser: {
      userId: string;
      email?: string | null;
      name?: string | null;
      phone?: string | null;
      role?: string | null;
    },
    fallbackEmail?: string | null
  ): Promise<string | null> => {
    const targetEmail = dbUser.email || fallbackEmail || null;
    const { data: authUserData, error: authUserErr } = await adminClient.auth.admin.getUserById(dbUser.userId);

    if (!authUserErr && authUserData?.user) {
      if (!authUserData.user.email_confirmed_at) {
        await adminClient.auth.admin.updateUserById(authUserData.user.id, {
          email_confirm: true,
        });
      }
      return authUserData.user.email || targetEmail;
    }

    // Provision a matching Supabase Auth user (same userId) for manual password-only accounts
    if (targetEmail) {
      const { error: createErr } = await adminClient.auth.admin.createUser({
        id: dbUser.userId,
        email: targetEmail,
        email_confirm: true,
        user_metadata: {
          role: dbUser.role || 'customer',
          name: dbUser.name || '',
          phone: dbUser.phone || '',
        },
      });
      if (createErr) {
        console.warn('[SSO] Strategy 2 createUser notice:', createErr.message);
      }
      return targetEmail;
    }

    return null;
  };

  if (!resolvedEmail && adminClient && (userIdParam || emailParam)) {
    try {
      if (userIdParam) {
        const { data: dbUser, error: dbUserErr } = await adminClient
          .from('users')
          .select('userId, email, name, phone, role')
          .eq('userId', userIdParam)
          .maybeSingle();

        if (dbUserErr) {
          console.warn('[SSO] Strategy 2 userId lookup warning:', dbUserErr.message);
        }

        if (dbUser) {
          resolvedEmail = await ensureAuthEmailForDbUser(dbUser, emailParam);
          console.log('[SSO] Strategy 2 resolved email by userId:', resolvedEmail);
        } else {
          // Fallback if account exists only in auth.users
          const { data: authUserData, error: authUserErr } = await adminClient.auth.admin.getUserById(userIdParam);
          if (!authUserErr && authUserData?.user?.email) {
            if (!authUserData.user.email_confirmed_at) {
              await adminClient.auth.admin.updateUserById(authUserData.user.id, {
                email_confirm: true,
              });
            }
            resolvedEmail = authUserData.user.email;
          }
        }
      }

      if (!resolvedEmail && emailParam) {
        const cleanEmail = emailParam.trim().toLowerCase();
        const { data: dbUser, error: dbEmailErr } = await adminClient
          .from('users')
          .select('userId, email, name, phone, role')
          .ilike('email', cleanEmail)
          .maybeSingle();

        if (dbEmailErr) {
          console.warn('[SSO] Strategy 2 email lookup warning:', dbEmailErr.message);
        }

        if (dbUser) {
          resolvedEmail = await ensureAuthEmailForDbUser(dbUser, cleanEmail);
          console.log('[SSO] Strategy 2 resolved email by emailParam:', resolvedEmail);
        }
      }
    } catch (e) {
      console.error('[SSO] Strategy 2 identity resolution error:', e);
    }
  }

  // If user email was identified (via Strategy 1 or 2), generate a magic link session
  if (resolvedEmail && adminClient) {
    try {
      // First ensure old session cookies are thoroughly purged
      await purgeExistingSession();

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

  // Strategy 3: Fallback to setSession if refreshToken and accessToken are provided and match target user
  if (accessToken && refreshToken && isTokenForTargetUser) {
    try {
      await purgeExistingSession();
      const supabaseSSR = createSSR();
      const { data, error } = await supabaseSSR.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!error && data.session) {
        console.log('[SSO] Strategy 3 setSession succeeded for:', data.session.user?.email);
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
