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
        ink: 'rgb(var(--nh-ink) / <alpha-value>)',
        inkMuted: 'rgb(var(--nh-ink-muted) / <alpha-value>)',
        signal: 'rgb(var(--nh-signal) / <alpha-value>)',
        onSignal: 'rgb(var(--nh-on-signal) / <alpha-value>)',
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
      // Home page (Swiss utility) tokens — values live in src/app/(home)/home.css
      fontFamily: {
        archivo: ['var(--font-archivo)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
