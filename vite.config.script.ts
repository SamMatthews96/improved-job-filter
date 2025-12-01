import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: 'src/script.ts',
      },
      output: {
        entryFileNames: 'script.js'
      }
    }
  }
})