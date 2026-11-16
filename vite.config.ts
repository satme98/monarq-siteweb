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
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor split: framework bundle
          'vendor-react': ['react', 'react-dom'],
          // Animation bundle — loaded with app but separated for caching
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
        },
      },
    },
  },
});
