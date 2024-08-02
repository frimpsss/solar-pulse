/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mantis: {
          50: "#ebf8ff",
          100: "#d1efff",
          200: "#aee3ff",
          300: "#76d5ff",
          400: "#35bbff",
          500: "#0795ff",
          600: "#006fff",
          700: "#0056ff",
          800: "#0047d7",
          900: "#0042aa",
          950: "#062865",
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}

