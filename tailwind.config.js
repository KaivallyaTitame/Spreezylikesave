/** @type {import('tailwindcss').Config} */
/** @type {import('rippleui').Config} */
module.exports = {
  darkMode: 'class',
  rippleui: {
    themes: [
      // Explicitly overriding the darkTheme in RippleUI as it breaks if system theme is dark.
      // Explicitly overriding the darkTheme in RippleUI as it breaks if system theme is dark.
      {
        themeName: "light",
        colorScheme: "light",
        
        colors: {
          primary: "#ED6A5A",
          backgroundPrimary: "#FFFFFF",
          secondary: "#FFFFFF",
        },
      },
      {
        themeName: "dark",
        colorScheme: "light",
        colors: {
          primary: "#ED6A5A",
          backgroundPrimary: "#FFFFFF",
          secondary: "#FFFFFF",
        },
      }
    ]
  },
  content: [
    "./src/**/*.{html,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'test1' : '360px',
        'test1' : '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors:{
        'primarycolor': ['#ED6A5A']
      colors:{
        'primarycolor': ['#ED6A5A']
      },
      fontFamily: {
<<<<<<< HEAD
        'primary': ["sansita-one", "sans-serif"],
        'secondary': ["Roboto", "sans-serif"],
=======
        'sidebar' : ['Roboto'],
        'primary':["sansita-one", "sans-serif"],
        'secondary':["merriweather", "sans-serif"]
>>>>>>> 4c6615d (Added stashed changes)
      }
    },
  },
  plugins: [require("rippleui")],
}
