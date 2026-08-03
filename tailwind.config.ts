import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8F1111',
        cream: '#F3D48A',
        brown: '#4A2B22',
        ivory: '#FFF8F0',
        gold: '#E4B45F',
      },
      boxShadow: {
        premium: '0 30px 100px -45px rgba(228,180,95,0.45)',
      },
      backgroundImage: {
        'cream-gradient': 'radial-gradient(circle at top, rgba(243,212,138,0.24), transparent 36%)',
      },
    },
  },
  plugins: [],
};

export default config;
