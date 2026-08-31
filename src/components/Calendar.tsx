import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { weddingDate } from '../data/weddingInfo'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function Calendar() {
  const target = weddingDate.date
  const year = target.getFullYear()
  const month = target.getMonth()
  const targetDate = target.getDate()

  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <section className="flex flex-col items-center gap-8 px-8 py-20">
      <SectionHeading eyebrow="SAVE THE DATE" title={`${year}. ${month + 1}`} />

      <Reveal delay={0.15} className="w-full max-w-xs">
        <div className="mb-3 grid grid-cols-7 text-center text-[11px] tracking-wide text-ink/40">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-3 text-center">
          {cells.map((day, i) => {
            const isTarget = day === targetDate
            return (
              <div key={i} className="flex items-center justify-center">
                {day && (
                  <span
                    className={
                      isTarget
                        ? 'flex h-9 w-9 items-center justify-center rounded-full bg-clay-600 font-medium text-cream'
                        : 'flex h-9 w-9 items-center justify-center text-sm text-ink/70'
                    }
                  >
                    {day}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="text-sm text-ink/60">{weddingDate.dateLabel}</p>
      </Reveal>
    </section>
  )
}
