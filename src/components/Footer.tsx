import { useState } from 'react'
import Reveal from './Reveal'
import GreekKeyDivider from './GreekKeyDivider'
import { bride, closingMessage, groom } from '../data/weddingInfo'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: `${groom.name} ❤ ${bride.name} 결혼합니다`,
      text: '저희 두 사람의 결혼식에 초대합니다.',
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // 사용자가 공유를 취소한 경우 — 무시
      }
      return
    }
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // 무시
    }
  }

  return (
    <footer className="flex flex-col items-center gap-6 bg-clay-800 px-8 py-20 text-center text-cream">
      <GreekKeyDivider className="h-2.5 w-16 text-gold-400/60" />

      <Reveal className="flex flex-col items-center gap-3">
        <p className="font-display text-2xl">{closingMessage.title}</p>
        <p className="whitespace-pre-line text-sm leading-7 text-cream/80">{closingMessage.message}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <button
          type="button"
          onClick={handleShare}
          className="rounded-full border border-gold-300/50 px-6 py-2.5 font-display text-xs tracking-widest text-cream/90 transition-colors hover:bg-cream/10"
        >
          {copied ? '링크가 복사되었습니다' : '청첩장 공유하기'}
        </button>
      </Reveal>

      <p className="mt-6 font-display text-[10px] tracking-widest text-cream/40">
        {groom.name} &amp; {bride.name}
      </p>
    </footer>
  )
}
