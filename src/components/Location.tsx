import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { venue } from '../data/weddingInfo'

// OpenStreetMap 임베드 — 별도 API 키/도메인 등록 없이 바로 동작합니다.
// (네이버/카카오 지도 SDK는 발급받은 키를 도메인에 등록해야 해서, 아래 버튼들로 대신 연결합니다.)
const MAP_LAT_DELTA = 0.004
const MAP_LNG_DELTA = 0.006

function buildMapSrc() {
  const minLng = venue.lng - MAP_LNG_DELTA
  const maxLng = venue.lng + MAP_LNG_DELTA
  const minLat = venue.lat - MAP_LAT_DELTA
  const maxLat = venue.lat + MAP_LAT_DELTA
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${venue.lat},${venue.lng}`
}

export default function Location() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(venue.address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // 클립보드 API를 지원하지 않는 환경 — 조용히 무시
    }
  }

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-20">
      <SectionHeading eyebrow="LOCATION" title="오시는 길" />

      <Reveal delay={0.1} className="w-full">
        <div className="h-56 w-full overflow-hidden rounded-sm border border-sage-200">
          <iframe
            title="예식장 위치 지도"
            src={buildMapSrc()}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </Reveal>

      <Reveal delay={0.2} className="flex w-full flex-col items-center gap-1 text-center">
        <p className="font-display text-base tracking-wide text-ink">{venue.name}</p>
        <p className="text-sm text-ink/60">{venue.address}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-2 rounded-full border border-sage-300 px-4 py-1.5 text-xs text-sage-600 transition-colors hover:bg-sage-100"
        >
          {copied ? '복사되었습니다' : '주소 복사하기'}
        </button>
      </Reveal>

      <Reveal delay={0.25} className="grid w-full grid-cols-3 gap-2">
        <a
          href={venue.naverMapUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-sage-200 py-2.5 text-center text-xs text-ink/70 transition-colors hover:bg-sage-50"
        >
          네이버지도
        </a>
        <a
          href={venue.kakaoMapUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-sage-200 py-2.5 text-center text-xs text-ink/70 transition-colors hover:bg-sage-50"
        >
          카카오맵
        </a>
        <a
          href={venue.tmapUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-sage-200 py-2.5 text-center text-xs text-ink/70 transition-colors hover:bg-sage-50"
        >
          티맵
        </a>
      </Reveal>

      <Reveal delay={0.3} className="flex w-full flex-col gap-3">
        {venue.transit.map((item) => (
          <div key={item.title} className="flex items-start gap-3 rounded-md bg-sage-50 p-3">
            <span className="text-lg">{item.icon}</span>
            <div>
              <p className="text-sm font-medium text-ink">{item.title}</p>
              <p className="text-xs text-ink/60">{item.desc}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
