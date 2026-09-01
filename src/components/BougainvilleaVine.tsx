/**
 * 리조트 문 위쪽에 늘어진 부겐빌레아(자홍색 꽃) 덩굴 장식.
 */
export default function BougainvilleaVine({ className = '' }: { className?: string }) {
  const blooms: Array<[number, number, number, string]> = [
    [4, 12, 8, '#d63384'],
    [12, 5, 6.5, '#e0559c'],
    [20, 14, 7.5, '#c93368'],
    [28, 7, 6, '#e0559c'],
    [36, 15, 7, '#d63384'],
    [44, 6, 5.5, '#c93368'],
    [8, 21, 5, '#e0559c'],
    [24, 22, 4.5, '#c93368'],
  ]

  return (
    <svg viewBox="0 0 50 28" className={className} preserveAspectRatio="none">
      <path
        d="M0 6 C 10 2, 20 10, 30 4 S 45 8, 50 3"
        fill="none"
        stroke="#5a7d4f"
        strokeWidth="1"
        opacity="0.7"
      />
      {blooms.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} opacity={0.92} />
      ))}
      <ellipse cx="16" cy="17" rx="3.5" ry="1.8" fill="#4a7c4e" transform="rotate(25 16 17)" />
      <ellipse cx="33" cy="16" rx="3.5" ry="1.8" fill="#4a7c4e" transform="rotate(-20 33 16)" />
    </svg>
  )
}
