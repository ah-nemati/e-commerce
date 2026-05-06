/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./components/**/*.{html,jsx,tsx}", "./pages/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        custom: { min: "300px", max: "640px" },
      },
      colors: { primary: "#ff5c39" },
      boxShadow: {
        custom: "0px 0px 10px 2px #e3e0e0",
        imgBtn: "0px 0px 1px .5px #e3e0e0",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      backgroundColor: {
        dark: " #f2f2f2",
      },
      minWidth: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
