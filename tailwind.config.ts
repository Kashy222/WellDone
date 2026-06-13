import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Switch to dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          bg: '#FDFBF7',
          card: '#FFFFFF',
          text: {
            primary: '#2C3A32',
            secondary: '#7A8C81',
          },
          accent: '#A3B1A6',
          offwhite: '#FDFBF7',
          cream: '#F5F2EB',
          sage: {
            light: '#C9D6CE',
            DEFAULT: '#A3B1A6',
            dark: '#82A392'
          },
          terracotta: {
            light: '#E6B09E',
            DEFAULT: '#D98A6C'
          },
          shift: '#F9F7F1',
          emerald: {
            light: '#A7C4B5',
            DEFAULT: '#729B85'
          },
          orb: {
            from: '#A3B1A6',
            via: '#C9D6CE',
            to: '#E6B09E'
          }
        }
      },
      animation: {
        'orb-float': 'orb-float 6s ease-in-out infinite',
        'orb-pulse-glow': 'orb-pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'blob': 'blob 10s ease-in-out infinite alternate',
      },
      keyframes: {
        'orb-float': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        'orb-pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(30px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blob: {
          '0%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '33%': { borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%' },
          '66%': { borderRadius: '50% 50% 60% 40% / 60% 40% 50% 60%' },
          '100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
        }
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'emil': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
