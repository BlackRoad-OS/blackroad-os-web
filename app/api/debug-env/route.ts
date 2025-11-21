import { NextResponse } from 'next/server';
import { serviceConfig } from '@/config/serviceConfig';

const safeEnvKeys = [
  'NODE_ENV',
  'NEXT_PUBLIC_CORE_API_URL',
  'NEXT_PUBLIC_CONSOLE_URL',
  'NEXT_PUBLIC_DOCS_URL',
  'NEXT_PUBLIC_SERVICE_ID',
  'NEXT_PUBLIC_SERVICE_NAME'
];

export async function GET() {
  const envPayload = safeEnvKeys.reduce<Record<string, string | undefined>>((acc, key) => {
    acc[key] = process.env[key];
    return acc;
  }, {});

  return NextResponse.json({
    service: serviceConfig.SERVICE_ID,
    env: envPayload,
    ts: new Date().toISOString()
  });
}
