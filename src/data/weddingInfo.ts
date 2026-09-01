// ────────────────────────────────────────────────────────────
// 청첩장에 들어가는 모든 실제 정보를 이 파일 하나에서 관리합니다.
// 실제 정보가 준비되면 아래 값들만 바꿔주시면 전체 페이지에 반영됩니다.
// ────────────────────────────────────────────────────────────

export interface Person {
  name: string
  role: '신랑' | '신부'
  fatherName?: string
  motherName?: string
  phone?: string
  bank?: string
  accountNumber?: string
  accountHolder?: string
}

export const groom: Person = {
  name: '정다운',
  role: '신랑',
  fatherName: '정이환',
  motherName: '박경숙',
  // 마음 전하실 곳(계좌번호)은 아직 미정 — 값을 채우면 AccountInfo 섹션에 자동으로 표시됩니다.
}

export const bride: Person = {
  name: '김수민',
  role: '신부',
  fatherName: '김종구',
  motherName: '공상은',
  // 마음 전하실 곳(계좌번호)은 아직 미정 — 값을 채우면 AccountInfo 섹션에 자동으로 표시됩니다.
}

export const weddingDate = {
  // JS Date는 월(month)이 0부터 시작하므로 12월 = 11
  date: new Date(2026, 11, 13, 18, 0, 0),
  dateLabel: '2026년 12월 13일 일요일 오후 6시',
}

export const venue = {
  name: '그랜드 인터컨티넨탈 서울 파르나스 메이플룸',
  address: '서울특별시 강남구 테헤란로 521 그랜드 인터컨티넨탈 서울 파르나스',
  phone: '',
  // 대략적인 좌표입니다 — 실제 지도 API(네이버/카카오)를 붙일 때 정확한 값으로 다시 확인해주세요.
  lat: 37.5090,
  lng: 127.0605,
  transit: [
    { icon: '🚇', title: '지하철', desc: '2호선 삼성역 5·6번 출구 연결' },
    { icon: '🚌', title: '버스', desc: '삼성역/코엑스 정류장 하차' },
    { icon: '🚗', title: '주차', desc: '호텔 지하 주차장 이용 (하객 무료 주차 확인 예정)' },
  ],
  naverMapUrl: 'https://map.naver.com/p/search/그랜드 인터컨티넨탈 서울 파르나스',
  kakaoMapUrl: 'https://map.kakao.com/?q=그랜드 인터컨티넨탈 서울 파르나스',
  tmapUrl: 'https://tmap.life/',
}

export const greeting = {
  title: '초대합니다',
  message: [
    '서로 다른 길을 걸어온 두 사람이',
    '이제 하나의 길을 함께 걸어가려 합니다.',
    '',
    '따뜻한 마음으로 축복해 주시면',
    '더없이 큰 기쁨으로 간직하겠습니다.',
  ],
}

export const gallery = {
  // public/gallery 폴더에 실제 사진을 넣고 파일명을 아래에 채워주세요.
  images: [
    '/gallery/photo1.jpg',
    '/gallery/photo2.jpg',
    '/gallery/photo3.jpg',
    '/gallery/photo4.jpg',
    '/gallery/photo5.jpg',
    '/gallery/photo6.jpg',
  ],
}

export const rsvp = {
  enabled: true,
  description: '참석이 어려우신 경우에도 알려주시면 감사하겠습니다.',
}

export const closingMessage = {
  title: '감사합니다',
  message: '보내주신 사랑과 축복,\n평생 마음에 새기며 살겠습니다.',
}
