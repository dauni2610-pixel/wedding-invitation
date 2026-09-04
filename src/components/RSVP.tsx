import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { rsvp } from '../data/weddingInfo'

type Side = '신랑측' | '신부측'
type Attendance = '참석' | '불참'
type Status = 'idle' | 'submitting' | 'done' | 'error'

// Formspree, Google Apps Script 웹앱 등 정적 사이트에서도 쓸 수 있는
// POST 엔드포인트 주소를 .env 파일의 VITE_RSVP_ENDPOINT 에 넣어주세요.
// 비워두면 실제 전송 없이 데모로만 동작합니다.
const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined

export default function RSVP() {
  const [side, setSide] = useState<Side>('신랑측')
  const [attendance, setAttendance] = useState<Attendance>('참석')
  const [status, setStatus] = useState<Status>('idle')

  if (!rsvp.enabled) return null

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      side,
      attendance,
      name: formData.get('name'),
      guests: formData.get('guests'),
      message: formData.get('message'),
    }

    if (!ENDPOINT) {
      // 엔드포인트 미설정 — 콘솔에만 출력하는 데모 모드
      console.info('[RSVP demo submission]', payload)
      setStatus('done')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="flex flex-col items-center gap-8 bg-sage-50 px-6 py-20">
      <SectionHeading eyebrow="RSVP" title="참석 의사 전달" subtitle={rsvp.description} />

      {status === 'done' ? (
        <Reveal className="rounded-md border border-sage-200 bg-parchment px-6 py-8 text-center">
          <p className="font-body text-base text-sage-700">소중한 답변 감사합니다 🌿</p>
        </Reveal>
      ) : (
        <Reveal delay={0.1} className="w-full">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              {(['신랑측', '신부측'] as Side[]).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSide(s)}
                  className={`rounded-md border py-2.5 text-sm transition-colors ${
                    side === s
                      ? 'border-sage-600 bg-sage-600 text-cream'
                      : 'border-sage-200 text-ink/60'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(['참석', '불참'] as Attendance[]).map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => setAttendance(a)}
                  className={`rounded-md border py-2.5 text-sm transition-colors ${
                    attendance === a
                      ? 'border-sage-600 bg-sage-600 text-cream'
                      : 'border-sage-200 text-ink/60'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            <input
              name="name"
              required
              placeholder="이름"
              className="rounded-md border border-sage-200 bg-parchment px-4 py-2.5 text-sm outline-none focus:border-sage-500"
            />
            <input
              name="guests"
              type="number"
              min={1}
              defaultValue={1}
              placeholder="참석 인원"
              className="rounded-md border border-sage-200 bg-parchment px-4 py-2.5 text-sm outline-none focus:border-sage-500"
            />
            <textarea
              name="message"
              placeholder="신랑신부에게 전하고 싶은 말 (선택)"
              rows={3}
              className="resize-none rounded-md border border-sage-200 bg-parchment px-4 py-2.5 text-sm outline-none focus:border-sage-500"
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-1 rounded-md bg-sage-700 py-3 text-sm text-cream transition-colors hover:bg-sage-800 disabled:opacity-60"
            >
              {status === 'submitting' ? '전송 중...' : '답변 보내기'}
            </button>

            {status === 'error' && (
              <p className="text-center text-xs text-red-500">전송에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
            )}
            {!ENDPOINT && (
              <p className="text-center text-[11px] text-ink/40">
                * 현재 데모 모드입니다. VITE_RSVP_ENDPOINT 환경변수를 설정하면 실제로 응답이 전송됩니다.
              </p>
            )}
          </form>
        </Reveal>
      )}
    </section>
  )
}
