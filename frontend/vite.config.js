import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    react(),
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
});
