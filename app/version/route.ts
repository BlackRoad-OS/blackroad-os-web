import { NextResponse } from 'next/server';
import packageJson from '../../package.json';
import { appConfig } from '@/config';
import { serviceConfig } from '@/config/serviceConfig';

function collectVersionPayload() {
  const commitSha =
    process.env.RAILWAY_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    '';

  const buildTime = process.env.RAILWAY_BUILD_TIMESTAMP || process.env.BUILD_TIME || '';

  return {
    service: serviceConfig.SERVICE_ID,
    name: serviceConfig.SERVICE_NAME,
    appVersion: packageJson.version,
    commit: commitSha,
    buildTime,
    environment: appConfig.env,
    ts: new Date().toISOString()
  };
}

export async function GET() {
  return NextResponse.json(collectVersionPayload());
}

export type VersionPayload = ReturnType<typeof collectVersionPayload>;
