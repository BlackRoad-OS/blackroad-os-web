import packageJson from '../../package.json';
import { appConfig } from '../config/index';
import { serviceConfig } from '../config/serviceConfig';

const startedAt = Date.now();

function resolveGitCommit() {
  return (
    process.env.BR_OS_WEB_COMMIT ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_GIT_SHA ||
    'UNKNOWN'
  );
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
    version: packageJson.version,
    commit: resolveGitCommit(),
    env: appConfig.env,
    name: serviceConfig.SERVICE_NAME,
    buildTime: resolveBuildTime()
  });
}

export function collectHealthPayload() {
  return {
    // Core health fields (spec-compliant)
    ok: true,
    ...collectVersionPayload(),
    timestamp: new Date().toISOString(),
    // Additional observability fields
    status: 'ok' as const,
    uptime: Math.round(process.uptime() * 1000) / 1000,
    startedAt: new Date(startedAt).toISOString()
  };
}

export const identityHeaders: Record<string, string> = compact({
  'X-Agent-ID': process.env.NEXT_PUBLIC_SERVICE_ID || 'blackroad-os-web',
  'X-Service-ID': serviceConfig.SERVICE_ID,
  'X-Service-Name': serviceConfig.SERVICE_NAME,
  'X-PS-SHA-INFINITY': process.env.PS_SHA_INFINITY
}) as Record<string, string>;

export type VersionPayload = ReturnType<typeof collectVersionPayload>;
export type HealthPayload = ReturnType<typeof collectHealthPayload>;
