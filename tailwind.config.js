// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'draw': 'draw 3s ease-in-out infinite',
        'dash': 'dash 3s linear infinite'
      },
      keyframes: {
        draw: {
          '0%': { 
            'stroke-dasharray': '1000',
            'stroke-dashoffset': '1000'
          },
          '50%': { 
            'stroke-dashoffset': '0'
          },
          '100%': {
            'stroke-dasharray': '1000',
            'stroke-dashoffset': '-1000'
          }
        },
        dash: {
          'to': {
            'stroke-dashoffset': '-100'
          }
        }
      }
    },
  },
  plugins: [],
}