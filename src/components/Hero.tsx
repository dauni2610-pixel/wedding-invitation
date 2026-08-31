import { motion } from 'framer-motion'
import { groom, bride, weddingDate } from '../data/weddingInfo'

/**
 * 봉투가 열리자마자 보이는 첫 화면.
 * public/hero.jpg 를 넣으면 실제 사진이, 없으면 세이지 톤 그라디언트가 배경으로 보입니다.
 */
export default function Hero() {
  return (
    <section
      className="relative flex h-[100svh] flex-col items-center justify-between overflow-hidden bg-sage-700 text-cream"
      style={{
        backgroundImage:
          "url('/hero.jpg'), linear-gradient(160deg, #2f392b 0%, #516847 55%, #869e77 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/50" />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative mt-16 text-xs tracking-[0.4em] text-cream/80"
      >
        WE ARE GETTING MARRIED
      </motion.p>

      <div className="relative flex flex-col items-center gap-3">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="font-script text-5xl leading-tight drop-shadow-sm"
        >
          {groom.name}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="font-serif text-sm tracking-widest text-cream/70"
        >
          &amp;
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          className="font-script text-5xl leading-tight drop-shadow-sm"
        >
          {bride.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-4 font-serif text-sm tracking-[0.2em] text-cream/90"
        >
          {weddingDate.dateLabel}
        </motion.p>
      </div>

      <motion.a
        href="#rsvp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="relative mb-10 flex flex-col items-center gap-2 text-cream/80"
      >
        <span className="text-[11px] tracking-[0.3em]">CONFIRM YOUR ATTENDANCE</span>
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
