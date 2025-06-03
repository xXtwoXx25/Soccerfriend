/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pridi': ['Pridi', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-out': {
          'from': { opacity: '1' },
          'to': { opacity: '0' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease',
        'fade-out': 'fade-out 0.3s ease 2.7s',
      },
    },
  },
  plugins: [],
} 