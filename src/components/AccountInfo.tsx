import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { bride, groom, type Person } from '../data/weddingInfo'

function AccountRow({ person }: { person: Person }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!person.accountNumber) return
    try {
      await navigator.clipboard.writeText(person.accountNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // 무시
    }
  }

  return (
    <div className="flex items-center justify-between rounded-md border border-clay-200 bg-clay-50 px-4 py-3">
      <div>
        <p className="text-sm text-ink/60">
          {person.bank} <span className="text-ink">{person.accountHolder}</span>
        </p>
        <p className="text-sm font-medium tabular-nums text-ink">{person.accountNumber}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-clay-300 px-3 py-1.5 text-xs text-clay-600 transition-colors hover:bg-clay-50"
      >
        {copied ? '복사됨' : '복사'}
      </button>
    </div>
  )
}

function AccountGroup({ label, person }: { label: string; person: Person }) {
  const [open, setOpen] = useState(false)

  if (!person.accountNumber) return null

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md bg-clay-50 px-4 py-3 text-sm text-ink/80"
      >
        <span>{label}</span>
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>
      {open && (
        <div className="mt-2">
          <AccountRow person={person} />
        </div>
      )}
    </div>
  )
}

export default function AccountInfo() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-20">
      <SectionHeading eyebrow="GIFT" title="마음 전하실 곳" subtitle="따뜻한 축하의 마음을 전해주세요" />

      <Reveal delay={0.15} className="flex w-full flex-col gap-3">
        <AccountGroup label={`신랑측 (${groom.name})`} person={groom} />
        <AccountGroup label={`신부측 (${bride.name})`} person={bride} />
      </Reveal>
    </section>
  )
}
