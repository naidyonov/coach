/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        pitch: {
          950: '#04120c',
          900: '#062015',
          800: '#0a3322',
          700: '#0e4931',
          600: '#10b981',
        }
      }
    },
  },
  plugins: [],
};
