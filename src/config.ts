export type NodeEnvironment = 'development' | 'staging' | 'production';

const allowedEnvironments: NodeEnvironment[] = ['development', 'staging', 'production'];
const rawNodeEnv = process.env.NODE_ENV ?? 'development';
const env: NodeEnvironment = allowedEnvironments.includes(rawNodeEnv as NodeEnvironment)
  ? (rawNodeEnv as NodeEnvironment)
  : 'development';

function getEnv(key: string, required: boolean = false): string {
  const value = process.env[key];

  // Don't validate during build - only at runtime
  // In Next.js, during build, we're in Node.js environment but not serving requests
  if (required && !value && env !== 'development' && process.env.NEXT_PHASE !== 'phase-production-build') {
    console.warn(`Missing environment variable: ${key}`);
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
