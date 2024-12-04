/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'], // Ajout des polices Teach'r
      },
      colors: {
        primary: '#002B5B', // Bleu profond Teach'r
        secondary: '#FF9900', // Orange ou jaune d'accent
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
