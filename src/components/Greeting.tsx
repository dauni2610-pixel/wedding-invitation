import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { bride, greeting, groom } from '../data/weddingInfo'

export default function Greeting() {
  return (
    <section className="flex flex-col items-center gap-8 px-8 py-20">
      <SectionHeading eyebrow="INVITATION" title={greeting.title} />

      <Reveal delay={0.1} className="text-center">
        <p className="whitespace-pre-line font-serif text-[15px] leading-8 text-ink/80">
          {greeting.message.join('\n')}
        </p>
      </Reveal>

      <Reveal delay={0.2} className="flex flex-col items-center gap-1 pt-2 text-sm text-ink/70">
        <p>
          {groom.fatherName} · {groom.motherName}의 {groom.order} <span className="font-medium text-ink">{groom.name}</span>
        </p>
        <p>
          {bride.fatherName} · {bride.motherName}의 {bride.order} <span className="font-medium text-ink">{bride.name}</span>
        </p>
      </Reveal>
    </section>
  )
}
