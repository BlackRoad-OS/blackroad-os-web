import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Host-based routing middleware for BlackRoad Universe v2.0
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                    UNIVERSE ROUTING TABLE                    │
 * ├─────────────────────────┬───────────────┬───────────────────┤
 * │ Domain                  │ Route         │ Description       │
 * ├─────────────────────────┼───────────────┼───────────────────┤
 * │ blackroad.io            │ /             │ Marketing         │
 * │ www.blackroad.io        │ /             │ Marketing         │
 * │ app.blackroad.io        │ /workspace    │ User Workspace    │
 * │ console.blackroad.io    │ /console      │ Operator Console  │
 * │ docs.blackroad.io       │ /docs         │ Developer Hub     │
 * │ lucidia.earth           │ /lucidia      │ Lore/Education    │
 * └─────────────────────────┴───────────────┴───────────────────┘
 *
 * Local Development:
 * - localhost passes through WITHOUT rewrites
 * - Manually navigate to /workspace, /console, /docs, /lucidia
 */

// Subdomain-based rewrites (blackroad.io subdomains)
const SUBDOMAIN_REWRITES: Record<string, string> = {
  app: '/workspace',
  console: '/console',
  docs: '/docs',
};

// Full domain rewrites (external TLDs)
const DOMAIN_REWRITES: Record<string, string> = {
  'lucidia.earth': '/lucidia',
};

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // ─────────────────────────────────────────────────────────────
  // SKIP: Static assets, API routes, Next.js internals
  // ─────────────────────────────────────────────────────────────
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files like .js, .css, .ico, etc.
  ) {
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────────────────────
  // LOCAL DEV: Don't rewrite, allow manual navigation
  // ─────────────────────────────────────────────────────────────
  if (hostname === 'localhost' || hostname.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  // ─────────────────────────────────────────────────────────────
  // EXTERNAL DOMAINS: Check for full domain matches (lucidia.earth)
  // ─────────────────────────────────────────────────────────────
  for (const [domain, targetRoute] of Object.entries(DOMAIN_REWRITES)) {
    if (hostname === domain || hostname.endsWith(`.${domain}`)) {
      return rewriteToRoute(request, pathname, targetRoute);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // SUBDOMAINS: Check for subdomain prefix (app., console., docs.)
  // ─────────────────────────────────────────────────────────────
  const subdomain = hostname.split('.')[0];
  const targetRoute = SUBDOMAIN_REWRITES[subdomain];

  if (targetRoute) {
    return rewriteToRoute(request, pathname, targetRoute);
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT: Pass through (marketing on blackroad.io)
  // ─────────────────────────────────────────────────────────────
  return NextResponse.next();
}

/**
 * Rewrite a request to a target route
 * - Root path (/) → target route
 * - Other paths → prefix with target route if not already prefixed
 */
function rewriteToRoute(
  request: NextRequest,
  pathname: string,
  targetRoute: string
): NextResponse {
  // Root path: rewrite to target route
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = targetRoute;
    return NextResponse.rewrite(url);
  }

  // Already on the target route: pass through
  if (pathname.startsWith(targetRoute)) {
    return NextResponse.next();
  }

  // Other paths: prefix with target route
  // e.g., app.blackroad.io/settings → /workspace/settings
  const url = request.nextUrl.clone();
  url.pathname = `${targetRoute}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (anything with a file extension)
     * - API routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api/).*)',
  ],
};
