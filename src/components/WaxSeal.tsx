import type { ReactNode } from 'react'

interface WaxSealProps {
  children: ReactNode
  className?: string
}

/**
 * 실제 왁스 봉인처럼 보이도록 만든 장식 컴포넌트.
 * 완전한 원이 아닌 살짝 일그러진 윤곽 + 광택/음영 레이어 + 낙인처럼 눌린 글자,
 * 아래쪽에 흘러내린 왁스 방울까지 흉내내서 입체감과 질감을 냅니다.
 */
export default function WaxSeal({ children, className = '' }: WaxSealProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 흘러내린 왁스 방울 */}
      <span
        className="absolute -bottom-1.5 left-[32%] h-3 w-2.5 rounded-full bg-blush-600/95"
        style={{ clipPath: 'ellipse(60% 55% at 50% 35%)' }}
      />
      <span
        className="absolute -bottom-2 right-[30%] h-2.5 w-2 rounded-full bg-blush-600/90"
        style={{ clipPath: 'ellipse(60% 55% at 50% 35%)' }}
      />

      {/* 왁스 본체 — 살짝 비대칭인 원 */}
      <div
        className="relative flex h-20 w-20 items-center justify-center"
        style={{
          borderRadius: '46% 54% 52% 48% / 48% 45% 55% 52%',
          background:
            'radial-gradient(circle at 32% 26%, #fbeeed 0%, #eec1c2 16%, #d6949a 48%, #b9727a 78%, #a05f68 100%)',
          boxShadow: `
            inset 2px 3px 5px rgba(255,255,255,0.6),
            inset -4px -5px 8px rgba(107,45,52,0.5),
            0 10px 16px -6px rgba(75,25,28,0.55),
            0 3px 4px rgba(75,25,28,0.35)
          `,
        }}
      >
        {/* 미세한 왁스 알갱이 질감 */}
        <div
          className="absolute inset-0 rounded-[inherit] opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(60,20,24,0.9) 0.6px, transparent 0.6px)',
            backgroundSize: '3px 3px',
          }}
        />
        {/* 도장 테두리 각인 */}
        <div
          className="absolute inset-[4px] rounded-[inherit]"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 0 4px 1px rgba(80,30,34,0.35)',
          }}
        />

        <span
          className="relative select-none font-script text-2xl leading-none"
          style={{
            color: '#733f44',
            textShadow:
              '0.5px 0.5px 0.4px rgba(255,238,235,0.75), -0.6px -0.6px 0.6px rgba(70,20,24,0.55)',
          }}
        >
          {children}
        </span>
      </div>
    </div>
  )
}
