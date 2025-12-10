module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F6F5FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#7C3AED",
          600: "#6D28D9",
          700: "#5B21B6",
          800: "#4C1D95",
          900: "#3A0F6E",
        },
        accent: {
          DEFAULT: "#06B6D4",
          500: "#06B6D4",
        },
        coral: "#FB7185",
        muted: "#F8FAFC",
        success: "#10B981",
      },
    },
  },
  plugins: [],
};
