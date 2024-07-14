import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['src/**'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/**/types.ts',
      ],
    },
  },
});
