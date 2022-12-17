/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js}",
  ],
  theme: {
      fontFamily: {
          sans: ["Roboto Slab", "sans-serif"]
      },
      extend: {
          height: {
              '120': '30rem'
          }
      },
  },
  plugins: [],
}
