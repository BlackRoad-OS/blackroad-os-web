import packageJson from '../../package.json';
import { appConfig } from '@/config';
import { serviceConfig } from '@/config/serviceConfig';

const startedAt = Date.now();

function resolveGitCommit() {
  return process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || process.env.NEXT_PUBLIC_GIT_SHA;
}

function resolveBuildTime() {
  return process.env.BUILD_TIMESTAMP || process.env.VERCEL_BUILD_TIMESTAMP;
}

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null)) as T;
}

export function collectVersionPayload() {
  return compact({
    service: serviceConfig.SERVICE_ID,
    name: serviceConfig.SERVICE_NAME,
    version: packageJson.version,
    environment: appConfig.env,
    gitCommit: resolveGitCommit(),
    buildTime: resolveBuildTime()
  });
}

export function collectHealthPayload() {
  return {
    ...collectVersionPayload(),
    status: 'ok' as const,
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime() * 1000) / 1000,
    startedAt: new Date(startedAt).toISOString()
  };
}

export const identityHeaders = compact({
  'X-Agent-ID': process.env.NEXT_PUBLIC_SERVICE_ID || 'blackroad-os-web',
  'X-Service-ID': serviceConfig.SERVICE_ID,
  'X-Service-Name': serviceConfig.SERVICE_NAME,
  'X-PS-SHA∞': process.env.PS_SHA_INFINITY
});

export type VersionPayload = ReturnType<typeof collectVersionPayload>;
export type HealthPayload = ReturnType<typeof collectHealthPayload>;
