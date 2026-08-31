/**
 * 봉투 종이에 양각으로 눌린 듯한 얇은 손그림 꽃 낙서 모음.
 * 참고 이미지의 봉투 모서리 플로럴 패턴을 흉내낸 라인 아트입니다.
 */
export default function FlowerDoodle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* 꽃 1 */}
      <g transform="translate(20 22)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-6" rx="3.2" ry="5.5" transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="1.6" fill="currentColor" stroke="none" />
      </g>
      {/* 줄기 + 잎 */}
      <path d="M20 27 C 18 40, 24 48, 34 52" />
      <ellipse cx="27" cy="42" rx="4.5" ry="2.4" transform="rotate(-25 27 42)" />

      {/* 꽃 2 (작게) */}
      <g transform="translate(92 55) scale(0.7)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-6" rx="3.2" ry="5.5" transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="1.6" fill="currentColor" stroke="none" />
      </g>
      <path d="M92 62 C 96 72, 90 80, 96 90" />

      {/* 자잘한 잎/점 장식 */}
      <ellipse cx="60" cy="12" rx="4" ry="2" transform="rotate(15 60 12)" />
      <circle cx="72" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="10" cy="70" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
