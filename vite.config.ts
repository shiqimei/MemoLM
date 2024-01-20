import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import svg from 'vite-plugin-solid-svg'

export default defineConfig({
  plugins: [solid(), svg()],
  server: {
    proxy: {
      '/api': {
        target: 'https://memolm-api.askcodebase.workers.dev/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
