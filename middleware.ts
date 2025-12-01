import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Host-based routing middleware for BlackRoad Universe
 *
 * Routes:
 * - blackroad.io / www.blackroad.io → / (marketing)
 * - app.blackroad.io → /workspace
 * - console.blackroad.io → /console
 * - docs.blackroad.io → /docs
 *
 * Local development (localhost) passes through without rewrites
 * so you can manually navigate to /workspace, /console, etc.
 */

const HOST_REWRITES: Record<string, string> = {
  app: '/workspace',
  console: '/console',
  docs: '/docs',
};

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like .js, .css, .ico, etc.
  ) {
    return NextResponse.next();
  }

  // Local development: don't rewrite, allow manual navigation
  if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  // Extract subdomain from hostname
  // e.g., "app.blackroad.io" → "app"
  // e.g., "console.blackroad.io" → "console"
  const subdomain = hostname.split('.')[0];

  // Check if this subdomain should be rewritten
  const targetRoute = HOST_REWRITES[subdomain];

  if (targetRoute) {
    // Only rewrite root path to the target route
    // Allow deeper paths to pass through
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = targetRoute;
      return NextResponse.rewrite(url);
    }

    // For app/console subdomains, if they're hitting a path that doesn't
    // start with the target route, prefix it
    // e.g., app.blackroad.io/settings → /workspace/settings
    if (!pathname.startsWith(targetRoute)) {
      const url = request.nextUrl.clone();
      url.pathname = `${targetRoute}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
  ],
};
