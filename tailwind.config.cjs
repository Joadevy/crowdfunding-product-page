module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "moderate-cyan": "hsl(176, 50%, 47%)",
          "darl-cyan": "hsl(176, 72%, 28%)",
        },
        neutral: {
          black: "hsl(0, 0%, 0%)",
          "Dark-gray": "hsl(0, 0%, 48%)",
        },
      },
      fontFamily: {
        commissioner: ["Commissioner", "sans-serif", "monospace"],
      },
    },
  },
  plugins: [],
};