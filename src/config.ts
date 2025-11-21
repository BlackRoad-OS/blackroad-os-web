export type NodeEnvironment = 'development' | 'staging' | 'production';

const allowedEnvironments: NodeEnvironment[] = ['development', 'staging', 'production'];
const rawNodeEnv = process.env.NODE_ENV ?? 'development';
const env: NodeEnvironment = allowedEnvironments.includes(rawNodeEnv as NodeEnvironment)
  ? (rawNodeEnv as NodeEnvironment)
  : 'development';

function getEnv(key: string, required: boolean = false): string {
  const value = process.env[key];

  // Only throw during runtime (not during build) for missing required vars
  if (required && !value && env !== 'development' && typeof window !== 'undefined') {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? '';
}

export const appConfig = {
  env,
  nodeEnv: env,
  isDevelopment: env === 'development',
  coreApiUrl: getEnv('CORE_API_URL'),
  publicCoreApiUrl: getEnv('NEXT_PUBLIC_CORE_API_URL'),
  publicWebUrl: getEnv('PUBLIC_WEB_URL'),
  publicConsoleUrl: getEnv('PUBLIC_CONSOLE_URL'),
  publicDocsUrl: getEnv('PUBLIC_DOCS_URL'),
  nextPublicConsoleUrl: getEnv('NEXT_PUBLIC_CONSOLE_URL'),
  nextPublicDocsUrl: getEnv('NEXT_PUBLIC_DOCS_URL')
};

export type AppConfig = typeof appConfig;
