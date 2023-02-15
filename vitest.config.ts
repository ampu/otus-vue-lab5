import {fileURLToPath, URL} from 'node:url'
import {configDefaults, defineConfig} from 'vitest/config'
import svgLoader from 'vite-svg-loader'
// @ts-ignore
import veauryVitePlugins from 'veaury/vite'

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
  root: `src`,
  test: {
    globals: true,
    environment: `jsdom`,
    exclude: [...configDefaults.exclude, `**/e2e/**`],
    setupFiles: [`setup-tests.ts`],
  },
})
