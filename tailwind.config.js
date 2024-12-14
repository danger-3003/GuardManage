/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './Components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors:{
        primary:"#291d89",
        secondary:"#4e67eb",
        background:"#f0f4ff"
      }
    },
  },
  plugins: [],
};
