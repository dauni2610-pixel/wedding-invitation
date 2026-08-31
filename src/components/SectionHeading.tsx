import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

/** 각 섹션 상단에 반복되는 "영문 라벨 + 국문 제목 + 부제" 타이포 블록. */
export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="flex flex-col items-center gap-2 text-center">
      {eyebrow && (
        <span className="text-[11px] tracking-[0.35em] text-sage-500">{eyebrow}</span>
      )}
      <h2 className="font-script text-3xl text-sage-800">{title}</h2>
      {subtitle && <p className="text-xs text-ink/60">{subtitle}</p>}
    </Reveal>
  )
}
