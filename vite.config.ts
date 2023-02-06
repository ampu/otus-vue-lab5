import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import svgLoader from 'vite-svg-loader'
// @ts-ignore
import veauryVitePlugins from 'veaury/vite'

console.log(process.env.BASE_URL)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    veauryVitePlugins({
      type: `vue`,
    }),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: `build`,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/mixins";',
      },
    },
  },
})
