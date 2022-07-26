module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monsterrat: "'Monsterrat', sans-serif",
      },
      screens: {
        'xss': '300px',
        'xs' : '500px',
      }
    },
  },
  plugins: [],
};
