const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Whitney", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      gray: {
        darkest: "#202225",
        darker: "#292B2F",
        dark: "#2F3136",
        DEFAULT: "#36393F",
        light: "#40444B",
        lighter: "#72767d",
        lightest: "#dcddde",
      },
      ...defaultTheme.colors,
    },
  },
  variants: {
    extend: {
      ringColor: ["focus-visible"],
      ringOffsetColor: ["focus-visible"],
      ringOffsetWidth: ["focus-visible"],
      ringOpacity: ["focus-visible"],
      ringWidth: ["focus-visible"],
    },
  },
  plugins: [],
};
