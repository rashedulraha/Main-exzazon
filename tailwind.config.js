/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./about.html",
    "./services.html",
    "./process.html",
    "./testimonials.html",
    "./blog.html",
    "./contact.html",
  ],
  theme: {
    extend: {
      colors: {
        "brand-orange": "#ff6d00",
        "brand-dark": "#212121",
        "brand-light": "#ffffff",
        "brand-accent": "#7f00ff",
        "brand-secondary": "#4A5568",
        "brand-btn": "#ff6d00",
        "brand-blue": "#00f5d4",
        "brand-violet": "#7f00ff",
        "brand-pink": "#ff00a0",
        "brand-teal": "#00f5d4",
        "brand-bg": "#050517",
        "brand-text": "#f8f9fa",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-right": "slide-right 0.3s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
