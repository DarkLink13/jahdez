module.exports = {
  apps: [
    {
      name: "jahdez",
      port: "3100",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        NUXT_EDGEDB_AUTH_BASE_URL: "http://localhost:10700/db/edgedb/ext/auth/",
        NUXT_EDGEDB_OAUTH_CALLBACK:
          "http://localhost:10700/db/edgedb/ext/auth/callback",
        NUXT_EDGEDB_OAUTH_REDIRECT_URL: "https://jahdez.com/auth/callback",
        NUXT_EDGEDB_AUTH_RESET_PASSWORD_URL:
          "https://jahdez.com/auth/reset-password",
        NUXT_EDGEDB_AUTH_VERIFY_REDIRECT_URL: "https://jahdez.com/auth/verify",
      },
      env_production: {
        NUXT_EDGEDB_OAUTH_CALLBACK:
          "http://localhost:10700/db/edgedb/ext/auth/callback",
        NUXT_EDGEDB_AUTH_BASE_URL: "http://localhost:10700/db/edgedb/ext/auth",
        NUXT_EDGEDB_OAUTH_REDIRECT_URL: "https://jahdez.com/auth/callback",
        NUXT_EDGEDB_AUTH_RESET_PASSWORD_URL:
          "https://jahdez.com/auth/reset-password",
        NUXT_EDGEDB_AUTH_VERIFY_REDIRECT_URL: "https://jahdez.com/auth/verify",
      },
    },
  ],
};
