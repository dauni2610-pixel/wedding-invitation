import Reveal from './Reveal'
import FloralSprig from './FloralSprig'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

/** 각 섹션 상단에 반복되는 "영문 라벨 + 국문 제목 + 미앤더 구분선 + 부제" 타이포 블록. */
export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="flex flex-col items-center gap-3 text-center">
      {eyebrow && (
        <span className="font-display text-[11px] tracking-[0.35em] text-sage-500">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl font-medium tracking-wide text-sage-800">{title}</h2>
      <FloralSprig className="h-3 w-20 text-sage-500/70" />
      {subtitle && <p className="text-xs text-ink/60">{subtitle}</p>}
    </Reveal>
  )
}
