/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        purple: {
          300: "#C58BF2", //words (gradient right)
          200: "#EEA4CE" //(gradient left)
        },
        red: {
          500: "#C73A54" //words
        },
        blue: {
          600: "#92A3FD", //purplish blue (gradient right)
          300: "#9DCEFF", //sky blue (gradient left)
          100: "#F1F4FF", //pale blue
        },
        gray: {
          900: "#7B6F72", //gray for icon
          500: "#ADA4A5", //placeholder words
          100: "#F7F8F8", //pale gray
        }

      },
    },
  },
  plugins: [],
}
