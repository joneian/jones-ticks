import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
          name: 'Jones Ticks',
          short_name: 'Jones Ticks',
          description: 'An application for the Jones family to track chores',
          theme_color: '#ffffff',
          icons: [
            {
                src: 'checkmark-small.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
              src: 'checkmark.png',
              sizes: '512x512',
              type: 'image/png',
            }
          ],
      },
  })
  ],
})

