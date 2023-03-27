const { colors } = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      boxShadow: {
        primary: "0 1px 6px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        // ...
        primaryBackground: {
          DEFAULT: "rgb(255,255,255)",
          dark: "rgb(22,22,22)",
        },
        primaryTitle: {
          DEFAULT: "rgb(34, 34, 34)",
          dark: "#a3a3a3",
        },
        primaryBorder: {
          DEFAULT: "rgb(221, 221, 221)",
          dark: "rgb(64 64 64 / 0.4)",
        },
        primaryShadow: {
          DEFAULT: "rgb(31 41 55 / 0.2)",
          dark: "rgb(38 38 38 / 0.2)",
        },
        menuHoverBg: {
          DEFAULT: "rgb(17 24 39 / 0.05)",
          dark: "rgb(38 38 38 / 0.5)",
        },
        menuHoverRing: {
          DEFAULT: "rgb(17 24 39 / 0.2)",
          dark: "rgb(163 163 163 / 0.2)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
}
