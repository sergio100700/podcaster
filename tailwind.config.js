/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // aquí le dices dónde buscar clases
  ],
  theme: {
    extend: {
      keyframes: {
        bounceScale: {
          "0%, 100%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
        },
      },
      animation: {
        bounceScale: "bounceScale 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
}
