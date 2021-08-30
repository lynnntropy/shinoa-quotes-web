module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
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
