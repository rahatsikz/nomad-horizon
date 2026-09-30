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
        tag: 'rgb(var(--nh-tag) / <alpha-value>)',
        ink: 'rgb(var(--nh-ink) / <alpha-value>)',
        inkMuted: 'rgb(var(--nh-ink-muted) / <alpha-value>)',
        signal: 'rgb(var(--nh-signal) / <alpha-value>)',
        signalText: 'rgb(var(--nh-signal-text) / <alpha-value>)',
        onSignal: 'rgb(var(--nh-on-signal) / <alpha-value>)',
        mapBlue: 'rgb(var(--nh-map) / <alpha-value>)',
        passport: 'rgb(var(--nh-passport) / <alpha-value>)',
        passportInk: 'rgb(var(--nh-passport-ink) / <alpha-value>)',
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
      // Home page (field kit) tokens — values live in src/app/(home)/home.css
      fontFamily: {
        display: ['var(--font-bricolage)', 'Arial Narrow', 'sans-serif'],
        text: ['var(--font-newsreader)', 'Georgia', 'serif'],
        ticket: ['var(--font-martian)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
