const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f3fbf4",
          100: "#e4f5e8",
          500: "#05893e",
          600: "#047f39",
          700: "#036830",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#05893e", foreground: "#ffffff" },
            success: { DEFAULT: "#1a9951" },
            danger:  { DEFAULT: "#d03739" },
            background: "#fafcfa",
          },
        },
      },
    }),
  ],
};

module.exports = config;
