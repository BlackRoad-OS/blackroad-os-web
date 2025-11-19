import { appConfig } from '@/config';

type TelemetryPayload = Record<string, unknown>;

export function logEvent(name: string, payload: TelemetryPayload = {}) {
  if (appConfig.isDevelopment) {
    // eslint-disable-next-line no-console
    console.debug(`[telemetry] ${name}`, payload);
  }
  // Hook point for production analytics provider.
}
