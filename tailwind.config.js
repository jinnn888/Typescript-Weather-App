/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          dark: "#282828",
          yellow: "#fabd2f",
          white: "#ebdbb2",
          blue: "#458585",
          green: "#b8bb26"
        }
      }
    },
  },
  plugins: [],
}
