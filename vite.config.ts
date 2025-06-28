import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/qr-code-generator/',
  server: {
    port: 5156,
    host: true,
  },
  preview: {
    port: 5156,
    host: true,
  },
});
