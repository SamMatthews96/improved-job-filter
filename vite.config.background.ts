import { defineConfig } from 'vite'
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
        background: 'src/background.ts',
      },
      output: {
        entryFileNames: 'background.js',
      },
    },
    commonjsOptions: {
      include: [/node_modules/], // Include dependencies in the bundle
      // format: 'iife',
    },
  },
})
