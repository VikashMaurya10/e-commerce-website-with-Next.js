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
      boxShadow: {
        normal:
          "0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px 1px rgba(9, 30, 66, 0.13)",
      },
    },
  },
  plugins: [],
};
