import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session cookie
  const sessionCookie = request.cookies.get('lena-link-session');
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/login', 
    '/auth/register', 
    '/',
    '/search',
    '/seat-selection',
    '/insurance-selection',
    '/booking',
    '/payment',
    '/confirmation'
  ];
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || 
    pathname.startsWith(route + '/') ||
    pathname.startsWith('/api/auth/')
  );
  
  // If accessing a protected route without session, redirect to login
  if (!isPublicRoute && !sessionCookie) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing auth pages while already logged in, redirect to appropriate dashboard
  if ((pathname === '/auth/login' || pathname === '/auth/register') && sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session?.user?.role) {
        return NextResponse.redirect(new URL(`/dashboard/${session.user.role}`, request.url));
      }
    } catch {
      // Invalid session, continue
    }
  }
  
  // Role-based access control for dashboard routes
  if (pathname.startsWith('/dashboard/')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    try {
      const session = JSON.parse(sessionCookie.value);
      const requestedRole = pathname.split('/dashboard/')[1]?.split('/')[0];
      
      if (session?.user?.role && session.user.role !== requestedRole) {
        // User is trying to access a different role's dashboard
        return NextResponse.redirect(new URL(`/dashboard/${session.user.role}`, request.url));
      }
    } catch {
      // Invalid session, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  
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

