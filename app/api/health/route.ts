export { GET, dynamic } from '../../health/route';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', ts: new Date().toISOString() });
}
