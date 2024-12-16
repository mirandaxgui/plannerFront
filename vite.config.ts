import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/plannerFront/',  // Base URL correta
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://guiplanner.hopto.org:443',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
