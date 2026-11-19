const path = require("path");

// cwd y script absolutos: así `pm2 start` funciona desde cualquier carpeta.
// Con rutas relativas, pm2 resolvía ./.output desde el directorio actual
// y terminaba sirviendo otro proyecto (p. ej. /home/ci/deploy-page).
const shared = {
  PORT: "3100",
  HOST: "127.0.0.1",
  EDGEDB_CREDENTIALS_FILE:
    "/home/darklink/.config/edgedb/credentials/darkIink.json",
  NUXT_EDGEDB_AUTH_BASE_URL: "http://localhost:10700/db/edgedb/ext/auth/",
  NUXT_EDGEDB_OAUTH_CALLBACK:
    "http://localhost:10700/db/edgedb/ext/auth/callback",
  NUXT_EDGEDB_OAUTH_REDIRECT_URL: "https://jahdez.com/auth/callback",
  NUXT_EDGEDB_AUTH_RESET_PASSWORD_URL: "https://jahdez.com/auth/reset-password",
  NUXT_EDGEDB_AUTH_VERIFY_REDIRECT_URL: "https://jahdez.com/auth/verify",
};

module.exports = {
  apps: [
    {
      name: "jahdez",
      cwd: __dirname,
      script: path.join(__dirname, ".output/server/index.mjs"),
      exec_mode: "cluster",
      instances: 2,
      max_memory_restart: "400M",
      env: shared,
      env_production: { ...shared, NODE_ENV: "production" },
    },
  ],
};
