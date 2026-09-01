import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset } from '../lib/asset'

interface DoorIntroProps {
  guestName?: string
  onOpened: () => void
}

/**
 * 첫 화면 — 부겐빌레아가 늘어진 실제 지중해풍 대문 사진, 양쪽으로 열리는 문.
 * 같은 문 사진을 좌우로 배치(왼쪽은 미리 좌우 반전해둔 버전)해서 대칭인 쌍여닫이문처럼 보이게 하고,
 * 탭하면 각자 바깥쪽 경첩을 축으로 실제 문처럼 회전하며 열립니다.
 * 그 틈으로 뒤에 있던 Hero(발코니 풍경 + 신랑신부 이름)가 드러납니다.
 * 열리기 전까지는 body 스크롤을 잠가 반드시 "문 열기"부터 보게 합니다.
 *
 * public/door-panel.jpg · door-panel-mirrored.jpg는 임시로 넣은 무료 스톡 사진입니다
 * (Pexels License, 출처 표기 불필요). 실제 예식장 사진으로 교체하려면 두 파일을 같은
 * 이름으로 바꿔주세요 — mirrored 쪽은 원본을 좌우 반전만 한 동일 사진이면 됩니다.
 */
export default function DoorIntro({ guestName, onOpened }: DoorIntroProps) {
  const [opening, setOpening] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => {
      onOpened()
    }, 550)
    window.setTimeout(() => {
      setHidden(true)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          role="button"
          aria-label="문 열고 청첩장 보기"
          className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
          style={{ perspective: '1600px' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={handleOpen}
        >
          {/* 왼쪽 문 — 왼쪽 바깥 경첩을 축으로 회전 */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 shadow-[8px_0_24px_rgba(0,0,0,0.3)]"
            style={{
              backgroundImage: `url('${asset('door-panel-mirrored.jpg')}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              transformOrigin: '0% 50%',
              backfaceVisibility: 'hidden',
            }}
            animate={{ rotateY: opening ? -100 : 0 }}
            transition={{ duration: 0.85, ease: [0.6, 0, 0.3, 1] }}
          />

          {/* 오른쪽 문 — 오른쪽 바깥 경첩을 축으로 회전 */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 shadow-[-8px_0_24px_rgba(0,0,0,0.3)]"
            style={{
              backgroundImage: `url('${asset('door-panel.jpg')}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              transformOrigin: '100% 50%',
              backfaceVisibility: 'hidden',
            }}
            animate={{ rotateY: opening ? 100 : 0 }}
            transition={{ duration: 0.85, ease: [0.6, 0, 0.3, 1] }}
          />

          {/* 문구 가독성을 위한 은은한 음영 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-10 text-center"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-script text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              You&apos;re Invited
            </p>
            {guestName && (
              <p className="font-display text-xs tracking-[0.3em] text-white/90 drop-shadow">{guestName}</p>
            )}
          </motion.div>

          <motion.p
            className="absolute bottom-10 left-0 right-0 text-center font-display text-[11px] tracking-[0.3em] text-white/80 drop-shadow"
            animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: opening ? 0 : Infinity, ease: 'easeInOut' }}
          >
            TAP TO OPEN
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
