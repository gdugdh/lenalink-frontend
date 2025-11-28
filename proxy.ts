import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Proxy for Next.js 16+
 * Handles routing, redirects, and URL rewriting only.
 * Security checks are done in page components and API routes.
 * 
 * Note: Auth pages handle their own redirects via redirectIfAuthenticated()
 * so we don't need to duplicate that logic here.
 */
export function proxy(request: NextRequest) {
  // All routing decisions are handled by page components
  // This proxy can be used for other routing needs in the future
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Only match auth pages for potential future routing needs
     * Most routing is handled by page components
     */
    '/auth/:path*',
  ],
};

