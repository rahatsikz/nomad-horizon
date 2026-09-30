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
        paper: 'rgb(var(--nh-paper) / <alpha-value>)',
        paperAlt: 'rgb(var(--nh-paper-alt) / <alpha-value>)',
        ink: 'rgb(var(--nh-ink) / <alpha-value>)',
        inkMuted: 'rgb(var(--nh-ink-muted) / <alpha-value>)',
        terracotta: 'rgb(var(--nh-terracotta) / <alpha-value>)',
        terracottaInk: 'rgb(var(--nh-terracotta-ink) / <alpha-value>)',
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
      // Home page (editorial) tokens — values live in src/app/(home)/home.css
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        text: ['var(--font-instrument-sans)', 'Helvetica Neue', 'sans-serif'],
        meta: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
