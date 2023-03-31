/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* primary */
        "very-dark-gray": "hsl(0, 0%, 17%)",
        "dark-gray": "hsl(0, 0%, 59%)",
      },
      fontFamily: {
        "sans": ["Rubik", "sans-serif"],
      },
      fontSize: {
        "body": "18px",
      },
    },
  },
  plugins: [],
};
