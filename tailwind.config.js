/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f6f3',
          100: '#e6ebe2',
          200: '#ccd6c5',
          300: '#a9bc9d',
          400: '#869e77',
          500: '#68835b',
          600: '#516847',
          700: '#42533b',
          800: '#374432',
          900: '#2f392b',
        },
        cream: '#f7f4ee',
        ink: '#3a3630',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif KR"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Pretendard"', '"Noto Sans KR"', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
