import { NextResponse } from 'next/server';
import packageJson from '../../package.json';
import { serviceConfig } from '@/config/serviceConfig';

function collectVersionPayload() {
  return {
    service: serviceConfig.SERVICE_ID,
    version: packageJson.version
  };
}

export async function GET() {
  return NextResponse.json(collectVersionPayload());
}

export type VersionPayload = ReturnType<typeof collectVersionPayload>;
