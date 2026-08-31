import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FlowerDoodle from './FlowerDoodle'
import WaxSeal from './WaxSeal'

interface EnvelopeProps {
  guestName?: string
  onOpened: () => void
}

/**
 * 첫 화면 — 편지 봉투 뒷면을 화면 가득 채운 모습.
 * 탭하면 윗 덮개가 열리며 위로 스르륵 사라지고 아래 콘텐츠(Hero 이하)가 드러납니다.
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
          className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center overflow-hidden bg-parchment bg-papyrus"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          onClick={handleOpen}
        >
          {/* 봉투 접힘선 */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-clay-400/40"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline points="0,0 50,44 100,0" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <polyline points="0,0 44,50 0,100" fill="none" stroke="currentColor" strokeWidth="0.3" />
            <polyline points="100,0 56,50 100,100" fill="none" stroke="currentColor" strokeWidth="0.3" />
          </svg>

          {/* 윗 덮개 (열리는 부분) */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[44%] origin-top bg-clay-50/70"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            animate={opening ? { rotateX: 178 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {/* 봉투 종이에 눌린 듯한 플로럴 낙서 */}
          <FlowerDoodle className="pointer-events-none absolute left-1 top-3 h-20 w-24 text-clay-400/50" />
          <FlowerDoodle className="pointer-events-none absolute right-1 top-3 h-20 w-24 -scale-x-100 text-clay-400/50" />
          <FlowerDoodle className="pointer-events-none absolute bottom-8 left-1 h-20 w-24 -scale-y-100 text-clay-400/35" />
          <FlowerDoodle className="pointer-events-none absolute bottom-8 right-1 h-20 w-24 -scale-x-100 -scale-y-100 text-clay-400/35" />

          {/* 중앙 콘텐츠 */}
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-10 text-center">
            {/* 왁스 봉인 */}
            <motion.div
              animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <WaxSeal>J &amp; K</WaxSeal>
            </motion.div>

            <div className="flex flex-col leading-snug">
              <p className="font-script text-3xl text-gold-600">This invitation is</p>
              <p className="font-script text-3xl text-gold-600">exclusively for {guestName ?? 'you'}</p>
            </div>

            <motion.p
              className="absolute bottom-10 font-display text-[11px] tracking-[0.3em] text-ink/45"
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
