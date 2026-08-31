import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { groom, bride } from '../data/weddingInfo'
import FloralOrnament from './FloralOrnament'

interface EnvelopeProps {
  guestName?: string
  onOpened: () => void
}

/**
 * 첫 화면에 뜨는 편지 봉투. 탭하면 봉인이 풀리며 위 덮개가 열리고,
 * 봉투 전체가 위로 스르륵 사라지면서 아래 콘텐츠(Hero 이하)가 드러납니다.
 * 열리기 전까지는 body 스크롤을 잠가 반드시 "봉투 열기"부터 보게 합니다.
 */
export default function Envelope({ guestName, onOpened }: EnvelopeProps) {
  const [opening, setOpening] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => {
      onOpened()
    }, 900)
    window.setTimeout(() => {
      setHidden(true)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          role="button"
          aria-label="청첩장 열기"
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sage-700 via-sage-600 to-sage-800 text-cream"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          onClick={handleOpen}
        >
          {/* 네 모서리 플로럴 장식 */}
          <FloralOrnament className="pointer-events-none absolute left-0 top-0 h-28 w-28 text-cream/25" />
          <FloralOrnament className="pointer-events-none absolute right-0 top-0 h-28 w-28 -scale-x-100 text-cream/25" />
          <FloralOrnament className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 -scale-y-100 text-cream/25" />
          <FloralOrnament className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 -scale-x-100 -scale-y-100 text-cream/25" />

          <div className="relative flex flex-col items-center gap-7 px-10 text-center">
            <p className="font-serif text-xs tracking-[0.4em] text-cream/70">WEDDING INVITATION</p>

            {/* 봉투 그래픽 */}
            <div className="relative h-40 w-60" style={{ perspective: '900px' }}>
              {/* 몸체 */}
              <div className="absolute inset-0 rounded-[2px] border border-cream/30 bg-cream/95 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)]" />
              {/* 아래 삼각 접힘선 */}
              <div
                className="absolute inset-0 bg-sage-100/80"
                style={{ clipPath: 'polygon(0% 100%, 50% 38%, 100% 100%)' }}
              />
              {/* 좌우 접힘선 */}
              <div
                className="absolute inset-0 bg-sage-200/50"
                style={{ clipPath: 'polygon(0% 0%, 50% 45%, 0% 100%)' }}
              />
              <div
                className="absolute inset-0 bg-sage-200/50"
                style={{ clipPath: 'polygon(100% 0%, 50% 45%, 100% 100%)' }}
              />
              {/* 윗 덮개 (열리는 부분) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[55%] origin-top bg-sage-100"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                animate={opening ? { rotateX: 178 } : { rotateX: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />

              {/* 왁스 봉인 */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sage-600 shadow-md"
                animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <span className="font-script text-xl text-cream">
                  {groom.name[0]}
                  <span className="mx-0.5 text-cream/70">&amp;</span>
                  {bride.name[0]}
                </span>
              </motion.div>
            </div>

            <p className="max-w-[220px] font-serif text-lg leading-relaxed text-cream/95">
              이 초대장은
              <br />
              <span className="font-script text-2xl">{guestName ?? '소중한 당신'}</span>
              님을 위한 것입니다
            </p>

            <motion.p
              className="mt-2 text-[11px] tracking-[0.3em] text-cream/60"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              TOUCH TO OPEN
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
