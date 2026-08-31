/**
 * public/ 폴더의 정적 파일(사진 등)을 가리킬 때 사용하는 헬퍼.
 *
 * vite.config.ts의 base(예: '/wedding-invitation/')가 무엇이든 상관없이
 * 항상 올바른 경로로 변환해줍니다. img의 src나 CSS background-image처럼
 * "문자열"로 직접 넣는 경로는 Vite가 base를 자동으로 붙여주지 않기 때문에,
 * public/ 아래 파일을 참조할 땐 반드시 이 함수를 거쳐야 합니다.
 *
 * 예) asset('hero.jpg') -> dev: '/wedding-invitation/hero.jpg'
 *                          배포(base '/'): '/hero.jpg'
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL // 항상 trailing slash 포함 (예: '/wedding-invitation/')
  return base + path.replace(/^\//, '')
}
