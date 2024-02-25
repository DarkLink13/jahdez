module.exports = {
  apps: [
    {
      name: "jahdez",
      port: "3100",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
};
