import type { Config } from 'tailwindcss';

// Theme values live in src/app/globals.css (":root" = noon, ".dark" = golden hour).
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

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
        canvas: channel('--nh-canvas'),
        raised: channel('--nh-raised'),
        fg: channel('--nh-fg'),
        fgMuted: channel('--nh-fg-muted'),
        amber: channel('--nh-amber'),
        amberText: channel('--nh-amber-text'),
        ember: channel('--nh-ember'),
        onAmber: channel('--nh-on-amber'),
        danger: channel('--nh-danger'),
        onDanger: channel('--nh-on-danger'),
        success: channel('--nh-success'),
        cream: channel('--nh-cream'),
        film: channel('--nh-film'),

        // Legacy names still used across the dashboard, mapped onto the theme
        primary: channel('--nh-amber-text'),
        secondary: channel('--nh-fg'),
        mainBg: channel('--nh-canvas'),
        neutral: channel('--nh-fg-muted'),
        nomadGray: channel('--nh-raised'),
        lightPrimary: 'rgb(var(--nh-amber) / 0.18)',
      },
      // Bare `border` / `divide` classes get a warm hairline instead of Tailwind's cool gray
      borderColor: {
        DEFAULT: 'rgb(var(--nh-fg) / 0.12)',
      },
      boxShadow: {
        main: 'var(--main-boxShadow)',
      },
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
