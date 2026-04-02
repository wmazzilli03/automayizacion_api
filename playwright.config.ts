import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 4,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], // puedes cambiarlo a 'dot' o quitarlo si no lo quieres en consola
    ['junit', { outputFile: 'junit/test-results.xml' }],
    ['allure-playwright'],
  ],
});
