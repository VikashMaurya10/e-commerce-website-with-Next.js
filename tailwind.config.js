/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rale: ["var(--font-raleway)"],
        robo: ["var(--font-roboto)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
