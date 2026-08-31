/**
 * 월계수 가지 라인 아트. 고대 그리스 승리의 상징을 모티프로,
 * 봉투 모서리나 왁스 봉인 주변을 감싸는 장식으로 사용합니다.
 */
export default function LaurelOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
    >
      <path d="M8 92 C 10 60, 24 34, 46 12" />
      {[
        [16, 78, -28],
        [20, 66, -20],
        [26, 55, -12],
        [33, 44, -4],
        [40, 32, 6],
      ].map(([cx, cy, rotate], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="7"
          ry="3.4"
          transform={`rotate(${rotate} ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}
