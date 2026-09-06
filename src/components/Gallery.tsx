import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { gallery } from '../data/weddingInfo'
import { asset } from '../lib/asset'

/** public/gallery 아래 실제 사진이 없으면 번호가 적힌 플레이스홀더 박스를 보여줍니다. */
function GalleryThumb({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [errored, setErrored] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-sage-100"
    >
      {!errored ? (
        <img
          src={asset(src)}
          alt={`웨딩 사진 ${index + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-sage-400">
          <span className="text-xl">📷</span>
          <span className="text-[10px]">{index + 1}</span>
        </div>
      )}
    </button>
  )
}

// 이전/다음 중 어느 방향으로 넘어가는지에 따라 슬라이드 방향을 바꿔주는 variants.
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
}

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const total = gallery.images.length

  const showPrev = () => {
    setDirection(-1)
    setActiveIndex((i) => (i === null ? null : (i - 1 + total) % total))
  }
  const showNext = () => {
    setDirection(1)
    setActiveIndex((i) => (i === null ? null : (i + 1) % total))
  }

  // 데스크톱에서는 방향키로도 넘길 수 있게, ESC로는 닫을 수 있게.
  useEffect(() => {
    if (activeIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
      else if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  return (
    <section className="flex flex-col items-center gap-8 bg-sage-50 px-6 py-20">
      <SectionHeading eyebrow="GALLERY" title="우리의 순간들" />

      <Reveal delay={0.15} className="grid w-full grid-cols-3 gap-1.5">
        {gallery.images.map((src, i) => (
          <GalleryThumb key={src} src={src} index={i} onClick={() => setActiveIndex(i)} />
        ))}
      </Reveal>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.img
                key={activeIndex}
                src={asset(gallery.images[activeIndex])}
                alt={`웨딩 사진 ${activeIndex + 1} 크게 보기`}
                className="max-h-[80vh] max-w-full rounded-sm object-contain"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </AnimatePresence>

            <button
              type="button"
              className="absolute right-5 top-5 text-2xl text-white/80"
              onClick={() => setActiveIndex(null)}
              aria-label="닫기"
            >
              ✕
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    showPrev()
                  }}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    showNext()
                  }}
                  aria-label="다음 사진"
                >
                  ›
                </button>

                <span className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-widest text-white/60">
                  {activeIndex + 1} / {total}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
