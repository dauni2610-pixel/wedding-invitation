/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 테라코타(적갈색 도기)와 금박을 기준으로 한 고대 그리스풍 팔레트
        clay: {
          50: '#fbf3e7',
          100: '#f4e2c4',
          200: '#e8c793',
          300: '#d9a869',
          400: '#c6863f',
          500: '#a86a2f',
          600: '#8a5426',
          700: '#6f4220',
          800: '#5a361d',
          900: '#3e2513',
        },
        gold: {
          300: '#e3c98f',
          400: '#cda85e',
          500: '#b08d4a',
          600: '#8f7038',
        },
        parchment: '#f4ecd8',
        // 어두운 배경(봉투/푸터) 위에서 쓰는 밝은 아이보리 — parchment보다 한 톤 밝음
        cream: '#f8f1e0',
        ink: '#2e2416',
      },
      fontFamily: {
        // 로마·그리스 비문(碑文)에서 모티프를 가져온 대문자 서체 — 이름/제목용
        display: ['"Cinzel"', '"Noto Serif KR"', 'serif'],
        // 본문/설명 문구용 클래식 세리프
        body: ['"EB Garamond"', '"Noto Serif KR"', 'serif'],
        // 첫 화면 문구용 캘리그라피 스크립트 (영문 전용)
        script: ['"Alex Brush"', 'cursive'],
      },
      backgroundImage: {
        papyrus:
          'repeating-linear-gradient(115deg, rgba(160,120,60,0.05) 0px, rgba(160,120,60,0.05) 1px, transparent 1px, transparent 5px)',
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
