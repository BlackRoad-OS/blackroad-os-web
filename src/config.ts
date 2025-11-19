export type NodeEnvironment = 'development' | 'staging' | 'production';

const allowedEnvironments: NodeEnvironment[] = ['development', 'staging', 'production'];
const rawNodeEnv = process.env.NODE_ENV ?? 'development';
const env: NodeEnvironment = allowedEnvironments.includes(rawNodeEnv as NodeEnvironment)
  ? (rawNodeEnv as NodeEnvironment)
  : 'development';

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value && env !== 'development') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? '';
}

export const appConfig = {
  env,
  nodeEnv: env,
  isDevelopment: env === 'development',
  coreApiUrl: getEnv('CORE_API_URL'),
  appUrl: getEnv('PUBLIC_APP_URL'),
  publicCoreApiUrl: getEnv('NEXT_PUBLIC_CORE_API_URL'),
  publicAppUrl: getEnv('NEXT_PUBLIC_APP_URL')
};

export type AppConfig = typeof appConfig;
