import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // FTP için göreceli yollar
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
