import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BougainvilleaVine from './BougainvilleaVine'

interface DoorIntroProps {
  guestName?: string
  onOpened: () => void
}

/**
 * 첫 화면 — 부겐빌레아가 늘어진 아치형 리조트 문.
 * 탭하면 양쪽 문이 실제 경첩처럼 3D로 열리며 화면이 확대되듯 사라지고,
 * 그 뒤에 있던 Hero(발코니 너머 풍경 + 신랑신부 이름)가 드러납니다.
 * 열리기 전까지는 body 스크롤을 잠가 반드시 "문 열기"부터 보게 합니다.
 */
export default function DoorIntro({ guestName, onOpened }: DoorIntroProps) {
  const [opening, setOpening] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => {
      onOpened()
    }, 750)
    window.setTimeout(() => {
      setHidden(true)
    }, 1300)
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          role="button"
          aria-label="문 열고 청첩장 보기"
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #fbf6ef 0%, #f1e6d4 100%)',
            perspective: '1400px',
          }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleOpen}
        >
          {/* 부겐빌레아 덩굴 */}
          <BougainvilleaVine className="pointer-events-none absolute -top-1 left-2 h-16 w-36 -rotate-3" />
          <BougainvilleaVine className="pointer-events-none absolute -top-1 right-2 h-16 w-36 -scale-x-100 rotate-3" />

          {/* 아치형 문 프레임 */}
          <div
            className="relative w-[76%] max-w-[300px] overflow-hidden shadow-[0_25px_55px_-18px_rgba(30,20,10,0.4)]"
            style={{
              height: '66%',
              borderRadius: '50% 50% 6px 6px / 22% 22% 6px 6px',
              background: '#173f42',
            }}
          >
            {/* 왼쪽 문 */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: 'linear-gradient(90deg, #2f8f96 0%, #256e73 100%)',
                transformOrigin: 'left center',
                backfaceVisibility: 'hidden',
              }}
              animate={opening ? { rotateY: -108 } : { rotateY: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            >
              <div className="absolute inset-3 rounded-sm border border-white/15" />
              <div className="absolute inset-x-3 top-[38%] h-px bg-white/10" />
              <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#e7cd8f] shadow" />
            </motion.div>

            {/* 오른쪽 문 */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2"
              style={{
                background: 'linear-gradient(270deg, #2f8f96 0%, #256e73 100%)',
                transformOrigin: 'right center',
                backfaceVisibility: 'hidden',
              }}
              animate={opening ? { rotateY: 108 } : { rotateY: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
            >
              <div className="absolute inset-3 rounded-sm border border-white/15" />
              <div className="absolute inset-x-3 top-[38%] h-px bg-white/10" />
              <span className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#e7cd8f] shadow" />
            </motion.div>
          </div>

          {/* 문구 */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-script text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              You&apos;re Invited
            </p>
            {guestName && (
              <p className="font-display text-xs tracking-[0.3em] text-white/90 drop-shadow">{guestName}</p>
            )}
          </motion.div>

          <motion.p
            className="absolute bottom-10 font-display text-[11px] tracking-[0.3em] text-ink/45"
            animate={{ opacity: opening ? 0 : [0.35, 1, 0.35] }}
            transition={{ duration: 2, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }}
          >
            TAP TO OPEN
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
