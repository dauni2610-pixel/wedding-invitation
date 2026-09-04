import { motion } from 'framer-motion'
import { asset } from '../lib/asset'

/**
 * 문이 열리자마자 보이는 화면 — 정원에 걸린 흰 천 장식.
 * public/hero.jpg는 문 열림 영상(door-open.mp4)의 마지막 프레임 그대로입니다.
 * 이 버전은 영상 자체에 "We're Getting Married / 신랑 & 신부 이름 / 날짜"가
 * 정확하게 나와 있어서, 별도로 텍스트를 얹지 않고 사진을 그대로 보여줍니다.
 * 영상이 끝나는 순간과 이 화면이 끊김 없이 이어집니다.
 * 사진을 바꾸고 싶으면 이 자리만 교체해주세요(없으면 세이지 톤 그라디언트로 대체).
 */
export default function Hero() {
  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-sage-700"
      style={{
        backgroundImage:
          `url('${asset('hero.jpg')}'), linear-gradient(160deg, #2e3523 0%, #4a5637 45%, #758657 75%, #b1bd9a 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 하단 CTA 가독성을 위한 은은한 음영 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

      <motion.a
        href="#rsvp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
