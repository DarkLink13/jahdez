// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "translate", mode: "out-in" },
  },
  devtools: {
    enabled: true,
  },
  debug: true,
  typescript: {
    strict: true,
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxt/devtools",
    // "@vite-pwa/nuxt",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "nuxt-edgedb-module",
    "@nuxt/ui",
  ],
  components: {
    dirs: [{ path: "components/base/", prefix: "b" }, { path: "components" }],
  },
  ui: {
    icons: ["fluent"],
    notifications: {
      position: "top-0 right-0",
    },
  } as any,
  css: ["/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  edgeDb: {
    generateQueryBuilder: false,
    generateInterfaces: false,
    projectInit: false,
    installCli: false,
    generateQueries: false,
    devtools: true,
    auth: true,
    oauth: true,
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
    strategy: "no_prefix",
    defaultLocale: "en",
  },
  imports: {
    dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts", "config/**/*.ts"],
  },
});
