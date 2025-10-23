/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",       // ✅ Add this if your index.html is inside public
    "./src/**/*.{js,ts,jsx,tsx}" // ✅ Include all component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
