import process from 'node:process';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss()],
  define: {
    'process.env': {
      BASE_URL: process.env.BASE_URL,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
