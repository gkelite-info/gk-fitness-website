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
  if (accessToken && !request.nextUrl.pathname.startsWith('/api/auth/sso')) {
    const ssoUrl = request.nextUrl.clone();
    ssoUrl.pathname = '/api/auth/sso';
    return NextResponse.redirect(ssoUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  const createRedirectResponse = (targetPath: string) => {
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    if (targetPath === '/login') {
      const fullPath = request.nextUrl.pathname + request.nextUrl.search;
      if (fullPath !== '/' && fullPath !== '/login') {
        url.searchParams.set('returnTo', fullPath);
      }
    }
    const redirectResponse = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  };

  if (!user && !isAuthPage) {
    return createRedirectResponse('/login');
  }

  if (user && isAuthPage && !request.nextUrl.searchParams.has('role')) {
    const returnTo = request.nextUrl.searchParams.get('returnTo');
    if (returnTo && returnTo.startsWith('/') && returnTo !== '/login') {
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
<<<<<<< Updated upstream
      
    const rawRole = userData?.role || 'customer';
    const role = rawRole === 'individual' ? 'customer' : rawRole;
    
=======

    const role = userData?.role === 'individual' ? 'customer' : (userData?.role === 'global_trainer' ? 'globaltrainer' : (userData?.role || 'customer'));

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      
    const rawRole = userData?.role || 'customer';
    const role = rawRole === 'individual' ? 'customer' : rawRole;

=======

    const role = userData?.role === 'individual' ? 'customer' : (userData?.role === 'global_trainer' ? 'globaltrainer' : (userData?.role || 'customer'));
>>>>>>> Stashed changes
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/owner') && role !== 'owner') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/trainer') && role !== 'trainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/globaltrainer') && role !== 'globaltrainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/customer') && role !== 'customer') return createRedirectResponse('/' + role);
  }

  return supabaseResponse;
}

