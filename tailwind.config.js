/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.ts",
    "./app.vue",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans"],
    },
    extend: {},
  },
};
