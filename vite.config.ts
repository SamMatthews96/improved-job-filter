import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    cssInjectedByJsPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup.ts',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return '[name].js';
        },
      },

      external: []
    },
    commonjsOptions: {
      include: [/node_modules/], // Include dependencies in the bundle
    },
  },

})
