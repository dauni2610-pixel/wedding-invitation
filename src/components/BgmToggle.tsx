import { motion } from 'framer-motion'

interface BgmToggleProps {
  playing: boolean
  onToggle: () => void
}

/**
 * 배경음악 재생/음소거 토글 — 화면 우측 하단에 붙어서 스크롤을 따라다닙니다.
 * #root가 480px로 가운데 정렬되어 있어서 position:fixed 대신
 * "sticky 래퍼(폭 없음) + absolute 버튼" 조합으로 카드 폭 안에 머물게 합니다.
 */
export default function BgmToggle({ playing, onToggle }: BgmToggleProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 h-0 overflow-visible">
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? '배경음악 끄기' : '배경음악 켜기'}
        className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/50 bg-cream/90 text-sage-700 shadow-md backdrop-blur-sm transition-colors hover:bg-cream"
      >
        <motion.span
          className="text-base"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 6, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
        >
          {playing ? '🎵' : '🔇'}
        </motion.span>
      </button>
    </div>
  )
}
