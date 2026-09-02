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

/**
 * Hero 다음 화면 — 하트 이미지를 한 번 탭하면 그 안에 날짜가 서서히 떠오릅니다.
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
          <motion.img
            src={asset('heart.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(80,110,160,0.35)]"
            animate={{ scale: revealed ? [1, 1.06, 1] : [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative flex max-w-[130px] flex-col items-center gap-1 text-center"
            initial={{ opacity: 0, y: 6 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: revealed ? 0.3 : 0 }}
          >
            <span className="font-display text-base leading-snug text-white drop-shadow-[0_1px_5px_rgba(30,50,90,0.7)]">
              {dateLine1}
            </span>
            <span className="font-display text-sm leading-snug text-white/95 drop-shadow-[0_1px_5px_rgba(30,50,90,0.7)]">
              {dateLine2}
            </span>
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
