// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8080/api",
      fakeAuth: true
    }
  },
  css: [
    '@/assets/css/tailwind.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  devServer: {
    port: 8000
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  i18n: {
    defaultLocale: 'fr',
    restructureDir: './app',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  pinia: {
    storesDirs: ['./app/stores']
  },
})