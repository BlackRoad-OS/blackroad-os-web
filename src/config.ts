export type NodeEnvironment = 'development' | 'staging' | 'production';

const isServer = typeof window === 'undefined';

function requireEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    if (isServer) {
      throw new Error(`Missing required environment variable: ${key}`);
    }

    return '';
  }

  return value;
}

const rawNodeEnv = process.env.NODE_ENV ?? 'development';
const nodeEnv: NodeEnvironment = ['development', 'staging', 'production'].includes(rawNodeEnv)
  ? (rawNodeEnv as NodeEnvironment)
  : 'development';

export const appConfig = {
  nodeEnv,
  isDevelopment: nodeEnv === 'development',
  coreApiUrl: requireEnv('CORE_API_URL'),
  appUrl: requireEnv('PUBLIC_APP_URL'),
  publicCoreApiUrl: requireEnv('NEXT_PUBLIC_CORE_API_URL'),
  publicAppUrl: requireEnv('NEXT_PUBLIC_APP_URL')
};

export type AppConfig = typeof appConfig;
