/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f5f2',
          100: '#d9e6e0',
          200: '#a8cfc2',
          300: '#77b8a3',
          400: '#52B788',
          500: '#2D6A4F',
          600: '#1B3A2A',
          700: '#0f2818',
        },
        admin: {
          bg: '#111827',
          accent: '#1D4ED8',
        },
        light: {
          bg: '#F7F6F2',
          text: '#6B6B66',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
