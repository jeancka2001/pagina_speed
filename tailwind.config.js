
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { speed: { red: "#E60000", gray: "#111827", border: "#e5e7eb" } },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
}
