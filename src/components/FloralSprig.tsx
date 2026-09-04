/**
 * 얇은 선 + 잎사귀 클러스터로 이루어진 보태니컬 디바이더.
 * 영상 속 세이지 리본·화이트 로즈 장식과 어울리는 절제된 플로럴 모티프입니다.
 */
export default function FloralSprig({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 16" fill="none" className={className}>
      <path d="M2 8 H38" stroke="currentColor" strokeWidth="0.8" />
      <path d="M62 8 H98" stroke="currentColor" strokeWidth="0.8" />
      <g stroke="currentColor" strokeWidth="0.7" fill="currentColor" fillOpacity="0.18">
        <ellipse cx="43" cy="6.5" rx="4.2" ry="2.1" transform="rotate(-25 43 6.5)" />
        <ellipse cx="50" cy="4" rx="3.8" ry="1.9" transform="rotate(10 50 4)" />
        <ellipse cx="57" cy="6.5" rx="4.2" ry="2.1" transform="rotate(35 57 6.5)" />
        <circle cx="50" cy="8.5" r="1.5" fillOpacity="0.55" stroke="none" />
      </g>
    </svg>
  )
}
