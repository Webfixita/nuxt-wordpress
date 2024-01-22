// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      '@nuxtjs/tailwindcss',
      'nuxt-headlessui'
  ],
  runtimeConfig: {
    wpapi: process.env.API_BASE || 'fallback',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: [
    '@/assets/css/main.css',
  ]
})