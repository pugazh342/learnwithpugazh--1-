import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/__/auth': {
        target: 'https://focal-theory-lpthm.firebaseapp.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase-firestore': ['firebase/firestore'],
          'vendor-firebase-auth': ['firebase/app', 'firebase/auth'],
          'vendor-ui': ['lucide-react', 'motion'],
        },
      },
    },
  },
});
