/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "**/*.{md,html}",
    "_includes/**/*.html",
    "_layouts/**/*.html",
    "*.{markdown,html}",
    "assets/css/styles.css",
  ],
  theme: {
    extend: {
      animation: {
        emphasis: "emphasis 5s ease infinite",
      },
      keyframes: {
        emphasis: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
