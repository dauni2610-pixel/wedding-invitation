# 정다운 ❤ 김수민 청첩장

봉투를 여는 인트로 애니메이션으로 시작해서, 아래로 스크롤하며 결혼식 정보를 확인하는
모바일 우선 청첩장 웹앱입니다.

- **스택**: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **배포**: GitHub Pages (GitHub Actions로 `main` 브랜치 push 시 자동 배포)

## 구성

```
src/
  components/
    Envelope.tsx      # 첫 화면 — 탭하면 봉투가 열리며 아래 콘텐츠 노출
    Hero.tsx           # 신랑·신부 이름 / 날짜
    Greeting.tsx        # 인사말
    Countdown.tsx        # 결혼식까지 남은 시간
    Calendar.tsx           # 날짜 달력
    Gallery.tsx              # 사진첩 (탭하면 크게 보기)
    Location.tsx              # 오시는 길 / 지도·교통
    RSVP.tsx                    # 참석 여부 전달 폼
    AccountInfo.tsx              # 마음 전하실 곳 (계좌번호)
    Footer.tsx                    # 맺음말 / 공유하기
    Reveal.tsx, SectionHeading.tsx, FloralOrnament.tsx  # 공통 연출 컴포넌트
  data/
    weddingInfo.ts       # 실제 정보(이름/날짜/장소/계좌 등)를 관리하는 단일 파일
```

## 1. 로컬 개발 환경 준비

Node.js가 설치되어 있어야 합니다 (이 프로젝트를 만든 PC에는 아직 설치돼 있지 않았습니다).

1. https://nodejs.org 에서 **LTS 버전**을 설치합니다.
2. 설치 후 터미널을 새로 열고 확인합니다.
   ```bash
   node -v
   npm -v
   ```

## 2. 설치 및 실행

```bash
npm install
npm run dev
```

`http://localhost:5173` 에서 확인할 수 있습니다.

## 3. 실제 정보 채우기

거의 모든 내용은 **[src/data/weddingInfo.ts](src/data/weddingInfo.ts)** 한 파일에서 관리합니다.
신랑/신부 이름, 부모님 성함, 예식 일시, 예식장 주소, 교통 정보, 계좌번호 등을 이 파일에서 수정하세요.

- **배경/갤러리 사진**: `public/hero.jpg` (첫 화면 배경), `public/gallery/photo1.jpg` ~
  `photo6.jpg` 자리에 실제 사진을 넣으면 자동으로 반영됩니다. (파일이 없으면 플레이스홀더가 보입니다.)
- **개인화 링크**: 청첩장 링크 끝에 `?to=이름` 을 붙이면 봉투 문구가
  `"OO님을 위한 것입니다"` 로 바뀝니다. 예) `https://<주소>/?to=길동`
- **참석 여부(RSVP) 실제 전송**: 기본은 콘솔에만 로그를 남기는 데모 모드입니다.
  [Formspree](https://formspree.io) 등에서 발급받은 POST 엔드포인트를 `.env` 파일에
  `VITE_RSVP_ENDPOINT=https://...` 형태로 넣으면 실제로 응답이 전송됩니다.
  (`.env.example` 참고)

## 4. GitHub에 올리고 배포하기

### 4-1. GitHub 저장소 만들기

```bash
git add -A
git commit -m "Initial commit: wedding invitation scaffold"
git branch -M main
git remote add origin https://github.com/<사용자명>/<저장소명>.git
git push -u origin main
```

(GitHub CLI(`gh`)가 설치되어 있다면 `gh repo create <저장소명> --public --source=. --push` 한 줄로도 가능합니다.)

### 4-2. GitHub Pages 자동 배포 활성화

1. GitHub 저장소 → **Settings → Pages**
2. **Source**를 `GitHub Actions`로 선택
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml` 워크플로가 자동으로
   빌드 후 `https://<사용자명>.github.io/<저장소명>/` 에 배포합니다.

### 4-3. 저장소 이름이 다르다면

[vite.config.ts](vite.config.ts) 의 `base` 값을 실제 저장소 이름과 동일하게 맞춰주세요.

```ts
base: '/저장소명/',
```

## 5. 커스텀 도메인을 쓰고 싶다면

`public/CNAME` 파일을 만들어 도메인을 한 줄 적어두면, GitHub Pages가 해당 도메인으로
서비스합니다. (도메인 쪽 DNS 설정도 별도로 필요합니다.)
