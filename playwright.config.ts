import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.ts', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    { command: 'node tests/mock-gallery.mjs', url: 'http://127.0.0.1:3201/health', reuseExistingServer: false },
    { command: 'npm run dev -- --hostname 127.0.0.1 --port 3100', url: 'http://127.0.0.1:3100', timeout: 120000, reuseExistingServer: false,
      env: { NEXT_PUBLIC_SUPABASE_URL: 'http://127.0.0.1:3201', NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-public-key', SUPABASE_SERVICE_ROLE_KEY: '', NEXT_PUBLIC_SITE_URL: '', INSTAGRAM_ACCESS_TOKEN: '', RESEND_API_KEY: '', CONTACT_FROM_EMAIL: '', NEXT_TELEMETRY_DISABLED: '1' } },
  ],
});
