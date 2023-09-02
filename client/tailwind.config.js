/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#FC6600',
        darkRed: '#8B0000',
        maroon: '#800000',
        crimson: '#DC143C',
        firebrick: '#B22222'
      },
      animation: {
        'hover-scale': 'scale(1.05)',
      },
    },
  },
  plugins: [],
}
