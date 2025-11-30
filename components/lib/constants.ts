/**
 * Demo constants for BlackRoad OS Web
 */

export const DEFAULT_GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://api.blackroad.io';
export const DEFAULT_BEACON_URL = process.env.NEXT_PUBLIC_BEACON_URL || 'https://beacon.blackroad.io';

export const DEMO_STEPS = [
  'Authenticate with Core',
  'Register an Agent',
  'Trigger a Job',
  'Stream Beacon Events',
] as const;

export type DemoStep = (typeof DEMO_STEPS)[number];
