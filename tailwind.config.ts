import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        red: {
          accent: '#FF3232',
          hover: '#E02828',
        },
        cream: {
          DEFAULT: '#F5F2EB',
          muted: 'rgba(245,242,235,0.55)',
          faint: 'rgba(245,242,235,0.08)',
          border: 'rgba(245,242,235,0.12)',
        },
        green: {
          positive: '#3ECF8E',
        },
      },
      fontFamily: {
        heading: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(245,242,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,235,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
