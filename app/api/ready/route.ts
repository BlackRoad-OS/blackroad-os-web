import { NextResponse } from 'next/server';
import { identityHeaders } from '../../../src/lib/observability';

export async function GET() {
  // Basic readiness check - returns ready:true if the app is running
  // No external network calls as per spec
  const payload = {
    ready: true,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, { headers: identityHeaders });
}
