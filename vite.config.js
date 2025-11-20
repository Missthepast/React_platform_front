import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 关键点：添加 base 配置，必须和你的仓库名完全一致，前后加斜杠
  base: '/React_platform_front/',
})