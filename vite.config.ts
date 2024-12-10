import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/plannerFront/', // Deve corresponder ao "homepage" no package.json
});
