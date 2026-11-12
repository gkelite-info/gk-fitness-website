import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/individual')) {
    const customerUrl = request.nextUrl.clone();
    customerUrl.pathname = customerUrl.pathname.replace(/^\/individual/, '/customer');
    return NextResponse.redirect(customerUrl);
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const accessToken = request.nextUrl.searchParams.get('access_token');
  const hasSSOParams = !!accessToken || 
    (request.nextUrl.searchParams.has('userId') && (
      request.nextUrl.searchParams.has('action') || 
      request.nextUrl.searchParams.has('planId') ||
      request.nextUrl.searchParams.has('trainerId')
    ));

  if (hasSSOParams && !request.nextUrl.pathname.startsWith('/api/auth/sso')) {
    const ssoUrl = request.nextUrl.clone();
    ssoUrl.pathname = '/api/auth/sso';
    return NextResponse.redirect(ssoUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  const createRedirectResponse = (targetPath: string) => {
    const url = targetPath === '/login'
      ? (() => {
          const nextUrl = request.nextUrl.clone();
          nextUrl.pathname = '/login';
          const fullPath = request.nextUrl.pathname + request.nextUrl.search;
          if (fullPath !== '/' && !fullPath.startsWith('/login')) {
            nextUrl.searchParams.set('returnTo', fullPath);
          }
          return nextUrl;
        })()
      : new URL(targetPath, request.url);

    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  };

  const normalizeRoleRoute = (rawRole?: string | null) => {
    const cleaned = (rawRole || 'customer').toLowerCase().trim().replace(/[-_]/g, '');
    if (cleaned === 'individual' || cleaned === 'customer') return 'customer';
    if (cleaned === 'globaltrainer') return 'globaltrainer';
    if (cleaned === 'gymtrainer' || cleaned === 'trainer') return 'trainer';
    if (cleaned === 'gymowner' || cleaned === 'owner') return 'owner';
    if (cleaned === 'superadmin') return 'superadmin';
    return cleaned || 'customer';
  };

  if (!user && !isAuthPage) {
    return createRedirectResponse('/login');
  }

  if (user && isAuthPage && !request.nextUrl.searchParams.has('role')) {
    const returnTo = request.nextUrl.searchParams.get('returnTo');
    if (returnTo && returnTo.startsWith('/') && !returnTo.startsWith('//') && !returnTo.startsWith('/login')) {
      const targetReturn = returnTo.startsWith('/individual')
        ? returnTo.replace(/^\/individual/, '/customer')
        : returnTo;
      return createRedirectResponse(targetReturn);
    }
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('userId', user.id)
      .single();
    const role = normalizeRoleRoute(userData?.role);
    if (role === 'superadmin') return createRedirectResponse('/superadmin');
    else if (role === 'owner') return createRedirectResponse('/owner');
    else if (role === 'trainer') return createRedirectResponse('/trainer');
    else if (role === 'globaltrainer') return createRedirectResponse('/globaltrainer');
    else if (role === 'customer') return createRedirectResponse('/customer');
    else return createRedirectResponse('/');
  }

  if (user && !isAuthPage) {
    const { data: userData } = await supabase
      .from('users')
      .select('role, isEmailVerified')
      .eq('userId', user.id)
      .single();
    const role = normalizeRoleRoute(userData?.role);
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/owner') && role !== 'owner') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/trainer') && role !== 'trainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/globaltrainer') && role !== 'globaltrainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/customer') && role !== 'customer') return createRedirectResponse('/' + role);
  }

  return supabaseResponse;
}

