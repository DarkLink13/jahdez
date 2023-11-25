// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: true,
  typescript: {
    strict: true,
  },
  modules: [
    "@vite-pwa/nuxt",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "nuxt-edgedb-module",
    "@nuxt/ui",
  ],
  components: {
    dirs: [{ path: "components/base/", prefix: "b" }, { path: "components" }],
  },
  css: ["/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  edgeDb: {
    auth: true,
    oauth: false,
  },
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "i18n/en.js",
      },
      {
        code: "es",
        iso: "es-ES",
        file: "i18n/es.js",
      },
    ],

    defaultLocale: "en",
  },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
  },
});
