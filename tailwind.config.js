/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071028',
          dark: '#030612',
        },
        cyan: {
          electric: '#00d7c1',
          light: '#00f5de',
        },
        matrix: {
          green: '#00ff41',
          dark: '#00a04a',
          light: '#00c45a',
        },
        vivid: {
          blue: '#1572ff',
          purple: '#8b5cf6',
          indigo: '#6366f1',
          violet: '#a855f7',
        },
        neon: {
          cyan: '#00f5ff',
          green: '#39ff14',
          pink: '#ff10f0',
          blue: '#0ff',
        },
        electric: {
          yellow: '#fbbf24',
          orange: '#fb923c',
          pink: '#ec4899',
          red: '#ef4444',
        },
        warm: {
          beige: '#d4b896',
          brown: '#92400e',
        },
        soft: {
          white: '#f6f8fb',
        },
        charcoal: '#263142',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d7c1, 0 0 10px #00d7c1' },
          '100%': { boxShadow: '0 0 10px #00d7c1, 0 0 20px #00d7c1, 0 0 30px #00d7c1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 215, 193, 0.5)' },
          '50%': { opacity: '.8', boxShadow: '0 0 40px rgba(0, 215, 193, 0.8), 0 0 60px rgba(0, 255, 65, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};