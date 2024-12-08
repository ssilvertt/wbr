/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      mixBlendMode: {
        luminosity: 'luminosity',
      },
      fontFamily: {
        'proxima': ['Proxima Nova', 'sans-serif'],
        'gilroy': ['Gilroy', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}

