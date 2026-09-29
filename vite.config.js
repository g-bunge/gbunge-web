import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // served from a sub-path when BASE_PATH is set (GitHub Pages: /gbunge-web/); the root otherwise
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
