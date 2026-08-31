import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages에서 https://<user>.github.io/<repo>/ 형태로 서비스되므로
// base를 저장소 이름으로 지정합니다. 저장소 이름이 다르면 아래 값을 바꿔주세요.
export default defineConfig({
  plugins: [react()],
  base: '/wedding-invitation/',
})
