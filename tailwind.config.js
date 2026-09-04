/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 화이트 로즈 + 세이지 리본 + 바다를 기준으로 한 코스탈 보태니컬 팔레트
        sage: {
          50: '#f5f6f1',
          100: '#e8ebe0',
          200: '#d1d8c2',
          300: '#b1bd9a',
          400: '#8fa073',
          500: '#758657',
          600: '#5d6b45',
          700: '#4a5637',
          800: '#3d472e',
          900: '#2e3523',
        },
        gold: {
          300: '#e3c98f',
          400: '#cda85e',
          500: '#b08d4a',
          600: '#8f7038',
        },
        parchment: '#faf8f3',
        // 어두운 배경(문/푸터) 위에서 쓰는 밝은 아이보리 — parchment보다 한 톤 밝음
        cream: '#fdfbf6',
        ink: '#2b2e26',
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
          'repeating-linear-gradient(115deg, rgba(120,140,100,0.045) 0px, rgba(120,140,100,0.045) 1px, transparent 1px, transparent 5px)',
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
