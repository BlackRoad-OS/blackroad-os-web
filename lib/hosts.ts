/**
 * Host/Domain constants for BlackRoad Universe routing
 */

export const PRIMARY_DOMAIN = 'blackroad.io';
export const WWW_DOMAIN = 'www.blackroad.io';
export const APP_DOMAIN = 'app.blackroad.io';
export const CONSOLE_DOMAIN = 'console.blackroad.io';
export const DOCS_DOMAIN = 'docs.blackroad.io';

// Route mappings
export const HOST_ROUTES: Record<string, string> = {
  [APP_DOMAIN]: '/workspace',
  [CONSOLE_DOMAIN]: '/console',
  [DOCS_DOMAIN]: '/docs',
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
  for (const [domain, route] of Object.entries(HOST_ROUTES)) {
    if (hostname.includes(domain.split('.')[0])) {
      // Match subdomain prefix (e.g., "app" in "app.blackroad.io")
      return route;
    }
  }
  return null;
}
