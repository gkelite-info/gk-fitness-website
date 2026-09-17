import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

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

  // This will refresh the session if expired and issue new tokens in cookies
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!user && !isAuthPage) {
    // Redirect unauthenticated users to login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    // User is logged in but trying to access the login page
    // Fetch the user's role to redirect them to the correct dashboard
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('userId', user.id)
      .single();
      
    const role = userData?.role || 'customer';
    const url = request.nextUrl.clone();
    
    if (role === 'superadmin') url.pathname = '/superadmin';
    else if (role === 'owner') url.pathname = '/owner';
    else if (role === 'trainer') url.pathname = '/trainer';
    else if (role === 'globaltrainer') url.pathname = '/globaltrainer';
    else if (role === 'customer') url.pathname = '/customer';
    else url.pathname = '/';
    
    return NextResponse.redirect(url);
  }

  // Also protect the routes based on role (optional, but good for SaaS)
  const pathname = request.nextUrl.pathname;
  if (user && !isAuthPage) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('userId', user.id)
      .single();
      
    const role = userData?.role || 'customer';
    
    // Prevent access to other portals
    if (pathname.startsWith('/superadmin') && role !== 'superadmin') return NextResponse.redirect(new URL('/' + role, request.url));
    if (pathname.startsWith('/owner') && role !== 'owner') return NextResponse.redirect(new URL('/' + role, request.url));
    if (pathname.startsWith('/trainer') && role !== 'trainer') return NextResponse.redirect(new URL('/' + role, request.url));
    if (pathname.startsWith('/globaltrainer') && role !== 'globaltrainer') return NextResponse.redirect(new URL('/' + role, request.url));
    if (pathname.startsWith('/customer') && role !== 'customer') return NextResponse.redirect(new URL('/' + role, request.url));
  }

  return supabaseResponse;
}
