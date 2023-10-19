import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      manifest: true,
      target: 'esnext',
    },
    css: {
      devSourcemap: mode !== 'production',
    },
    envDir: 'environment',
    plugins: [
      compression(),
      /*
      eslint({
        cache: false,
        failOnWarning: false,
        include: ['src'],
      }),
       */
      react({}),
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      cors: true,
      open: true,
    },
    test: {
      clearMocks: true,
      environment: 'happy-dom',
      include: ['./src/**/*.test.{ts,tsx}'],
      setupFiles: ['./test/setupTests.ts'],
    },
  };
});
