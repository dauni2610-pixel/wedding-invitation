import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { weddingDate } from '../data/weddingInfo'

const HEART_PATH =
  'M50 84 C 18 60, 4 38, 4 22 C 4 6, 18 -1, 30 6 C 40 11, 46 20, 50 28 C 54 20, 60 11, 70 6 C 82 -1, 96 6, 96 22 C 96 38, 82 60, 50 84 Z'

// dateLabel 형식: "2026년 12월 13일 일요일 오후 6시" — 앞 3토큰/뒤 3토큰으로 나눠 하트 안에 두 줄로 표시
const tokens = weddingDate.dateLabel.split(' ')
const dateLine1 = tokens.slice(0, 3).join(' ')
const dateLine2 = tokens.slice(3).join(' ')

/**
 * Hero 다음 화면 — 하트 모양을 한 번 탭하면 안쪽 채워짐 + 날짜가 서서히 떠오릅니다.
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
          <svg viewBox="-4 -4 108 92" className="absolute inset-0 h-full w-full overflow-visible">
            {/* 채워지는 하트 */}
            <motion.path
              d={HEART_PATH}
              className="text-clay-200"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
            />
            {/* 항상 보이는 윤곽선 */}
            <path d={HEART_PATH} fill="none" stroke="currentColor" strokeWidth="1.4" className="text-clay-400" />
          </svg>

          <motion.div
            className="relative flex max-w-[150px] flex-col items-center gap-1 text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: revealed ? 0.35 : 0 }}
          >
            <span className="font-display text-base leading-snug text-clay-800">{dateLine1}</span>
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
