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

          {/* 하트 테두리 — heart.png의 실제 윤곽선을 그대로 추출한 이미지라 픽셀 단위로 정확히 겹칩니다 */}
          <motion.img
            src={asset('heart-outline.png')}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: revealed ? 0.95 : 0.3 }}
            transition={{ duration: 0.8 }}
          />

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
