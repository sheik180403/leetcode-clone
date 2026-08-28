/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a1a',
          card: '#282828',
          border: '#383838',
          hover: '#333333',
        },
        leetcode: {
          yellow: '#ffa116',
          darkYellow: '#e69010',
          easy: '#00b8a3',
          medium: '#ffc01e',
          hard: '#ff375f',
        },
      },
    },
  },
  plugins: [],
};

