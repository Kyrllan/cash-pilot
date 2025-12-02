// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Cash Pilot',
      meta: [
        { name: 'description', content: 'Cash Pilot is a cash management tool that helps you keep track of your cash flow.' },
        { name: 'theme-color', content: '#02DF72' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Cash Pilot' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/pwa-180x180.png' }
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/auth/callback',
      exclude: ['/auth', '/auth/**']
    },
    types: "app/supabase/types.ts"
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY || ''
      }
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: { enabled: true },
    registerWebManifestInRouteRules: true,
    manifest: {
      name: 'Cash Pilot',
      short_name: 'Cash Pilot',
      theme_color: '#02DF72',
      background_color: '#02DF72',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://example.com/.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400,
            },
          },
        },
      ],
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode'
  },
})