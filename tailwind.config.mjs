/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'brand-yellow': 'rgb(252, 185, 40)',
      'brand-red': 'rgb(237, 32, 61)',
      'brand-green': 'rgb(11, 168, 91)',
      white: '#fff',
      black: '#000'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {}
  },
  plugins: []
}
