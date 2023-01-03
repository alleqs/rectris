/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      mono: ['Electrolize', '"Jetbrains Mono"', ...defaultTheme.fontFamily.mono],
      retroGame: ["PressStart2P", "mono"],
    },
    extend: {},
  },
  plugins: [],
}
