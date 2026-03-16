import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['vite.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          name: 'Profind',
          short_name: 'Profind',
          description: 'Profind real estate platform',
          theme_color: '#16a34a',
          background_color: '#ffffff',
          display: 'standalone',
          scope: base,
          start_url: base,
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
        }
      }),
    ],
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
      globals: true
    },
    server: {
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3001',
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            map: ['leaflet', 'react-leaflet'],
            charts: ['recharts'],
            motion: ['framer-motion']
          }
        }
      }
    }
  }
})
