import { NextResponse } from 'next/server';
import { appConfig } from '@/config';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: appConfig.env
  });
}
