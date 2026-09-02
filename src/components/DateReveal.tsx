import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { asset } from '../lib/asset'
import { weddingDate } from '../data/weddingInfo'

// dateLabel 형식: "2026년 12월 13일 일요일 오후 6시" — 앞 3토큰/뒤 3토큰으로 나눠 두 줄로 표시
const tokens = weddingDate.dateLabel.split(' ')
const dateLine1 = tokens.slice(0, 3).join(' ')
const dateLine2 = tokens.slice(3).join(' ')

// 하트 사진의 실루엣과 비슷한 통통한 하트 윤곽선 (탭하면 이 테두리만 남습니다)
const HEART_PATH =
  'M50 92 C 15 64, -2 40, -2 22 C -2 2, 18 -8, 34 0 C 44 5, 50 14, 50 24 C 50 14, 56 5, 66 0 C 82 -8, 102 2, 102 22 C 102 40, 85 64, 50 92 Z'

/**
 * Hero 다음 화면 — 하트 사진을 탭하면 사진은 옅어지고 테두리만 남으면서,
 * 그 안에 날짜가 또렷하게 떠오릅니다.
 */
export default function DateReveal() {
  const [revealed, setRevealed] = useState(false)

  return (
    <section className="flex flex-col items-center gap-8 bg-clay-50 px-8 py-24">
      <SectionHeading eyebrow="SAVE THE DATE" title="설레는 그 날" />

      <Reveal delay={0.15}>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          aria-label={revealed ? '예식 날짜' : '탭해서 날짜 확인하기'}
          className="relative flex h-64 w-64 cursor-pointer items-center justify-center"
        >
          {/* 하트 사진 — 탭하면 옅어짐 */}
          <motion.img
            src={asset('heart.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(80,110,160,0.35)]"
            animate={
              revealed
                ? { opacity: 0.16, scale: 1 }
                : { opacity: 1, scale: [1, 1.04, 1] }
            }
            transition={
              revealed
                ? { duration: 1, ease: 'easeInOut' }
                : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* 하트 테두리 — 탭하면 또렷해짐 */}
          <svg viewBox="-8 -14 116 112" className="absolute inset-0 h-full w-full overflow-visible">
            <motion.path
              d={HEART_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#4a7fb5]"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: revealed ? 0.9 : 0.35 }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          {/* 날짜 문구 — 하트 정중앙에 정확히 배치 */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-10 text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: revealed ? 0.35 : 0 }}
          >
            <span className="font-display text-lg font-medium leading-snug text-clay-800">{dateLine1}</span>
            <span className="font-display text-sm leading-snug text-clay-600">{dateLine2}</span>
          </motion.div>

          {!revealed && (
            <motion.span
              className="absolute -bottom-10 font-display text-[11px] tracking-[0.3em] text-clay-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              TAP TO REVEAL
            </motion.span>
          )}
        </button>
      </Reveal>
    </section>
  )
}
