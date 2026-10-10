import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  const createRedirectResponse = (pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    const redirectResponse = NextResponse.redirect(url);
    
    // Important: Keep any cookies (like refreshed auth tokens) set by Supabase
    supabaseResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        redirectResponse.headers.append('set-cookie', value);
      }
    });
    
    return redirectResponse;
  };

  if (!user && !isAuthPage) {
    return createRedirectResponse('/login');
  }

  if (user && isAuthPage) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('userId', user.id)
      .single();
      
    const role = userData?.role || 'customer';
    
    if (role === 'superadmin') return createRedirectResponse('/superadmin');
    else if (role === 'owner') return createRedirectResponse('/owner');
    else if (role === 'trainer') return createRedirectResponse('/trainer');
    else if (role === 'globaltrainer') return createRedirectResponse('/globaltrainer');
    else if (role === 'customer') return createRedirectResponse('/customer');
    else return createRedirectResponse('/');
  }

  const pathname = request.nextUrl.pathname;
  if (user && !isAuthPage) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('userId', user.id)
      .single();
      
    const role = userData?.role || 'customer';
    
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/owner') && role !== 'owner') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/trainer') && role !== 'trainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/globaltrainer') && role !== 'globaltrainer') return createRedirectResponse('/' + role);
    if (pathname.startsWith('/customer') && role !== 'customer') return createRedirectResponse('/' + role);
  }

  return supabaseResponse;
}
