import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { story } from '../data/weddingInfo'

/**
 * Hero 바로 다음 자리 — 두 사람이 만나 결혼에 이르기까지의 짧은 타임라인.
 * 세로선 + 점으로 이어지는 마일스톤 목록. story.milestones 값을 실제 이야기로 바꿔주세요.
 */
export default function OurStory() {
  return (
    <section className="flex flex-col items-center gap-10 bg-parchment px-8 py-20">
      <SectionHeading eyebrow={story.eyebrow} title={story.title} />

      <ol className="relative flex w-full flex-col gap-9 pl-6">
        <div aria-hidden className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-sage-300/70" />

        {story.milestones.map((item, i) => (
          <Reveal
            key={`${item.date}-${item.title}`}
            delay={0.08 * i}
            className="relative flex flex-col gap-1"
          >
            <span
              aria-hidden
              className="absolute -left-6 top-1.5 h-[7px] w-[7px] rounded-full bg-sage-500"
            />
            <span className="font-display text-[11px] tracking-[0.25em] text-sage-500">
              {item.date}
            </span>
            <h3 className="font-display text-base text-ink">{item.title}</h3>
            <p className="text-sm leading-6 text-ink/60">{item.description}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
