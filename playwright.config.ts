import {defineConfig, devices} from '@playwright/test';

const PORT = process.env.CI ? 3001 : 3000;
export default defineConfig({
  testDir: './e2e',
  retries: process.env.CI ? 1 : 0,
  fullyParallel: true,

  webServer: {
    command: `pnpm start --port ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
});
