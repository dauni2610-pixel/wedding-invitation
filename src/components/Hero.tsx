import { motion } from 'framer-motion'
import { groom, bride, weddingDate } from '../data/weddingInfo'
import { asset } from '../lib/asset'

/**
 * 문이 열리자마자 보이는 화면 — 정원에 걸린 흰 천 장식.
 * public/hero.jpg는 문 열림 영상(door-open.mp4)의 마지막 프레임에서, AI가 잘못 그려넣은
 * 예시 문구("We're Engaged! EMMA&MATEO ...")만 자연스럽게 지운 사진입니다.
 * 그 자리에 아래 신랑신부 이름 텍스트가 얹혀서, 마치 저 천에 우리 이름이 적힌 것처럼 보입니다.
 * 영상이 끝나는 순간과 이 화면이 끊김 없이 이어집니다.
 * 사진을 바꾸고 싶으면 이 자리만 교체해주세요(없으면 테라코타 톤 그라디언트로 대체).
 */
export default function Hero() {
  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-clay-700 text-cream"
      style={{
        backgroundImage:
          `url('${asset('hero.jpg')}'), linear-gradient(160deg, #3e2513 0%, #6f4220 45%, #a86a2f 75%, #d9a869 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55" />

      {/*
        문 열림 영상의 마지막 프레임(hero.jpg)에서 지운 흰 천의 문구 자리와 정확히 겹치도록
        절대 위치로 고정. 영상이 끝난 뒤 마치 이 문구가 원래 거기 있던 것처럼 이어져 보입니다.
        (hero.jpg를 다른 사진으로 바꾸면 이 top/height 값도 그 사진의 여백 위치에 맞춰 다시 조정하세요.)
      */}
      <div
        className="absolute inset-x-0 flex flex-col items-center justify-center gap-2 px-10 text-center"
        style={{ top: '40%', height: '35%' }}
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-xs tracking-[0.4em] text-cream/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
        >
          WE ARE GETTING MARRIED
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-2 font-display text-4xl leading-tight text-gold-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {groom.name}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="font-display text-xs tracking-widest text-gold-300/80"
        >
          &amp;
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          className="font-display text-4xl leading-tight text-gold-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {bride.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-2 font-display text-xs tracking-[0.2em] text-cream/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
        >
          {weddingDate.dateLabel}
        </motion.p>
      </div>

      <motion.a
        href="#rsvp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-cream/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
      >
        <span className="font-display text-[11px] tracking-[0.3em]">CONFIRM YOUR ATTENDANCE</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-lg"
        >
          ⌄
        </motion.span>
      </motion.a>
    </section>
  )
}
