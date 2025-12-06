import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Removed 'external' and 'rollupOptions' to force bundling of all dependencies.
    // This fixes the "Black Screen" on Netlify by ensuring React/Three.js are included in the file.
  }
})