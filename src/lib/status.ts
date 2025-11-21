export type ServiceStatus = {
  name: string;
  status: 'UP' | 'DOWN';
  lastChecked?: string;
  message?: string;
};

export type StatusResult = {
  ok: boolean;
  services: ServiceStatus[];
  checkedAt?: string;
  source: 'status' | 'health' | 'error';
  message?: string;
};

function normalizeStatusStatus(value: unknown): 'UP' | 'DOWN' {
  if (typeof value === 'string' && value.toUpperCase() === 'UP') {
    return 'UP';
  }
  return 'DOWN';
}

function buildHealthFallback(data: any): StatusResult {
  const ok = Boolean(data?.ok ?? data?.status === 'ok' ?? data?.status === 'ONLINE');
  const timestamp = data?.ts ? new Date(data.ts).toISOString() : new Date().toISOString();

  return {
    ok,
    services: [
      {
        name: data?.service || 'web',
        status: ok ? 'UP' : 'DOWN',
        lastChecked: timestamp,
        message: data?.message
      }
    ],
    checkedAt: timestamp,
    source: 'health',
    message: data?.message
  };
}

export async function fetchStatus(signal?: AbortSignal): Promise<StatusResult> {
  const endpoints = ['/api/status', '/api/health'];
  let lastError: unknown;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { cache: 'no-store', signal });
      if (!response.ok) {
        if (response.status === 404) continue;
        lastError = new Error(`Request failed with status ${response.status}`);
        continue;
      }

      const data = await response.json();

      if (endpoint.includes('/status') && Array.isArray(data?.services)) {
        const services: ServiceStatus[] = data.services.map((service: any, index: number) => ({
          name: service?.name || `service-${index + 1}`,
          status: normalizeStatusStatus(service?.status ?? (service?.ok ? 'UP' : 'DOWN')),
          lastChecked: service?.lastChecked || service?.ts,
          message: service?.message
        }));

        return {
          ok: services.every((service) => service.status === 'UP'),
          services,
          checkedAt: data?.checkedAt || data?.ts,
          source: 'status',
          message: data?.message
        };
      }

      return buildHealthFallback(data);
    } catch (error) {
      lastError = error;
      continue;
    }
  }

  return {
    ok: false,
    services: [],
    checkedAt: new Date().toISOString(),
    source: 'error',
    message: lastError instanceof Error ? lastError.message : 'Unable to fetch status'
  };
}
