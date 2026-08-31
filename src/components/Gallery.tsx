import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { gallery } from '../data/weddingInfo'

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
          src={src}
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

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
            <img
              src={gallery.images[activeIndex]}
              alt={`웨딩 사진 ${activeIndex + 1} 크게 보기`}
              className="max-h-[80vh] max-w-full rounded-sm object-contain"
            />
            <button
              type="button"
              className="absolute right-5 top-5 text-2xl text-white/80"
              onClick={() => setActiveIndex(null)}
              aria-label="닫기"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
