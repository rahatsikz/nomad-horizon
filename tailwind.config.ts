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
        ground: 'rgb(var(--nh-ground) / <alpha-value>)',
        surface: 'rgb(var(--nh-surface) / <alpha-value>)',
        ink: 'rgb(var(--nh-ink) / <alpha-value>)',
        inkMuted: 'rgb(var(--nh-ink-muted) / <alpha-value>)',
        sign: 'rgb(var(--nh-sign) / <alpha-value>)',
        onSign: 'rgb(var(--nh-on-sign) / <alpha-value>)',
        board: 'rgb(var(--nh-board) / <alpha-value>)',
        flap: 'rgb(var(--nh-flap) / <alpha-value>)',
        flapInk: 'rgb(var(--nh-flap-ink) / <alpha-value>)',
        go: 'rgb(var(--nh-go) / <alpha-value>)',
        wait: 'rgb(var(--nh-wait) / <alpha-value>)',
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
      // Home page (wayfinding) tokens — values live in src/app/(home)/home.css
      fontFamily: {
        sign: ['var(--font-barlow-condensed)', 'Arial Narrow', 'sans-serif'],
        text: ['var(--font-figtree)', 'Helvetica Neue', 'sans-serif'],
        board: ['var(--font-share-tech-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
