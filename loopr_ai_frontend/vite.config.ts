import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
          utils: ['date-fns', 'axios']
        }
      },
      maxParallelFileOps: 2,
    },
    chunkSizeWarningLimit: 1600,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material']
  }
})
