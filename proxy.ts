import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for Next.js 16+
 * Handles routing, redirects, and URL rewriting only.
 * Security checks should be done in page components and API routes.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session cookie for routing decisions only (not security)
  const sessionCookie = request.cookies.get('lena-link-session');
  
  // Redirect authenticated users away from auth pages to their dashboard
  // This is routing logic, not security - security is handled in page components
  if ((pathname === '/auth/login' || pathname === '/auth/register') && sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session?.user?.role) {
        return NextResponse.redirect(new URL(`/dashboard/${session.user.role}`, request.url));
      }
    } catch {
      // Invalid session, continue to page (page will handle security)
    }
  }
  
  // All other routing decisions are handled by page components
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

