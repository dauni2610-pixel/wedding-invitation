// ────────────────────────────────────────────────────────────
// 청첩장에 들어가는 모든 실제 정보를 이 파일 하나에서 관리합니다.
// 실제 정보가 준비되면 아래 값들만 바꿔주시면 전체 페이지에 반영됩니다.
// ────────────────────────────────────────────────────────────

export interface Person {
  name: string
  role: '신랑' | '신부'
  fatherName?: string
  motherName?: string
  /** 본인이 몇째 아들/딸인지 (예: '장남', '차녀') */
  order?: string
  phone?: string
  bank?: string
  accountNumber?: string
  accountHolder?: string
}

export const groom: Person = {
  name: '정우',
  role: '신랑',
  fatherName: '홍길동',
  motherName: '김영희',
  order: '장남',
  phone: '010-1234-5678',
  bank: '국민은행',
  accountNumber: '123456-78-901234',
  accountHolder: '정우',
}

export const bride: Person = {
  name: '서연',
  role: '신부',
  fatherName: '이철수',
  motherName: '박미경',
  order: '장녀',
  phone: '010-9876-5432',
  bank: '신한은행',
  accountNumber: '987654-32-109876',
  accountHolder: '서연',
}

export const weddingDate = {
  // JS Date는 월(month)이 0부터 시작하므로 5월 = 4
  date: new Date(2026, 4, 9, 13, 0, 0),
  dateLabel: '2026년 5월 9일 토요일 오후 1시',
}

export const venue = {
  name: '더 클래식 웨딩홀 3층 그랜드홀',
  address: '서울특별시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  lat: 37.5012743,
  lng: 127.0396597,
  transit: [
    { icon: '🚇', title: '지하철', desc: '2호선 강남역 3번 출구 도보 5분' },
    { icon: '🚌', title: '버스', desc: '강남역.강남역환승센터 정류장 하차' },
    { icon: '🚗', title: '주차', desc: '건물 지하 1~3층 3시간 무료 주차' },
  ],
  naverMapUrl: 'https://map.naver.com/',
  kakaoMapUrl: 'https://map.kakao.com/',
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
