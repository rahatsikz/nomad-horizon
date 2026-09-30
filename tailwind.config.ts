import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        mainBg: 'var(--main-bg)',
        neutral: 'var(--neutral)',
        nomadGray: 'var(--nomad-gray)',
        lightPrimary: 'var(--light-primary)',
        canvas: 'rgb(var(--nh-canvas) / <alpha-value>)',
        raised: 'rgb(var(--nh-raised) / <alpha-value>)',
        fg: 'rgb(var(--nh-fg) / <alpha-value>)',
        fgMuted: 'rgb(var(--nh-fg-muted) / <alpha-value>)',
        amber: 'rgb(var(--nh-amber) / <alpha-value>)',
        amberText: 'rgb(var(--nh-amber-text) / <alpha-value>)',
        ember: 'rgb(var(--nh-ember) / <alpha-value>)',
        onAmber: 'rgb(var(--nh-on-amber) / <alpha-value>)',
        cream: 'rgb(var(--nh-cream) / <alpha-value>)',
        film: 'rgb(var(--nh-film) / <alpha-value>)',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        mainBg: 'var(--main-bg)',
        neutral: 'var(--neutral)',
        nomadGray: 'var(--nomad-gray)',
        lightPrimary: 'var(--light-primary)',
      },
      boxShadow: {
        main: 'var(--main-boxShadow)',
      },
      // Home page (cinematic) tokens — values live in src/app/(home)/home.css
      fontFamily: {
        display: ['var(--font-syne)', 'Arial Black', 'sans-serif'],
        accent: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        text: ['var(--font-hanken)', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
