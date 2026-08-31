import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { useCountdown } from '../hooks/useCountdown'
import { weddingDate } from '../data/weddingInfo'

const UNITS: Array<{ key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }> = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'minutes', label: 'MINUTES' },
  { key: 'seconds', label: 'SECONDS' },
]

export default function Countdown() {
  const timeLeft = useCountdown(weddingDate.date)

  return (
    <section className="flex flex-col items-center gap-8 bg-clay-50 px-8 py-20">
      <SectionHeading
        eyebrow="COUNTDOWN"
        title="설레는 순간까지"
        subtitle={timeLeft.isPast ? '저희는 이미 부부가 되었습니다 :)' : '두 사람의 새로운 시작이 다가옵니다'}
      />

      <Reveal delay={0.15} className="grid w-full grid-cols-4 gap-2">
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex flex-col items-center gap-1 rounded-lg border border-clay-200 bg-parchment py-4 shadow-sm"
          >
            <span className="font-display text-2xl tabular-nums text-clay-700">
              {String(timeLeft[unit.key]).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-widest text-ink/50">{unit.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
