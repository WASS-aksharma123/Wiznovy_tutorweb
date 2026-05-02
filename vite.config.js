import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    envDir: './',
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            redux: ['@reduxjs/toolkit', 'react-redux'],
            icons: ['react-icons', 'lucide-react'],
            ui: ['swiper']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom']
    }
  }
})
