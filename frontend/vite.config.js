import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@/components': resolve(dirname(fileURLToPath(import.meta.url)), 'src/components'),
      '@/pages': resolve(dirname(fileURLToPath(import.meta.url)), 'src/pages'),
      '@/services': resolve(dirname(fileURLToPath(import.meta.url)), 'src/services'),
    },
  },
})
