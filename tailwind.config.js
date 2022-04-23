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
    colors: {
      red: colors.rose,
      pink: colors.fuchsia,
      turq: '#40e0d0'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    backgroundColor:{
      black: '#323232',
      white: '#fff'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
