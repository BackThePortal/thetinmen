/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js}",
  ],
  theme: {
      fontFamily: {
          sans: ["Roboto Slab", "sans-serif"],
          mono: ["Roboto Mono", "monospace"]
      },
      extend: {
          height: {
              '120': '30rem'
          },
          screens: {
              'xs': '520px'
          }
      },
  },
  plugins: [],
}
