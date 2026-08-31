/**
 * 참고 영상 속 봉투의 양각(embossed) 플로럴 패턴을 흉내낸 얇은 라인 아트 장식.
 * 이미지 없이 SVG만으로 그려서 어느 배경 색에서도 가볍게 얹을 수 있습니다.
 */
export default function FloralOrnament({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={className}
    >
      <path d="M10 60 C 25 40, 25 20, 15 8" />
      <circle cx="15" cy="8" r="4" />
      <path d="M18 30 C 28 28, 34 20, 32 10" />
      <circle cx="32" cy="10" r="3" />
      <path d="M14 45 C 26 46, 34 40, 34 30" />
      <circle cx="34" cy="30" r="3" />
      <path d="M20 62 C 34 58, 40 50, 38 40" />
      <ellipse cx="42" cy="38" rx="5" ry="3" transform="rotate(30 42 38)" />
      <path d="M8 75 C 20 78, 30 86, 28 98" />
      <circle cx="28" cy="98" r="3.5" />
    </svg>
  )
}
