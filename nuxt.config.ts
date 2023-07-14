// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig : {
    public: {
      WEATHER_APP_SECRET: process.env.WEATHER_APP_SECRET
    }    
  },

  css: [
    "~/assets/css/tailwind.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
