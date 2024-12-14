import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    // build: {
    //   outDir: 'dist/main',

    //   rollupOptions: {
    //     external: ['sqlite3']
    //   }
    // }
  },
  preload: {
    // build: {
    //   outDir: 'dist/preload'
    // },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    // build: {
    //   outDir: 'dist/renderer'
    // },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
