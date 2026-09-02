import { useEffect, useState } from 'react'
import DoorIntro from './components/DoorIntro'
import Hero from './components/Hero'
import DateReveal from './components/DateReveal'
import Greeting from './components/Greeting'
import Countdown from './components/Countdown'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import RSVP from './components/RSVP'
import AccountInfo from './components/AccountInfo'
import Footer from './components/Footer'

function App() {
  const [isOpened, setIsOpened] = useState(false)

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

  return (
    <>
      <DoorIntro guestName={guestName} onOpened={() => setIsOpened(true)} />

      <main>
        <Hero />
        <DateReveal />
        <Greeting />
        <Countdown />
        <Calendar />
        <Gallery />
        <Location />
        <RSVP />
        <AccountInfo />
        <Footer />
      </main>
    </>
  )
}

export default App
