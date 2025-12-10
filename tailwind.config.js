/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#66A681',
        },
        secondary: '#7F7F7F',
        header1: '#032211',
        grey: '#575757',
        input: '#D2D2D2',
        error: '#D73F3F',
      },
    },
  },
  plugins: [],
};
