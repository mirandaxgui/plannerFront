  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    base: '/plannerApi/',
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://18.230.184.125:8080',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
