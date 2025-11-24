import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'pnpm dev --hostname 0.0.0.0 --port 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_TELEMETRY_DISABLED: '1',
      NEXT_PRIVATE_SKIP_UPDATE_CHECK: '1',
    },
  },
  testDir: './tests',
};

export default config;
