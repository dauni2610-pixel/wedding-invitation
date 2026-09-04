import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { asset } from '../lib/asset'

interface DoorIntroProps {
  guestName?: string
  onOpened: () => void
  onTap?: () => void
}

/**
 * 첫 화면 — Kling AI로 생성한 "아치형 이중문이 열리며 바다가 드러나는" 영상.
 * 탭하면 영상이 재생되고, 영상이 끝나면 뒤에 있던 Hero(발코니 풍경 + 신랑신부 이름)가 드러납니다.
 * 열리기 전까지는 body 스크롤을 잠가 반드시 "문 열기"부터 보게 합니다.
 *
 * public/door-open.mp4 · door-open-poster.jpg는 Kling AI(image-to-video)로 생성한 영상입니다.
 * 다른 영상으로 바꾸고 싶으면 이 두 파일만 같은 이름으로 교체해주세요.
 */
export default function DoorIntro({ guestName, onOpened, onTap }: DoorIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [opening, setOpening] = useState(false)
  const [hidden, setHidden] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    // 브라우저의 자동재생 정책상 소리 있는 재생은 사용자 탭 이벤트 안에서
    // 동기적으로 호출해야 하므로, 배경음악은 여기서 함께 시작합니다.
    onTap?.()
    videoRef.current?.play()
  }

  const handleVideoEnded = () => {
    onOpened()
    window.setTimeout(() => {
      setHidden(true)
    }, 400)
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          role="button"
          aria-label="문 열고 청첩장 보기"
          className="fixed inset-0 z-50 cursor-pointer overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleOpen}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={asset('door-open.mp4')}
            poster={asset('door-open-poster.jpg')}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          />

          {/* 문구 가독성을 위한 은은한 음영 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40" />

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-10 text-center"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.25 }}
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
