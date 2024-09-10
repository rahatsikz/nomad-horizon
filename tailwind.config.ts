import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        mainBg: "var(--main-bg)",
        neutral: "var(--neutral)",
        nomadGray: "var(--nomad-gray)",
      },
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        mainBg: "var(--main-bg)",
        neutral: "var(--neutral)",
        nomadGray: "var(--nomad-gray)",
      },
      boxShadow: {
        main: "var(--main-boxShadow)",
      },
    },
  },
  plugins: [],
};
export default config;
