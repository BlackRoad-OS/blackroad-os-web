import { NextResponse } from 'next/server';
import packageJson from '../../../package.json';
import { appConfig } from '@/config';
import { serviceConfig } from '@/config/serviceConfig';

export async function GET() {
  return NextResponse.json({
    service: serviceConfig.SERVICE_ID,
    version: packageJson.version,
    environment: appConfig.env,
    links: {
      core: 'https://core.blackroad.systems/health',
      operator: 'https://operator.blackroad.systems/health',
      console: 'https://console.blackroad.systems',
      docs: 'https://docs.blackroad.systems'
    }
  });
}
