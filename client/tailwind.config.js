/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1c2b53",
        pp: "#1c2b53",
        secondary: "#1D90F5",
        highest: "#2C384A",
        noticeBoardbg: "#F2DEDE",
        noticeBoardtext: "#A94442",
        blueGray: "#ECEFF1",
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.5s ease-in-out',
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.5s ease-in-out',
      },
      backgroundSize: {
        '120%': '120%',
      },
    },
  },
  plugins: [],
}
