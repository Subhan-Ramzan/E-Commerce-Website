/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        sparkle1: {
          '0%': { top: '50%', left: '25%', opacity: '0.5', transform: 'scale(0.5)' },
          '50%': { top: '10%', left: '50%', opacity: '1', transform: 'scale(1)' },
          '100%': { top: '90%', left: '75%', opacity: '0.5', transform: 'scale(0.5)' },
        },
        sparkle2: {
          '0%': { top: '10%', left: '10%', opacity: '0.4', transform: 'scale(0.6)' },
          '50%': { top: '60%', left: '80%', opacity: '0.8', transform: 'scale(1)' },
          '100%': { top: '90%', left: '90%', opacity: '0.4', transform: 'scale(0.6)' },
        },
        sparkle3: {
          '0%': { top: '80%', left: '30%', opacity: '0.6', transform: 'scale(0.7)' },
          '50%': { top: '30%', left: '40%', opacity: '1', transform: 'scale(1)' },
          '100%': { top: '40%', left: '60%', opacity: '0.6', transform: 'scale(0.7)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.1s ease-out',
        slideIn: 'slideIn 1s ease-out',
        'spin-slow': 'spin 2s linear infinite',  // Slow spinning effect
        'ping': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',  // Pulsing inner circle
        'pulse-sparkle': 'pulse 2s infinite', // Pulse sparkle animation
        'sparkle1': 'sparkle1 1.5s ease-in-out infinite', // First sparkle
        'sparkle2': 'sparkle2 2s ease-in-out infinite', // Second sparkle
        'sparkle3': 'sparkle3 2.5s ease-in-out infinite' // Third sparkle
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
