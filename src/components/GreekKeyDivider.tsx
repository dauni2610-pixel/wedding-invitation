import { useId } from 'react'

/**
 * 그리스 도기·신전 프리즈에 반복되는 만자형 미앤더(meander) 패턴의
 * 가로 구분선. 섹션 제목 아래나 카드 테두리에 얇게 둘러 고대 문양 느낌을 줍니다.
 */
export default function GreekKeyDivider({ className = '' }: { className?: string }) {
  // 페이지에 여러 번 쓰여도 <pattern> id가 겹치지 않도록 인스턴스마다 고유 id 부여
  const patternId = `greek-key-${useId()}`

  return (
    <svg
      viewBox="0 0 96 12"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
    >
      <defs>
        <pattern id={patternId} width="16" height="12" patternUnits="userSpaceOnUse">
          <path d="M1 11 L1 3 L9 3 L9 7 L5 7 L5 9 L11 9 L11 1" />
        </pattern>
      </defs>
      <rect width="96" height="12" fill={`url(#${patternId})`} />
    </svg>
  )
}
