import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    cssInjectedByJsPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        content: 'src/test.ts', // Build `main.js` as the content script
        main: 'main.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Dynamically name files based on their entry point
          if (chunkInfo.name === 'content') {
            return 'test.js'; // Output content script as `main.js`
          }
          if (chunkInfo.name === 'main') {
            return 'main.js'; // Output background script into `background/`
          }
          return '[name].js'; // Default naming for other files
        },
      },

      external: []
    },
    commonjsOptions: {
      include: [/node_modules/], // Include dependencies in the bundle
      // format: 'iife',
    },
  },

})
