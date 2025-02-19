import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Orchard Eyes',
        short_name: 'Orchy',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/logo-small.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // Limit caching to 5MB per file
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/orchardeyes-api\.vercel\.app\/.*/, // Cache API responses
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/, // Cache images separately
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 604800 }
            }
          }
        ]
      }
    })
  ],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  server: {
    host: '0.0.0.0' // Allows connections from other devices
  }
})
