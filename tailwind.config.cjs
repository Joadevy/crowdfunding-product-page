module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "moderate-cyan": "hsl(176, 50%, 47%)",
          "dark-cyan": "hsl(176, 72%, 28%)",
        },
        neutral: {
          black: "hsl(0, 0%, 0%)",
          "dark-gray": "hsl(0, 0%, 48%)",
        },
      },
      fontFamily: {
        commissioner: ["Commissioner", "sans-serif", "monospace"],
      },
      backgroundImage: {
        "mobile-hero": "url('public/images/image-hero-mobile.jpg')",
        "desktop-hero": "url('public/images/image-hero-desktop.jpg')",
      },
      boxShadow: {
        modal: "0 0 150px 150px rgba(0, 0, 0, 0.4)",
        hero: "7px -22px 35px 42px rgba(0,0,0,0.76)",
        heroDesktop: "7px -10px 65px 42px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
