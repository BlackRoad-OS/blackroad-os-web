/**
 * Host/Domain constants for BlackRoad Universe routing
 *
 * Universe v2.0 - Five Doors:
 * 1. blackroad.io       → Marketing (root)
 * 2. app.blackroad.io   → User Workspace
 * 3. console.blackroad.io → Operator Console
 * 4. docs.blackroad.io  → Developer Hub
 * 5. lucidia.earth      → Lore/Education
 */

// Primary domains
export const PRIMARY_DOMAIN = 'blackroad.io';
export const WWW_DOMAIN = 'www.blackroad.io';

// App subdomains (blackroad.io)
export const APP_DOMAIN = 'app.blackroad.io';
export const CONSOLE_DOMAIN = 'console.blackroad.io';
export const DOCS_DOMAIN = 'docs.blackroad.io';

// External domains (separate TLDs)
export const LUCIDIA_DOMAIN = 'lucidia.earth';

// Route mappings: domain → internal route
export const HOST_ROUTES: Record<string, string> = {
  [APP_DOMAIN]: '/workspace',
  [CONSOLE_DOMAIN]: '/console',
  [DOCS_DOMAIN]: '/docs',
  [LUCIDIA_DOMAIN]: '/lucidia',
};

// For local development - these hosts serve marketing by default
export const MARKETING_HOSTS = [PRIMARY_DOMAIN, WWW_DOMAIN, 'localhost'];

/**
 * Check if a hostname should be treated as marketing (root domain)
 */
export function isMarketingHost(hostname: string): boolean {
  return (
    MARKETING_HOSTS.some((h) => hostname.includes(h)) ||
    hostname.startsWith('127.0.0.1')
  );
}

/**
 * Get the route rewrite for a given hostname
 */
export function getRouteForHost(hostname: string): string | null {
  // Check for exact domain match first (for lucidia.earth)
  for (const [domain, route] of Object.entries(HOST_ROUTES)) {
    if (hostname === domain || hostname.endsWith(`.${domain}`)) {
      return route;
    }
  }

  // Check subdomain prefix (for blackroad.io subdomains)
  const subdomain = hostname.split('.')[0];
  for (const [domain, route] of Object.entries(HOST_ROUTES)) {
    if (domain.startsWith(`${subdomain}.`)) {
      return route;
    }
  }

  return null;
}
