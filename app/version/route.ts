import { NextResponse } from 'next/server';
import { appConfig } from '@/config';
import packageJson from '../../package.json';

const serviceName = 'web-app';

export async function GET() {
  const commitSha =
    process.env.RAILWAY_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GITHUB_SHA ||
    '';

  const buildTime = process.env.RAILWAY_BUILD_TIMESTAMP || process.env.BUILD_TIME || '';

  return NextResponse.json({
    service: serviceName,
    appVersion: packageJson.version,
    commit: commitSha,
    buildTime: buildTime,
    environment: appConfig.env
  });
}
