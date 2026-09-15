/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2B3A",
        paper: "#F7F4EE",
        amber: "#D97A34",
        sage: "#5C7C6F",
        stone: "#8A8478",
        hairline: "#E8E2D6",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [],
};