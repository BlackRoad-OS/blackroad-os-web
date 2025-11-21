import { NextResponse } from 'next/server';
import { osServices } from '@/config/services';

const STATUS_TIMEOUT_MS = 4000;

async function checkServiceHealth(service: (typeof osServices)[number]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STATUS_TIMEOUT_MS);

  let status: 'up' | 'down' = 'down';

  try {
    const response = await fetch(service.healthUrl, {
      cache: 'no-store',
      signal: controller.signal
    });

    status = response.ok ? 'up' : 'down';
  } catch (error) {
    // swallow error and mark as down
    status = 'down';
  } finally {
    clearTimeout(timeout);
  }

  return {
    id: service.id,
    status,
    lastCheckedAt: new Date().toISOString()
  };
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const results = await Promise.all(osServices.map((service) => checkServiceHealth(service)));

  return NextResponse.json({
    services: results
  });
}
