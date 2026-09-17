import { type NextRequest } from 'next/server';
import { updateSession } from './app/api/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/owner/:path*',
    '/trainer/:path*',
    '/globaltrainer/:path*',
    '/customer/:path*',
    '/login'
  ],
};
