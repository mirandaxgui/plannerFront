import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/plannerFront/',  // Base URL correta
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://18.230.184.125:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

