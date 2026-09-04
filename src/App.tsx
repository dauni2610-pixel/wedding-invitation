import { useEffect, useRef, useState } from 'react'
import DoorIntro from './components/DoorIntro'
import BgmToggle from './components/BgmToggle'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import Greeting from './components/Greeting'
import Countdown from './components/Countdown'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import RSVP from './components/RSVP'
import AccountInfo from './components/AccountInfo'
import Footer from './components/Footer'
import { asset } from './lib/asset'

const BGM_VOLUME = 0.3

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [bgmPlaying, setBgmPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrame = useRef<number>()

  // 링크에 ?to=이름 을 붙이면 문 앞에 하객 이름을 개인화해서 보여줍니다.
  // 예) https://.../?to=길동
  const guestName = new URLSearchParams(window.location.search).get('to') ?? undefined

  // 문을 열기 전까지는 스크롤을 잠가서, 참고 영상처럼
  // "문 열기" 인터랙션을 반드시 먼저 겪게 합니다.
  useEffect(() => {
    document.body.style.overflow = isOpened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpened])

  // 배경음악을 서서히 페이드인하며 재생 — 볼륨 0에서 시작해 부드럽게 올라갑니다.
  const fadeIn = (audio: HTMLAudioElement) => {
    const start = performance.now()
    const duration = 1500
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      audio.volume = BGM_VOLUME * t
      if (t < 1) fadeFrame.current = requestAnimationFrame(step)
    }
    fadeFrame.current = requestAnimationFrame(step)
  }

  // 브라우저 자동재생 정책 때문에 "문 열기" 탭 이벤트 안에서 동기적으로 호출됩니다.
  const startBgm = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play().then(() => {
      setBgmPlaying(true)
      fadeIn(audio)
    }).catch(() => {
      // 자동재생이 막힌 경우 — 토글 버튼으로 직접 켤 수 있습니다.
    })
  }

  const toggleBgm = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.volume = BGM_VOLUME
      audio.play().then(() => setBgmPlaying(true)).catch(() => {})
    } else {
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current)
      audio.pause()
      setBgmPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={asset('bgm.mp3')} loop preload="auto" />

      <DoorIntro guestName={guestName} onOpened={() => setIsOpened(true)} onTap={startBgm} />

      <main>
        <Hero />
        <OurStory />
        <Greeting />
        <Countdown />
        <Calendar />
        <Gallery />
        <Location />
        <RSVP />
        <AccountInfo />
        <Footer />
      </main>

      {isOpened && <BgmToggle playing={bgmPlaying} onToggle={toggleBgm} />}
    </>
  )
}

export default App
