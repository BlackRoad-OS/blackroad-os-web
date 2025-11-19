import { appConfig } from '@/config';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface CoreRequestOptions extends RequestInit {
  path: string;
  method?: HttpMethod;
}

interface ErrorShape {
  message: string;
  status: number;
}

export async function coreRequest<T>(options: CoreRequestOptions): Promise<T> {
  const { path, method = 'GET', headers, ...rest } = options;
  const url = new URL(path, appConfig.publicCoreApiUrl);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {})
      },
      ...rest
    });

    if (!response.ok) {
      const errorBody = (await safeJson(response)) as ErrorShape | null;
      const message = errorBody?.message ?? `Core API error (${response.status})`;
      throw new Error(message);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (appConfig.isDevelopment) {
      // eslint-disable-next-line no-console
      console.error('Core request failed', error);
    }
    throw error;
  }
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch (error) {
    if (appConfig.isDevelopment) {
      // eslint-disable-next-line no-console
      console.warn('Unable to parse JSON response', error);
    }
    return null;
  }
}
