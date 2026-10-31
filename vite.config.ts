import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Path relatif: aset tetap benar di root domain maupun di subpath
  // (mis. https://user.github.io/portfolio-site/). Referensi ke folder
  // `public/` memakai helper `asset()` di src/lib/asset.ts.
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Pisahkan runtime React supaya bundle aplikasi lebih kecil & cacheable.
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react'
          }
        },
      },
    },
  },
})
