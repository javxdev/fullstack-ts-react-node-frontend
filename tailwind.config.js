/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#39967B',
        primaryHover: '#4cc5a3'
      }
    },
  },
  plugins: [],
}

