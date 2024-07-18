/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,--jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#00aced',
        facebook: '#3b5998',
        googleplus: '#dd4b39',
        pinterest: '#cc2127',
        dribbble: '#ea4c89',
        instagram: '#417399',
      },
    },
  },
  plugins: [],
}