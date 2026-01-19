/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'thuto-primary': '#0ea5e9', // Sky 500
        'thuto-secondary': '#6366f1', // Indigo 500
        'thuto-dark': '#0f172a',    // Slate 900
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
