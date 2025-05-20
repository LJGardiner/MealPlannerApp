import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/proxy': {
        target: 'https://www.waitrose.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const match = path.match(/^\/proxy\?url=(.+)$/);
          if (!match) return path;
          const targetUrl = new URL(decodeURIComponent(match[1]));
          return targetUrl.pathname + targetUrl.search;
        },
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const match = req.url.match(/^\/proxy\?url=(.+)$/);
            if (match) {
              const targetUrl = new URL(decodeURIComponent(match[1]));
              proxyReq.setHeader('host', targetUrl.hostname);
              proxyReq.path = targetUrl.pathname + targetUrl.search;
            }
          });
        },
      },
    },
  },
});
