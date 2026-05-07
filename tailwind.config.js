const  { COLOR } = require('./src/theme/colors/color');
const { FONTS } = require('./src/theme/fonts/font');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: COLOR.PRIMARY,
        charcoal: COLOR.CHARCOAL,
        espresso: COLOR.ESPRESSO,
        clay: COLOR.CLAY,
        'input-border': COLOR.INPUT_BORDER,
        'background-light': COLOR.BACKGROUND_LIGHT,
        'background-dark': COLOR.BACKGROUND_DARK,
      },
      
      fontFamily: {
        "poppins-regular": FONTS.REGULAR,
        "poppins-medium": FONTS.MEDIUM,
        "poppins-bold": FONTS.BOLD,
      },
    },
  },
  plugins: [],
};
