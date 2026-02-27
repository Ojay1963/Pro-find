import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
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
  }
})
