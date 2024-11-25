// tailwind.config.js
const {nextui} = require("@nextui-org/theme");
const colors = require("./src/shared/utils/Colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};