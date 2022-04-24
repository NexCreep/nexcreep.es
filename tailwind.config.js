const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      flexBasis: {
        "1/3": "33.334%",
        "2/3": "66.667%",
      },
      colors: {
        'turq': '#40e0d0'
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      padding: {
        '16': '64px'
      }
    },
    backgroundColor:{
      black: '#323232',
      white: '#fff',
      turq: '#40e0d0'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
