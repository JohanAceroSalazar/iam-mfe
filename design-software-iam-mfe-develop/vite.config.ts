import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const iamTarget = env.IAM_API_PROXY_TARGET || 'http://localhost:18081';

  return {
    plugins: [
      react(),
      federation({
        name: 'iamMfe',
        filename: 'remoteEntry.js',
        exposes: {
          './App': './src/App.tsx',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.3.1' },
          'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
          'react-router-dom': { singleton: true, requiredVersion: '^6.26.0' },
        },
      }),
    ],
    server: {
      port: 5101,
      proxy: {
        '/api/v1/auth': { target: iamTarget, changeOrigin: true },
      },
    },
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.test.{ts,tsx}'],
    },
  };
});
